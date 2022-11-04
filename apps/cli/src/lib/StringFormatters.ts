const createAppSettingsURL = (appId: string) =>
  `https://discord.com/developers/applications/${appId}/information`;

const createInteractionsURI = (url: string) => `${url}/interactions`;

export const StringFormatters = { createAppSettingsURL, createInteractionsURI };

export const F = StringFormatters;
