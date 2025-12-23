import Character1 from '../../../assets/character1.svg';

export default function HorizontalRoommateCard({ name, major, grade, mbti, quote }) {
  return (
    <div className="w-full bg-white rounded-[24px] p-5 flex items-center gap-5 shadow-[0_2px_15px_rgba(0,0,0,0.03)] border border-gray-50 active:scale-[0.98] transition-transform">
      {/* Profile Image Area */}
      <div className="relative">
        <div className="w-16 h-16 rounded-full bg-rose-50 flex items-center justify-center overflow-hidden border-2 border-white shadow-sm">
          <img 
            src={Character1} 
            alt={name} 
            className="w-12 h-12 object-contain"
          />
        </div>
        {/* Match Icon Badge (Optional) */}
        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-rose-500 rounded-full flex items-center justify-center border-2 border-white text-xs">
          🤝
        </div>
      </div>

      {/* Info Area */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-bold text-lg text-gray-800">{name}</span>
          <span className="text-xs font-bold text-rose-500 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-100">
            {mbti}
          </span>
        </div>
        
        <p className="text-xs text-gray-400 font-medium mb-2">
          {major} / {grade}
        </p>

        <div className="bg-gray-50 rounded-xl px-3 py-2">
          <p className="text-xs text-gray-600 truncate leading-relaxed">
            "{quote}"
          </p>
        </div>
      </div>
    </div>
  );
}
