import { useNavigate } from 'react-router-dom';
import HorizontalRoommateCard from './components/HorizontalRoommateCard';

const MUTUAL_MATCHES = [
  {
    id: 1,
    name: '김다람',
    major: '탐정학과',
    grade: '3학년',
    mbti: 'ENFP',
    quote: '궁금한 건 못 참아! 탐정 다람이의 모험 시작! 같이 야식 먹어요'
  },
  {
    id: 2,
    name: '박시크',
    major: '도시공학과',
    grade: '4학년',
    mbti: 'INTJ',
    quote: '조용하고 깔끔한 분위기를 선호합니다. 배려하며 지내요.'
  },
  {
    id: 3,
    name: '최열정',
    major: '체육학과',
    grade: '2학년',
    mbti: 'ESFJ',
    quote: '아침 운동 같이 하실 분? 활기찬 긱사 생활 기대해요!'
  },
  {
    id: 4,
    name: '이감성',
    major: '문예창작과',
    grade: '1학년',
    mbti: 'INFP',
    quote: '밤에는 주로 글을 씁니다. 서로의 취향을 존중해요.'
  }
];

export default function MutualPick() {
  const navigate = useNavigate();

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
        <h1 className="text-xl font-bold text-gray-900">서로 PICK한 룸메이트</h1>
      </header>

      {/* Content List */}
      <div className="flex-1 px-6 py-6 overflow-y-auto pb-32">
        <div className="flex flex-col gap-4">
          <div className="mb-2">
            <p className="text-sm text-gray-500">
              축하해요! <span className="text-rose-500 font-bold">{MUTUAL_MATCHES.length}명</span>의 친구와 마음이 통했어요 🎉
            </p>
          </div>
          
          {MUTUAL_MATCHES.map((match) => (
            <HorizontalRoommateCard key={match.id} {...match} />
          ))}
        </div>
      </div>
    </div>
  );
}
