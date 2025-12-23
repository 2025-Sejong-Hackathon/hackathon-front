import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RoommateCard from './components/RoommateCard';
import DetailProfileModal from '../Matching/components/DetailProfileModal';
import TogetherIcon from '../../assets/together.svg';
import LikeIcon from '../../assets/like.svg';
import MotorcycleIcon from '../../assets/오토바이.png';

const MOCK_ROOMMATES = [
  {
    id: 1,
    name: '김다람',
    major: '탐정학과',
    grade: '3학년',
    geekBti: 'NCTI',
    quote: '궁금한 건 못 참아! 탐정 다람이의 모험 시작!',
    matchScore: 85,
  },
  {
    id: 2,
    name: '이서준',
    major: '컴퓨터공학',
    grade: '2학년',
    geekBti: 'MCTE',
    quote: '효율적인 코딩과 깔끔한 정리가 내 특기!',
    matchScore: 92,
  },
  {
    id: 3,
    name: '박지민',
    major: '시각디자인',
    grade: '4학년',
    geekBti: 'MCSE',
    quote: '예술적인 감각으로 방을 꾸며볼까요?',
    matchScore: 78,
  },
];

export default function Home() {
  const [isRecommendOn, setIsRecommendOn] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoommate, setSelectedRoommate] = useState(null);
  const navigate = useNavigate();

  // 최근 공구 목록 (실제로는 API에서 가져와야 함)
  const RECENT_GROUP_BUYS = [
    {
      id: 1,
      title: '호랑이 초밥 같이 먹어요!',
      category: '일식',
      image: '🍣', // 실제로는 이미지 URL
    },
    {
      id: 2,
      title: '호랑이 초밥 같이 먹어요!',
      category: '일식',
      image: '🍣',
    },
    {
      id: 3,
      title: '호랑이 초밥 같이 먹어요!',
      category: '일식',
      image: '🍣',
    },
  ];

  const handleCardClick = (roommate) => {
    setSelectedRoommate(roommate);
    setIsModalOpen(true);
  };

  const handlePick = () => {
    // TODO: 실제로는 API 호출
    alert(`${selectedRoommate?.name}님에게 PICK 요청을 보냈습니다!`);
    setIsModalOpen(false);
  };

  const handleGroupBuyClick = (id) => {
    navigate(`/group-buy/${id}`);
  };

  return (
    <div className='w-full flex flex-col px-6 pt-12'>
      {/* Header */}
      <header className='flex justify-between items-center mb-8'>
        <h1 className='text-2xl font-bold text-gray-900'>긱Seek</h1>
        <div className='flex items-center gap-3'>
          <span className='text-rose-500 font-bold text-sm'>룸메추천</span>
          <button
            onClick={() => setIsRecommendOn(!isRecommendOn)}
            className={`w-12 h-7 rounded-full p-1 transition-colors duration-300 ${
              isRecommendOn ? 'bg-rose-500' : 'bg-gray-300'
            }`}
          >
            <div
              className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-300 ${
                isRecommendOn ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </header>

      {/* Greeting Section (스위치 꺼졌을 때만 표시) */}
      {!isRecommendOn && (
        <div className='flex items-center justify-between mb-6'>
          <h2 className='text-xl font-bold text-gray-900'>
            승희님, 안녕하세요 👋
          </h2>
          <img
            src={MotorcycleIcon}
            alt='오토바이'
            className='w-40 h-40 object-contain'
          />
        </div>
      )}

      {/* Action Buttons (스위치 켜졌을 때만 표시) */}
      {isRecommendOn && (
        <div className='flex flex-col gap-4 mb-10'>
          <button
            onClick={() => navigate('/matching/mutual')}
            className='w-full bg-white border border-rose-500 rounded-[24px] h-[90px] px-4 flex items-center justify-between active:scale-[0.99] transition-all group hover:border-rose-600'
          >
            <div className='flex items-center '>
              <div className='w-[68px] h-[68px]  rounded-full flex items-center justify-center flex-shrink-0'>
                <img
                  src={TogetherIcon}
                  alt='together'
                  className='w-full h-full object-contain p-2'
                />
              </div>
              <span className='text-rose-500 font-bold text-[20px]'>
                서로 PICK한 사람 보러가기
              </span>
            </div>
            <svg
              width='10'
              height='20'
              viewBox='0 0 10 20'
              fill='none'
              className='flex-shrink-0'
            >
              <path
                d='M1 1L9 10L1 19'
                stroke='#f43f5e'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </button>

          <button
            onClick={() => navigate('/matching/receive')}
            className='w-full bg-white border border-rose-500 rounded-[24px] h-[90px] px-4 flex items-center justify-between active:scale-[0.99] transition-all hover:border-rose-600'
          >
            <div className='flex items-center'>
              <div className='w-[68px] h-[68px rounded-full flex items-center justify-center flex-shrink-0'>
                <img
                  src={LikeIcon}
                  alt='like'
                  className='w-full h-full object-contain p-2'
                />
              </div>
              <span className='text-rose-500 font-bold text-[20px]'>
                나를 PICK한 사람 보러가기
              </span>
            </div>
            <svg
              width='10'
              height='20'
              viewBox='0 0 10 20'
              fill='none'
              className='flex-shrink-0'
            >
              <path
                d='M1 1L9 10L1 19'
                stroke='#f43f5e'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </button>
        </div>
      )}

      {/* Group Buy Section or Recommendation Section */}
      {!isRecommendOn ? (
        <div className='flex flex-col'>
          {/* Section Title */}
          <div className='mb-6'>
            <h2 className='text-lg font-bold text-gray-800'>
              최근 올라온 공구 확인
            </h2>
          </div>

          {/* Group Buy List */}
          <div className='flex flex-col gap-3 pb-8'>
            {RECENT_GROUP_BUYS.map((groupBuy) => (
              <button
                key={groupBuy.id}
                onClick={() => handleGroupBuyClick(groupBuy.id)}
                className='w-full bg-white border border-rose-500 rounded-[24px] p-4 flex items-center gap-4 hover:border-rose-600 hover:shadow-md active:scale-[0.99] transition-all text-left group'
              >
                {/* Image */}
                <div className='w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center flex-shrink-0'>
                  <span className='text-3xl'>{groupBuy.image}</span>
                </div>

                {/* Content */}
                <div className='flex-1 min-w-0'>
                  <h3 className='text-base font-bold text-gray-900 group-hover:text-rose-500 transition-colors'>
                    {groupBuy.title}
                  </h3>
                </div>

                {/* Arrow */}
                <svg
                  width='10'
                  height='20'
                  viewBox='0 0 10 20'
                  fill='none'
                  className='flex-shrink-0'
                >
                  <path
                    d='M1 1L9 10L1 19'
                    stroke='#f43f5e'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className='flex flex-col'>
          <div className='mb-6'>
            <h2 className='text-lg font-bold text-gray-800 leading-tight'>
              승희님의 성향을 기반으로 도출된
              <br />
              <span className='text-rose-500 border-b-2 border-rose-200'>
                룸메이트 추천 리스트
              </span>
              에요
            </h2>
          </div>

          {/* Scrollable List */}
          <div className='flex overflow-x-auto pb-8 -mx-6 px-6 scrollbar-hide gap-4'>
            {MOCK_ROOMMATES.map((roommate, index) => (
              <RoommateCard
                key={roommate.id}
                {...roommate}
                isLast={index === MOCK_ROOMMATES.length - 1}
                onClick={() => handleCardClick(roommate)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Detail Profile Modal */}
      <DetailProfileModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        profile={selectedRoommate}
        onPick={handlePick}
      />
    </div>
  );
}
