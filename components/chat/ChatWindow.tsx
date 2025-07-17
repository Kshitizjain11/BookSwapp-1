"use client";
import React, { useRef, useEffect, useState } from "react";
import { Smile, Paperclip, Send, CheckCheck } from "lucide-react";
import { useChat } from "./ChatProvider";

// Mock data for sidebar conversations
const sidebarConversations = [
  { id: "conv-1", name: "Alice Smith", last: "Yes, it's still available!", unread: 2, book: {
      title: "The Great Gatsby",
      cover: "/books/gatsby.png",
      price: "$8",
    } },
  { id: "conv-2", name: "Sapiens Seller", last: "Yes, it's available for rent!", unread: 1, book: {
      title: "Sapiens: A Brief History of Humankind",
      cover: "/books/sapiens.png",
      price: "$12",
    } },
];

const chatData: Record<string, {
  book: { title: string; cover: string; price: string },
  seller: { name: string; avatar: string; status: string },
  quickReplies: string[],
  messages: any[]
}> = {
  "conv-1": {
    book: sidebarConversations[0].book,
    seller: {
      name: "Alice Smith",
      avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      status: "Online • 4.9★ (120 reviews)"
    },
    quickReplies: [
      "Hi, is this book still available?",
      "Would you consider a lower price?",
      "Can we meet at the library?",
    ],
    messages: [
      { id: 1, sender: "them", text: "Hi, I'm interested in The Great Gatsby. Is it still available?", timestamp: "7:50 PM", seen: true },
      { id: 2, sender: "me", text: "Yes, it's still available! Are you interested in buying or renting?", timestamp: "7:55 PM", seen: true },
      { id: 3, sender: "them", text: "I'd like to buy it. Is the condition really good as mentioned?", timestamp: "7:58 PM", seen: true },
      { id: 4, sender: "me", text: "Yes, here's a photo of the actual book", timestamp: "7:59 PM", seen: true },
      { id: 5, sender: "me", image: true, url: "/books/gatsby.png", timestamp: "7:59 PM", seen: true },
      { id: 6, sender: "them", text: "It's nice. What's the price?", timestamp: "8:00 PM", seen: false },
    ],
  },
  "conv-2": {
    book: sidebarConversations[1].book,
    seller: {
      name: "Sapiens Seller",
      avatar: "https://cdn-01.cms-ap-v2i.applyflow.com/pinnacle-people/wp-content/uploads/2023/09/slide-2.png",
      status: "Last seen 10 min ago"
    },
    quickReplies: [
      "Hi, is Sapiens available for rent?",
      "Can you tell me about the book's condition?",
      "Is the price negotiable?",
    ],
    messages: [
      { id: 1, sender: "me", text: "Hi! Is Sapiens available for rent?", timestamp: "6:45 PM", seen: true },
      { id: 2, sender: "them", text: "Yes, it's available for rent!", timestamp: "6:46 PM", seen: true },
      { id: 3, sender: "me", text: "Great! Can you share a photo of the book?", timestamp: "6:47 PM", seen: true },
      { id: 4, sender: "them", text: "Sure, here it is:", timestamp: "6:48 PM", seen: true },
      { id: 5, sender: "them", image: true, url: "/books/sapiens.png", timestamp: "6:48 PM", seen: true },
      { id: 6, sender: "me", text: "Looks good! Is the price negotiable?", timestamp: "6:49 PM", seen: false },
    ],
  },
};

type Message = {
  id: number;
  sender: "me" | "them";
  text?: string;
  image?: boolean;
  url?: string;
  timestamp: string;
  seen: boolean;
};

type Conversation = {
  id: string;
  name: string;
  last: string;
  unread: number;
  book: { title: string; cover: string; price: string };
};

