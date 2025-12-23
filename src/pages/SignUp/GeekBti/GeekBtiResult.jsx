import { useState, useEffect, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const TRAITS = [
  {
    left: { label: 'M', text: '아침형' },
    right: { label: 'N', text: '저녁형' },
    key: 'MN',
  },
  {
    left: { label: 'C', text: '청결형' },
    right: { label: 'D', text: '방치형' },
    key: 'CD',
  },
  {
    left: { label: 'S', text: '예민형' },
    right: { label: 'T', text: '둔감형' },
    key: 'ST',
  },
  {
    left: { label: 'E', text: '외향형' },
    right: { label: 'I', text: '내향형' },
    key: 'EI',
  },
];

export default function GeekBtiResult() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [animatedPercentages, setAnimatedPercentages] = useState([50, 50, 50, 50]);
  
  // API 결과 수신 (없으면 기본값)
  const { result } = location.state || {};
  const resultType = result?.gikbtiType || 'MCSE';

  // 왼쪽(M, C, S, E) 기준의 목표 퍼센트 계산
  const targetPercentages = useMemo(() => {
    return TRAITS.map((trait, index) => {
      const isLeftDominant = resultType.includes(trait.left.label);
      // 인덱스별로 60~100% 사이의 임의 수치 부여
      const baseValues = [70, 60, 80, 100];
      const offset = baseValues[index];
      // 왼쪽이 우세하면 높은 값(70~100), 오른쪽이 우세하면 낮은 값(0~40)
      return isLeftDominant ? offset : (100 - offset);
    });
  }, [resultType]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedPercentages(targetPercentages);
    }, 100);

    const fetchUser = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL;
        const accessToken = localStorage.getItem('accessToken');
        const response = await fetch(`${API_URL}/api/v1/members/me`, {
          method: 'GET',
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        if (response.ok) {
          const data = await response.json();
          setUser(data.data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchUser();
    return () => clearTimeout(timer);
  }, [targetPercentages]);

  const userName = user?.name || '승희';

  // 전체 평균 퍼센트 계산 (우세 성향 기준)
  const averagePercentage = useMemo(() => {
    const sum = targetPercentages.reduce((acc, p) => acc + (p >= 50 ? p : 100 - p), 0);
    return Math.round(sum / 4);
  }, [targetPercentages]);

  const handleNext = () => {
    navigate('/signup/recommendation');
  };

  return (
    <div className='w-full flex flex-col flex-grow items-center pb-10 animate-fade-in px-6'>
      <h1 className='text-white text-xl font-bold mb-8 self-start'>
        {userName}님의 긱BTI는,
      </h1>

      {/* Result Card */}
      <div className='bg-white rounded-[30px] w-full p-8 mb-8 flex flex-col justify-center items-center shadow-md'>
        <span className='text-rose-500 text-5xl font-black tracking-widest mb-1'>
          {resultType}
        </span>
        <span className='text-gray-400 font-bold text-sm'>
          {result?.gikbtiDescription || '아침형-청결형-예민형-외향형'}
        </span>
      </div>

      {/* Trait Sliders */}
      <div className='w-full flex flex-col gap-6'>
        {TRAITS.map((trait, index) => {
          const leftPercentage = animatedPercentages[index];
          // 화면에 표시할 퍼센트: 우세한 쪽의 수치 (무조건 50% 이상으로 표시)
          const displayPercentage = leftPercentage >= 50 ? leftPercentage : 100 - leftPercentage;
          const isLeftWinning = leftPercentage >= 50;

          return (
            <div key={index} className='flex flex-col w-full'>
              <div className='flex items-center justify-between w-full relative h-16'>
                {/* Left Circle */}
                <div className={`z-10 w-16 h-16 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-sm transition-colors duration-500 ${isLeftWinning ? 'bg-rose-400' : 'bg-rose-200'}`}>
                  {trait.left.label}
                </div>

                {/* Progress Bar Background */}
                <div className='absolute left-8 right-8 top-1/2 -translate-y-1/2 h-12 bg-rose-50 rounded-full flex overflow-hidden'>
                  {/* 왼쪽 성향 바 */}
                  <div
                    className={`h-full transition-all duration-1000 ease-out ${isLeftWinning ? 'bg-rose-100' : 'bg-rose-50'}`}
                    style={{ width: `${leftPercentage}%` }}
                  />
                  {/* 오른쪽 성향 바 */}
                  <div
                    className={`h-full transition-all duration-1000 ease-out ${!isLeftWinning ? 'bg-rose-100' : 'bg-rose-50'}`}
                    style={{ width: `${100 - leftPercentage}%` }}
                  />
                </div>

                {/* Percentage Text (Dominant side percentage) */}
                <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 text-rose-300 font-bold text-lg'>
                  {displayPercentage}%
                </div>

                {/* Right Circle */}
                <div className={`z-10 w-16 h-16 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-sm transition-colors duration-500 ${!isLeftWinning ? 'bg-rose-400' : 'bg-rose-200'}`}>
                  {trait.right.label}
                </div>
              </div>

              {/* Labels */}
              <div className='flex justify-between w-full mt-2 px-2'>
                <span className={`font-bold text-lg ${isLeftWinning ? 'text-white' : 'text-white/60'}`}>
                  {trait.left.text}
                </span>
                <span className={`font-bold text-lg ${!isLeftWinning ? 'text-white' : 'text-white/60'}`}>
                  {trait.right.text}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Next Button */}
      <button
        onClick={handleNext}
        className='w-full bg-white/30 hover:bg-white/40 text-white text-lg font-bold p-4 rounded-2xl mt-12 transition-colors backdrop-blur-sm'
      >
        다음
      </button>
    </div>
  );
}
