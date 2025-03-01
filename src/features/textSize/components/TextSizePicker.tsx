import { useState, useEffect } from "react";

export const SizePicker = ({
  size,
  onChange,
  hideAttribution,
  sizeOptions,
  method = "replace",
}: {
  size: string;
  onChange: (size: string) => void;
  hideAttribution?: boolean;
  sizeOptions?: { value: string; label: string }[];
  method?: "replace" | "combine";
}) => {
  const defaultSizeOptions = [
    { value: "0.875rem", label: "Small" },
    { value: "1.25rem", label: "Normal" },
    { value: "1.875rem", label: "Large" },
    { value: "3rem", label: "Huge" },
  ];

  const options =
    method === "replace"
      ? (sizeOptions ?? defaultSizeOptions)
      : [...defaultSizeOptions, ...(sizeOptions ?? [])];

  const units = ["px", "rem", "em", "vh", "vw", "%"];

  const [selectedValue, setSelectedValue] = useState(size || "1.25rem");

  const [isCustomMode, setIsCustomMode] = useState(false);

  const [customNumberValue, setCustomNumberValue] = useState("");
  const [customUnit, setCustomUnit] = useState("px");

  const parseSizeValue = (sizeVal: string) => {
    const numericPart = parseFloat(sizeVal.replace(/[^0-9.]/g, ""));
    const unitPart = sizeVal.replace(/[0-9.]/g, "");
    return {
      number: isNaN(numericPart) ? "" : numericPart.toString(),
      unit: units.includes(unitPart) ? unitPart : "px",
    };
  };

  useEffect(() => {
    if (!size) {
      setSelectedValue("1.25rem");
      setIsCustomMode(false);
      const { number, unit } = parseSizeValue("1.25rem");
      setCustomNumberValue(number);
      setCustomUnit(unit);
      return;
    }

    setSelectedValue(size);
    const { number, unit } = parseSizeValue(size);
    setCustomNumberValue(number);
    setCustomUnit(unit);

    const matchingOption = options.find((option) => option.value === size);
    setIsCustomMode(!matchingOption);
  }, [size, options]);

  const handleSizeSelect = (value: string) => {
    setSelectedValue(value);
    onChange(value);
    setIsCustomMode(false);

    const { number, unit } = parseSizeValue(value);
    setCustomNumberValue(number);
    setCustomUnit(unit);
  };

  const handleCustomNumberChange = (numValue: string) => {
    setCustomNumberValue(numValue);
    const newValue = `${numValue}${customUnit}`;
    setSelectedValue(newValue);
    onChange(newValue);
    setIsCustomMode(true);
  };

  const handleCustomUnitChange = (unitValue: string) => {
    setCustomUnit(unitValue);
    const newValue = `${customNumberValue}${unitValue}`;
    setSelectedValue(newValue);
    onChange(newValue);
    setIsCustomMode(true);
  };

  return (
    <div
      style={{
        padding: "8px",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "12px",
          maxHeight: "120px",
          overflowY: options.length > 4 ? "auto" : "visible",
        }}
      >
        {options.map((option) => (
          <button
            key={option.value}
            className="btn btn--icon-style-without-border btn--size-small btn--withoutPopup btn--style-pill btn--withoutPopup"
            style={{
              cursor: "pointer",
              margin: "0",
              border:
                selectedValue === option.value && !isCustomMode
                  ? "1px solid var(--theme-elevation-900)"
                  : "1px solid transparent",
            }}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleSizeSelect(option.value);
            }}
          >
            {option.label}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ marginRight: "8px" }}>Custom: </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "140px",
          }}
        >
          <div className="field-type number" style={{ flex: 1 }}>
            <input
              style={{
                width: "100%",
                margin: "8px 0",
                borderRight: "0",
                height: "25px",
                borderTopRightRadius: "0",
                borderBottomRightRadius: "0",
                paddingTop: "0",
                paddingBottom: "1px",
                paddingLeft: "4px",
                paddingRight: "4px",
              }}
              type="number"
              min={1}
              max={999}
              value={customNumberValue}
              onChange={(e) => {
                e.stopPropagation();
                handleCustomNumberChange(e.target.value);
              }}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          <select
            value={customUnit}
            onChange={(e) => {
              e.stopPropagation();
              handleCustomUnitChange(e.target.value);
            }}
            onClick={(e) => e.stopPropagation()}
            style={{
              paddingLeft: "4px",
              paddingRight: "4px",
              width: "50px",
              boxShadow: "0 2px 2px -1px #0000001a",
              fontFamily: "var(--font-body)",
              border: "1px solid var(--theme-elevation-150)",
              borderRadius: "var(--style-radius-s)",
              background: "var(--theme-input-bg)",
              color: "var(--theme-elevation-800)",
              fontSize: "1rem",
              height: "25px",
              lineHeight: "20px",
              transitionProperty: "border, box-shadow, background-color",
              transitionDuration: ".1s, .1s, .5s",
              transitionTimingFunction: "cubic-bezier(0,.2,.2,1)",
              borderLeft: "0",
              borderTopLeftRadius: "0",
              borderBottomLeftRadius: "0",
            }}
          >
            {units.map((unit) => (
              <option key={unit} value={unit}>
                {unit}
              </option>
            ))}
          </select>
        </div>
      </div>
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleSizeSelect("1.25rem");
        }}
        className="btn btn--icon-style-without-border btn--size-small btn--withoutPopup btn--style-pill btn--withoutPopup"
        style={{ marginLeft: "auto", margin: "0", cursor: "pointer" }}
      >
        Reset
      </button>

      {!hideAttribution && (
        <p
          style={{
            color: "var(--theme-elevation-650)",
            fontSize: "10px",
            textAlign: "center",
          }}
        >
          Made with ❤️ by{" "}
          <a target="_blank" href="https://github.com/AdrianMaj">
            @AdrianMaj
          </a>
        </p>
      )}
    </div>
  );
};
