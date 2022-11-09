/**
 * Throw this error to indicate that it was the requestor's fault.
 */
export class RequestorError extends Error {
	public status: number = 400;

	public constructor(message: string, status: number = 400) {
		super(message);

		this.status = status;
	}
}
