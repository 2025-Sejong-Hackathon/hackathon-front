import SignUpCheckIcon from '../assets/signupcheck.svg';

const STEPS = [
  { id: 1, label: '기본 정보' },
  { id: 2, label: '생활 유형' },
  { id: 3, label: '긱BTI' },
  { id: 4, label: '추천 여부' },
];

export default function SignUpProgressBar({ currentStep = 2 }) {
  return (
    <div className='w-full bg-rose-500 pt-10 pb-4 relative overflow-hidden'>
      {/* Full width line */}
      <div
        className='absolute top-[60px] left-0 w-full h-0.5 bg-rose-300'
        aria-hidden='true'
      />

      <div className='relative flex justify-between w-full max-w-sm mx-auto px-4'>
        {STEPS.map((step, index) => {
          const stepNum = index + 1;
          const isCompleted = stepNum < currentStep;
          const isCurrent = stepNum === currentStep;

          return (
            <div
              key={step.id}
              className='relative z-10 flex flex-col items-center flex-1'
            >
              {/* Circle */}
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${
                  isCurrent
                    ? 'bg-white scale-110 shadow-md'
                    : isCompleted
                      ? 'bg-rose-300/80' // Completed background (behind check)
                      : 'bg-white'
                }`}
              >
                {isCompleted ? (
                  <div className='w-10 h-10 rounded-full bg-rose-300 flex items-center justify-center'>
                    <img
                      src={SignUpCheckIcon}
                      alt='Checked'
                      className='w-6 h-6'
                    />
                  </div>
                ) : isCurrent ? (
                  // Current step is just a white circle
                  <div className='w-full h-full rounded-full bg-white' />
                ) : (
                  // Future step
                  <div className='w-full h-full rounded-full bg-rose-200' />
                )}
              </div>

              {/* Label */}
              <span
                className={`mt-2 text-xs font-medium ${
                  isCurrent ? 'text-white font-bold' : 'text-rose-200'
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
