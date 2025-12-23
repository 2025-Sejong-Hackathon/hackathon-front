import { useEffect, useState } from 'react';
import RoommateCard from '../../Home/components/RoommateCard';

export default function DetailProfileModal({ isOpen, onClose, profile, onPick, onAccept, onRefuse }) {
  const [isRendered, setIsRendered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let timers = [];
    if (isOpen) {
      // Delay render state to avoid sync state update warning and allow mounting
      const timer1 = setTimeout(() => setIsRendered(true), 0);
      // Delay visible state to trigger transition
      const timer2 = setTimeout(() => setIsVisible(true), 50);
      timers.push(timer1, timer2);
    } else {
      // Schedule state update to avoid synchronous set state warning
      const timer3 = setTimeout(() => setIsVisible(false), 0);
      // Wait for animation to finish before unmounting
      const timer4 = setTimeout(() => setIsRendered(false), 300);
      timers.push(timer3, timer4);
    }
    
    return () => timers.forEach(clearTimeout);
  }, [isOpen]);

  if (!isRendered) return null;

  // Default profile data if not provided
  const displayProfile = profile || {
    name: "이채원",
    major: "컴퓨터공학과",
    grade: "4학년",
    mbti: "MCSE", // Using MCSE as in the original code, or map to MBTI
    quote: "안녕하세요 저 깔끔쟁이!",
    lifestyle: [
      { label: '흡연', value: '안함' },
      { label: '음주', value: '함' },
      { label: '추위', value: '민감' },
      { label: '더위', value: '둔감' },
    ]
  };

  return (
    <div className={`fixed inset-0 z-[100] flex items-end justify-center transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div 
        className={`relative w-full max-w-[500px] bg-white rounded-t-[30px] p-6 pb-10 transform transition-transform duration-300 ease-out flex flex-col max-h-[90vh] overflow-y-auto ${isVisible ? 'translate-y-0' : 'translate-y-full'}`}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">상세 프로필</h2>
          <button onClick={onClose} className="p-2 -mr-2 text-gray-400 hover:text-gray-600">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Profile Card Section - Centered and Scaled if necessary */}
        <div className="flex justify-center mb-8">
            <div className="transform scale-110">
                <RoommateCard 
                    name={displayProfile.name}
                    major={displayProfile.major}
                    grade={displayProfile.grade}
                    mbti={displayProfile.mbti}
                    quote={displayProfile.quote}
                />
            </div>
        </div>

        {/* Lifestyle Habits Section */}
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">생활 습관</h3>
          <div className="grid grid-cols-2 gap-3">
            {(displayProfile.lifestyle || [
              { label: '흡연', value: '안함' },
              { label: '음주', value: '함' },
              { label: '추위', value: '민감' },
              { label: '더위', value: '둔감' },
            ]).map((item, index) => (
              <div key={index} className="bg-rose-50 p-4 rounded-2xl flex flex-col items-center justify-center gap-1 shadow-sm border border-rose-100">
                <span className="text-rose-400 font-bold text-sm">{item.label}</span>
                <span className="text-gray-800 font-bold text-lg">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        {onAccept ? (
           <div className="flex gap-3 mt-4">
             <button 
               onClick={onRefuse || onClose}
               className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-500 font-bold py-3.5 rounded-2xl transition-colors"
             >
               거절
             </button>
             <button 
               onClick={onAccept}
               className="flex-[2] bg-[#E35066] hover:bg-[#D63F55] text-white font-bold py-3.5 rounded-2xl shadow-md transition-colors"
             >
               수락
             </button>
           </div>
        ) : onPick ? (
          <div className="flex gap-3 mt-4">
            <button 
              onClick={onClose}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-500 font-bold py-3.5 rounded-2xl transition-colors"
            >
              취소
            </button>
            <button 
              onClick={onPick}
              className="flex-[2] bg-[#E35066] hover:bg-[#D63F55] text-white font-bold py-3.5 rounded-2xl shadow-md transition-colors"
            >
              PICK
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
