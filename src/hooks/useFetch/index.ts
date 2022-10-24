import { useEffect, useRef, useState } from 'react';

interface Payload<TData> {
	data: TData | null;
	loading: boolean;
	error?: Error;
}

/**
 * A hook to handle requests
 * @param url The request URL
 * @param options The request options
 */
export function useFetch<TData>(url?: string, options?: RequestInit): Payload<TData> {
	const cache = useRef<{ [url: string]: TData }>({});
	const [data, setData] = useState<Payload<TData>>({ data: null, loading: true });

	useEffect(() => {
		if (!url) return;

		const abortController = new AbortController();

		(async () => {
			setData(prev => ({ ...prev, error: undefined }));

			if (cache.current[url]) {
				setData({ data: cache.current[url], loading: false, error: undefined });
				return;
			}

			try {
				const response = await fetch(url, { ...options, signal: abortController.signal });

				if (!response.ok) {
					throw new Error(response.statusText);
				}

				const data = (await response.json()) as TData;
				cache.current[url] = data;
				setData({ data, loading: false, error: undefined });
			} catch (error) {
				setData({ data: null, loading: false, error: error as Error });
			}
		})();

		return () => {
			abortController.abort();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [url]);

	return data;
}
