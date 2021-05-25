import axios from "axios";

const chatServer = axios.create({
    baseURL: "http://localhost:8080"
});

export default chatServer;