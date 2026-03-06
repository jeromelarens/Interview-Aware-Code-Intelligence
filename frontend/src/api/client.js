import axios from "axios";

const client = axios.create({
  baseURL: "http://localhost:5000",   // ✅ ONLY THIS
  headers: {
    "Content-Type": "application/json"
  }
});

export default client;