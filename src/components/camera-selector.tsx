import { Button, Text } from "@mantine/core";
import React, { useState, useEffect, useRef } from "react";

const CameraSelector = () => {
  const [devices, setDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState("");
  const videoStreamRef = useRef(null);

  // Get the list of media devices (cameras)
  useEffect(() => {
    navigator.mediaDevices
      .enumerateDevices()
      .then((deviceInfos) => {
        const videoDevices = deviceInfos.filter(
          (device) => device.kind === "videoinput"
        );

        console.log(videoDevices, "what is videoDevices");
        setDevices(videoDevices);
      })
      .catch((error) => {
        console.error("Error fetching devices:", error);
      });
  }, []);

  // Function to handle when a user selects a camera
  const handleChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedDevice(selectedValue);
    if (selectedValue) {
      startVideoStream(selectedValue);
    } else {
      stopVideoStream(); // Stop video stream when "null" is selected
    }
  };

  // Start streaming from the selected camera
  const startVideoStream = (deviceId) => {
    stopVideoStream(); // Stop any previous stream before starting a new one

    navigator.mediaDevices
      .getUserMedia({
        video: {
          deviceId: deviceId ? { exact: deviceId } : undefined,
        },
      })
      .then((stream) => {
        const videoElement = document.querySelector("video");
        videoElement.srcObject = stream;
        videoStreamRef.current = stream; // Save the stream reference to stop it later
      })
      .catch((error) => {
        console.error("Error accessing camera:", error);
      });
  };

  // Stop the video stream
  const stopVideoStream = () => {
    if (videoStreamRef.current) {
      videoStreamRef.current.getTracks().forEach((track) => track.stop());
      videoStreamRef.current = null;
      const videoElement = document.querySelector("video");
      videoElement.srcObject = null; // Clear the video element source
    }
  };

  return (
    <div>
      <Text>Text </Text>
      <Button className="bg-green">Mantine button</Button>
      <h2>Select a Camera</h2>
      <select value={selectedDevice} onChange={handleChange}>
        <option key={"no"} value="">
          Turn off camera
        </option>
        {devices.map((device, index) => (
          <option key={device.deviceId} value={device.deviceId}>
            {device.label || `Camera ${index + 1}`}
          </option>
        ))}
      </select>

      <div>
        <video autoPlay style={{ width: "100%", height: "300px" }} />
      </div>
    </div>
  );
};

export default CameraSelector;
