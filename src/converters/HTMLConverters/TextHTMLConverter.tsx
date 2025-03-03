import { type HTMLConverter } from "@payloadcms/richtext-lexical";
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

import escapeHTML from "escape-html";

export const TextHTMLConverter: HTMLConverter<SerializedTextNode> = {
  converter({ node }) {
    let styles = "";

    if (node.style) {
      let match = /(?:^|;)\s?color: ([^;]+)/.exec(node.style);
      if (match) {
        styles = `${styles} color: ${match[1]};`;
      }

      match = /(?:^|;)\s?font-size: ([^;]+)/.exec(node.style);
      if (match) {
        styles = `${styles} font-size: ${match[1]};`;
      }
    }

    const styleAttr = styles ? ` style="${styles}"` : "";

    let html = escapeHTML(node.text);
    if (!html) {
      return "";
    }

    const formatters: Record<number, (content: string, styleAttribute: string) => string> = {
      [IS_BOLD]: (content, attr) => `<strong${attr}>${content}</strong>`,
      [IS_ITALIC]: (content, attr) => `<em${attr}>${content}</em>`,
      [IS_STRIKETHROUGH]: (content) => {
        const strikeStyles = styles
          ? `text-decoration: line-through; ${styles}`
          : "text-decoration: line-through";
        return `<span style="${strikeStyles}">${content}</span>`;
      },
      [IS_UNDERLINE]: (content) => {
        const underlineStyles = styles
          ? `text-decoration: underline; ${styles}`
          : "text-decoration: underline";
        return `<span style="${underlineStyles}">${content}</span>`;
      },
      [IS_CODE]: (content, attr) => `<code${attr}>${content}</code>`,
      [IS_SUBSCRIPT]: (content, attr) => `<sub${attr}>${content}</sub>`,
      [IS_SUPERSCRIPT]: (content, attr) => `<sup${attr}>${content}</sup>`,
    };

    html = styles ? `<span${styleAttr}>${html}</span>` : html;

    Object.entries(formatters).forEach(([formatFlag, formatter]) => {
      if (node.format & Number(formatFlag)) {
        html = formatter(html, styleAttr);
      }
    });

    return html;
  },
  nodeTypes: ["text"],
};
