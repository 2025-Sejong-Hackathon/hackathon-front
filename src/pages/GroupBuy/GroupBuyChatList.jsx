import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function GroupBuyChatList() {
  const navigate = useNavigate();
  const [groupBuys, setGroupBuys] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJoinedGroupBuys = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL;
        const accessToken = localStorage.getItem('accessToken');
        const response = await fetch(`${API_URL}/api/v1/groupbuys/joined`, {
          method: 'GET',
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        if (response.ok) {
          const data = await response.json();
          // API 응답 데이터 매핑
          const mappedData = data.data.map(item => ({
            id: item.id,
            title: item.title,
            category: item.categoryName,
            currentParticipants: item.currentCount,
            maxParticipants: item.targetCount,
            author: item.memberName,
            lastMessage: '채팅방이 생성되었습니다.', // API 미지원으로 임시 텍스트
            lastMessageTime: new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            unreadCount: 0,
          }));
          setGroupBuys(mappedData);
        }
      } catch (err) {
        console.error('Failed to fetch joined group buys:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchJoinedGroupBuys();
  }, []);

  const handleChatClick = (groupBuy) => {
    // 공동구매 전용 채팅방으로 이동 (공구 제목을 같이 전달)
    navigate(`/group-buy/${groupBuy.id}/chat`, { state: { title: groupBuy.title } });
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
        {loading ? (
          <div className="text-center py-10 text-gray-400">로딩 중...</div>
        ) : groupBuys.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <p className="text-gray-400 text-lg mb-2">참여 중인 공구가 없습니다</p>
            <p className="text-gray-300 text-sm">공구에 참여해보세요!</p>
          </div>
        ) : (
          groupBuys.map((groupBuy) => (
            <div
              key={groupBuy.id}
              onClick={() => handleChatClick(groupBuy)}
              className='w-full bg-white rounded-3xl p-5 shadow-sm border border-rose-50 hover:border-rose-200 hover:shadow-md active:scale-[0.99] transition-all cursor-pointer group'
            >
              <div className="flex items-start gap-4">
                {/* Avatar */}
                <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-lg font-bold text-rose-500">
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

