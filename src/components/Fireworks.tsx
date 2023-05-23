"use client";
import { Fireworks } from "@fireworks-js/react";
import { RefObject } from "react";
import type { FireworksHandlers } from "@fireworks-js/react";

type Props = { toggle: () => void; fireworkRef: RefObject<FireworksHandlers> };

export function FireworksComp({ toggle, fireworkRef }: Props) {
  return (
    <>
      <div
        style={{ display: "flex", gap: "4px", position: "absolute", zIndex: 1 }}
      >
        <button onClick={() => toggle()}>Toggle</button>
      </div>
      <Fireworks
        ref={fireworkRef}
        options={{ opacity: 0.5 }}
        style={{
          top: "100px",
          width: "100%",
          height: "50%",
          position: "absolute",
          background: "0",
          zIndex: "100",
        }}
      />
    </>
  );
}
