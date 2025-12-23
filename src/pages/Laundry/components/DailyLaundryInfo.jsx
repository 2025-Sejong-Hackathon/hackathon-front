import { useState, useEffect } from 'react';

export default function DailyLaundryInfo({ genderZone }) {
  const [congestionData, setCongestionData] = useState([]);
  const [messages, setMessages] = useState({ peak: '', recommend: '' });
  const [selectedDate, setSelectedDate] = useState(new Date()); // 선택된 날짜 상태 추가
  const currentHour = new Date().getHours(); 

  // 날짜 포맷팅 (YYYY-MM-DD)
  const formatDateApi = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // 날짜 포맷팅 (화면 표시용: 12.25)
  const formatDateDisplay = (date) => {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${month}.${day}`;
  };

  // 날짜 변경 핸들러
  const handlePrevDate = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() - 1);
    setSelectedDate(newDate);
  };

  const handleNextDate = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() + 1);
    setSelectedDate(newDate);
  };

  useEffect(() => {
    const fetchCongestion = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL;
        const accessToken = localStorage.getItem('accessToken');
        const dateStr = formatDateApi(selectedDate);

        console.log(`Fetching congestion for date: ${dateStr}, zone: ${genderZone}`);

        const response = await fetch(`${API_URL}/api/v1/laundry/congestion?date=${dateStr}&genderZone=${genderZone}`, {
          method: 'GET',
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Congestion Data:', data);
          
          if (data.data) {
            const timeline = new Array(24).fill(0);
            data.data.timeline.forEach(item => {
              timeline[item.hour] = item.predicted_congestion;
            });
            setCongestionData(timeline);
            setMessages({
              peak: data.data.peak_message || '데이터 없음',
              recommend: data.data.recommend_message || '데이터 없음'
            });
          } else {
             // 데이터가 없는 경우 (예: 미래 날짜)
             setCongestionData([]);
             setMessages({ peak: '데이터 없음', recommend: '데이터 없음' });
          }
        }
      } catch (err) {
        console.error(err);
      }
    };

    if (genderZone) {
      fetchCongestion();
    }
  }, [genderZone, selectedDate]); // 날짜 변경 시 재호출

  // 오늘 날짜인지 확인 (현재 시간 포인트 표시용)
  const isToday = formatDateApi(selectedDate) === formatDateApi(new Date());

  if (congestionData.length === 0) {
      return (
        <div className="flex flex-col w-full h-64 justify-center items-center">
            <div className="flex justify-center items-center gap-3 mb-4">
                <button onClick={handlePrevDate} className="text-gray-400 text-lg hover:text-rose-500 font-bold p-2">◀</button>
                <span className="text-base font-bold text-gray-700">{formatDateDisplay(selectedDate)}</span>
                <button onClick={handleNextDate} className="text-gray-400 text-lg hover:text-rose-500 font-bold p-2">▶</button>
            </div>
            <p className="text-gray-400">데이터를 불러오는 중이거나 정보가 없습니다.</p>
        </div>
      );
  }

  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-between items-center mb-6">
        <div className="flex flex-col">
          <h2 className="text-lg font-bold text-gray-900 leading-tight">오늘의 세탁 정보</h2>
          <span className="text-xs text-rose-400 font-semibold">AI 예측 혼잡도</span>
        </div>
        <div className="flex items-center gap-3 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
          <button onClick={handlePrevDate} className="text-gray-400 text-xs hover:text-rose-500 font-bold px-1">◀</button>
          <span className="text-xs font-bold text-gray-700">{formatDateDisplay(selectedDate)}</span>
          <button onClick={handleNextDate} className="text-gray-400 text-xs hover:text-rose-500 font-bold px-1">▶</button>
        </div>
      </div>

      <div className="space-y-3 mb-8">
        <div className="flex items-start gap-2">
          <span className="text-lg">🔥</span>
          <p className="text-[14px] text-gray-700 font-medium pt-0.5">{messages.peak}</p>
        </div>
        <div className="flex items-start gap-2">
          <span className="text-lg">👍</span>
          <p className="text-[14px] text-gray-700 font-medium pt-0.5">{messages.recommend}</p>
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
            
            {/* 영역 채우기 (그래프 아래) - Max value is 10 */}
            <path
              d={`M 0,${100 - (congestionData[0] / 10) * 100} ${congestionData
                .map((value, index) => {
                  const x = (index / (congestionData.length - 1)) * 100;
                  const y = 100 - (value / 10) * 100;
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
                  const y = 100 - (value / 10) * 100;
                  return `${x},${y}`;
                })
                .join(' ')}
              fill="none"
              stroke="#f43f5e"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            
            {/* 현재 시간 포인트 (오늘일 때만 표시) */}
            {isToday && congestionData.map((value, index) => {
              if (index === currentHour) {
                const x = (index / (congestionData.length - 1)) * 100;
                const y = 100 - (value / 10) * 100;
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
          </svg>
        </div>
        
        {/* X축 시간 레이블 */}
        <div className="flex justify-between mt-2 px-1 border-t border-gray-100 pt-2">
          {[0, 6, 12, 18, 23].map((hour) => (
            <div key={hour} className="text-center">
              <span
                className={`text-[10px] font-bold ${
                  isToday && hour === currentHour
                    ? 'text-rose-500 underline underline-offset-4'
                    : 'text-gray-400'
                }`}
              >
                {hour}시
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
