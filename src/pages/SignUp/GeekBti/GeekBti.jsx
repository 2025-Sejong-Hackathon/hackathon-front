import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// Categories mapping to display titles
const CATEGORY_TITLES = {
  'MORNING_EVENING': '아침형/저녁형',
  'CLEAN_DIRTY': '청결형/방치형',
  'SENSITIVE_DULL': '예민형/둔감형',
  'EXTRO_INTRO': '외향형/내향형'
};

// Fixed order of categories for the wizard steps
const CATEGORY_ORDER = ['MORNING_EVENING', 'CLEAN_DIRTY', 'SENSITIVE_DULL', 'EXTRO_INTRO'];

export default function GeekBti() {
  const [steps, setSteps] = useState([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [answers, setAnswers] = useState({}); // Map: questionId -> optionId
  const [visibleCount, setVisibleCount] = useState(1);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const navigate = useNavigate();
  const bottomRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL;
        const accessToken = localStorage.getItem('accessToken');
        
        // 1. Fetch User Info
        const userRes = await fetch(`${API_URL}/api/v1/members/me`, {
          method: 'GET',
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        if (userRes.ok) {
          const userData = await userRes.json();
          setUser(userData.data);
        }

        // 2. Fetch Questions
        const qRes = await fetch(`${API_URL}/api/v1/gikbti/questions`, {
          method: 'GET',
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        
        if (qRes.ok) {
          const qData = await qRes.json();
          console.log('API Questions Data:', qData); // API 데이터 확인용 로그 추가
          const questions = qData.data;

          // Group questions by category
          const grouped = questions.reduce((acc, q) => {
            const cat = q.category;
            if (!acc[cat]) acc[cat] = [];
            acc[cat].push(q);
            return acc;
          }, {});

          // Create step objects based on defined order
          const formattedSteps = CATEGORY_ORDER.map(cat => ({
            category: cat,
            title: CATEGORY_TITLES[cat],
            questions: grouped[cat] || []
          })).filter(step => step.questions.length > 0);

          setSteps(formattedSteps);
        }
      } catch (err) {
        console.error(err);
        alert('데이터를 불러오는데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
     if (visibleCount > 1) {
         bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
     }
  }, [visibleCount, currentStepIndex]);

  const handleAnswer = (questionId, optionId, index) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }));

    const currentStep = steps[currentStepIndex];
    if (index + 1 === visibleCount && visibleCount < currentStep.questions.length) {
      setVisibleCount((prev) => prev + 1);
    }
  };

  const submitAnswers = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_URL;
      const accessToken = localStorage.getItem('accessToken');

      // Convert answers map to list of { questionId, optionId }
      const answerList = Object.entries(answers).map(([qId, oId]) => ({
        questionId: parseInt(qId),
        optionId: parseInt(oId)
      }));

      console.log('Submitting answers:', answerList);

      const response = await fetch(`${API_URL}/api/v1/gikbti/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ answers: answerList }),
      });

      const result = await response.json();
      console.log('Submit Response:', result);

      if (response.ok) {
        // Navigate to result page with the received data
        navigate('/signup/geek-bti/result', { state: { result: result.data } });
      } else {
        alert('제출에 실패했습니다: ' + (result.message || 'Unknown error'));
      }
    } catch (err) {
      console.error(err);
      alert('오류가 발생했습니다.');
    }
  };

  const handleNextStep = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
      setVisibleCount(1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Final step: Submit
      submitAnswers();
    }
  };

  if (isLoading) return <div className="text-white text-center mt-20">로딩 중...</div>;
  if (steps.length === 0) return <div className="text-white text-center mt-20">질문 데이터가 없습니다.</div>;

  const currentStep = steps[currentStepIndex];
  const userName = user?.name || '회원';

  const isStepComplete = () => {
    return currentStep.questions.every(q => answers[q.id] !== undefined);
  };

  return (
    <div className='w-full flex flex-col flex-grow pb-10 px-6'>
      <h1 className='text-white text-xl font-bold mb-6 text-center'>
        {userName}님의 {currentStep.title} 스타일을 알려주세요!
      </h1>

      <div className='flex flex-col gap-4 w-full'>
        {currentStep.questions.slice(0, visibleCount).map((q, index) => {
          const selectedOptionId = answers[q.id];

          return (
            <div
              key={q.id}
              className='bg-white rounded-[30px] p-6 shadow-sm animate-slide-up flex flex-col'
            >
              <h3 className='text-lg font-bold text-gray-900 mb-6'>
                Q{currentStepIndex + 1}-{index + 1}. {q.text}
              </h3>

              <div className='flex flex-col gap-3 w-full'>
                {q.options.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleAnswer(q.id, option.id, index)}
                    className={`
                      w-full p-4 rounded-xl text-left font-medium transition-all
                      ${selectedOptionId === option.id
                        ? 'bg-rose-50 border-2 border-rose-500 text-rose-500' 
                        : 'bg-gray-50 border-2 border-transparent text-gray-700 hover:bg-gray-100'}
                    `}
                  >
                    {option.text}
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
          {currentStepIndex === steps.length - 1 ? '완료' : '다음 단계로'}
        </button>
      )}
    </div>
  );
}