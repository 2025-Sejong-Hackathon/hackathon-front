import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function GroupBuyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [groupBuy, setGroupBuy] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isJoined, setIsJoined] = useState(false);

  // 데이터 조회
  useEffect(() => {
    const fetchData = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL;
        const accessToken = localStorage.getItem('accessToken');

        // 1. 내 정보 조회
        const userRes = await fetch(`${API_URL}/api/v1/members/me`, {
          method: 'GET',
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        let userData = null;
        if (userRes.ok) {
          const data = await userRes.json();
          userData = data.data;
          setUser(userData);
        }

        // 2. 공구 상세 조회
        const groupBuyRes = await fetch(`${API_URL}/api/v1/groupbuys/${id}`, {
          method: 'GET',
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        
        if (groupBuyRes.ok) {
          const data = await groupBuyRes.json();
          setGroupBuy(data.data);
        }

        // 3. 참여 여부 확인 (참여자 목록 조회)
        const membersRes = await fetch(`${API_URL}/api/v1/groupbuys/${id}/members`, {
          method: 'GET',
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        if (membersRes.ok && userData) {
          const membersData = await membersRes.json();
          // 멤버 리스트가 문자열(이름)인지 ID인지 API 명세 확인 필요 (ListString)
          // 여기서는 이름 리스트라고 가정하고 내 이름이 있는지 확인
          // 만약 ID 리스트라면 ID 비교 필요. API 명세엔 ListString이라 되어 있음.
          if (membersData.data.includes(userData.name)) {
            setIsJoined(true);
          }
        }

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleJoin = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_URL;
      const accessToken = localStorage.getItem('accessToken');
      const response = await fetch(`${API_URL}/api/v1/groupbuys/${id}/join`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (response.ok) {
        alert('공동구매에 참여했습니다!');
        window.location.reload(); // 간단히 새로고침하여 상태 업데이트
      } else {
        const err = await response.json();
        alert(err.message || '참여에 실패했습니다.');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleLeave = async () => {
    if (!window.confirm('정말 참여를 취소하시겠습니까?')) return;
    try {
      const API_URL = import.meta.env.VITE_API_URL;
      const accessToken = localStorage.getItem('accessToken');
      const response = await fetch(`${API_URL}/api/v1/groupbuys/${id}/leave`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (response.ok) {
        alert('참여를 취소했습니다.');
        window.location.reload();
      } else {
        alert('취소에 실패했습니다.');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;
    try {
      const API_URL = import.meta.env.VITE_API_URL;
      const accessToken = localStorage.getItem('accessToken');
      const response = await fetch(`${API_URL}/api/v1/groupbuys/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (response.ok) {
        alert('삭제되었습니다.');
        navigate('/group-buy');
      } else {
        alert('삭제에 실패했습니다.');
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="flex justify-center items-center min-h-screen">로딩 중...</div>;

  if (!groupBuy) {
    return (
      <div className='w-full flex flex-col items-center justify-center min-h-screen p-6'>
        <div className='bg-white rounded-3xl p-8 shadow-md border border-rose-100 text-center'>
          <p className='text-gray-500 mb-4'>공구를 찾을 수 없습니다.</p>
          <button
            onClick={() => navigate('/group-buy')}
            className='px-6 py-3 bg-rose-500 hover:bg-rose-600 text-white font-semibold rounded-2xl transition-colors'
          >
            목록으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  const isAuthor = user && groupBuy.memberId === user.id;
  const isFull = groupBuy.currentCount >= groupBuy.targetCount;
  const progressPercentage = Math.min((groupBuy.currentCount / groupBuy.targetCount) * 100, 100);

  // description에서 링크 추출 (간단한 파싱)
  const descParts = groupBuy.description.split('[제품 링크]:');
  const descriptionText = descParts[0];
  const productLink = descParts.length > 1 ? descParts[1].trim() : '';

  return (
    <div className='w-full flex flex-col min-h-screen'>
      {/* Header with Back Button */}
      <div className='px-6 pt-12 pb-6 flex items-center gap-4'>
        <button
          onClick={() => navigate('/group-buy')}
          className='w-10 h-10 flex items-center justify-center rounded-full hover:bg-rose-50 transition-colors group'
        >
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2.5'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='text-gray-700 group-hover:text-rose-500 transition-colors'
          >
            <polyline points='15 18 9 12 15 6' />
          </svg>
        </button>
        <h1 className='text-xl font-bold text-gray-900 flex-1 line-clamp-1'>
          {groupBuy.title}
        </h1>
      </div>

      {/* Content Card */}
      <div className='flex-1 px-6 pb-8'>
        <div className='bg-white rounded-3xl p-6 shadow-sm border border-rose-50'>
          {/* Category Badge */}
          <div className='mb-4'>
            <span
              className={`px-3 py-1.5 rounded-full text-sm font-semibold ${
                groupBuy.categoryName === '물품'
                  ? 'bg-blue-100 text-blue-600'
                  : 'bg-rose-100 text-rose-600'
              }`}
            >
              {groupBuy.categoryName}
            </span>
          </div>

          {/* Author */}
          <div className='mb-4 pb-4 border-b border-gray-100'>
            <p className='text-base font-semibold text-gray-700'>
              게시자: <span className='text-gray-900'>{groupBuy.memberName}</span>
            </p>
          </div>

          {/* Description */}
          <div className='mb-6'>
            <h3 className='text-sm font-semibold text-gray-500 mb-2'>설명</h3>
            <p className='text-base text-gray-700 leading-relaxed whitespace-pre-line'>
              {descriptionText}
            </p>
          </div>

          {/* Product Link */}
          {productLink && (
            <div className='mb-6'>
              <h3 className='text-sm font-semibold text-gray-500 mb-2'>
                제품 링크
              </h3>
              <a
                href={productLink}
                target='_blank'
                rel='noopener noreferrer'
                className='text-base text-rose-500 hover:text-rose-600 underline break-all'
              >
                {productLink}
              </a>
            </div>
          )}

          {/* Participants Progress */}
          <div className='mb-6'>
            <div className='flex items-center justify-between mb-2'>
              <h3 className='text-sm font-semibold text-gray-500'>모집 인원</h3>
              <span
                className={`text-base font-bold ${
                  isFull ? 'text-green-600' : 'text-rose-500'
                }`}
              >
                {groupBuy.currentCount}/{groupBuy.targetCount}명
              </span>
            </div>
            <div className='w-full bg-gray-100 rounded-full h-3 overflow-hidden'>
              <div
                className={`h-full rounded-full transition-all ${
                  isFull ? 'bg-green-500' : 'bg-rose-500'
                }`}
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            {isFull && (
              <p className='text-sm text-green-600 font-medium mt-2'>
                모집 완료!
              </p>
            )}
          </div>

          {/* Deadline (임시: 생성일 표시) */}
          <div className='mb-6 pb-6 border-b border-gray-100'>
            <div className='flex items-center gap-2'>
              <svg
                width='16'
                height='16'
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
              <p className='text-sm text-gray-500'>
                등록일: <span className='font-semibold'>{new Date(groupBuy.createdAt).toLocaleDateString()}</span>
              </p>
            </div>
          </div>

          {/* Action Button */}
          {isAuthor ? (
            <div className='flex gap-3'>
              <button
                className='flex-1 bg-gray-100 text-gray-500 font-bold py-4 rounded-2xl cursor-default'
              >
                작성자입니다
              </button>
              <button 
                onClick={handleDelete}
                className='px-6 bg-rose-100 hover:bg-rose-200 text-rose-600 font-bold py-4 rounded-2xl transition-colors'
              >
                삭제
              </button>
            </div>
          ) : isJoined ? (
             <button
              onClick={handleLeave}
              className='w-full bg-gray-200 hover:bg-gray-300 text-gray-600 font-bold py-4 rounded-2xl transition-colors shadow-sm'
            >
              참여 취소하기
            </button>
          ) : (
            <button
              onClick={handleJoin}
              disabled={isFull}
              className={`w-full font-bold py-4 rounded-2xl transition-colors shadow-sm ${
                isFull
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-rose-500 hover:bg-rose-600 text-white'
              }`}
            >
              {isFull ? '모집 완료' : '참여하기'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
