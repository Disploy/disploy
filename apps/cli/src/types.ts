import type { App, Command } from '@disploy/framework';

export interface DisployStandaloneBundle {
	app: App;
	commands: Command[];
}

export interface GitHubReleaseAsset {
    url: string;
    id: number;
    node_id: string;
    name: string;
    label: string;
    uploader: Uploader;
    content_type: string;
    state: string;
    size: number;
    download_count: number;
    created_at: string;
    updated_at: string;
    browser_download_url: string;
}
export interface Uploader {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
}

export interface StarterSchema {
    type: string;
    repo: string;
    base: string;
    starters: Starter[]
}

export interface Starter {
    name: string;
    description: string;
    base: string;
    extras: Extra[];
}

export interface Extra {
    name: string;
    description: string;
    localization: string;
}