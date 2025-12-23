import { useNavigate } from 'react-router-dom';

const MOCK_NEWS = [
  {
    id: 1,
    title: '[기숙사] 2025학년도 2학기 행복기숙사 퇴사 시 금액 환불 안내',
    date: '2025.10.30',
    category: '기숙사',
    content:
      '2025학년도 2학기 행복기숙사 퇴사 시 금액 환불에 대한 안내입니다. 퇴사 신청은 기숙사 사무실에서 접수받고 있으며, 환불 금액은 입사 시 납부한 보증금 기준으로 계산됩니다.',
  },
  {
    id: 2,
    title: '[기숙사] 2025학년도 2학기 기숙사 입사 안내',
    date: '2025.10.25',
    category: '기숙사',
    content: '2025학년도 2학기 기숙사 입사 일정 및 절차에 대한 안내입니다.',
  },
  {
    id: 3,
    title: '[기숙사] 기숙사 방 청소 및 정리 안내',
    date: '2025.10.20',
    category: '기숙사',
    content: '기숙사 방 청소 및 정리에 대한 안내입니다.',
  },
  {
    id: 4,
    title: '[기숙사] 기숙사 시설 점검 안내',
    date: '2025.10.15',
    category: '기숙사',
    content: '기숙사 시설 점검 일정 및 안내사항입니다.',
  },
];

export default function NewsList() {
  const navigate = useNavigate();

  const handleNewsClick = (newsId) => {
    navigate(`/news/${newsId}`);
  };

  return (
    <div className='w-full flex flex-col min-h-screen'>
      {/* Header */}
      <div className='px-6 pt-12 pb-8'>
        <h1 className='text-3xl font-bold text-gray-900 mb-2'>기숙사 소식</h1>
        <p className='text-gray-500 text-sm'>
          최신 기숙사 공지사항을 확인하세요
        </p>
      </div>

      {/* News List */}
      <div className='flex flex-col px-6 pb-8 gap-4'>
        {MOCK_NEWS.map((news) => (
          <div
            key={news.id}
            onClick={() => handleNewsClick(news.id)}
            className='w-full bg-white rounded-3xl p-5 shadow-sm border border-rose-50 hover:border-rose-200 hover:shadow-md active:scale-[0.99] transition-all cursor-pointer group'
          >
            <div className='flex items-start justify-between gap-3 mb-3'>
              <div className='flex-1 min-w-0'>
                <div className='flex items-center gap-2 mb-2'>
                  <span className='px-2.5 py-1 bg-rose-100 text-rose-600 text-xs font-semibold rounded-full'>
                    {news.category}
                  </span>
                </div>
                <h2 className='text-base font-semibold text-gray-900 line-clamp-2 group-hover:text-rose-500 transition-colors'>
                  {news.title}
                </h2>
              </div>
              <svg
                width='20'
                height='20'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='text-gray-400 group-hover:text-rose-500 group-hover:translate-x-1 transition-all flex-shrink-0 mt-1'
              >
                <polyline points='9 18 15 12 9 6' />
              </svg>
            </div>
            <div className='flex items-center gap-2'>
              <svg
                width='14'
                height='14'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='text-gray-400'
              >
                <circle cx='12' cy='12' r='10' />
                <polyline points='12 6 12 12 16 14' />
              </svg>
              <p className='text-sm font-medium text-gray-500'>{news.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
