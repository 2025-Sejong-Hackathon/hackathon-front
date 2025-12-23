import { useNavigate } from 'react-router-dom';

const MOCK_PARTICIPATING_GROUP_BUYS = [
  {
    id: 1,
    title: '호랑이비빕밥 같이 먹어요',
    category: '한식',
    currentParticipants: 1,
    maxParticipants: 3,
    author: '박승희',
    lastMessage: '비비큐 황금올리브에 치즈볼도 추가할까요?',
    lastMessageTime: '오후 2:30',
    unreadCount: 2,
  },
  {
    id: 2,
    title: '아이깨끗해 공구',
    category: '물품',
    currentParticipants: 2,
    maxParticipants: 5,
    author: '정수진',
    lastMessage: '언제 배송되나요?',
    lastMessageTime: '오전 10:15',
    unreadCount: 0,
  },
];

export default function GroupBuyChatList() {
  const navigate = useNavigate();

  const handleChatClick = (id) => {
    navigate(`/group-buy/${id}/chat`);
  };

  return (
    <div className="w-full flex flex-col min-h-screen">
      {/* Header */}
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
        <h1 className="text-2xl font-bold text-gray-900">참여하고 있는 공동구매</h1>
      </div>

      {/* Chat List */}
      <div className="flex flex-col px-6 pb-8 gap-3">
        {MOCK_PARTICIPATING_GROUP_BUYS.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <p className="text-gray-400 text-lg mb-2">참여 중인 공구가 없습니다</p>
            <p className="text-gray-300 text-sm">공구에 참여해보세요!</p>
          </div>
        ) : (
          MOCK_PARTICIPATING_GROUP_BUYS.map((groupBuy) => (
            <div
              key={groupBuy.id}
              onClick={() => handleChatClick(groupBuy.id)}
              className="w-full bg-white rounded-3xl p-5 shadow-sm border border-rose-50 hover:border-rose-200 hover:shadow-md active:scale-[0.99] transition-all cursor-pointer group"
            >
              <div className="flex items-start gap-4">
                {/* Avatar */}
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                  <span className="text-lg font-bold text-gray-600">
                    {groupBuy.author.charAt(0)}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                          groupBuy.category === '물품' 
                            ? 'bg-blue-100 text-blue-600' 
                            : 'bg-rose-100 text-rose-600'
                        }`}>
                          {groupBuy.category}
                        </span>
                        <h3 className="text-base font-bold text-gray-900 line-clamp-1">
                          {groupBuy.title}
                        </h3>
                      </div>
                      <p className="text-sm text-gray-500 mb-1">게시자: {groupBuy.author}</p>
                    </div>
                    {groupBuy.unreadCount > 0 && (
                      <span className="ml-2 px-2 py-0.5 bg-rose-500 text-white text-xs font-bold rounded-full flex-shrink-0">
                        {groupBuy.unreadCount}
                      </span>
                    )}
                  </div>

                  {/* Last Message */}
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm text-gray-600 line-clamp-1 flex-1">
                      {groupBuy.lastMessage}
                    </p>
                    <span className="text-xs text-gray-400 flex-shrink-0">
                      {groupBuy.lastMessageTime}
                    </span>
                  </div>

                  {/* Participants Info */}
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex-1 bg-gray-100 rounded-full h-1.5 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${
                          groupBuy.currentParticipants === groupBuy.maxParticipants
                            ? 'bg-green-500'
                            : 'bg-rose-500'
                        }`}
                        style={{
                          width: `${(groupBuy.currentParticipants / groupBuy.maxParticipants) * 100}%`,
                        }}
                      />
                    </div>
                    <span className="text-xs font-semibold text-gray-600">
                      {groupBuy.currentParticipants}/{groupBuy.maxParticipants}명
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

