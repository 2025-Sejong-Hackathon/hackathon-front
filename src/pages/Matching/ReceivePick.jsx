import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HorizontalRoommateCard from './components/HorizontalRoommateCard';
import DetailProfileModal from './components/DetailProfileModal';

export default function ReceivePick() {
  const navigate = useNavigate();
  const [picks, setPicks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoommate, setSelectedRoommate] = useState(null);

  useEffect(() => {
    const fetchPicks = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL;
        const accessToken = localStorage.getItem('accessToken');
        const response = await fetch(`${API_URL}/api/v1/picks/picks-to-me`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Received picks:', data);
          // API 응답 구조에 맞게 매핑
          const mapped = data.data.map((item) => ({
            id: item.fromMemberId, // 상대방 ID
            pickId: item.id,
            name: item.fromMemberName,
            major: '학과 정보 없음',
            grade: '학년 정보 없음',
            mbti: 'MCSE',
            quote: '승희님과 룸메이트가 되고 싶어요!',
          }));
          setPicks(mapped);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPicks();
  }, []);

  const handleCardClick = (roommate) => {
    setSelectedRoommate(roommate);
    setIsModalOpen(true);
  };

  const handleAccept = async () => {
    if (!selectedRoommate) return;

    try {
      const API_URL = import.meta.env.VITE_API_URL;
      const accessToken = localStorage.getItem('accessToken');

      // 나를 Pick한 사람에게 나도 Pick을 보내면 서로 Pick 상태가 됨
      const response = await fetch(
        `${API_URL}/api/v1/picks/${selectedRoommate.id}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (response.ok) {
        const result = await response.json();
        alert(`${selectedRoommate.name}님의 PICK을 수락했습니다!`);
        setIsModalOpen(false);
        // 서로 Pick 완료 시 채팅방으로 이동 (result.data.id는 MatchPair ID일 가능성 있음)
        navigate(`/matching/chat/${result.data.id}`, {
          state: { name: selectedRoommate.name },
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleRefuse = () => {
    alert(`${selectedRoommate?.name}님의 PICK을 거절했습니다.`);
    setIsModalOpen(false);
  };

  return (
    <div className='w-full flex flex-col h-full bg-[#F2F4F6]'>
      {/* Header */}
      <header className='flex items-center px-6 pt-12 pb-6 bg-white sticky top-0 z-10 rounded-b-[30px] shadow-sm'>
        <button
          onClick={() => navigate(-1)}
          className='mr-4 p-1 -ml-1 rounded-full hover:bg-gray-100 transition-colors'
        >
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='#333'
            strokeWidth='2.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <polyline points='15 18 9 12 15 6' />
          </svg>
        </button>
        <h1 className='text-xl font-bold text-gray-900'>
          나를 PICK한 룸메이트
        </h1>
      </header>

      {/* Content List */}
      <div className='flex-1 px-6 py-6 overflow-y-auto pb-32'>
        <div className='flex flex-col gap-4'>
          {isLoading ? (
            <div className='text-center py-10 text-gray-400'>
              불러오는 중...
            </div>
          ) : picks.length === 0 ? (
            <div className='text-center py-10 text-gray-400'>
              아직 나를 PICK한 친구가 없어요.
            </div>
          ) : (
            picks.map((match) => (
              <HorizontalRoommateCard
                key={match.id}
                {...match}
                onClick={() => handleCardClick(match)}
              />
            ))
          )}
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
