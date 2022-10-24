import { injectable } from 'inversify';

interface ResolverOptions<Payload = undefined> {
	url: string;
	method: 'GET' | 'POST' | 'PUT' | 'DELETE';
	payload?: Payload;
	headers?: HeadersInit;
	abortSignal?: AbortSignal;
}

interface MethodOptions<Payload = undefined> extends Omit<ResolverOptions<Payload>, 'method'> {}

@injectable()
export class HttpService {
	/**
	 * ### The HTTP service get method
	 * @param options The resolver options
	 */
	async get<Response>(options: MethodOptions): Promise<Response> {
		return (await this.resolve<Response>({ ...options, method: 'GET' })) as Response;
	}

	/**
	 * ### The HTTP service post method
	 * @param options The resolver options
	 */
	async post<Payload, Response>(options: MethodOptions<Payload>): Promise<Response> {
		return (await this.resolve<Payload, Response>({ ...options, method: 'POST' })) as Response;
	}

	/**
	 * ### The HTTP service put method
	 * @param options The resolver options
	 */
	async put<Payload, Response>(options: MethodOptions<Payload>): Promise<Response> {
		return (await this.resolve<Payload, Response>({ ...options, method: 'PUT' })) as Response;
	}

	/**
	 * ### The HTTP service delete method
	 * @param options The resolver options
	 */
	async delete<Payload, Response>(options: MethodOptions<Payload>): Promise<Response> {
		return (await this.resolve<Payload, Response>({ ...options, method: 'DELETE' })) as Response;
	}

	/**
	 * ### The fetch resolver
	 * @param options The resolver options
	 */
	private async resolve<Payload, Response = undefined>(options: ResolverOptions<Payload>): Promise<Response | string | void> {
		try {
			const response = await fetch(options.url, {
				method: options.method,
				signal: options.abortSignal,
				body: options.payload ? JSON.stringify(options.payload) : undefined,
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json; charset=UTF-8',
					...options.headers
				}
			});

			if (response.status >= 200 && response.status < 300) {
				const contentType = response.headers.get('content-type');

				switch (true) {
					case contentType?.includes('application/text'):
						return await response.text();
					case contentType?.includes('application/json'):
						return await response.json();
					default:
						return {} as Response;
				}
			} else {
				throw new Error(`${response.status}: ${response.statusText}`);
			}
		} catch (error: any) {
			throw new Error(error);
		}
	}
}
