export default function DailyLaundryInfo() {
  // 0시부터 23시까지의 혼잡도 데이터 (0~3 범위)
  // 0: 여유, 1: 보통, 2: 혼잡, 3: 매우 혼잡
  const congestionData = [
    0.3, 0.2, 0.2, 0.3, 0.5, 0.8, 1.2, 1.8, 2.2, 2.5, 2.3, 2.0,
    2.2, 1.9, 1.6, 1.3, 1.5, 1.9, 2.3, 2.6, 2.8, 2.3, 1.5, 0.8
  ];
  
  const currentHour = new Date().getHours(); // 현재 시간 (0~23)

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

      {/* 꺾은선 그래프 영역 */}
      <div className="w-full pt-4">
        <div className="relative w-full h-40 mb-4">
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="w-full h-full"
          >
            {/* 그리드 라인 (선택적) */}
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.3" />
              </linearGradient>
            </defs>
            
            {/* 영역 채우기 (그래프 아래) */}
            <path
              d={`M 0,${100 - (congestionData[0] / 3) * 100} ${congestionData
                .map((value, index) => {
                  const x = (index / (congestionData.length - 1)) * 100;
                  const y = 100 - (value / 3) * 100;
                  return `L ${x},${y}`;
                })
                .join(' ')} L 100,100 L 0,100 Z`}
              fill="url(#lineGradient)"
              opacity="0.2"
            />
            
            {/* 꺾은선 */}
            <polyline
              points={congestionData
                .map((value, index) => {
                  const x = (index / (congestionData.length - 1)) * 100;
                  const y = 100 - (value / 3) * 100;
                  return `${x},${y}`;
                })
                .join(' ')}
              fill="none"
              stroke="#f43f5e"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            
            {/* 현재 시간 포인트 */}
            {congestionData.map((value, index) => {
              if (index === currentHour) {
                const x = (index / (congestionData.length - 1)) * 100;
                const y = 100 - (value / 3) * 100;
                return (
                  <g key={`current-${index}`}>
                    <circle
                      cx={x}
                      cy={y}
                      r="3"
                      fill="#f43f5e"
                      stroke="#fff"
                      strokeWidth="2"
                    />
                    <circle
                      cx={x}
                      cy={y}
                      r="6"
                      fill="#f43f5e"
                      opacity="0.3"
                    />
                  </g>
                );
              }
              return null;
            })}
            
            {/* 모든 포인트 */}
            {congestionData.map((value, index) => {
              const x = (index / (congestionData.length - 1)) * 100;
              const y = 100 - (value / 3) * 100;
              return (
                <circle
                  key={index}
                  cx={x}
                  cy={y}
                  r="1.5"
                  fill={index === currentHour ? '#f43f5e' : '#fda4af'}
                  className="hover:r-2 transition-all"
                />
              );
            })}
          </svg>
        </div>
        
        {/* X축 시간 레이블 */}
        <div className="flex justify-between mt-2 px-1 border-t border-gray-100 pt-2">
          {[0, 6, 12, 18, 23].map((hour) => (
            <div key={hour} className="text-center">
              <span
                className={`text-[10px] font-bold ${
                  hour === currentHour
                    ? 'text-rose-500 underline underline-offset-4'
                    : 'text-gray-400'
                }`}
              >
                {hour}시
              </span>
            </div>
          ))}
        </div>
        
        {/* Y축 레이블 (혼잡도 범위) */}
        <div className="flex justify-between items-center mt-2 text-[10px] text-gray-400">
          <span>여유 (0)</span>
          <span>보통 (1)</span>
          <span>혼잡 (2)</span>
          <span>매우 혼잡 (3)</span>
        </div>
      </div>
    </div>
  );
}