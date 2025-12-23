import { useState } from 'react';
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

  return (
    <div className="w-full flex flex-col px-6 pt-12 pb-32 bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">세탁실 목록</h1>
      </header>

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