"use client";

import React, { useState } from "react";
import BlockPanel from "./BlockPanel";
import CanvasArea from "./CanvasArea";
import { Node, Edge, ReactFlowProvider } from "reactflow";

type FlowState = { nodes: Node[]; edges: Edge[] };

const initialState: FlowState = { nodes: [], edges: [] };

export default function HomePage() {
  const [flow, setFlow] = useState<FlowState>(initialState);
  const [history, setHistory] = useState<FlowState[]>([initialState]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const setFlowAndHistory = (newFlow: FlowState) => {
    const newHistory = history.slice(0, historyIndex + 1);
    setHistory([...newHistory, newFlow]);
    setHistoryIndex(newHistory.length);
    setFlow(newFlow);
  };

  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setFlow(history[historyIndex - 1]);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setFlow(history[historyIndex + 1]);
    }
  };

  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;

  const onDragStart = (event: React.DragEvent<HTMLDivElement>, blockType: string) => {
    event.dataTransfer.setData("application/reactflow", blockType);
    event.dataTransfer.effectAllowed = "move";
  };

  const handleNodeContextMenu = () => {};

  return (
    <ReactFlowProvider>
      <div style={{ display: "flex", height: "100vh" }}>
        <div style={{ flex: 1 }}>
          <CanvasArea
            onNodeContextMenu={handleNodeContextMenu}
            nodes={flow.nodes}
            edges={flow.edges}
            setNodes={(nodes) => setFlow({ nodes, edges: flow.edges })}
            setEdges={(edges) => setFlow({ nodes: flow.nodes, edges })}
            setFlowAndHistory={setFlowAndHistory}
          />
        </div>
        <BlockPanel
          onDragStart={onDragStart}
          undo={undo}
          redo={redo}
          canUndo={canUndo}
          canRedo={canRedo}
        />
      </div>
    </ReactFlowProvider>
  );
} 