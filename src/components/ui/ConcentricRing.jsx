import React from "react";
import { cn } from "../../lib/utils";

export function ConcentricRing({ className = "", style = {}, ...props }) {
  return (
    <>
      <style>{`
        @keyframes loading-ui-concentric-ring-rotation {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
      <span
        role="status"
        className={cn("relative inline-block align-middle", className)}
        style={{
          position: "relative",
          display: "inline-block",
          width: "18px",
          height: "18px",
          verticalAlign: "middle",
          animation: "loading-ui-concentric-ring-rotation 1s linear infinite",
          ...style
        }}
        {...props}
      >
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            border: "2px solid currentColor",
            opacity: 0.25
          }}
        />
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "83.333%",
            height: "83.333%",
            transform: "translate(-50%, -50%)",
            borderRadius: "50%",
            border: "2px solid transparent",
            borderBottomColor: "currentColor"
          }}
        />
        <span style={{ position: "absolute", width: "1px", height: "1px", padding: 0, margin: "-1px", overflow: "hidden", clip: "rect(0,0,0,0)", border: 0 }}>Loading</span>
      </span>
    </>
  );
}
