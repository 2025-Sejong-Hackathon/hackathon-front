import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TRAITS = [
  {
    left: { label: 'M', text: '아침형' },
    right: { label: 'N', text: '저녁형' },
    percentage: 60,
    key: 'MN',
  },
  {
    left: { label: 'C', text: '청결형' },
    right: { label: 'D', text: '방치형' },
    percentage: 100,
    key: 'CD',
  },
  {
    left: { label: 'S', text: '예민형' },
    right: { label: 'T', text: '둔감형' },
    percentage: 70,
    key: 'ST',
  },
  {
    left: { label: 'E', text: '외향형' },
    right: { label: 'I', text: '내향형' },
    percentage: 70,
    key: 'EI',
  },
];

export default function GeekBtiResult() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
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
          setUser(data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchUser();
  }, []);

  const userName = user?.name || '승희';

  const handleNext = () => {
    console.log('Navigating to /signup/recommendation');
    navigate('/signup/recommendation');
  };

  return (
    <div className='w-full flex flex-col flex-grow items-center pb-10 animate-fade-in'>
      <h1 className='text-white text-xl font-bold mb-8 self-start pl-4'>
        {userName}님의 긱BTI는,
      </h1>

      {/* Result Card */}
      <div className='bg-white rounded-[30px] w-full p-8 mb-8 flex justify-center items-center shadow-md'>
        <span className='text-rose-500 text-5xl font-black tracking-widest'>
          MCSE
        </span>
      </div>

      {/* Trait Sliders */}
      <div className='w-full flex flex-col gap-6'>
        {TRAITS.map((trait, index) => (
          <div key={index} className='flex flex-col w-full'>
            <div className='flex items-center justify-between w-full relative h-16'>
              {/* Left Circle */}
              <div className='z-10 w-16 h-16 rounded-full bg-rose-400 flex items-center justify-center text-white text-3xl font-bold shadow-sm'>
                {trait.left.label}
              </div>

              {/* Progress Bar Background */}
              <div className='absolute left-8 right-8 top-1/2 -translate-y-1/2 h-12 bg-rose-50 rounded-full flex overflow-hidden'>
                <div
                  className='h-full bg-rose-50'
                  style={{ width: `${trait.percentage}%` }}
                />
                <div
                  className='h-full bg-rose-200'
                  style={{ width: `${100 - trait.percentage}%` }}
                />
              </div>

              {/* Percentage Text (Centered absolutely) */}
              <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 text-rose-200 font-bold text-lg'>
                {trait.percentage}%
              </div>

              {/* Right Circle */}
              <div className='z-10 w-16 h-16 rounded-full bg-rose-400 flex items-center justify-center text-white text-3xl font-bold shadow-sm'>
                {trait.right.label}
              </div>
            </div>

            {/* Labels */}
            <div className='flex justify-between w-full mt-2 px-2'>
              <span className='text-white font-bold text-lg'>
                {trait.left.text}
              </span>
              <span className='text-white font-bold text-lg'>
                {trait.right.text}
              </span>
            </div>
          </div>
        ))}
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