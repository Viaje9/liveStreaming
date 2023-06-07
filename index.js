import express from "express";
import { RTCPeerConnection } from "wrtc";

const app = express();
const port = 3000;

app.get("/webrtc", (req, res) => {
  const pc = new RTCPeerConnection();

  pc.onicecandidate = ({ candidate }) => {
    console.log("New ICE candidate: ", candidate);
  };

  pc.createOffer()
    .then(offer => pc.setLocalDescription(offer))
    .then(() => {
      // Send the offer to the other peer.
      // In a real application, you would probably send this over a websocket.
      res.json(pc.localDescription);
    });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

