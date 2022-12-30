import type { APIAttachment, Snowflake } from 'discord-api-types/v10';
import type { App } from '../client';
import { Base } from './Base';

export class Attachment extends Base {
	/**
	 * Attachment id
	 */
	public id: Snowflake;

	/**
	 * Name of file attached
	 */
	public fileName: string;

	/**
	 * Description for the file
	 */
	public description?: string;

	/**
	 * The attachment's media type
	 *
	 * See https://en.wikipedia.org/wiki/Media_type
	 */
	public contentType?: string;

	/**
	 * Size of file in bytes
	 */
	public size: number;

	/**
	 * Source url of file
	 */
	public url: string;

	/**
	 * A proxied url of file
	 */
	public proxyUrl: string;

	/**
	 * Height of file (if image)
	 */
	public height?: number | null;

	/**
	 * Width of file (if image)
	 */
	public width?: number | null;

	/**
	 * Whether this attachment is ephemeral
	 */
	public ephemeral?: boolean;

	public constructor(app: App, raw: APIAttachment) {
		super(app);
		this.id = raw.id;
		this.fileName = raw.filename;
		this.description = raw.description;
		this.contentType = raw.content_type;
		this.size = raw.size;
		this.url = raw.url;
		this.proxyUrl = raw.proxy_url;
		this.height = raw.height;
		this.width = raw.width;
		this.ephemeral = raw.ephemeral;
	}
}
