import { useState } from 'react';
import { Scanner } from '@yudiel/react-qr-scanner';
import MyLaundryStatus from './components/MyLaundryStatus';
import DailyLaundryInfo from './components/DailyLaundryInfo';
import LaundryMachineList from './components/LaundryMachineList';

const MOCK_MY_MACHINE = {
  id: 4,
  type: 'washer',
  timeLeft: 50,
  status: 'in-use'
};

export default function Laundry() {
  // 사용 중인 세탁기 유무 상태 (데모를 위해 true로 설정 가능)
  const [myMachine] = useState(MOCK_MY_MACHINE); 
  const [isQrOpen, setIsQrOpen] = useState(false);

  const handleScan = (result) => {
    if (result && result.length > 0) {
      // @yudiel/react-qr-scanner는 결과 객체의 배열을 반환할 수 있습니다.
      const scannedText = result[0].rawValue;
      alert(`QR 인식 성공: ${scannedText}`);
      setIsQrOpen(false);
    }
  };

  return (
    <div className="w-full flex flex-col px-6 pt-12 pb-32 bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">세탁실 목록</h1>
        <button 
          onClick={() => setIsQrOpen(true)}
          className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm border border-gray-100 active:scale-95 transition-transform"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4B5563" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="7" />
            <rect x="14" y="3" width="7" height="7" />
            <rect x="14" y="14" width="7" height="7" />
            <rect x="3" y="14" width="7" height="7" />
            <path d="M7 7h.01M17 7h.01M7 17h.01" />
          </svg>
        </button>
      </header>

      {/* QR Scanner Modal */}
      {isQrOpen && (
        <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center">
          <div className="absolute top-10 right-6 z-10">
            <button 
              onClick={() => setIsQrOpen(false)}
              className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white active:scale-90 transition-transform"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          
          <div className="w-full max-w-sm px-10">
            <div className="bg-white rounded-[40px] overflow-hidden shadow-2xl relative aspect-square">
              <Scanner
                onScan={handleScan}
                allowMultiple={false}
                scanDelay={2000}
                components={{
                  audio: false, // 스캔 시 소리 끔
                  finder: true, // 중앙 가이드 라인 표시
                }}
                styles={{
                  container: { width: '100%', height: '100%' }
                }}
              />
            </div>
            <p className="text-white text-center mt-8 font-bold text-lg">
              세탁기의 QR코드를 스캔해주세요
            </p>
            <p className="text-gray-400 text-center mt-2 text-sm">
              인식 영역 중앙에 코드를 맞춰주세요
            </p>
          </div>
        </div>
      )}

      {/* 1. 내가 사용 중인 세탁기 (사용 중일 때만 표시) */}
      {myMachine && (
        <section className="mb-10">
          <MyLaundryStatus machine={myMachine} />
        </section>
      )}

      {/* 2. AI 혼잡도 예측 섹션 */}
      <section className="mb-10 bg-white rounded-[32px] p-6 shadow-sm border border-rose-50">
        <DailyLaundryInfo />
      </section>

      {/* 3. 실시간 사용 현황 섹션 */}
      <section>
        <LaundryMachineList />
      </section>
    </div>
  );
}