import React from "react";

const Loading = ({ message = "Loading..." }) => {
  const strokeColor = "#FC4747";

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#10141e",
        gap: 12,
      }}
    >
      <svg width="48" height="48" viewBox="0 0 50 50" aria-hidden="true">
        <circle
          cx="25"
          cy="25"
          r="20"
          fill="none"
          stroke={strokeColor}
          strokeWidth="4"
          strokeDasharray="31.4 31.4"
          strokeLinecap="round"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            repeatCount="indefinite"
            dur="1s"
            from="0 25 25"
            to="360 25 25"
          />
        </circle>
      </svg>
      <span style={{ color: "#fff", marginLeft: 6 }}>{message}</span>
    </div>
  );
};

export default Loading;
