import { useState } from 'react';

export interface AsyncCallback {
  (...args: any): Promise<any>;
}

export interface Callback {
  (...args: any): void;
}

interface useFetchingProps {
  fetch: AsyncCallback;
  afterFetch?: Callback | AsyncCallback;
  redirect?: boolean;
}

export default function useFetching({
  fetch,
  afterFetch = () => {},
  redirect = false,
}: useFetchingProps) {
  const [loading, setLoading] = useState<boolean | undefined>(undefined);
  const [error, setError] = useState<any | null>(null);

  async function fetching(...fetchArgs: any[]) {
    let result: any;
    let error = null;
    try {
      setLoading(true);
      result = await fetch(...fetchArgs);
      setError(null);
    } catch (e: any) {
      // console.error((e as AxiosError).response);
      error = e;
    } finally {
      if (!error) {
        afterFetch(result, ...fetchArgs);
        if (!redirect) setLoading(false);
      } else {
        setError(error.response);
        setLoading(false);
      }
    }
  }

  return [fetching, loading, error] as const;
}
