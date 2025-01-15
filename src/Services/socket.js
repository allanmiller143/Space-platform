import io from "socket.io-client";

const socket = io('https://spaceimoveis-api-dev.onrender.com/'); // netlify

export default socket;