import React, { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { TextLineHeightPicker } from "./TextLineHeightPicker";

import { TEXT_LINE_HEIGHT_COMMAND } from "../command";

import type { TextLineHeightItem } from "../feature.client";
import type { LexicalEditor } from "@payloadcms/richtext-lexical/lexical";

export const Dropdown = ({ editor, item }: { editor: LexicalEditor; item: TextLineHeightItem }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [anchorElem, setAnchorElem] = useState<HTMLDivElement | null>(null);
  const [dropdownPosition, setDropdownPosition] = useState<{
    top?: string;
    left?: string;
    bottom?: string;
    right?: string;
  }>({
    bottom: "0",
    right: "0",
  });

  const [currentLineHeight, setCurrentLineHeight] = useState<string | null>(null);

  const addPortal = useCallback(() => {
    const editorRoot = editor.getRootElement();
    if (!editorRoot) return;

    const anchorElem = document.createElement("div");
    setAnchorElem(anchorElem);
    anchorElem.style.position = "absolute";
    const ref = editorRoot.getBoundingClientRect();

    anchorElem.style.top = `${ref.top}px`;
    anchorElem.style.left = `${ref.left}px`;

    document.body.append(anchorElem);
  }, [editor]);

  const updateDropdownPosition = useCallback((dropdown: HTMLElement) => {
    const rect = dropdown.getBoundingClientRect();
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    const isOverflowRight = rect.right > windowWidth;
    const isOverflowBottom = rect.bottom > windowHeight;

    if (isOverflowRight && isOverflowBottom) {
      setDropdownPosition({
        bottom: "100%",
        right: "0",
      });
    } else if (isOverflowRight) {
      setDropdownPosition({
        top: "0",
        right: "100%",
      });
    } else if (isOverflowBottom) {
      setDropdownPosition({
        bottom: "100%",
        left: "0",
      });
    } else {
      setDropdownPosition({
        top: "100%",
        left: "0",
      });
    }
  }, []);

  const updateLineHeight = useCallback(
    (lineHeight: string) => {
      editor.dispatchCommand(TEXT_LINE_HEIGHT_COMMAND, { lineHeight });
      setShowDropdown(false);
    },
    [editor],
  );

  useEffect(() => {
    addPortal();
    const interval = setInterval(() => {
      setCurrentLineHeight(item.current());
    }, 100);

    return () => {
      if (anchorElem) {
        anchorElem.remove();
      }
      clearInterval(interval);
    };
  }, [addPortal, anchorElem, item, item.current, editor]);

  useEffect(() => {
    const onDocumentClick = () => {
      if (showDropdown) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("click", onDocumentClick);

    return () => {
      document.removeEventListener("click", onDocumentClick);
    };
  }, [showDropdown]);

  const dropdownRef = useCallback(
    (node: HTMLElement | null) => {
      if (node) {
        updateDropdownPosition(node);
      }
    },
    [updateDropdownPosition],
  );

  return (
    <div
      style={{
        position: "relative",
      }}
    >
      <button
        type="button"
        className="typography-line-height-button"
        style={{
          padding: "8px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "4px",
        }}
        onClick={(e) => {
          e.stopPropagation();
          setShowDropdown(!showDropdown);
        }}
      >
        <span className="line-height">Line height</span>
        {!item.hideAttribution && currentLineHeight && (
          <span className="typography-line-height-value">{currentLineHeight}</span>
        )}
      </button>
      {showDropdown &&
        anchorElem &&
        createPortal(
          <div
            className="typography-line-height-dropdown"
            ref={dropdownRef}
            style={{
              position: "absolute",
              zIndex: 10,
              backgroundColor: "white",
              border: "1px solid #ccc",
              borderRadius: "4px",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
              width: "200px",
              ...dropdownPosition,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <TextLineHeightPicker onChange={updateLineHeight} currentValue={currentLineHeight} item={item} />
          </div>,
          anchorElem,
        )}
    </div>
  );
};
