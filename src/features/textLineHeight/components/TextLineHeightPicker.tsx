import React, { type KeyboardEvent, useCallback, useEffect, useRef, useState } from "react";

import type { TextLineHeightItem } from "../feature.client";

export const TextLineHeightPicker: React.FC<{
  onChange: (lineHeight: string) => void;
  currentValue: string | null;
  item: TextLineHeightItem;
}> = ({ onChange, currentValue, item }) => {
  const [customLineHeight, setCustomLineHeight] = useState(currentValue ?? "");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setCustomLineHeight(currentValue ?? "");
  }, [currentValue]);

  const handleLineHeightSelect = useCallback(
    (lineHeight: string) => {
      onChange(lineHeight);
    },
    [onChange],
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleLineHeightSelect(customLineHeight);
      }
    },
    [customLineHeight, handleLineHeightSelect],
  );

  const defaultLineHeights = [
    { value: "1", label: "1" },
    { value: "1.15", label: "1.15" },
    { value: "1.5", label: "1.5" },
    { value: "2", label: "2" },
    { value: "2.5", label: "2.5" },
  ];

  const lineHeights = item.lineHeights ?? defaultLineHeights;

  return (
    <div className="typography-line-height-palette">
      <div
        className="typography-line-height-options"
        style={{
          display: "flex",
          flexDirection: "column",
          maxHeight: "300px",
          overflow: item.scroll ? "auto" : "visible",
        }}
      >
        {lineHeights.map((lineHeight) => (
          <button
            key={lineHeight.value}
            type="button"
            className={`typography-line-height-option ${
              currentValue === lineHeight.value ? "typography-line-height-option--active" : ""
            }`}
            style={{
              padding: "8px 12px",
              textAlign: "left",
              cursor: "pointer",
              border: "none",
              background: "none",
              width: "100%",
            }}
            onClick={() => handleLineHeightSelect(lineHeight.value)}
          >
            {lineHeight.label}
          </button>
        ))}
      </div>
      {item.customLineHeight && (
        <div style={{ padding: "8px", borderTop: "1px solid #e0e0e0" }}>
          <input
            ref={inputRef}
            type="text"
            value={customLineHeight}
            onChange={(e) => setCustomLineHeight(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Custom line height"
            style={{ width: "100%", padding: "4px" }}
          />
          <button
            type="button"
            onClick={() => handleLineHeightSelect(customLineHeight)}
            style={{
              marginTop: "4px",
              padding: "4px 8px",
              width: "100%",
              cursor: "pointer",
            }}
          >
            Apply
          </button>
        </div>
      )}
    </div>
  );
};
