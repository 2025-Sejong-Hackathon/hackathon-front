import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import OkIcon from '../../../components/Ok.svg';
import NoOkIcon from '../../../components/NoOk.svg';
import OkSelectIcon from '../../../components/OkSelect.svg';
import NoOkSelectIcon from '../../../components/NoOkSelect.svg';

export default function Recommendation() {
  const [user, setUser] = useState(null);
  const [wantsRecommendation, setWantsRecommendation] = useState(null); // true for O, false for X, null for unselected
  const [recruitPeriod, setRecruitPeriod] = useState('25학년도 1학기');
  const [introduction, setIntroduction] = useState('');
  const navigate = useNavigate();

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

  const userName = user?.name || '회원';

  const handleNext = () => {
    if (wantsRecommendation === null) {
      alert('추천 기능을 사용할지 선택해주세요.');
      return;
    }

    if (wantsRecommendation) {
      if (!introduction.trim()) {
        alert('한 줄 소개를 입력해주세요.');
        return;
      }
      // Logic to save recommendation settings would go here
      console.log('Saving recommendation settings:', {
        recruitPeriod,
        introduction,
      });
      // Navigate to finding page (final loading)
      navigate('/signup/finding?next=/');
    } else {
      console.log('User opted out of recommendation.');
      navigate('/'); // Go to Home or Login
    }
  };

  return (
    <div className='w-full flex flex-col flex-grow pb-10 animate-fade-in'>
      <h1 className='text-white text-xl font-bold mb-8 leading-relaxed'>
        긱Seek가 제공하는 ‘룸메이트 추천’ 기능을
        <br />
        받아 보시겠어요?
      </h1>

      <div className='flex justify-center gap-6 w-full mb-10'>
        <button
          onClick={() => setWantsRecommendation(true)}
          className='transition-transform active:scale-95'
        >
          <img
            src={wantsRecommendation === true ? OkSelectIcon : OkIcon}
            alt='Yes'
            className='w-40 h-40 object-contain'
          />
        </button>
        <button
          onClick={() => setWantsRecommendation(false)}
          className='transition-transform active:scale-95'
        >
          <img
            src={wantsRecommendation === false ? NoOkSelectIcon : NoOkIcon}
            alt='No'
            className='w-40 h-40 object-contain'
          />
        </button>
      </div>

      {wantsRecommendation === true && (
        <div className='w-full flex flex-col gap-6 animate-slide-up'>
          {/* Recruit Period */}
          <div className='flex flex-col gap-2'>
            <label className='text-white text-lg font-bold'>
              모집 시기가 언제인가요?
            </label>
            <div className='relative'>
              <select
                value={recruitPeriod}
                onChange={(e) => setRecruitPeriod(e.target.value)}
                className='w-full p-4 rounded-2xl bg-white text-gray-700 font-medium appearance-none focus:outline-none focus:ring-2 focus:ring-rose-300'
              >
                <option value='25학년도 1학기'>25학년도 1학기</option>
                <option value='25학년도 여름학기'>25학년도 여름학기</option>
                <option value='25학년도 2학기'>25학년도 2학기</option>
                <option value='25학년도 겨울학기'>25학년도 겨울학기</option>
              </select>
              {/* Custom Arrow Icon */}
              <div className='absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none'>
                <svg
                  width='14'
                  height='8'
                  viewBox='0 0 14 8'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M1 1L7 7L13 1'
                    stroke='#9CA3AF'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Introduction */}
          <div className='flex flex-col gap-2'>
            <label className='text-white text-lg font-bold'>
              {userName}님의 한 줄 소개를 작성해 주세요
            </label>
            <input
              type='text'
              value={introduction}
              onChange={(e) => setIntroduction(e.target.value)}
              placeholder='ex. 저 완전 깔끔쟁이에요! 같이 살아요!'
              className='w-full p-4 rounded-2xl bg-white text-gray-700 font-medium placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-300'
            />
          </div>
        </div>
      )}

      {/* Next Button - Show if user has made a selection */}
      {wantsRecommendation !== null && (
        <button
          onClick={handleNext}
          className='w-full bg-white/30 hover:bg-white/40 text-white text-lg font-bold p-4 rounded-2xl mt-10 transition-colors backdrop-blur-sm animate-fade-in'
        >
          다음
        </button>
      )}
    </div>
  );
}
