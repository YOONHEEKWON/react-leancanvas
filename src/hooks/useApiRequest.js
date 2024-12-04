import { useCallback, useState } from 'react';

export default function useApiRequest(apiFuncion) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  //options: {onSucces, onError}
  const execute = useCallback(
    async (params, { onSuccess, onError }) => {
      try {
        setIsLoading(true);
        setError(null);
        await new Promise(resolver => setTimeout(resolver, 1000));
        const response = await apiFuncion(params);
        if (onSuccess) {
          onSuccess(response);
        }
      } catch (err) {
        setError(err);
        if (onError) {
          onError(err);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [apiFuncion],
  );
  return {
    isLoading,
    error,
    execute,
  };
}
