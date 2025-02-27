import type { SerializedTextNode } from "@payloadcms/richtext-lexical/lexical";
import escapeHTML from "escape-html";
import { HTMLConverter } from "@payloadcms/richtext-lexical";
import {
  IS_BOLD,
  IS_CODE,
  IS_ITALIC,
  IS_STRIKETHROUGH,
  IS_SUBSCRIPT,
  IS_SUPERSCRIPT,
  IS_UNDERLINE,
} from "@payloadcms/richtext-lexical/lexical";

export const TextHTMLConverter: HTMLConverter<SerializedTextNode> = {
  converter({ node }) {
    let styles = "";

    if (node.style) {
      const match = node.style.match(/(?:^|;)\s?color: ([^;]+)/);
      if (match) {
        styles = `color: ${match[1]}`;
      }
    }

    const styleAttr = styles ? ` style="${styles}"` : "";

    let html = escapeHTML(node.text);
    if (!html) {
      return "";
    }

    html = styles ? `<span${styleAttr}>${html}</span>` : html;

    if (node.format & IS_BOLD) {
      html = `<strong${styleAttr}>${html}</strong>`;
    }

    if (node.format & IS_ITALIC) {
      html = `<em${styleAttr}>${html}</em>`;
    }

    if (node.format & IS_STRIKETHROUGH) {
      const strikeStyles = styles
        ? `text-decoration: line-through; ${styles}`
        : "text-decoration: line-through";
      html = `<span style="${strikeStyles}">${html}</span>`;
    }

    if (node.format & IS_UNDERLINE) {
      const underlineStyles = styles ? `text-decoration: underline; ${styles}` : "text-decoration: underline";
      html = `<span style="${underlineStyles}">${html}</span>`;
    }

    if (node.format & IS_CODE) {
      html = `<code${styleAttr}>${html}</code>`;
    }

    if (node.format & IS_SUBSCRIPT) {
      html = `<sub${styleAttr}>${html}</sub>`;
    }

    if (node.format & IS_SUPERSCRIPT) {
      html = `<sup${styleAttr}>${html}</sup>`;
    }

    return html;
  },
  nodeTypes: ["text"],
};
