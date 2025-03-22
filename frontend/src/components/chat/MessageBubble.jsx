import React from "react";

const MessageBubble = ({ message, darkMode }) => {
  // Extract sender, text, and timestamp from the message
  const { sender, text, timestamp } = message;

  // Check if the message is from the logged-in user
  const isUser = sender === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[70%] rounded-lg px-4 py-2 
          ${isUser ? "bg-blue-500 text-white" : darkMode ? "bg-gray-700 text-white" : "bg-white text-gray-800"}`}
      >
        <p className="text-sm">{text}</p>
        <p className={`text-xs text-right mt-1 ${isUser ? "text-blue-100" : darkMode ? "text-gray-400" : "text-gray-500"}`}>
          {timestamp}
        </p>
      </div>
    </div>
  );
};

export default MessageBubble;
