"use client";

import { createClientFeature } from "@payloadcms/richtext-lexical/client";
import { COMMAND_PRIORITY_CRITICAL, BaseSelection } from "@payloadcms/richtext-lexical/lexical";
import {
  $getSelectionStyleValueForProperty,
  $patchStyleText,
} from "@payloadcms/richtext-lexical/lexical/selection";
import { useLexicalComposerContext } from "@payloadcms/richtext-lexical/lexical/react/LexicalComposerContext";
import { useEffect } from "react";
import { getSelection } from "../../../utils/getSelection";
import { TEXT_COLOR_COMMAND } from "./command";
import { TextColorIcon } from "./components/TextColorIcon";
import { ToolbarGroup, ToolbarGroupItem } from "@payloadcms/richtext-lexical";
import { Dropdown } from "./components/Dropdown";

export type TextColorFeatureProps = {
  colors: string[];
};

type TextColorItem = ToolbarGroupItem & {
  command: Record<string, any>;
  current: () => string | null;
  colors?: string[];
};

type TextColorGroup = ToolbarGroup & {
  items: TextColorItem[];
};

export const TextColorClientFeature = createClientFeature<TextColorFeatureProps>(({ props }) => {
  console.log(props.colors);
  const colors =
    props?.colors.length > 0 ? props.colors : ["#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF"];

  console.log(colors);
  return {
    plugins: [
      {
        Component: () => {
          const [editor] = useLexicalComposerContext();

          useEffect(() => {
            return editor.registerCommand(
              TEXT_COLOR_COMMAND,
              (payload) => {
                editor.update(() => {
                  const selection = getSelection();
                  if (selection) {
                    $patchStyleText(selection, { color: payload.color || "" });
                  }
                });
                return true;
              },
              COMMAND_PRIORITY_CRITICAL,
            );
          }, [editor]);

          return null;
        },
        position: "normal",
      },
    ],
    toolbarFixed: {
      groups: [
        {
          type: "dropdown",
          ChildComponent: TextColorIcon,
          isEnabled({ selection }: { selection: BaseSelection }) {
            return !!getSelection(selection);
          },
          items: [
            {
              Component: Dropdown,
              colors,
              key: "textColor",
              command: TEXT_COLOR_COMMAND,
              current() {
                const selection = getSelection();
                return selection ? $getSelectionStyleValueForProperty(selection, "color", "") : null;
              },
            },
          ],
          key: "textColorDropdown",
          order: 60,
        },
      ],
    },
    toolbarInline: {
      groups: [
        {
          type: "dropdown",
          ChildComponent: TextColorIcon,
          isEnabled({ selection }: { selection: BaseSelection }) {
            return !!getSelection(selection);
          },
          items: [
            {
              Component: Dropdown,
              colors,
              key: "textColor",
              command: TEXT_COLOR_COMMAND,
              current() {
                const selection = getSelection();
                return selection ? $getSelectionStyleValueForProperty(selection, "color", "") : null;
              },
            },
          ],
          key: "textColorDropdown",
          order: 60,
        },
      ],
    },
  };
});
