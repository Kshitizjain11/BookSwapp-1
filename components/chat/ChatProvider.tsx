"use client";
import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

// Replace with your backend URL if/when available
const SOCKET_URL = "http://localhost:4000";

interface Message {
  id: string;
  sender: string;
  text: string;
  timestamp: string;
}

interface ChatContextType {
  messages: Message[];
  sendMessage: (msg: Omit<Message, "id" | "timestamp">) => void;
  socket: Socket | null;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const socket = io(SOCKET_URL);
    socketRef.current = socket;

    socket.on("chat:message", (msg: Message) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = (msg: Omit<Message, "id" | "timestamp">) => {
    if (socketRef.current) {
      const message: Message = {
        ...msg,
        id: Math.random().toString(36).substr(2, 9),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      socketRef.current.emit("chat:message", message);
      setMessages((prev) => [...prev, message]);
    }
  };

  return (
    <ChatContext.Provider value={{ messages, sendMessage, socket: socketRef.current }}>
      {children}
    </ChatContext.Provider>
  );
};

export function useChat() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChat must be used within a ChatProvider");
  return ctx;
}
