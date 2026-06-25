import Sidebar from "@renderer/modules/Sidebar/Sidebar";
import { DefaultView } from "@renderer/types";
import { useState } from "react";

const App = () => {
  const [activeView, onViewChange] = useState<DefaultView>("home");

  return (
    <div className="flex h-screen w-full overflow-hidden p-2.5 gap-3">
      <Sidebar activeView={activeView} onViewChange={onViewChange} />
    </div>
  );
};

export default App;
