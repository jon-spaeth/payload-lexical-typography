import { type LexicalEditor } from "@payloadcms/richtext-lexical/lexical";

import { useEffect, useState } from "react";

import { SizePicker } from "./TextSizePicker";

import { type TextSizeItem } from "../feature.client";

export const Dropdown = ({ editor, item }: { editor: LexicalEditor; item: TextSizeItem }) => {
  const [activeSize, setActiveSize] = useState<string>("");

  const onChange = (size: string) => {
    editor.dispatchCommand(item.command, { size });
    setActiveSize(size || "");
  };

  useEffect(() => {
    editor.read(() => {
      const current = item.current ? item.current() : null;
      if (current) setActiveSize(current);
    });
  }, [editor, item]);

  return (
    <SizePicker
      size={activeSize}
      onChange={onChange}
      hideAttribution={item.hideAttribution}
      method={item.method}
      scroll={item.scroll}
      sizes={item.sizes}
    />
  );
};
