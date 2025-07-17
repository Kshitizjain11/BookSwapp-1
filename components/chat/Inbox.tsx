import React from "react";
import Link from "next/link";

// Mock data for conversations
const conversations = [
  {
    id: "1",
    user: {
      name: "Alice Smith",
      avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    },
    book: {
      title: "Atomic Habits",
      thumbnail: "/books/gatsby.png",
    },
    lastMessage: "See you at 5pm!",
    timestamp: "2m ago",
    unread: 2,
  },
  {
    id: "2",
    user: {
      name: "Bob Lee",
      avatar: "https://cdn-01.cms-ap-v2i.applyflow.com/pinnacle-people/wp-content/uploads/2023/09/slide-2.png",
    },
    book: {
      title: "Deep Work",
      thumbnail: "/books/sapiens.png",
    },
    lastMessage: "Thanks for the update.",
    timestamp: "10m ago",
    unread: 0,
  },
];

const Inbox = () => {
  return (
    <div className="min-h-[60vh] flex flex-col justify-center items-center bg-zinc-100 dark:bg-zinc-900 py-12">
      <div className="w-full max-w-2xl mx-auto p-6 rounded-2xl shadow-lg bg-white dark:bg-zinc-800 border border-gray-100 dark:border-zinc-700">

        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Inbox</h2>
        <div className="flex flex-col gap-3">
        {conversations.map((conv) => (
          <Link
            href={`/chat/${conv.id}`}
            key={conv.id}
            className="flex items-center bg-white dark:bg-zinc-800 rounded-xl shadow-sm hover:shadow-md transition p-4 gap-4 cursor-pointer border border-gray-100 dark:border-zinc-700"
          >
            <img
              src={conv.user.avatar}
              alt={conv.user.name}
              className="w-12 h-12 rounded-full object-cover border border-gray-200 dark:border-zinc-700"
            />
            <img
              src={conv.book.thumbnail}
              alt={conv.book.title}
              className="w-12 h-12 rounded-lg object-cover border border-gray-200 dark:border-zinc-700"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-base truncate text-gray-900 dark:text-white">
                  {conv.user.name}
                </span>
                <span className="text-xs text-gray-400 dark:text-gray-300 ml-2">
                  {conv.timestamp}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm text-gray-600 dark:text-gray-200 truncate max-w-xs">
                  {conv.lastMessage}
                </span>
                {conv.unread > 0 && (
                  <span className="ml-2 bg-amber-500 text-white rounded-full px-2 py-0.5 text-xs font-bold">
                    {conv.unread}
                  </span>
                )}
              </div>
              <div className="text-xs text-gray-400 dark:text-gray-300 mt-1 truncate">
                <span className="font-medium">Book:</span> {conv.book.title}
              </div>
            </div>
          </Link>
        ))}
        {conversations.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12">
            <span className="text-4xl mb-4">📭</span>
            <div className="text-gray-400 dark:text-gray-300 text-center text-lg font-semibold mb-2">No conversations yet</div>
            <div className="text-gray-400 dark:text-gray-400 text-center mb-4">Start chatting with sellers or buyers to see your messages here.</div>
          </div>
        )}
        </div>
      </div>
    </div>
  );
};

export default Inbox;
