import Uri from 'jsuri';

export type RequestParams = {
  endpoint: string;
  data?: any;
  query?: any;
  headers?: any;
  method?: string;
};

// Requests for the main app
export async function requestAPI<T>({
  endpoint,
  data = {},
  query = {},
  headers = {},
  method = 'GET',
}: RequestParams): Promise<T> {
  const hasDataArg = data && Object.keys(data).length;
  const hasQueryArg = query && Object.keys(query).length;

  if ((method === 'GET' || method === 'HEAD') && hasDataArg) {
    throw new Error(
      "GET and HEAD requests do not have data objects, only query params are allowed, please make sure you're using the correct method"
    );
  }

  const combinedHeaders = {
    'Content-type': 'application/json',
    Accept: 'application/json',
    ...headers,
  };

  const uri = new Uri('https://www.codecademy.com').setPath(`/${endpoint}`);

  if (hasQueryArg) {
    uri.setQuery(query);
  }

  const response = await fetch(uri.toString(), {
    body: hasDataArg ? JSON.stringify(data) : undefined,
    headers: combinedHeaders,
    method: method.toUpperCase(),
    credentials: 'same-origin',
  });

  return response.json();
}
