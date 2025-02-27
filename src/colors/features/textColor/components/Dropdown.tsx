import { LexicalEditor } from "@payloadcms/richtext-lexical/lexical";

import { useEffect, useState } from "react";

import { ColorPicker } from "./ColorPicker";

export const Dropdown = ({ editor, item }: { editor: LexicalEditor; item: any }) => {
  const [activeColor, setActiveColor] = useState<string>("");

  const onChange = (color: string) => {
    editor.dispatchCommand(item.command, { color });
    setActiveColor(color || "");
  };

  useEffect(() => {
    editor.read(() => {
      const current = item.current ? item.current() : null;
      current && setActiveColor(current);
    });
  }, [editor, item]);

  return <ColorPicker color={activeColor} onChange={onChange} colors={item.colors || []} />;
};
