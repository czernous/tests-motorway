import React, { useContext } from 'react';

import { AppContext, IAppContext } from '../../app-state/app-state.base';
import {
  TextField,
  Autocomplete,
  AutocompleteInputChangeReason,
  InputAdornment,
  CircularProgress,
  Paper,
} from '@mui/material';
import { TypeaheadStyles, TypeaheadDropdownStyles } from './typeahead.styles';
import SearchIcon from '@mui/icons-material/Search';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';

const onOptionSelect = async (ctx: IAppContext, value: string) => {
  ctx.updateSelectedTag(value);

  typeof value === 'string' && (await ctx.fetchCars(`tag=${value.replace(' ', '%20')}`));
};

const handleInputChange = async (value: string, reason: AutocompleteInputChangeReason, ctx: IAppContext) => {
  if (reason === 'clear') {
    ctx.clearTags();
    return;
  }
  await ctx.fetchTags(`tag=${value}`);
};
// Please refer to task 1. Realtime search of readme.md
const Typeahead: React.FC = () => {
  const ctx = useContext(AppContext);

  return (
    <Autocomplete
      sx={TypeaheadStyles}
      id="free-solo-demo"
      freeSolo
      autoComplete
      loading={ctx.isFetchingTags}
      value={ctx.selectedTag}
      onInputChange={async (_, value, reason) => handleInputChange(value, reason, ctx)}
      onChange={(_, value) => onOptionSelect(ctx, value)}
      options={ctx.tags}
      getOptionLabel={(option) => option}
      renderInput={(params) => (
        <TextField
          {...params}
          InputProps={{
            ...params.InputProps,
            placeholder: 'Search for vehicles',
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <React.Fragment>
                {ctx.isFetchingTags ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
      renderOption={(props, option, { inputValue }) => {
        const matches = match(option, inputValue, { insideWords: true });
        const parts = parse(option, matches);

        return (
          <li {...props}>
            <div>
              {parts.map((part, index) => (
                <span
                  key={index}
                  style={{
                    fontWeight: part.highlight ? 700 : 400,
                  }}
                >
                  {part.text}
                </span>
              ))}
            </div>
          </li>
        );
      }}
      PaperComponent={(props) => <Paper sx={TypeaheadDropdownStyles} {...props} />}
    />
  );
};

export default Typeahead;
