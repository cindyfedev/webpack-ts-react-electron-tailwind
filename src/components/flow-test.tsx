import { useCallback } from "react";
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Handle,
  BackgroundVariant,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import { Modal } from "@mantine/core";

const initialNodes = [
  { id: "1", position: { x: 0, y: 0 }, data: { label: "1" } },
  { id: "2", position: { x: 0, y: 100 }, data: { label: "2" } },
];
const initialEdges = [
  { id: "e1-2", source: "1", target: "2", animated: false },
];

export default function FlowTest() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  // Handle adding a new node with two handles for connections
  const addNode = () => {
    const newNodeId = (nodes.length + 1).toString(); // Generate a unique node ID
    const newNode = {
      id: newNodeId,
      position: { x: Math.random() * 400, y: Math.random() * 400 }, // Random position
      data: {
        label: (
          <>
            <span>Node {newNodeId}</span>
            <Handle
              type="source"
              position="right"
              id={`${newNodeId}-source`}
              style={{ background: "#555" }}
            />
            <Handle
              type="target"
              position="left"
              id={`${newNodeId}-target`}
              style={{ background: "#555" }}
            />
          </>
        ),
      },
    };
    setNodes((nds) => [...nds, newNode]);
  };

  return (
    <div className="w-full h-dvh">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      >
        {/* <button
        onClick={addNode}
        className="border p-2 absolute z-10 right-2 bottom-2"
      >
        Add Node
      </button> */}

        <Controls />
        {/* <MiniMap /> */}
        {/* Adjust background dots variant */}
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}
