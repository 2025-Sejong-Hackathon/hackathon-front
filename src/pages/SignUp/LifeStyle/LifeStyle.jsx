import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import OkIcon from '../../../components/Ok.svg';
import NoOkIcon from '../../../components/NoOk.svg';
import OkSelectIcon from '../../../components/OkSelect.svg';
import NoOkSelectIcon from '../../../components/NoOkSelect.svg';

const QUESTIONS = [
  { id: 1, getQuestion: (name) => [ `Q1-1. ${name}님은 `, '흡연', ' 하시나요?' ] },
  { id: 2, getQuestion: () => [ 'Q1-2. 룸메이트가 흡연해도 괜찮나요?', '', '' ] },
  { id: 3, getQuestion: (name) => [ `Q2-1. ${name}님은 `, '음주', ' 하시나요?' ] },
  { id: 4, getQuestion: () => [ 'Q2-2. 룸메이트가 음주해도 괜찮은가요?', '', '' ] },
  { id: 5, getQuestion: (name) => [ `Q3-1. ${name}님은 `, '추위', '에 민감하신가요?' ] },
  { id: 6, getQuestion: (name) => [ `Q3-2. ${name}님은 `, '더위', '에 민감하신가요?' ] },
];

export default function LifeStyle() {
  const [user, setUser] = useState(null);
  const [answers, setAnswers] = useState({});
  const [visibleCount, setVisibleCount] = useState(1);
  const navigate = useNavigate();
  const bottomRef = useRef(null);

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

  const handleAnswer = (index, value) => {
    setAnswers((prev) => ({ ...prev, [index]: value }));

    if (index + 1 === visibleCount && visibleCount < QUESTIONS.length) {
      setVisibleCount((prev) => prev + 1);
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
          const isAnswered = answers[index] !== undefined;

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
            onClick={() => navigate('/signup/geek-bti')}
            className='w-full bg-white/30 hover:bg-white/40 text-white text-lg font-bold p-4 rounded-2xl mt-8 transition-colors backdrop-blur-sm animate-fade-in'
          >
            다음
          </button>
        )}
    </div>
  );
}
