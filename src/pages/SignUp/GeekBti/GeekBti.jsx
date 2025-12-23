import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const STEPS = [
  {
    title: '아침형/저녁형',
    questions: [
      { question: '수면 시간은 ?', options: ['12시 이전에 자요', '새벽 2-3시에 자요'] },
      { question: '기상 시간은 ?', options: ['나에게 오전은 없다', '8시 쯤 일어나서 하루를 시작해요'] },
      { question: '주 활동 시간은 ?', options: ['밤에 작업을 많이 해요', '낮시간에 일어나서 작업을 해요'] },
      { question: '룸메의 외출/복귀 시간이?', options: ['이르거나 늦어도 괜찮다', '잘 때 그러면 힘들다'] }
    ]
  },
  {
    title: '청결형/더러운형',
    questions: [
      { question: '바닥에 머리카락이 보이면 ?', options: ['바로 치운다', '한번에 몰아서 치운다'] },
      { question: '책상 상태는 보통 ?', options: ['항상 정리된 편', '더러운편이다'] },
      { question: '청소 주기는 ?', options: ['1일', '3일', '1주', '1개월'] },
      { question: '상대방 자리가 더럽다면 ?', options: ['참을 수 없다', '상관없다'] }
    ]
  },
  {
    title: '예민형/둔한형',
    questions: [
      { question: '룸메 전화 통화 소리', options: ['나가서 했으면 좋겠다', '상관없다'] },
      { question: '불 켜진 상태에서 잠들 수 있나', options: ['가능하다', '힘들다'] },
      { question: '키보드,마우스 소리', options: ['거슬린다', '신경 안쓴다'] },
      { question: '아침 알람 소리', options: ['바로 끈다', '잘 못들어서 여러번 울린다'] }
    ]
  },
  {
    title: '외향형/내향형',
    questions: [
      { question: '룸메와의 관계', options: ['밥도 먹고 친해지고 싶다', '거리를 두고 싶다'] },
      { question: '룸메가 친구를 데려온다면 ?', options: ['미리 말하면 괜찮다', '싫다'] },
      { question: '기숙사에서 보내는 시간은 ?', options: ['잘때만 들어간다', '수업시간 빼고 많이 들어간다'] },
      { question: '룸메가 나의 생활공간을 침범한다면?', options: ['뭐 어때', '절대 안됨!! 내 공간 지켜'] }
    ]
  }
];

export default function GeekBti() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [visibleCount, setVisibleCount] = useState(1);
  const navigate = useNavigate();
  const bottomRef = useRef(null);
  const [user, setUser] = useState(null);

  const currentStep = STEPS[currentStepIndex];
  
  // Create a unique key for each question to store in answers object
  // Format: stepIndex-questionIndex
  const getQuestionKey = (stepIdx, qIdx) => `${stepIdx}-${qIdx}`;

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

  useEffect(() => {
     if (visibleCount > 1) {
         bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
     }
  }, [visibleCount, currentStepIndex]);

  const handleAnswer = (qIndex, option) => {
    const key = getQuestionKey(currentStepIndex, qIndex);
    setAnswers((prev) => ({ ...prev, [key]: option }));

    if (qIndex + 1 === visibleCount && visibleCount < currentStep.questions.length) {
      setVisibleCount((prev) => prev + 1);
    }
  };

  const handleNextStep = () => {
    if (currentStepIndex < STEPS.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
      setVisibleCount(1);
      // Scroll to top when step changes
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Final step finished
      alert('설정이 완료되었습니다.');
      // Navigate to next page (Result)
      navigate('/signup/geek-bti/result');
    }
  };

  const isStepComplete = () => {
    return currentStep.questions.every((_, idx) => 
      answers[getQuestionKey(currentStepIndex, idx)] !== undefined
    );
  };

  const userName = user?.name || '회원';

  return (
    <div className='w-full flex flex-col flex-grow pb-10'>
      <h1 className='text-white text-xl font-bold mb-6 text-center'>
        {userName}님의 {currentStep.title} 스타일을 알려주세요!
      </h1>

      <div className='flex flex-col gap-4 w-full'>
        {currentStep.questions.slice(0, visibleCount).map((q, index) => {
          const isAnswered = answers[getQuestionKey(currentStepIndex, index)] !== undefined;
          const selectedOption = answers[getQuestionKey(currentStepIndex, index)];

          return (
            <div
              key={`${currentStepIndex}-${index}`}
              className='bg-white rounded-[30px] p-6 shadow-sm animate-slide-up flex flex-col'
            >
              <h3 className='text-lg font-bold text-gray-900 mb-6'>
                Q{currentStepIndex + 1}-{index + 1}. {q.question}
              </h3>

              <div className='flex flex-col gap-3 w-full'>
                {q.options.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleAnswer(index, option)}
                    className={`
                      w-full p-4 rounded-xl text-left font-medium transition-all
                      ${selectedOption === option 
                        ? 'bg-rose-50 border-2 border-rose-500 text-rose-500' 
                        : 'bg-gray-50 border-2 border-transparent text-gray-700 hover:bg-gray-100'}
                    `}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {isStepComplete() && (
        <button
          onClick={handleNextStep}
          className='w-full bg-white/30 hover:bg-white/40 text-white text-lg font-bold p-4 rounded-2xl mt-8 transition-colors backdrop-blur-sm animate-fade-in'
        >
          {currentStepIndex === STEPS.length - 1 ? '완료' : '다음 단계로'}
        </button>
      )}
    </div>
  );
}
