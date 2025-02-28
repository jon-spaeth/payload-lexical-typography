import { useState } from "react";

export const SizePicker = ({
  size,
  onChange,
  hideAttribution,
}: {
  size: string;
  onChange: (size: string) => void;
  hideAttribution?: boolean;
}) => {
  const [manualSize, setManualSize] = useState(true);

  console.log(size);

  console.log(onChange);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        maxWidth: "165px",
        width: "100%",
      }}
    >
      <div
        style={{
          width: "100%",
          padding: "8px",
          display: "flex",
          gap: "8px",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onChange("24px");
          }}
          className="btn btn--icon-style-without-border btn--size-small btn--withoutPopup btn--style-pill btn--withoutPopup"
          style={{
            margin: 0,
          }}
        >
          Size change {manualSize ? "picker" : "manual"}
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setManualSize((prev) => !prev);
          }}
          className="btn btn--icon-style-without-border btn--size-small btn--withoutPopup btn--style-pill btn--withoutPopup"
          style={{
            margin: 0,
          }}
        >
          Switch to {manualSize ? "picker" : "manual"}
        </button>
        {!hideAttribution && (
          <p
            style={{
              color: "var(--theme-elevation-650)",
              fontSize: "10px",
            }}
          >
            Made with ❤️ by{" "}
            <a target="_blank" href="https://github.com/AdrianMaj">
              @AdrianMaj
            </a>
          </p>
        )}
      </div>
    </div>
  );
};
