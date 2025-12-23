import { useState } from 'react';
import { QrReader } from 'react-qr-reader';
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

  const handleScan = (data) => {
    if (data) {
      // QR 인식 성공 시 처리
      // data.text 또는 data 자체를 사용 (라이브러리 버전에 따라 다름)
      const result = data?.text || data; 
      alert(`QR 인식 성공: ${result}`);
      setIsQrOpen(false);
    }
  };

  const handleError = (err) => {
    console.error(err);
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
              className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          
          <div className="w-full max-w-sm px-6">
            <div className="bg-white rounded-3xl overflow-hidden shadow-2xl relative">
              <QrReader
                constraints={{ facingMode: 'environment' }}
                onResult={(result, error) => {
                  if (!!result) {
                    handleScan(result);
                  }
                  if (!!error) {
                    // console.info(error);
                  }
                }}
                className="w-full"
                videoStyle={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              {/* Scan Overlay Guide */}
              <div className="absolute inset-0 border-2 border-rose-500/50 m-8 rounded-2xl pointer-events-none flex items-center justify-center">
                <div className="w-full h-0.5 bg-rose-500/80 animate-pulse" />
              </div>
            </div>
            <p className="text-white text-center mt-6 font-medium">
              세탁기의 QR코드를 스캔해주세요
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
