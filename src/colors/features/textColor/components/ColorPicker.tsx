export const ColorPicker = ({
  color,
  onChange,
  colors,
}: {
  color: string;
  onChange: (color: string) => void;
  colors: string[];
}) => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(5, 1fr)",
      gap: "4px",
      padding: "8px",
    }}
  >
    {colors.map((c) => (
      <div
        key={c}
        onClick={() => onChange(c)}
        style={{
          backgroundColor: c,
          width: "20px",
          height: "20px",
          borderRadius: "50%",
          border: color === c ? "2px solid black" : "1px solid #ccc",
          cursor: "pointer",
        }}
      />
    ))}
    <div
      onClick={() => onChange("")}
      style={{
        width: "20px",
        height: "20px",
        borderRadius: "50%",
        border: "1px solid #ccc",
        position: "relative",
        cursor: "pointer",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "2px",
          backgroundColor: "#FF0000",
          top: "50%",
          transform: "rotate(45deg)",
        }}
      />
    </div>
  </div>
);
