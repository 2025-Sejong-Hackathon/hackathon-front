export default function DailyLaundryInfo() {
  // More jagged/uneven data for visual variety
  const congestionData = [25, 65, 30, 80, 40, 85, 35, 75, 20, 90, 45, 70, 30, 60];
  const currentTimeIndex = 4; // 현재 시간 표시용

  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-between items-center mb-6">
        <div className="flex flex-col">
          <h2 className="text-lg font-bold text-gray-900 leading-tight">오늘의 세탁 정보</h2>
          <span className="text-xs text-rose-400 font-semibold">AI 예측 혼잡도</span>
        </div>
        <div className="flex items-center gap-3 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
          <button className="text-gray-400 text-xs hover:text-rose-500">◀</button>
          <span className="text-xs font-bold text-gray-700">12.24</span>
          <button className="text-gray-400 text-xs hover:text-rose-500">▶</button>
        </div>
      </div>

      <div className="space-y-3 mb-8">
        <div className="flex items-start gap-2">
          <span className="text-lg">☔</span>
          <p className="text-[14px] text-gray-700 font-medium pt-0.5">오늘 빨래하기 안 좋아요</p>
        </div>
        <div className="flex items-start gap-2">
          <span className="text-lg">🔥</span>
          <p className="text-[14px] text-gray-700 font-medium pt-0.5">
            그래서 <span className="text-rose-500 font-bold underline decoration-rose-200">21시</span>는 매우 혼잡할 예정
          </p>
        </div>
        <div className="flex items-start gap-2">
          <span className="text-lg">👍</span>
          <p className="text-[14px] text-gray-700 font-medium pt-0.5">대신 23시 이후 추천</p>
        </div>
      </div>

      {/* 그래프 영역 */}
      <div className="w-full pt-4">
        <div className="flex items-end justify-between h-20 gap-1.5 px-1">
          {congestionData.map((height, index) => (
            <div key={index} className="flex-1 flex flex-col items-center group relative">
              {/* 호버 시 값 표시 */}
              <div className="absolute -top-6 bg-gray-800 text-white text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                {height}%
              </div>
              <div 
                className={`w-full rounded-t-full transition-all duration-700 ${
                  index === currentTimeIndex 
                    ? 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.4)]' 
                    : height > 70 ? 'bg-rose-200' : 'bg-blue-100'
                }`}
                style={{ height: `${height}%` }}
              />
            </div>
          ))}
        </div>
        
        <div className="flex justify-between mt-3 px-1 border-t border-gray-50 pt-2">
          {congestionData.map((_, index) => (
            <div key={index} className="flex-1 text-center">
              <span className={`text-[10px] font-bold ${
                index === currentTimeIndex ? 'text-rose-500 underline underline-offset-4' : 'text-gray-400'
              }`}>
                {index}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}