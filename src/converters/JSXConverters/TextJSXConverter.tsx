import { JSXConverters } from "@payloadcms/richtext-lexical/react";
import {
  IS_BOLD,
  IS_CODE,
  IS_ITALIC,
  IS_STRIKETHROUGH,
  IS_SUBSCRIPT,
  IS_SUPERSCRIPT,
  IS_UNDERLINE,
  SerializedTextNode,
} from "@payloadcms/richtext-lexical/lexical";
import { ReactNode } from "react";

export const TextJSXConverter: JSXConverters<SerializedTextNode> = {
  text: ({ node }: { node: SerializedTextNode }) => {
    const styles: React.CSSProperties = {};

    if (node.style) {
      const match = node.style.match(/(?:^|;)\s?color: ([^;]+)/);
      match && (styles.color = match[1]);
    }

    let textElement = <span style={styles}>{node.text}</span>;

    if (node.format & IS_BOLD) {
      textElement = <strong style={styles}>{textElement}</strong>;
    }

    if (node.format & IS_ITALIC) {
      textElement = <em style={styles}>{textElement}</em>;
    }

    if (node.format & IS_STRIKETHROUGH) {
      textElement = <span style={{ textDecoration: "line-through", ...styles }}>{textElement}</span>;
    }

    if (node.format & IS_UNDERLINE) {
      textElement = <span style={{ textDecoration: "underline", ...styles }}>{textElement}</span>;
    }

    if (node.format & IS_CODE) {
      textElement = <code style={styles}>{textElement}</code>;
    }

    if (node.format & IS_SUBSCRIPT) {
      textElement = <sub style={styles}>{textElement}</sub>;
    }

    if (node.format & IS_SUPERSCRIPT) {
      textElement = <sup style={styles}>{textElement}</sup>;
    }

    return textElement;
  },
};
