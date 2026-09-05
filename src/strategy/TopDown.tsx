import { ReactFlowProvider } from "@xyflow/react";
import App from "../App";
export default function TopDown() {
  return (
    <ReactFlowProvider>
      <App />
    </ReactFlowProvider>
  );
}
