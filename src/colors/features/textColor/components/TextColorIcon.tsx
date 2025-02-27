import { COMMAND_PRIORITY_CRITICAL, SELECTION_CHANGE_COMMAND } from "@payloadcms/richtext-lexical/lexical";
import {
  $getSelectionStyleValueForProperty,
  $patchStyleText,
} from "@payloadcms/richtext-lexical/lexical/selection";
import { useLexicalComposerContext } from "@payloadcms/richtext-lexical/lexical/react/LexicalComposerContext";
import { useEffect, useState } from "react";
import { getSelection } from "../../../../utils/getSelection";
import { TEXT_COLOR_COMMAND } from "../command";

export const TextColorIcon = () => {
  const [color, setColor] = useState<string>("");
  const [editor] = useLexicalComposerContext();

  const updateCurrentColor = () => {
    const selection = getSelection();
    selection && setColor($getSelectionStyleValueForProperty(selection, "color", ""));
    return false;
  };

  useEffect(() => {
    return editor.registerCommand(
      TEXT_COLOR_COMMAND,
      (payload) => {
        setColor(payload.color);
        editor.update(() => {
          const selection = getSelection();
          selection && $patchStyleText(selection, { color: payload.color || "" });
        });
        return false;
      },
      COMMAND_PRIORITY_CRITICAL,
    );
  }, [editor]);

  useEffect(() => {
    setTimeout(() => {
      return editor.read(updateCurrentColor);
    });
    return editor.registerCommand(SELECTION_CHANGE_COMMAND, updateCurrentColor, COMMAND_PRIORITY_CRITICAL);
  }, [editor]);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 20h16" style={{ color }} />
      <path d="m6 16 6-12 6 12" />
      <path d="M8 12h8" />
    </svg>
  );
};
