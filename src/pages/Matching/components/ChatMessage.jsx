export default function ChatMessage({ text, time, isMe, type, onProfileClick }) {
  if (type === 'system') {
    return (
      <div className="flex justify-center my-4">
        <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
          {text}
        </span>
      </div>
    );
  }

  if (type === 'request') {
    return (
      <div className="flex flex-col items-start max-w-[70%] mb-4">
        <div className="bg-[#FFF0F0] p-4 rounded-[20px] rounded-tl-none border border-rose-100 shadow-sm w-full">
          <p className="text-gray-600 text-sm mb-3">상대가 룸메이트 확정을 요청했어요.</p>
          <button className="w-full bg-[#E87280] text-white font-bold py-2 rounded-xl text-sm shadow-sm active:scale-[0.98] transition-transform">
            수락하기
          </button>
        </div>
        <span className="text-[10px] text-gray-400 mt-1 ml-1">{time}</span>
      </div>
    );
  }

  return (
    <div className={`flex w-full mb-3 ${isMe ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex items-end max-w-[70%] ${isMe ? 'flex-row-reverse' : 'flex-row'} gap-2`}>
        {/* Avatar (Only for opponent) */}
        {!isMe && (
          <div 
            onClick={onProfileClick}
            className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0 flex items-center justify-center text-xs font-bold text-gray-500 cursor-pointer hover:opacity-80 transition-opacity"
          >
            이
          </div>
        )}

        <div className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
          <div
            className={`px-4 py-2.5 text-sm leading-relaxed shadow-sm break-words
              ${isMe 
                ? 'bg-[#E35066] text-white rounded-[20px] rounded-tr-none' 
                : 'bg-white text-gray-700 rounded-[20px] rounded-tl-none border border-gray-100'
              }`}
          >
            {text}
          </div>
        </div>
        
        <span className="text-[10px] text-gray-400 mb-1 flex-shrink-0">
          {time}
        </span>
      </div>
    </div>
  );
}
