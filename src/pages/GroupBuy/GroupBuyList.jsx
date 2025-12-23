import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EditPencilIcon from '../../assets/Edit Pencil.svg';
import ChatBubbleIcon from '../../assets/Chat Bubble.svg';

export default function GroupBuyList() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState({ id: 'ALL', name: '전체' });
  const [categories, setCategories] = useState([{ id: 'ALL', name: '전체' }]);
  const [groupBuys, setGroupBuys] = useState([]);
  const [loading, setLoading] = useState(true);

  // 카테고리 목록 조회
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL;
        const accessToken = localStorage.getItem('accessToken');
        const response = await fetch(`${API_URL}/api/v1/groupbuys/categories`, {
          method: 'GET',
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        if (response.ok) {
          const data = await response.json();
          // 전체 카테고리 추가
          setCategories([{ id: 'ALL', name: '전체' }, ...data.data]);
        }
      } catch (err) {
        console.error('Failed to fetch categories:', err);
      }
    };
    fetchCategories();
  }, []);

  // 공구 목록 조회 (카테고리 변경 시 호출)
  useEffect(() => {
    const fetchGroupBuys = async () => {
      setLoading(true);
      try {
        const API_URL = import.meta.env.VITE_API_URL;
        const accessToken = localStorage.getItem('accessToken');
        let url = `${API_URL}/api/v1/groupbuys`;
        
        // 특정 카테고리 선택 시 해당 API 호출
        if (selectedCategory.id !== 'ALL') {
          url = `${API_URL}/api/v1/groupbuys/category/${selectedCategory.id}`;
        }

        const response = await fetch(url, {
          method: 'GET',
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        if (response.ok) {
          const data = await response.json();
          // API 응답 매핑
          const mappedData = data.data.content.map(item => ({
            id: item.id,
            title: item.title,
            category: item.categoryName, // API 응답에 categoryName이 있다고 가정 (apidocs 참조)
            currentParticipants: item.currentCount,
            maxParticipants: item.targetCount,
            author: item.memberName,
            deadline: new Date(item.createdAt).toLocaleDateString(), // 생성일 또는 마감일 로직 필요 (API엔 deadline 없음, 임시로 createdAt 사용)
            status: item.status
          }));
          setGroupBuys(mappedData);
        }
      } catch (err) {
        console.error('Failed to fetch group buys:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchGroupBuys();
  }, [selectedCategory]);

  const handleGroupBuyClick = (id) => {
    navigate(`/group-buy/${id}`);
  };

  return (
    <div className='w-full flex flex-col min-h-screen'>
      {/* Header */}
      <div className='px-6 pt-12 pb-6 flex items-center justify-between'>
        <h1 className='text-3xl font-bold text-gray-900'>공동 구매</h1>
        <button
          onClick={() => navigate('/group-buy/create')}
          className='w-12 h-12 flex items-center justify-center transition-opacity hover:opacity-80 active:opacity-60'
        >
          <img
            src={EditPencilIcon}
            alt='작성'
            className='w-full h-full object-contain'
          />
        </button>
      </div>

      {/* Category Filter */}
      <div className='px-6 pb-4'>
        <div className='flex gap-3 overflow-x-auto scrollbar-hide pb-2'>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-base font-medium whitespace-nowrap transition-all ${
                selectedCategory.id === category.id
                  ? 'bg-rose-500 text-white shadow-sm'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-rose-200'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Group Buy List */}
      <div className='flex flex-col px-6 pb-32 gap-3'>
        {loading ? (
           <div className='flex justify-center py-10 text-gray-400'>로딩 중...</div>
        ) : groupBuys.length === 0 ? (
          <div className='flex flex-col items-center justify-center py-16'>
            <p className='text-gray-400 text-lg mb-2'>등록된 공구가 없습니다</p>
            <p className='text-gray-300 text-sm'>첫 공구를 등록해보세요!</p>
          </div>
        ) : (
          groupBuys.map((groupBuy) => (
            <div
              key={groupBuy.id}
              onClick={() => handleGroupBuyClick(groupBuy.id)}
              className='w-full bg-white rounded-3xl p-5 shadow-sm border border-rose-50 hover:border-rose-200 hover:shadow-md active:scale-[0.99] transition-all cursor-pointer group'
            >
              <div className='flex items-start justify-between gap-3 mb-3'>
                <div className='flex-1 min-w-0'>
                  <div className='flex items-center gap-2 mb-2'>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        groupBuy.category === '물품' // 카테고리 이름에 따라 색상 분기 로직 수정 필요할 수 있음
                          ? 'bg-blue-100 text-blue-600'
                          : 'bg-rose-100 text-rose-600'
                      }`}
                    >
                      {groupBuy.category}
                    </span>
                  </div>
                  <h2 className='text-lg font-bold text-gray-900 line-clamp-1 group-hover:text-rose-500 transition-colors mb-1'>
                    {groupBuy.title}
                  </h2>
                  <p className='text-sm text-gray-500 mb-2'>
                    게시자: {groupBuy.author}
                  </p>
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

              {/* Participants Info */}
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                  <div className='flex-1 bg-gray-100 rounded-full h-2 overflow-hidden'>
                    <div
                      className={`h-full rounded-full transition-all ${
                        groupBuy.currentParticipants ===
                        groupBuy.maxParticipants
                          ? 'bg-green-500'
                          : groupBuy.currentParticipants > 0
                            ? 'bg-rose-500'
                            : 'bg-gray-300'
                      }`}
                      style={{
                        width: `${(groupBuy.currentParticipants / groupBuy.maxParticipants) * 100}%`,
                      }}
                    />
                  </div>
                  <span className='text-sm font-semibold text-gray-700 min-w-[50px]'>
                    {groupBuy.currentParticipants}/{groupBuy.maxParticipants}명
                  </span>
                </div>
                <span className='text-xs text-gray-400'>
                  {groupBuy.deadline}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Floating Chat Button */}
      <button
        onClick={() => navigate('/group-buy/chats')}
        className='fixed bottom-[120px] right-6 w-14 h-14 bg-rose-300 hover:bg-rose-400 rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 active:scale-95 z-40'
        style={{ maxWidth: 'calc(100vw - 3rem)' }}
      >
        <img
          src={ChatBubbleIcon}
          alt='채팅'
          className='w-10 h-10 object-contain'
        />
      </button>
    </div>
  );
}
