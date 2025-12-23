import { useState, useEffect } from 'react';
import { Scanner } from '@yudiel/react-qr-scanner';
import MyLaundryStatus from './components/MyLaundryStatus';
import DailyLaundryInfo from './components/DailyLaundryInfo';
import LaundryMachineList from './components/LaundryMachineList';

export default function Laundry() {
  const [mySession, setMySession] = useState(null);
  const [user, setUser] = useState(null);
  const [isQrOpen, setIsQrOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL;
        const accessToken = localStorage.getItem('accessToken');

        // 1. User Info (for Gender Zone)
        const userRes = await fetch(`${API_URL}/api/v1/members/me`, {
          method: 'GET',
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        if (userRes.ok) {
          const userData = await userRes.json();
          setUser(userData.data);
        }

        // 2. My Sessions
        const sessionRes = await fetch(`${API_URL}/api/v1/laundry/my-sessions`, {
          method: 'GET',
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        if (sessionRes.ok) {
          const sessionData = await sessionRes.json();
          // Assuming we show the first active session
          if (sessionData.data && sessionData.data.length > 0) {
            setMySession(sessionData.data[0]);
          } else {
            setMySession(null);
          }
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const handleScan = async (result) => {
    if (result && result.length > 0) {
      const scannedValue = result[0].rawValue;
      setIsQrOpen(false);

      const machineId = parseInt(scannedValue, 10);
      if (isNaN(machineId)) {
        alert('유효하지 않은 QR 코드입니다.');
        return;
      }

      // Ask for duration (simplified)
      const duration = prompt('사용할 시간(분)을 입력해주세요 (1~120)', '45');
      if (!duration) return;

      try {
        const API_URL = import.meta.env.VITE_API_URL;
        const accessToken = localStorage.getItem('accessToken');
        const response = await fetch(`${API_URL}/api/v1/laundry/start`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            machineId: machineId,
            durationMinutes: parseInt(duration, 10)
          }),
        });

        if (response.ok) {
          alert('세탁기 사용을 시작합니다!');
          window.location.reload(); 
        } else {
          const err = await response.json();
          alert(err.message || '시작 실패');
        }
      } catch (e) {
        console.error(e);
        alert('오류가 발생했습니다.');
      }
    }
  };

  const genderZone = user?.gender === 'MALE' ? 'MALE' : 'FEMALE';

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
      {mySession && (
        <section className="mb-10">
          <MyLaundryStatus session={mySession} />
        </section>
      )}

      {/* 2. AI 혼잡도 예측 섹션 */}
      {/* user가 로드된 후에만 표시 (성별 존 필요) */}
      {user && (
        <section className="mb-10 bg-white rounded-[32px] p-6 shadow-sm border border-rose-50">
          <DailyLaundryInfo genderZone={genderZone} />
        </section>
      )}

      {/* 3. 실시간 사용 현황 섹션 */}
      {user && (
        <section>
          <LaundryMachineList genderZone={genderZone} />
        </section>
      )}
    </div>
  );
}
