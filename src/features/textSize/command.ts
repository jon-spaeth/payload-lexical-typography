import { createCommand } from "@payloadcms/richtext-lexical/lexical";

export const TEXT_SIZE_COMMAND = createCommand<{ size: string }>("TEXT_SIZE_COMMAND");
