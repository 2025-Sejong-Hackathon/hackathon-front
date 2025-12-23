import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HorizontalRoommateCard from './components/HorizontalRoommateCard';
import DetailProfileModal from './components/DetailProfileModal';

const RECEIVED_PICKS = [
  {
    id: 1,
    name: '정성실',
    major: '행정학과',
    grade: '2학년',
    mbti: 'ISFJ',
    quote: '성실함이 제 무기입니다. 깨끗하게 써요!'
  },
  {
    id: 2,
    name: '강활발',
    major: '무용학과',
    grade: '3학년',
    mbti: 'ESFP',
    quote: '에너지 넘치는 긍정왕! 심심할 틈이 없어요~'
  },
  {
    id: 3,
    name: '김조용',
    major: '도서관정보학과',
    grade: '4학년',
    mbti: 'INTP',
    quote: '조용히 책 읽는 걸 좋아해요. 서로 배려해요.'
  }
];

export default function ReceivePick() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoommate, setSelectedRoommate] = useState(null);

  const handleCardClick = (roommate) => {
    setSelectedRoommate(roommate);
    setIsModalOpen(true);
  };

  const handleAccept = () => {
    alert(`${selectedRoommate?.name}님의 PICK을 수락했습니다! 채팅방으로 이동합니다.`);
    setIsModalOpen(false);
    navigate(`/matching/chat/${selectedRoommate?.id}`, { state: { name: selectedRoommate?.name } });
  };

  const handleRefuse = () => {
    alert(`${selectedRoommate?.name}님의 PICK을 거절했습니다.`);
    setIsModalOpen(false);
  };

  return (
    <div className="w-full flex flex-col h-full bg-[#F2F4F6]">
      {/* Header */}
      <header className="flex items-center px-6 pt-12 pb-6 bg-white sticky top-0 z-10 rounded-b-[30px] shadow-sm">
        <button 
          onClick={() => navigate(-1)}
          className="mr-4 p-1 -ml-1 rounded-full hover:bg-gray-100 transition-colors"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <h1 className="text-xl font-bold text-gray-900">나를 PICK한 룸메이트</h1>
      </header>

      {/* Content List */}
      <div className="flex-1 px-6 py-6 overflow-y-auto pb-32">
        <div className="flex flex-col gap-4">
          <div className="mb-2">
            <p className="text-sm text-gray-500">
              와우! <span className="text-rose-500 font-bold">{RECEIVED_PICKS.length}명</span>이 승희님을 찜했어요! 💘
            </p>
          </div>
          
          {RECEIVED_PICKS.map((match) => (
            <HorizontalRoommateCard 
              key={match.id} 
              {...match} 
              onClick={() => handleCardClick(match)}
            />
          ))}
        </div>
      </div>

      {/* Detail Profile Modal */}
      <DetailProfileModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        profile={selectedRoommate}
        onAccept={handleAccept}
        onRefuse={handleRefuse}
      />
    </div>
  );
}
