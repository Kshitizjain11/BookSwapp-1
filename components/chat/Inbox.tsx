import React from "react";
import Link from "next/link";

// Mock data for conversations
const conversations = [
  {
    id: "1",
    user: {
      name: "Alice Smith",
      avatar: "/avatars/alice.jpg",
    },
    book: {
      title: "Atomic Habits",
      thumbnail: "/books/atomic-habits.jpg",
    },
    lastMessage: "See you at 5pm!",
    timestamp: "2m ago",
    unread: 2,
  },
  {
    id: "2",
    user: {
      name: "Bob Lee",
      avatar: "/avatars/bob.jpg",
    },
    book: {
      title: "Deep Work",
      thumbnail: "/books/deep-work.jpg",
    },
    lastMessage: "Thanks for the update.",
    timestamp: "10m ago",
    unread: 0,
  },
];

const Inbox = () => {
  return (
    <div className="max-w-2xl mx-auto py-6 px-4">
      <h2 className="text-2xl font-bold mb-6">Inbox</h2>
      <div className="flex flex-col gap-3">
        {conversations.map((conv) => (
          <Link
            href={`/chat/${conv.id}`}
            key={conv.id}
            className="flex items-center bg-white rounded-xl shadow-sm hover:shadow-md transition p-4 gap-4 cursor-pointer border border-gray-100"
          >
            <img
              src={conv.user.avatar}
              alt={conv.user.name}
              className="w-12 h-12 rounded-full object-cover border"
            />
            <img
              src={conv.book.thumbnail}
              alt={conv.book.title}
              className="w-12 h-12 rounded-lg object-cover border"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-base truncate">
                  {conv.user.name}
                </span>
                <span className="text-xs text-gray-400 ml-2">
                  {conv.timestamp}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm text-gray-600 truncate max-w-xs">
                  {conv.lastMessage}
                </span>
                {conv.unread > 0 && (
                  <span className="ml-2 bg-amber-500 text-white rounded-full px-2 py-0.5 text-xs font-bold">
                    {conv.unread}
                  </span>
                )}
              </div>
              <div className="text-xs text-gray-400 mt-1 truncate">
                <span className="font-medium">Book:</span> {conv.book.title}
              </div>
            </div>
          </Link>
        ))}
        {conversations.length === 0 && (
          <div className="text-gray-400 text-center py-8">No conversations yet.</div>
        )}
      </div>
    </div>
  );
};

export default Inbox;
