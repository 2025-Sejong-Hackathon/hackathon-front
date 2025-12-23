import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HorizontalRoommateCard from './components/HorizontalRoommateCard';

export default function MutualPick() {
  const navigate = useNavigate();
  const [matches, setMatches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL;
        const accessToken = localStorage.getItem('accessToken');
        const response = await fetch(`${API_URL}/api/v1/picks/match-pairs`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Mutual matches:', data);
          // API 응답 구조에 맞게 매핑 (member1 또는 member2 중 내가 아닌 사람을 찾아야 할 수도 있음)
          // 여기서는 일단 받은 데이터를 기반으로 매핑
          const mapped = data.data.map((item) => ({
            id: item.id,
            matchPairId: item.id,
            name: item.member2Name, // 예시: 상대방 이름
            major: '학과 정보 없음',
            grade: '학년 정보 없음',
            mbti: 'MCSE',
            quote: '서로 PICK이 완료되었습니다!',
          }));
          setMatches(mapped);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMatches();
  }, []);

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
          서로 PICK한 룸메이트
        </h1>
      </header>

      {/* Content List */}
      <div className='flex-1 px-6 py-6 overflow-y-auto pb-32'>
        <div className='flex flex-col gap-4'>
          {isLoading ? (
            <div className='text-center py-10 text-gray-400'>
              불러오는 중...
            </div>
          ) : matches.length === 0 ? (
            <div className='text-center py-10 text-gray-400'>
              아직 서로 PICK한 친구가 없어요.
            </div>
          ) : (
            matches.map((match) => (
              <HorizontalRoommateCard
                key={match.id}
                {...match}
                onClick={() =>
                  navigate(`/matching/chat/${match.matchPairId}`, {
                    state: { name: match.name },
                  })
                }
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
