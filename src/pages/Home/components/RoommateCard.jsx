import Character1 from '../../../assets/character1.svg';

export default function RoommateCard({ name, major, grade, mbti, quote, isLast }) {
  return (
    <div className={`flex-shrink-0 w-[160px] h-[280px] rounded-[20px] relative overflow-hidden bg-white shadow-md ${isLast ? 'mr-6' : ''}`}>
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#F48E98] to-[#DA4C5E] opacity-90" />
      
      {/* Glass Effect Overlay */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-[1px]" />

      <div className="relative z-10 flex flex-col items-center h-full pt-6 px-3">
        {/* MBTI Badge */}
        <div className="bg-white/20 backdrop-blur-sm px-4 py-1 rounded-full border border-white/30 mb-4">
          <span className="text-white font-bold text-lg tracking-wider">{mbti}</span>
        </div>

        {/* Character Image */}
        <div className="w-24 h-24 mb-3">
          <img 
            src={Character1} 
            alt={name} 
            className="w-full h-full object-contain"
          />
        </div>

        {/* Info */}
        <div className="flex flex-col items-center text-white mb-2">
          <h3 className="font-bold text-xl mb-1">{name}</h3>
          <p className="text-xs opacity-90 font-medium">{major} / {grade}</p>
        </div>

        {/* Quote */}
        <div className="mt-auto mb-6 text-center">
          <span className="text-white/60 text-2xl font-serif">“</span>
          <p className="text-white text-[10px] leading-tight px-1 -mt-2 break-keep">
            {quote}
          </p>
        </div>
      </div>
    </div>
  );
}
