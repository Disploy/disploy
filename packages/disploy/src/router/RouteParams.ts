import type { App } from '../client';
import type { User } from '../structs';

export class RouteParams {
	private params: Record<string, string> = {};

	public constructor(private app: App | null, template: string, data: string) {
		const templateParts = template.split('-');
		const dataParts = data.split('-');

		for (let i = 0; i < templateParts.length; i++) {
			const templatePart = templateParts[i];
			const dataPart = dataParts[i];

			if (templatePart?.startsWith(':')) {
				dataPart && (this.params[templatePart.slice(1)] = dataPart);
			}
		}
	}

	/**
	 * Get a parameter from the route.
	 * @param name The name of the parameter
	 * @returns A string representation of the parameter
	 */
	public getParam(name: string): string {
		const param = this.params[name];

		if (!param) {
			throw new Error(`Param ${name} not found`);
		}

		return param;
	}

	/**
	 * Get a user from the route parameters.
	 * @param name The name of the parameter
	 * @returns A User structure if the parameter is a valid user ID
	 * @throws If the User cannot be found or the parameter is not a valid user ID
	 */
	public async getUserParam(name: string): Promise<User> {
		if (!this.app) {
			throw new Error('Cannot get user param without an app');
		}

		const id = this.getParam(name);

		return this.app.users.fetch(id);
	}

	/**
	 * Match a template against a data string.
	 * @param template The template to match against
	 * @param data The data to match
	 * @returns Whether the data matches the template
	 * @example 'ping-:id' vs 'ping-123' => true
	 * 'ping-:id' vs 'ping-123-456' => false
	 */
	public static matchTemplate(template: string, data: string): boolean {
		// Split the template and data into parts (parts are separated by a hyphen)
		const templateParts = template.split('-');
		const dataParts = data.split('-');

		// If the template and data have different lengths, they can't match
		if (templateParts.length !== dataParts.length) {
			return false;
		}

		// Loop over the template placeholders and delete them from the templateParts array and dataParts array
		// If the template and data have different lengths, they can't match
		for (let i = 0; i < templateParts.length; i++) {
			if (templateParts[i]?.startsWith(':')) {
				templateParts.splice(i, 1);
				dataParts.splice(i, 1);
			}
		}

		// We're left with only the non-placeholder parts, we can compare them
		// If they're not equal, the template and data can't match
		if (templateParts.join('-') !== dataParts.join('-')) {
			return false;
		}

		// If we've made it this far, the template and data match
		return true;
	}
}
