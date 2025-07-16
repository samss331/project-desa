import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const ChatbotService = {
  chat: async (messages) => {
    // Gunakan fetch agar bisa streaming response
    return fetch(`${API_URL}/chatbot`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages }),
    });
  },
};

export default ChatbotService;
