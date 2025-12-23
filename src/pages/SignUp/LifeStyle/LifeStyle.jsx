import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import OkIcon from '../../../components/Ok.svg';
import NoOkIcon from '../../../components/NoOk.svg';
import OkSelectIcon from '../../../components/OkSelect.svg';
import NoOkSelectIcon from '../../../components/NoOkSelect.svg';

const QUESTIONS = [
  { id: 1, field: 'isSmoker', getQuestion: (name) => [ `Q1-1. ${name}님은 `, '흡연', ' 하시나요?' ] },
  { id: 2, field: 'isMateSmoker', getQuestion: () => [ 'Q1-2. 룸메이트가 흡연해도 괜찮나요?', '', '' ] },
  { id: 3, field: 'isDrinker', getQuestion: (name) => [ `Q2-1. ${name}님은 `, '음주', ' 하시나요?' ] },
  { id: 4, field: 'isMateDrinker', getQuestion: () => [ 'Q2-2. 룸메이트가 음주해도 괜찮은가요?', '', '' ] },
  { id: 5, field: 'isColdSensitive', getQuestion: (name) => [ `Q3-1. ${name}님은 `, '추위', '에 민감하신가요?' ] },
  { id: 6, field: 'isHeatSensitive', getQuestion: (name) => [ `Q3-2. ${name}님은 `, '더위', '에 민감하신가요?' ] },
];

export default function LifeStyle() {
  const [user, setUser] = useState(null);
  const [answers, setAnswers] = useState({});
  const [visibleCount, setVisibleCount] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();
  const bottomRef = useRef(null);

  // BasicInfo에서 넘어온 데이터
  const { gender, birthDate } = location.state || {};

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
          setUser(data.data); // data.data로 수정
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchUser();
  }, []);

  const handleAnswer = (index, value) => {
    setAnswers((prev) => ({ ...prev, [index]: value }));

    if (index + 1 === visibleCount && visibleCount < QUESTIONS.length) {
      setVisibleCount((prev) => prev + 1);
    }
  };

  const submitOnboarding = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_URL;
      const accessToken = localStorage.getItem('accessToken');

      // API 스펙에 맞게 데이터 매핑
      const onboardingData = {
        gender: gender || 'FEMALE', // 기본값 설정 (방어적 코드)
        birthDate: birthDate || '2000-01-01',
        isSmoker: !!answers[0],
        isDrinker: !!answers[2],
        isColdSensitive: !!answers[4],
        isHeatSensitive: !!answers[5]
      };

      console.log('Sending Onboarding Data:', onboardingData);

      const response = await fetch(`${API_URL}/api/v1/members/onboarding`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(onboardingData),
      });

      const result = await response.json();
      console.log('Onboarding API Response:', result);

      if (response.ok) {
        navigate('/signup/geek-bti');
      } else {
        alert('온보딩 정보 등록에 실패했습니다: ' + (result.message || 'Unknown error'));
      }
    } catch (err) {
      console.error('Onboarding Error:', err);
      alert('오류가 발생했습니다.');
    }
  };

  useEffect(() => {
     if (visibleCount > 1) {
         bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
     }
  }, [visibleCount]);

  const userName = user?.name || '회원';

  return (
    <div className='w-full flex flex-col flex-grow pb-10'>
      <h1 className='text-white text-xl font-bold mb-6 text-center'>
        {userName}님의 생활 유형을 알려주세요!
      </h1>

      <div className='flex flex-col gap-4 w-full'>
        {QUESTIONS.slice(0, visibleCount).map((q, index) => {
          const [prefix, highlight, suffix] = q.getQuestion(userName);

          return (
            <div
              key={q.id}
              className='bg-white rounded-[30px] p-6 shadow-sm animate-slide-up flex flex-col items-center'
            >
              <h3 className='text-lg font-bold text-gray-900 mb-6 self-start'>
                {prefix}
                {highlight && <span className='text-rose-500'>{highlight}</span>}
                {suffix}
              </h3>

              <div className='flex justify-center gap-4 w-full'>
                <button
                  onClick={() => handleAnswer(index, true)}
                  className='transition-transform active:scale-95'
                >
                  <img
                    src={answers[index] === true ? OkSelectIcon : OkIcon}
                    alt='Yes'
                    className='w-32 h-32 object-contain'
                  />
                </button>
                <button
                  onClick={() => handleAnswer(index, false)}
                  className='transition-transform active:scale-95'
                >
                  <img
                    src={answers[index] === false ? NoOkSelectIcon : NoOkIcon}
                    alt='No'
                    className='w-32 h-32 object-contain'
                  />
                </button>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {visibleCount === QUESTIONS.length &&
        Object.keys(answers).length === QUESTIONS.length && (
          <button
            onClick={submitOnboarding}
            className='w-full bg-white/30 hover:bg-white/40 text-white text-lg font-bold p-4 rounded-2xl mt-8 transition-colors backdrop-blur-sm animate-fade-in'
          >
            다음
          </button>
        )}
    </div>
  );
}