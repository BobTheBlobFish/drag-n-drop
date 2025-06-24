import React from "react";
import { blocks } from "../data/blocks";

type BlockPanelProps = {
  onDragStart: (event: React.DragEvent<HTMLDivElement>, blockType: string) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
};

const BlockPanel: React.FC<BlockPanelProps> = ({ onDragStart, undo, redo, canUndo, canRedo }) => (
  <aside style={{ width: 200, padding: 16, borderLeft: "1px solid #ccc" }}>
    <h3>Block Panel</h3>
    <button
      onClick={undo}
      disabled={!canUndo}
      style={{
        color: canUndo ? "black" : "#aaa",
        background: "#f0f0f0",
        border: "1px solid #aaa",
        borderRadius: 4,
        marginBottom: 8,
        width: "100%",
        fontWeight: "bold",
        cursor: canUndo ? "pointer" : "not-allowed"
      }}
    >
      Undo
    </button>
    <button
      onClick={redo}
      disabled={!canRedo}
      style={{
        color: canRedo ? "black" : "#aaa",
        background: "#f0f0f0",
        border: "1px solid #aaa",
        borderRadius: 4,
        marginBottom: 16,
        width: "100%",
        fontWeight: "bold",
        cursor: canRedo ? "pointer" : "not-allowed"
      }}
    >
      Redo
    </button>
    {blocks.map((block) => (
      <div
        key={block.id}
        draggable
        onDragStart={(event) => onDragStart(event, block.type)}
        style={{
          margin: "8px 0",
          padding: "8px",
          background: "#f0f0f0",
          border: "1px solid #aaa",
          borderRadius: 4,
          cursor: "grab",
          color: "#222",
          fontWeight: "bold",
        }}
      >
        {block.label}
      </div>
    ))}
  </aside>
);

export default BlockPanel;