import { useParams, useNavigate } from 'react-router-dom';

const MOCK_GROUP_BUYS = [
  {
    id: 1,
    title: '호랑이 비빔밥 같이 먹어요!',
    category: '한식',
    author: '박승희',
    description: '호랑이 비빔밥 같이 시켜 드실 분!\n5시30분 까지 모집합니다!',
    productLink: 'https://hi-hello-kill-me.com',
    currentParticipants: 1,
    maxParticipants: 3,
    deadline: '5시 30분까지',
    isAuthor: false,
  },
  {
    id: 2,
    title: '호랑이 비빔밥 같이 먹어요!',
    category: '한식',
    author: '박승희',
    description: '호랑이 비빔밥 같이 시켜 드실 분!\n5시30분 까지 모집합니다!',
    productLink: 'https://hi-hello-kill-me.com',
    currentParticipants: 2,
    maxParticipants: 3,
    deadline: '6시까지',
    isAuthor: true,
  },
];

export default function GroupBuyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const groupBuy = MOCK_GROUP_BUYS.find((item) => item.id === parseInt(id));

  if (!groupBuy) {
    return (
      <div className="w-full flex flex-col items-center justify-center min-h-screen p-6">
        <div className="bg-white rounded-3xl p-8 shadow-md border border-rose-100 text-center">
          <p className="text-gray-500 mb-4">공구를 찾을 수 없습니다.</p>
          <button
            onClick={() => navigate('/group-buy')}
            className="px-6 py-3 bg-rose-500 hover:bg-rose-600 text-white font-semibold rounded-2xl transition-colors"
          >
            목록으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  const isFull = groupBuy.currentParticipants === groupBuy.maxParticipants;
  const progressPercentage = (groupBuy.currentParticipants / groupBuy.maxParticipants) * 100;

  return (
    <div className="w-full flex flex-col min-h-screen">
      {/* Header with Back Button */}
      <div className="px-6 pt-12 pb-6 flex items-center gap-4">
        <button
          onClick={() => navigate('/group-buy')}
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
        <h1 className="text-xl font-bold text-gray-900 flex-1 line-clamp-1">
          {groupBuy.title}
        </h1>
      </div>

      {/* Content Card */}
      <div className="flex-1 px-6 pb-8">
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-rose-50">
          {/* Category Badge */}
          <div className="mb-4">
            <span className={`px-3 py-1.5 rounded-full text-sm font-semibold ${
              groupBuy.category === '물품' 
                ? 'bg-blue-100 text-blue-600' 
                : 'bg-rose-100 text-rose-600'
            }`}>
              {groupBuy.category}
            </span>
          </div>

          {/* Author */}
          <div className="mb-4 pb-4 border-b border-gray-100">
            <p className="text-base font-semibold text-gray-700">
              게시자: <span className="text-gray-900">{groupBuy.author}</span>
            </p>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-500 mb-2">설명</h3>
            <p className="text-base text-gray-700 leading-relaxed whitespace-pre-line">
              {groupBuy.description}
            </p>
          </div>

          {/* Product Link */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-500 mb-2">제품 링크</h3>
            <a
              href={groupBuy.productLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-base text-rose-500 hover:text-rose-600 underline break-all"
            >
              {groupBuy.productLink}
            </a>
          </div>

          {/* Participants Progress */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-gray-500">모집 인원</h3>
              <span className={`text-base font-bold ${
                isFull ? 'text-green-600' : 'text-rose-500'
              }`}>
                {groupBuy.currentParticipants}/{groupBuy.maxParticipants}명
              </span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${
                  isFull ? 'bg-green-500' : 'bg-rose-500'
                }`}
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            {isFull && (
              <p className="text-sm text-green-600 font-medium mt-2">모집 완료!</p>
            )}
          </div>

          {/* Deadline */}
          <div className="mb-6 pb-6 border-b border-gray-100">
            <div className="flex items-center gap-2">
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
              <p className="text-sm text-gray-500">
                마감: <span className="font-semibold">{groupBuy.deadline}</span>
              </p>
            </div>
          </div>

          {/* Action Button */}
          {groupBuy.isAuthor ? (
            <div className="flex gap-3">
              <button
                onClick={() => navigate(`/group-buy/${id}/chat`)}
                className="flex-1 bg-rose-500 hover:bg-rose-600 text-white font-bold py-4 rounded-2xl transition-colors shadow-sm"
              >
                단체방 참여하기
              </button>
              <button
                className="px-6 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-4 rounded-2xl transition-colors"
              >
                삭제
              </button>
            </div>
          ) : (
            <button
              onClick={() => navigate(`/group-buy/${id}/chat`)}
              disabled={isFull}
              className={`w-full font-bold py-4 rounded-2xl transition-colors shadow-sm ${
                isFull
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-rose-500 hover:bg-rose-600 text-white'
              }`}
            >
              {isFull ? '모집 완료' : '대화 참여하기'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

