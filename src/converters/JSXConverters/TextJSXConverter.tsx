import { NodeFormat } from "@payloadcms/richtext-lexical/client";
import { type SerializedTextNode } from "@payloadcms/richtext-lexical/lexical";
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
      [NodeFormat.IS_BOLD]: (el) => <strong style={styles}>{el}</strong>,
      [NodeFormat.IS_ITALIC]: (el) => <em style={styles}>{el}</em>,
      [NodeFormat.IS_STRIKETHROUGH]: (el) => (
        <span style={{ textDecoration: "line-through", ...styles }}>{el}</span>
      ),
      [NodeFormat.IS_UNDERLINE]: (el) => <span style={{ textDecoration: "underline", ...styles }}>{el}</span>,
      [NodeFormat.IS_CODE]: (el) => <code style={styles}>{el}</code>,
      [NodeFormat.IS_SUBSCRIPT]: (el) => <sub style={styles}>{el}</sub>,
      [NodeFormat.IS_SUPERSCRIPT]: (el) => <sup style={styles}>{el}</sup>,
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
