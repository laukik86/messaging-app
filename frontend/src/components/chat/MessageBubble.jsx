const MessageBubble = ({ message, darkMode }) => {
  // Change senderId to sender to match the hook's data structure
  const { sender, text, timestamp } = message;

  // No need to convert timestamp since it's already formatted in your hook
  const formattedTime = timestamp;

  const isUser = sender === 'user';

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[70%] rounded-lg px-4 py-2 
          ${isUser ? "bg-blue-500 text-white" : darkMode ? "bg-gray-700 text-white" : "bg-white text-gray-800"}`}
      >
        <p className="text-sm">{text}</p>
        <p className={`text-xs text-right mt-1 ${isUser ? "text-blue-100" : darkMode ? "text-gray-400" : "text-gray-500"}`}>
          {formattedTime}
        </p>
      </div>
    </div>
  );
};

export default MessageBubble;