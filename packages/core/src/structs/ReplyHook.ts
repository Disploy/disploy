import type { APIInteractionResponse } from "discord-api-types/v10";

export type ReplyHook = (data: APIInteractionResponse) => void;
