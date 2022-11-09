import type { GuildTextChannel } from '../structs/GuildTextChannel';
import type { GuildVoiceChannel } from '../structs/GuildVoiceChannel';

export type DiscordChannel = GuildTextChannel | GuildVoiceChannel;
