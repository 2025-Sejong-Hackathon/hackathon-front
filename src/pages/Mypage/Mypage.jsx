import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileIcon from '../../assets/profile.svg';

// 학기 말인지 확인하는 함수 (예: 12월~1월, 6월~7월)
const isEndOfSemester = () => {
  const month = new Date().getMonth() + 1; // 1-12
  return month === 12 || month === 1 || month === 6 || month === 7;
};

export default function Mypage() {
  const navigate = useNavigate();
  
  // 개발 단계: 목업 데이터 사용
  const user = {
    name: '박승희',
    major: '컴퓨터공학과',
    grade: '3학년',
    geekBti: 'MCSE',
    rewardPoints: 3,
    penaltyPoints: 1,
  };

  const handleLogout = () => {
    if (window.confirm('로그아웃하시겠습니까?')) {
      // TODO: API 호출
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

  return (
    <div className="w-full flex flex-col min-h-screen">
      {/* Header */}
      <div className="px-6 pt-12 pb-6">
        <h1 className="text-3xl font-bold text-gray-900">마이페이지</h1>
      </div>

      {/* Profile Card */}
      <div className="px-6 mb-4">
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-rose-50">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-rose-400 rounded-full flex items-center justify-center flex-shrink-0">
              <img src={ProfileIcon} alt="Profile" className="w-10 h-10" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-900 mb-1">
                {user.name}
              </h2>
              <p className="text-base text-gray-600 mb-1">
                {user.major} / {user.grade || '3학년'}
              </p>
              <p className="text-base font-bold text-rose-500">
                {user.geekBti || 'MCSE'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Points Card */}
      <div className="px-6 mb-6">
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-rose-50">
          <h3 className="text-base font-bold text-gray-900 mb-4">상/벌점</h3>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-xl">+</span>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-0.5">상점</p>
                <p className="text-xl font-bold text-green-600">
                  {user.rewardPoints || 3}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <span className="text-xl">-</span>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-0.5">벌점</p>
                <p className="text-xl font-bold text-red-600">
                  {user.penaltyPoints || 1}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="px-6 pb-8 flex flex-col gap-3">
        {/* 룸메 평가 - 학기 말에만 표시 */}
        {isEndOfSemester() && (
          <button
            onClick={() => navigate('/mypage/roommate-evaluation')}
            className="w-full bg-white rounded-3xl p-5 shadow-sm border border-rose-50 hover:border-rose-200 hover:shadow-md active:scale-[0.99] transition-all text-left group"
          >
            <div className="flex items-center justify-between">
              <span className="text-base font-bold text-gray-900">룸메 평가</span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-400 group-hover:text-rose-500 group-hover:translate-x-1 transition-all"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </div>
          </button>
        )}

        <button
          onClick={() => navigate('/signup/geek-bti')}
          className="w-full bg-white rounded-3xl p-5 shadow-sm border border-rose-50 hover:border-rose-200 hover:shadow-md active:scale-[0.99] transition-all text-left group"
        >
          <div className="flex items-center justify-between">
            <span className="text-base font-bold text-gray-900">
              기숙사 생활 유형 재검사
            </span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-400 group-hover:text-rose-500 group-hover:translate-x-1 transition-all"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </div>
        </button>

        <button
          onClick={handleBreakRoommate}
          className="w-full bg-white rounded-3xl p-5 shadow-sm border border-rose-50 hover:border-rose-200 hover:shadow-md active:scale-[0.99] transition-all text-left group"
        >
          <div className="flex items-center justify-between">
            <span className="text-base font-bold text-gray-900">룸메 끊기</span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-400 group-hover:text-rose-500 group-hover:translate-x-1 transition-all"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </div>
        </button>

        <button
          onClick={handleLogout}
          className="w-full bg-white rounded-3xl p-5 shadow-sm border border-rose-50 hover:border-rose-200 hover:shadow-md active:scale-[0.99] transition-all text-left group"
        >
          <div className="flex items-center justify-between">
            <span className="text-base font-bold text-gray-900">로그아웃</span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-400 group-hover:text-rose-500 group-hover:translate-x-1 transition-all"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </div>
        </button>

        <button
          onClick={handleDeleteAccount}
          className="w-full bg-white rounded-3xl p-5 shadow-sm border border-red-100 hover:border-red-200 hover:shadow-md active:scale-[0.99] transition-all text-left group"
        >
          <div className="flex items-center justify-between">
            <span className="text-base font-bold text-red-600">회원 탈퇴</span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-red-400 group-hover:text-red-500 group-hover:translate-x-1 transition-all"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </div>
        </button>
      </div>
    </div>
  );
}

