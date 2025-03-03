import {
  IS_BOLD,
  IS_ITALIC,
  IS_STRIKETHROUGH,
  IS_UNDERLINE,
  IS_CODE,
  IS_SUBSCRIPT,
  IS_SUPERSCRIPT,
  type SerializedTextNode,
} from "@payloadcms/richtext-lexical/lexical";
import { type JSXConverters } from "@payloadcms/richtext-lexical/react";

export const TextJSXConverter: JSXConverters<SerializedTextNode> = {
  text: ({ node }: { node: SerializedTextNode }) => {
    const styles: React.CSSProperties = {};

    if (node.style) {
      let match = /(?:^|;)\s?color: ([^;]+)/.exec(node.style);
      if (match) styles.color = match[1];

      match = /(?:^|;)\s?font-size: ([^;]+)/.exec(node.style);
      if (match) styles.fontSize = match[1];
    }

    const formatters: Record<number, (element: React.ReactElement) => React.ReactElement> = {
      [IS_BOLD]: (el) => <strong style={styles}>{el}</strong>,
      [IS_ITALIC]: (el) => <em style={styles}>{el}</em>,
      [IS_STRIKETHROUGH]: (el) => <span style={{ textDecoration: "line-through", ...styles }}>{el}</span>,
      [IS_UNDERLINE]: (el) => <span style={{ textDecoration: "underline", ...styles }}>{el}</span>,
      [IS_CODE]: (el) => <code style={styles}>{el}</code>,
      [IS_SUBSCRIPT]: (el) => <sub style={styles}>{el}</sub>,
      [IS_SUPERSCRIPT]: (el) => <sup style={styles}>{el}</sup>,
    };

    let textElement = <span style={styles}>{node.text}</span>;

    Object.entries(formatters).forEach(([formatFlag, formatter]) => {
      if (node.format & Number(formatFlag)) {
        textElement = formatter(textElement);
      }
    });

    return textElement;
  },
};
