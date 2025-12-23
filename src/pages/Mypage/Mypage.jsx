import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCharacterByGeekBti } from '../../utils/geekBtiCharacter';

// 학기 말인지 확인하는 함수 (예: 12월~1월, 6월~7월)
const isEndOfSemester = () => {
  const month = new Date().getMonth() + 1; // 1-12
  return month === 12 || month === 1 || month === 6 || month === 7;
};

export default function Mypage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [roommate, setRoommate] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL;
        const accessToken = localStorage.getItem('accessToken');

        // 1. My Info
        const userRes = await fetch(`${API_URL}/api/v1/members/me`, {
          method: 'GET',
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        if (userRes.ok) {
          const data = await userRes.json();
          setUser(data.data);
        }

        // 2. Roommate Match Info
        const matchRes = await fetch(
          `${API_URL}/api/v1/match-requests/roommate-matches`,
          {
            method: 'GET',
            headers: { Authorization: `Bearer ${accessToken}` },
          },
        );
        if (matchRes.ok) {
          const matchData = await matchRes.json();
          console.log('Roommate Match:', matchData);
          if (matchData.data && matchData.data.length > 0) {
            // 가장 최근 매칭 정보 사용 (또는 활성화된 매칭)
            // matchData.data[0]이 현재 매칭이라고 가정
            const currentMatch = matchData.data[0];
            // 내가 member1이면 member2가 룸메이트, 반대면 member1이 룸메이트
            // API 응답 구조 상 내 ID를 알아야 정확히 구분 가능하지만,
            // 여기서는 간단히 상대방 이름을 보여주는 로직이 필요함.
            // 일단 임시로 member2 정보를 룸메이트로 간주하거나,
            // user 정보가 로드된 후 ID 비교를 해야 함.

            // 편의상 member2Name이 내 이름과 다르면 member2, 같으면 member1Name을 룸메이트로 설정
            // (user state가 비동기라 바로 비교 어려울 수 있음)
            setRoommate(currentMatch);
          }
        }
      } catch (err) {
        console.error('Failed to fetch info:', err);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    if (window.confirm('로그아웃하시겠습니까?')) {
      localStorage.removeItem('accessToken');
      navigate('/login');
    }
  };

  const handleDeleteAccount = () => {
    if (window.confirm('정말 회원 탈퇴하시겠습니까?')) {
      // TODO: API 호출
      alert('회원 탈퇴가 완료되었습니다.');
      navigate('/login');
    }
  };

  const handleBreakRoommate = () => {
    if (window.confirm('룸메이트 관계를 끊으시겠습니까?')) {
      // TODO: API 호출
      alert('룸메이트 관계가 끊어졌습니다.');
    }
  };

  if (!user) {
    return (
      <div className='w-full flex items-center justify-center min-h-screen text-gray-500'>
        사용자 정보를 불러오는 중...
      </div>
    );
  }

  return (
    <div className='w-full flex flex-col min-h-screen pb-32'>
      {/* Header */}
      <div className='px-6 pt-12 pb-6'>
        <h1 className='text-3xl font-bold text-gray-900'>마이페이지</h1>
      </div>

      {/* Profile Card */}
      <div className='px-6 mb-4'>
        <div className='bg-white rounded-3xl p-6 shadow-sm border border-rose-50'>
          <div className='flex items-start gap-4'>
            <div className='w-16 h-16 bg-rose-400 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden'>
              {getCharacterByGeekBti(user.gikbti) ? (
                <img
                  src={getCharacterByGeekBti(user.gikbti)}
                  alt={user.name}
                  className='w-full h-full object-contain p-2'
                />
              ) : (
                <div className='w-full h-full bg-white/20 flex items-center justify-center'>
                  <span className='text-white text-xs'>?</span>
                </div>
              )}
            </div>
            <div className='flex-1'>
              <h2 className='text-xl font-bold text-gray-900 mb-1'>
                {user.name}
              </h2>
              <p className='text-base text-gray-600 mb-1'>
                {user.major} / {user.grade학년 || '3학년'}
              </p>
              <p className='text-base font-bold text-rose-500'>
                {user.gikbti || 'MCSE'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Roommate Info (If matched) */}
      {roommate && (
        <div className='px-6 mb-4'>
          <div className='bg-rose-50 rounded-3xl p-6 shadow-sm border border-rose-100'>
            <h3 className='text-sm font-bold text-rose-500 mb-3 flex items-center gap-2'>
              <span>🏠</span> 나의 룸메이트
            </h3>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-lg font-bold text-gray-900'>
                  {/* 내 ID와 비교하여 상대방 이름 표시 로직 (간단히 처리) */}
                  {user.id === roommate.member1Id
                    ? roommate.member2Name
                    : roommate.member1Name}
                </p>
                <p className='text-sm text-gray-500'>
                  {user.id === roommate.member1Id
                    ? roommate.member2StudentId
                    : roommate.member1StudentId}
                </p>
              </div>
              <div className='px-3 py-1 bg-white rounded-full text-xs font-bold text-rose-500 border border-rose-200'>
                매칭 완료
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Points Card */}
      <div className='px-6 mb-8'>
        <div className='flex gap-4'>
          {/* Reward Points */}
          <div className='flex-1 bg-white rounded-[32px] p-6 shadow-sm border border-emerald-50 flex flex-col items-center justify-center relative overflow-hidden group'>
            <div className='absolute -right-4 -top-4 w-16 h-16 bg-emerald-500 opacity-5 rounded-full' />
            <span className='text-xs font-black text-emerald-600 mb-2 tracking-widest'>
              상점
            </span>
            <div className='flex items-baseline gap-0.5'>
              <span className='text-4xl font-black text-emerald-500 leading-none'>
                3
              </span>
            </div>
          </div>

          {/* Penalty Points */}
          <div className='flex-1 bg-white rounded-[32px] p-6 shadow-sm border border-rose-50 flex flex-col items-center justify-center relative overflow-hidden'>
            <div className='absolute -right-4 -top-4 w-16 h-16 bg-rose-500 opacity-5 rounded-full' />
            <span className='text-xs font-black text-rose-600 mb-2 tracking-widest'>
              벌점
            </span>
            <div className='flex items-baseline gap-0.5'>
              <span className='text-4xl font-black text-rose-500 leading-none'>
                1
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className='px-6 pb-8 flex flex-col gap-3'>
        {/* 룸메 평가 - 학기 말에만 표시 */}
        {isEndOfSemester() && (
          <button
            onClick={() => navigate('/mypage/roommate-evaluation')}
            className='w-full bg-white rounded-3xl p-5 shadow-sm border border-rose-50 hover:border-rose-200 hover:shadow-md active:scale-[0.99] transition-all text-left group'
          >
            <div className='flex items-center justify-between'>
              <span className='text-base font-bold text-gray-900'>
                룸메 평가
              </span>
              <svg
                width='20'
                height='20'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='text-gray-400 group-hover:text-rose-500 group-hover:translate-x-1 transition-all'
              >
                <polyline points='9 18 15 12 9 6' />
              </svg>
            </div>
          </button>
        )}

        <button
          onClick={() => navigate('/signup/geek-bti')}
          className='w-full bg-white rounded-3xl p-5 shadow-sm border border-rose-50 hover:border-rose-200 hover:shadow-md active:scale-[0.99] transition-all text-left group'
        >
          <div className='flex items-center justify-between'>
            <span className='text-base font-bold text-gray-900'>
              기숙사 생활 유형 재검사
            </span>
            <svg
              width='20'
              height='20'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='text-gray-400 group-hover:text-rose-500 group-hover:translate-x-1 transition-all'
            >
              <polyline points='9 18 15 12 9 6' />
            </svg>
          </div>
        </button>

        <button
          onClick={handleBreakRoommate}
          className='w-full bg-white rounded-3xl p-5 shadow-sm border border-rose-50 hover:border-rose-200 hover:shadow-md active:scale-[0.99] transition-all text-left group'
        >
          <div className='flex items-center justify-between'>
            <span className='text-base font-bold text-gray-900'>룸메 끊기</span>
            <svg
              width='20'
              height='20'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='text-gray-400 group-hover:text-rose-500 group-hover:translate-x-1 transition-all'
            >
              <polyline points='9 18 15 12 9 6' />
            </svg>
          </div>
        </button>

        <button
          onClick={handleLogout}
          className='w-full bg-white rounded-3xl p-5 shadow-sm border border-rose-50 hover:border-rose-200 hover:shadow-md active:scale-[0.99] transition-all text-left group'
        >
          <div className='flex items-center justify-between'>
            <span className='text-base font-bold text-gray-900'>로그아웃</span>
            <svg
              width='20'
              height='20'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='text-gray-400 group-hover:text-rose-500 group-hover:translate-x-1 transition-all'
            >
              <polyline points='9 18 15 12 9 6' />
            </svg>
          </div>
        </button>

        <button
          onClick={handleDeleteAccount}
          className='w-full bg-white rounded-3xl p-5 shadow-sm border border-red-100 hover:border-red-200 hover:shadow-md active:scale-[0.99] transition-all text-left group'
        >
          <div className='flex items-center justify-between'>
            <span className='text-base font-bold text-red-600'>회원 탈퇴</span>
            <svg
              width='20'
              height='20'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='text-red-400 group-hover:text-red-500 group-hover:translate-x-1 transition-all'
            >
              <polyline points='9 18 15 12 9 6' />
            </svg>
          </div>
        </button>
      </div>
    </div>
  );
}
