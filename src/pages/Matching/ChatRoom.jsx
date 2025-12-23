import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import ChatMessage from './components/ChatMessage';
import DetailProfileModal from './components/DetailProfileModal';

const MOCK_PROFILE = {
  name: '이채원',
  major: '컴퓨터공학과',
  grade: '4학년',
  mbti: 'ISTJ', 
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
  const { id: matchPairId } = useParams(); // URL 파라미터에서 matchPairId 가져오기
  const roommateName = location.state?.name || '익명';

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
  const [isConfirmRequested, setIsConfirmRequested] = useState(false); // 내가 보낸 요청 여부
  const [receivedRequestId, setReceivedRequestId] = useState(null); // 받은 요청 ID
  const [isModalOpen, setIsModalOpen] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isConfirmRequested, receivedRequestId]);

  // 받은 요청 확인 API
  useEffect(() => {
    const fetchReceivedRequests = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL;
        const accessToken = localStorage.getItem('accessToken');
        const response = await fetch(`${API_URL}/api/v1/match-requests/received`, {
          method: 'GET',
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        if (response.ok) {
          const data = await response.json();
          // 현재 채팅방(matchPairId)에 해당하는 요청 찾기
          // matchPairId는 string일 수 있으므로 비교 시 주의
          const request = data.data.find(req => String(req.matchPairId) === String(matchPairId));
          
          if (request) {
            setReceivedRequestId(request.id);
            // 메시지 리스트에 요청 카드 추가 (중복 방지 로직 필요하지만 간단하게)
            setMessages(prev => {
              if (prev.some(m => m.type === 'request')) return prev;
              return [
                ...prev,
                {
                  id: 'req-' + request.id,
                  type: 'request',
                  time: new Date(request.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                  isMe: false,
                }
              ];
            });
          }
        }
      } catch (err) {
        console.error(err);
      }
    };
    
    if (matchPairId) {
        fetchReceivedRequests();
    }
  }, [matchPairId]);

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

  const handleConfirmRequest = async () => {
    if (!matchPairId) return;

    try {
        const API_URL = import.meta.env.VITE_API_URL;
        const accessToken = localStorage.getItem('accessToken');
        const response = await fetch(`${API_URL}/api/v1/match-requests/match-pairs/${matchPairId}`, {
            method: 'POST',
            headers: { Authorization: `Bearer ${accessToken}` },
        });

        if (response.ok) {
            alert('룸메이트 확정 요청을 보냈습니다.');
            setIsConfirmRequested(true);
            setMessages((prev) => [
                ...prev, 
                {
                    id: Date.now(),
                    type: 'system',
                    text: '룸메이트 확정 요청을 보냈습니다.',
                    isMe: true
                }
            ]);
        } else {
            const err = await response.json();
            alert(err.message || '요청 실패');
        }
    } catch (e) {
        console.error(e);
        alert('오류가 발생했습니다.');
    }
  };

  const handleAcceptRequest = async () => {
    if (!receivedRequestId) return;

    try {
        const API_URL = import.meta.env.VITE_API_URL;
        const accessToken = localStorage.getItem('accessToken');
        const response = await fetch(`${API_URL}/api/v1/match-requests/${receivedRequestId}/accept`, {
            method: 'POST',
            headers: { Authorization: `Bearer ${accessToken}` },
        });

        if (response.ok) {
            alert('룸메이트 매칭이 완료되었습니다! 축하합니다 🎉');
            navigate('/'); // 홈으로 이동하거나 완료 페이지로 이동
        } else {
            alert('수락 처리에 실패했습니다.');
        }
    } catch (e) {
        console.error(e);
    }
  };

  const handleRejectRequest = async () => {
      if (!receivedRequestId) return;

      try {
        const API_URL = import.meta.env.VITE_API_URL;
        const accessToken = localStorage.getItem('accessToken');
        const response = await fetch(`${API_URL}/api/v1/match-requests/${receivedRequestId}/reject`, {
            method: 'POST',
            headers: { Authorization: `Bearer ${accessToken}` },
        });

        if (response.ok) {
            alert('요청을 거절했습니다.');
            setReceivedRequestId(null);
            // 메시지 리스트에서 요청 제거하거나 시스템 메시지로 변경
            setMessages(prev => prev.filter(m => m.type !== 'request'));
        }
    } catch (e) {
        console.error(e);
    }
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
            onAccept={handleAcceptRequest}
            onReject={handleRejectRequest}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Floating Action Button (Before Request) */}
      {!isConfirmRequested && !receivedRequestId && (
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