const ChatWindow = () => {
  const [selectedConversationId, setSelectedConversationId] = useState<string>(sidebarConversations[0].id);
  const [messagesByConv, setMessagesByConv] = useState<Record<string, Message[]>>({
    "conv-1": [...chatData["conv-1"].messages],
    "conv-2": [...chatData["conv-2"].messages],
  });
  const [input, setInput] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentData = chatData[selectedConversationId];
  const messages = messagesByConv[selectedConversationId];
  const book = currentData.book;
  const quickReplies = currentData.quickReplies;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, selectedConversationId]);

  const handleSend = (e?: React.FormEvent, quick?: string) => {
    if (e) e.preventDefault();
    const value = quick ?? input;
    if (value.trim() === "") return;
    setMessagesByConv((prev: Record<string, Message[]>) => ({
      ...prev,
      [selectedConversationId]: [
        ...prev[selectedConversationId],
        {
          id: prev[selectedConversationId].length + 1,
          sender: "me",
          text: value,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          seen: false,
        },
      ],
    }));
    setInput("");
  };

  return (
    <div className="flex h-[100dvh] max-h-[100dvh] bg-white">
      {/* Sidebar */}
      <aside className="w-64 min-w-[200px] border-r bg-gray-50 flex flex-col">
        <div className="p-4 border-b font-bold text-lg">Messages</div>
        <div className="flex-1 overflow-y-auto">
          {sidebarConversations.map((conv: Conversation) => (
            <div
              key={conv.id}
              className={`px-4 py-3 cursor-pointer flex flex-col border-b hover:bg-amber-50 transition ${conv.id === selectedConversationId ? "bg-amber-50 font-semibold" : ""}`}
              onClick={() => setSelectedConversationId(conv.id)}
            >
              <div className="flex items-center justify-between">
                <span>{conv.name}</span>
                {conv.unread > 0 && (
                  <span className="ml-2 bg-amber-500 text-white rounded-full px-2 py-0.5 text-xs font-bold">{conv.unread}</span>
                )}
              </div>
              <span className="text-xs text-gray-500 truncate max-w-full">{conv.last}</span>
            </div>
          ))}
        </div>
      </aside>
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col h-full">
        {/* Book banner + Seller info */}
        <div className="flex items-center gap-4 bg-amber-50 p-4 border-b">
          <img
            src={book.cover}
            alt={book.title}
            className="w-14 h-20 rounded-lg object-cover border"
          />
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-lg truncate">{book.title}</div>
            <div className="text-amber-600 font-bold">{book.price}</div>
          </div>
          {/* Seller info */}
          <div className="flex items-center gap-3 mr-4">
            <img
              src={currentData.seller.avatar}
              alt={currentData.seller.name}
              className="w-10 h-10 rounded-full border object-cover bg-white"
            />
            <div className="flex flex-col min-w-0">
              <span className="font-semibold text-gray-800 truncate max-w-[120px]">{currentData.seller.name}</span>
              <span className="text-xs text-gray-500 truncate max-w-[120px]">{currentData.seller.status}</span>
            </div>
          </div>
          {/* Call button placeholder */}
          <button className="ml-2 p-2 rounded-full bg-amber-500 hover:bg-amber-600 text-white transition shadow">
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" d="M22 16.92v3a2 2 0 0 1-2.18 2A19.72 19.72 0 0 1 3.09 5.18 2 2 0 0 1 5 3h3a2 2 0 0 1 2 1.72c.13.94.37 1.85.7 2.73a2 2 0 0 1-.45 2.11l-1.27 1.27a16 16 0 0 0 6.29 6.29l1.27-1.27a2 2 0 0 1 2.11-.45c.88.33 1.79.57 2.73.7A2 2 0 0 1 22 16.92Z"/></svg>
          </button>
        </div>
        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-8 py-6 space-y-4 bg-white">
          {messages.map((msg: Message) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
            >
              <div className="flex flex-col items-end max-w-lg w-fit">
                <div
                  className={`relative px-4 py-2 rounded-2xl text-sm shadow-md break-words ${
                    msg.sender === "me"
                      ? "bg-yellow-100 text-gray-900 rounded-br-md"
                      : "bg-gray-100 text-gray-900 rounded-bl-md"
                  }`}
                >
                  {msg.text && <span>{msg.text}</span>}
                  {msg.image && (
                    <div className="mt-2">
                      <div className="w-32 h-32 bg-yellow-100 border-2 border-yellow-300 rounded-lg flex items-center justify-center">
                        <img src={msg.url} alt="attachment" className="object-contain w-full h-full rounded-lg" />
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-1 mt-1 text-xs text-gray-400">
                  <span>{msg.timestamp}</span>
                  {msg.sender === "me" && (
                    <span title={msg.seen ? "Seen" : "Delivered"} className="ml-1">
                      <CheckCheck className={`inline h-4 w-4 ${msg.seen ? "text-blue-500" : "text-gray-300"}`} />
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        {/* Quick Replies */}
        <div className="flex gap-2 px-8 pb-2">
          {quickReplies.map((q: string, i: number) => (
            <button
              key={i}
              className="bg-gray-100 hover:bg-amber-100 text-gray-700 rounded-full px-4 py-1 text-xs border border-gray-200 transition"
              onClick={() => handleSend(undefined, q)}
              type="button"
            >
              {q}
            </button>
          ))}
        </div>
        {/* Input bar */}
        <form className="border-t bg-white px-8 py-3 flex items-center gap-2" onSubmit={handleSend}>
          <button
            className="p-2 rounded-full hover:bg-gray-100 text-gray-500"
            title="Emoji picker"
            type="button"
          >
            <Smile className="h-5 w-5" />
          </button>
          <button
            className="p-2 rounded-full hover:bg-gray-100 text-gray-500"
            title="Attach file"
            type="button"
          >
            <Paperclip className="h-5 w-5" />
          </button>
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:border-amber-500 bg-gray-50"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) handleSend(e); }}
          />
          <button
            className="ml-2 p-2 rounded-full bg-amber-500 hover:bg-amber-600 text-white transition shadow"
            type="submit"
          >
            <Send className="h-5 w-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatWindow;
