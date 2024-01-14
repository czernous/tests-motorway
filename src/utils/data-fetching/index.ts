interface ApiResponse<TData> {
  ok: boolean;
  data: TData | null;
  error: string | null;
}

interface FetchParams {
  endpoint: string;
  query: string[];
}

export const fetchData = async <TData>({ ...params }: FetchParams): Promise<ApiResponse<TData>> => {
  try {
    const r = await fetch(`http://0.0.0.0:8000/api/${params.endpoint}?${params.query.join('&')}`);

    const json: TData = await r.json();

    return {
      ok: r.ok,
      data: json,
      error: !r.ok ? 'Status ' + r.status + ': ' + (json as Error)?.message : null,
    };
  } catch (e) {
    console.warn(e);
    return {
      ok: false,
      data: null,
      error: (e as Error).message,
    };
  }
};
