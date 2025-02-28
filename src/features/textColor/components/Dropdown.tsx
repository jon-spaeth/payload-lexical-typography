import { type LexicalEditor } from "@payloadcms/richtext-lexical/lexical";

import { useEffect, useState } from "react";

import { ColorPicker } from "./ColorPicker";

import { type TextColorItem } from "../feature.client";

export const Dropdown = ({ editor, item }: { editor: LexicalEditor; item: TextColorItem }) => {
  const [activeColor, setActiveColor] = useState<string>("");

  const onChange = (color: string) => {
    editor.dispatchCommand(item.command, { color });
    setActiveColor(color || "");
  };

  useEffect(() => {
    editor.read(() => {
      const current = item.current ? item.current() : null;
      if (current) setActiveColor(current);
    });
  }, [editor, item]);

  return (
    <ColorPicker
      color={activeColor}
      onChange={onChange}
      colors={item.colors ?? []}
      hideAttribution={item.hideAttribution}
    />
  );
};
