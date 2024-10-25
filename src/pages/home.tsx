import { useEffect, useState } from "react";
import FlowTest from "../components/flow-test";
import CameraSelector from "../components/camera-selector";
const { ipcRenderer } = window.require("electron"); // https://github.com/electron/electron/issues/7300

export const Home = () => {
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    ipcRenderer.on("chosenFile", (event, base64) => {
      setImageSrc(`data:image/png;base64,${base64}`);
    });
  }, []);

  const handleFileSelection = () => {
    ipcRenderer.send("chooseFile");
  };

  return (
    <div>
      <div className=" mx-auto mt-4 border-2 border-blue-200 max-w-[80%] max-h-[400px] overflow-hidden relative">
        <FlowTest />
      </div>

      <CameraSelector />

      <h1> Home Page</h1>

      <button
        onClick={handleFileSelection}
        className="bg-blue-100 rounded-xl px-3 m-2"
      >
        Select Image
      </button>

      <div className="p-4 max-w-xl">
        {imageSrc && <img src={imageSrc} alt="Selected Image" />}
      </div>
    </div>
  );
};
