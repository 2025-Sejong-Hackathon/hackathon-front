import { useParams, useNavigate } from 'react-router-dom';

const MOCK_NEWS = [
  {
    id: 1,
    title: '[기숙사] 2025학년도 2학기 행복기숙사 퇴사 시 금액 환불 안내',
    date: '2025.10.30',
    category: '기숙사',
    content: `2025학년도 2학기 행복기숙사 퇴사 시 금액 환불에 대한 안내입니다.

퇴사 신청은 기숙사 사무실에서 접수받고 있으며, 환불 금액은 입사 시 납부한 보증금 기준으로 계산됩니다.

1. 퇴사 신청 기간
   - 2025년 11월 1일 ~ 11월 30일

2. 환불 금액 계산 기준
   - 입사 시 납부한 보증금 기준으로 계산
   - 실제 거주 기간에 따라 일할 계산

3. 환불 절차
   - 퇴사 신청서 제출
   - 방 청소 및 시설 점검
   - 환불 금액 확인 및 지급

문의사항이 있으시면 기숙사 사무실로 연락 바랍니다.`
  },
  {
    id: 2,
    title: '[기숙사] 2025학년도 2학기 기숙사 입사 안내',
    date: '2025.10.25',
    category: '기숙사',
    content: '2025학년도 2학기 기숙사 입사 일정 및 절차에 대한 안내입니다.'
  },
  {
    id: 3,
    title: '[기숙사] 기숙사 방 청소 및 정리 안내',
    date: '2025.10.20',
    category: '기숙사',
    content: '기숙사 방 청소 및 정리에 대한 안내입니다.'
  },
  {
    id: 4,
    title: '[기숙사] 기숙사 시설 점검 안내',
    date: '2025.10.15',
    category: '기숙사',
    content: '기숙사 시설 점검 일정 및 안내사항입니다.'
  }
];

export default function NewsDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const news = MOCK_NEWS.find((item) => item.id === parseInt(id));

  if (!news) {
    return (
      <div className="w-full flex flex-col items-center justify-center min-h-screen p-6">
        <div className="bg-white rounded-3xl p-8 shadow-md border border-rose-100 text-center">
          <p className="text-gray-500 mb-4">소식을 찾을 수 없습니다.</p>
          <button
            onClick={() => navigate('/news')}
            className="px-6 py-3 bg-rose-500 hover:bg-rose-600 text-white font-semibold rounded-2xl transition-colors"
          >
            목록으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col min-h-screen">
      {/* Header with Back Button */}
      <div className="px-6 pt-12 pb-6 flex items-center gap-4">
        <button
          onClick={() => navigate('/news')}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-rose-50 transition-colors group"
        >
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="text-gray-700 group-hover:text-rose-500 transition-colors"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
      </div>

      {/* Content Card */}
      <div className="flex-1 px-6 pb-8">
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-rose-50">
          {/* Category Badge */}
          <div className="mb-4">
            <span className="px-3 py-1.5 bg-rose-100 text-rose-600 text-sm font-semibold rounded-full inline-block">
              {news.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-xl font-bold text-gray-900 mb-4 leading-tight">
            {news.title}
          </h1>

          {/* Date */}
          <div className="flex items-center gap-2 mb-6 pb-6 border-b border-gray-100">
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="text-gray-400"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <p className="text-sm font-medium text-gray-500">
              {news.date}
            </p>
          </div>

          {/* Content */}
          <div className="text-base text-gray-700 leading-relaxed whitespace-pre-line">
            {news.content}
          </div>
        </div>
      </div>
    </div>
  );
}

