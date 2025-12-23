import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import ChatMessage from '../Matching/components/ChatMessage';

export default function GroupBuyChatRoom() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams(); // GroupBuy ID
  const title = location.state?.title || '공동구매 채팅방';

  const [messages, setMessages] = useState([
    { id: 1, text: '안녕하세요! 공구 참여해주셔서 감사합니다.', time: '4:30 PM', isMe: false },
    { id: 2, text: '네 반갑습니다~ 언제쯤 주문하실 건가요?', time: '4:32 PM', isMe: true },
  ]);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMessage = {
      id: Date.now(),
      text: inputText,
      time: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
      isMe: true,
    };

    setMessages([...messages, newMessage]);
    setInputText('');
  };

  return (
    <div className='w-full flex flex-col h-screen bg-white relative'>
      {/* Header */}
      <header className='flex items-center justify-between px-4 py-4 border-b border-gray-100 bg-white sticky top-0 z-30'>
        <button
          onClick={() => navigate(-1)}
          className='p-2 -ml-2 hover:bg-gray-50 rounded-full transition-colors'
        >
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='#111'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <polyline points='15 18 9 12 15 6' />
          </svg>
        </button>
        <h1 className='text-lg font-bold text-gray-900 truncate max-w-[200px]'>{title}</h1>
        <div className='w-10'></div>
      </header>

      {/* Messages Area */}
      <div className='flex-1 overflow-y-auto bg-white px-4 py-4 pb-48'>
        {messages.map((msg) => (
          <ChatMessage 
            key={msg.id} 
            {...msg} 
            // 공구 채팅방에서는 프로필 클릭 기능 비활성화 또는 별도 처리
            onProfileClick={() => {}} 
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className='fixed bottom-[110px] w-full bg-white px-4 py-3 max-w-[500px] mx-auto left-0 right-0 z-20'>
        <form onSubmit={handleSendMessage} className='flex gap-2 items-center'>
          <input
            type='text'
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder='메세지를 입력하세요.'
            className='flex-1 bg-white border border-rose-200 rounded-[25px] px-5 py-3 text-sm focus:outline-none focus:border-rose-400 placeholder-gray-400 shadow-sm'
          />
          <button
            type='submit'
            className='p-2 text-rose-500 hover:bg-rose-50 rounded-full transition-colors disabled:opacity-50'
            disabled={!inputText.trim()}
          >
            <svg
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <line x1='22' y1='2' x2='11' y2='13' />
              <polygon points='22 2 15 22 11 13 2 9 22 2' />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}
