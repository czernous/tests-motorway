import { Dispatch, createContext, useCallback, useMemo, useReducer } from 'react';
import { Car, Tags } from '../types';
import { fetchData } from '../utils';

export type IAppContext = {
  tags: Tags | [];
  cars: Car[] | null;
  selectedTag: string | null;
  isFetchingTags: boolean;
  isFetchingCars: boolean;
  fetchTags: (query: string) => Promise<void>;
  fetchCars: (query: string) => Promise<void>;
  updateSelectedTag: (tagValue: string) => void;
  clearTags: () => void;
  clearCars: () => void;
};

const initialState = {
  tags: [],
  cars: null,
  selectedTag: null,
  isFetchingTags: false,
  isFetchingCars: false,
} as IAppContext;

export enum AppActions {
  FETCH_TAGS = 'FETCH_TAGS',
  FETCH_CARS = 'FETCH_CARS',
  TOGGLE_TAGS_FETCHING = 'TOGGLE_TAGS_FETCHING',
  TOGGLE_CARS_FETCHING = 'TOGGLE_CARS_FETCHING',
  UPDATE_SELECTED_TAG = 'UPDATE_SELECTED_TAG',
  CLEAR_TAGS = 'CLEAR_TAGS',
  CLEAR_CARS = 'CLEAR_CARS',
}

export type IAppAction = {
  type: AppActions;
  payload: IAppContext;
};

export const AppContext = createContext(initialState);

const reducer = (state: IAppContext, action: IAppAction) => {
  switch (action.type) {
    case AppActions.FETCH_TAGS:
      return {
        ...state,
        tags: action.payload.tags,
      };

    case AppActions.FETCH_CARS:
      return {
        ...state,
        cars: action.payload.cars,
      };

    case AppActions.TOGGLE_CARS_FETCHING:
      return {
        ...state,
        isFetchingCars: !state.isFetchingCars,
      };

    case AppActions.TOGGLE_TAGS_FETCHING:
      return {
        ...state,
        isFetchingTags: !state.isFetchingTags,
      };

    case AppActions.UPDATE_SELECTED_TAG:
      return {
        ...state,
        selectedTag: action.payload.selectedTag,
      };

    case AppActions.CLEAR_CARS:
      return {
        ...state,
        cars: null,
      };

    case AppActions.CLEAR_TAGS:
      return {
        ...state,
        tags: [],
      };
  }
};

export const useAppReducer = () => {
  const [app, dispatch]: [IAppContext, Dispatch<IAppAction>] = useReducer(reducer, initialState);

  const fetchTags = useCallback(
    async (query: string) => {
      dispatch({
        type: AppActions.TOGGLE_TAGS_FETCHING,
        payload: app,
      });

      const res = await fetchData<Tags>({
        endpoint: 'tags',
        query: [query],
      });

      dispatch({
        type: AppActions.FETCH_TAGS,
        payload: { ...app, tags: res.data },
      });

      dispatch({
        type: AppActions.TOGGLE_TAGS_FETCHING,
        payload: app,
      });
    },
    [app]
  );

  const fetchCars = useCallback(
    async (query: string) => {
      dispatch({
        type: AppActions.TOGGLE_CARS_FETCHING,
        payload: app,
      });

      const res = await fetchData<Car[]>({
        endpoint: 'cars',
        query: [query],
      });

      dispatch({
        type: AppActions.FETCH_CARS,
        payload: { ...app, cars: res.data },
      });
      dispatch({
        type: AppActions.TOGGLE_CARS_FETCHING,
        payload: app,
      });
    },
    [app]
  );

  const updateSelectedTag = useCallback(
    (tagValue: string) => {
      dispatch({
        type: AppActions.UPDATE_SELECTED_TAG,
        payload: { ...app, selectedTag: tagValue },
      });
    },
    [app]
  );

  const clearTags = useCallback(() => {
    dispatch({
      type: AppActions.CLEAR_TAGS,
      payload: {
        ...app,
        tags: [],
      },
    });
  }, [app]);

  const clearCars = useCallback(() => {
    dispatch({
      type: AppActions.CLEAR_CARS,
      payload: {
        ...app,
        cars: null,
      },
    });
  }, [app]);

  return useMemo(
    () => ({
      tags: app.tags,
      cars: app.cars,
      selectedTag: app.selectedTag,
      isFetchingTags: app.isFetchingTags,
      isFetchingCars: app.isFetchingCars,
      fetchTags,
      fetchCars,
      updateSelectedTag,
      clearCars,
      clearTags,
    }),
    [
      app.cars,
      app.isFetchingCars,
      app.isFetchingTags,
      app.selectedTag,
      app.tags,
      clearCars,
      clearTags,
      fetchCars,
      fetchTags,
      updateSelectedTag,
    ]
  );
};
