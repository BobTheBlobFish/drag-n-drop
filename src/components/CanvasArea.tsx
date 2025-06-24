import React, { useCallback, useRef, useState } from "react";
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  Connection,
  Edge,
  Node,
  applyNodeChanges,
  applyEdgeChanges,
  NodeChange,
  EdgeChange,
  useReactFlow,
} from "reactflow";
import "reactflow/dist/style.css";

type CanvasAreaProps = {
  onNodeContextMenu?: (event: React.MouseEvent, node: Node) => void;
  nodes: Node[];
  edges: Edge[];
  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;
  setFlowAndHistory: (flow: { nodes: Node[]; edges: Edge[] }) => void;
};

const CanvasArea: React.FC<CanvasAreaProps> = ({
  onNodeContextMenu,
  nodes,
  edges,
  setNodes,
  setEdges,
  setFlowAndHistory,
}) => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const nodeIdRef = useRef(0);
  const { project } = useReactFlow();
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; nodeId: string } | null>(null);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");
      if (!type || !reactFlowBounds) return;
      const position = project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      nodeIdRef.current += 1;
      const newNode: Node = {
        id: `${type}_${nodeIdRef.current}`,
        type: "default",
        position,
        data: { label: type === "blockA" ? "Block A" : "Block B", type },
      };
      setFlowAndHistory({ nodes: [...nodes, newNode], edges });
    },
    [nodes, edges, setFlowAndHistory, project]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onConnect = useCallback(
    (params: Connection) => {
      const sourceNode = nodes.find((n) => n.id === params.source);
      const targetNode = nodes.find((n) => n.id === params.target);
      if (
        sourceNode?.data?.label === "Block A" &&
        targetNode?.data?.label === "Block B"
      ) {
        setFlowAndHistory({ nodes, edges: addEdge(params as Edge, edges) });
      } else {
        alert("Only connections from Block A to Block B are allowed!");
      }
    },
    [nodes, edges, setFlowAndHistory]
  );

  const onNodeContextMenuHandler = useCallback(
    (event: React.MouseEvent, node: Node) => {
      event.preventDefault();
      setContextMenu({
        x: event.clientX,
        y: event.clientY,
        nodeId: node.id,
      });
      if (onNodeContextMenu) onNodeContextMenu(event, node);
    },
    [onNodeContextMenu]
  );

  const handleDeleteNode = () => {
    if (contextMenu) {
      const nodeId = contextMenu.nodeId;
      setFlowAndHistory({
        nodes: nodes.filter((node) => node.id !== nodeId),
        edges: edges.filter((edge) => edge.source !== nodeId && edge.target !== nodeId),
      });
      setContextMenu(null);
    }
  };

  const handleCanvasClick = () => setContextMenu(null);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => {
      setNodes(applyNodeChanges(changes, nodes));
    },
    [nodes, setNodes]
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      setEdges(applyEdgeChanges(changes, edges));
    },
    [edges, setEdges]
  );

  const onNodeDragStop = useCallback(
    () => {
      setFlowAndHistory({ nodes, edges });
    },
    [nodes, edges, setFlowAndHistory]
  );

  const safeNodes = nodes.map((node) => ({
    ...node,
    position: node.position || { x: 0, y: 0 },
  }));

  return (
    <div
      ref={reactFlowWrapper}
      style={{ flex: 1, height: "100vh", background: "#fafbfc" }}
      onClick={handleCanvasClick}
    >
      <ReactFlow
        nodes={safeNodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onNodeContextMenu={onNodeContextMenuHandler}
        onNodeDragStop={onNodeDragStop}
        fitView
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
      {contextMenu && (
        <div
          style={{
            position: "fixed",
            top: contextMenu.y,
            left: contextMenu.x,
            background: "#fff",
            border: "1px solid #ccc",
            padding: "8px 16px",
            zIndex: 1000,
            borderRadius: 4,
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            color: "#222",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          <div style={{ color: '#555', fontWeight: 'normal', marginBottom: 8, cursor: 'default' }}>
            Hello World
          </div>
          <div onClick={handleDeleteNode}>
            Delete Block
          </div>
        </div>
      )}
    </div>
  );
};

export default CanvasArea;
