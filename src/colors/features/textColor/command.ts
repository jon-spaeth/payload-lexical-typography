import { createCommand } from "@payloadcms/richtext-lexical/lexical";

export const TEXT_COLOR_COMMAND = createCommand<{ color: string }>("TEXT_COLOR_COMMAND");
