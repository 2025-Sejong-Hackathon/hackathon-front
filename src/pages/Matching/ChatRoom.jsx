import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ChatMessage from './components/ChatMessage';
import DetailProfileModal from './components/DetailProfileModal';

const MOCK_PROFILE = {
  name: '이채원',
  major: '컴퓨터공학과',
  grade: '4학년',
  mbti: 'ISTJ', // Example
  quote: '안녕하세요 저 깔끔쟁이!',
  lifestyle: [
    { label: '흡연', value: '안함' },
    { label: '음주', value: '함' },
    { label: '추위', value: '민감' },
    { label: '더위', value: '둔감' },
  ]
};

export default function ChatRoom() {
  const navigate = useNavigate();
  const location = useLocation();
  const roommateName = location.state?.name || '이채원';

  const [messages, setMessages] = useState([
    { id: 1, text: '안녕하세요!!', time: '4:32 PM', isMe: false },
    { id: 2, text: '저희 룸메 하실래요?', time: '4:32 PM', isMe: false },
    {
      id: 3,
      text: '우와~~너무 좋아요~저랑 성향이 잘 맞으시네요 ㅎㅎ',
      time: '4:50 PM',
      isMe: true,
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isConfirmRequested, setIsConfirmRequested] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isConfirmRequested]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMessage = {
      id: messages.length + 1,
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

  const handleConfirmRequest = () => {
    const requestMessage = {
      id: messages.length + 1,
      type: 'request',
      time: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
      isMe: false,
    };

    setIsConfirmRequested(true);
    setMessages((prev) => [...prev, requestMessage]);
  };

  const handleProfileClick = () => {
    setIsModalOpen(true);
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
        <h1 className='text-lg font-bold text-gray-900'>{roommateName}</h1>
        <div className='w-10'></div>
      </header>

      {/* Messages Area */}
      <div className='flex-1 overflow-y-auto bg-white px-4 py-4 pb-48'>
        {messages.map((msg) => (
          <ChatMessage 
            key={msg.id} 
            {...msg} 
            onProfileClick={handleProfileClick}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Floating Action Button (Before Request) */}
      {!isConfirmRequested && (
        <div className='fixed bottom-[185px] left-0 right-0 w-full flex justify-center z-20 pointer-events-none'>
          <button
            onClick={handleConfirmRequest}
            className='bg-white border border-rose-500 text-rose-500 px-6 py-2.5 rounded-full shadow-md flex items-center gap-2 font-bold text-sm active:scale-95 transition-transform pointer-events-auto'
          >
            <span>🤝</span>
            룸메 확정하기
          </button>
        </div>
      )}

      {/* Input Area */}
      {/* 하단 네비바(bottom-8 + height 70px = 약 102px) 위로 올림 */}
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

      {/* Profile Modal */}
      <DetailProfileModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        profile={MOCK_PROFILE}
      />
    </div>
  );
}
