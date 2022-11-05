export interface TRequest {
	body: any;
	headers: { [key: string]: string | string[] | undefined };
	_request: any;
}
