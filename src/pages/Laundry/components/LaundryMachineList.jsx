import { useState } from 'react';

const MOCK_MACHINES = [
  { id: 1, type: 'washer', status: 'available', timeLeft: 0 },
  { id: 2, type: 'washer', status: 'available', timeLeft: 0 },
  { id: 3, type: 'washer', status: 'in-use', timeLeft: 26 },
  { id: 1, type: 'dryer', status: 'available', timeLeft: 0 },
];

export default function LaundryMachineList() {
  const [machines] = useState(MOCK_MACHINES);

  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-between items-end mb-6">
        <div className="flex flex-col">
          <h2 className="text-xl font-bold text-gray-900 leading-tight">실시간 사용 현황</h2>
          <p className="text-xs text-gray-400 font-medium mt-1">방금 전 업데이트 됨</p>
        </div>
        <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100 active:rotate-180 transition-transform duration-500">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F43F5E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M23 4v6h-6" />
            <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {machines.map((machine, index) => (
          <MachineCard key={`${machine.type}-${machine.id}-${index}`} machine={machine} />
        ))}
      </div>
    </div>
  );
}

function MachineCard({ machine }) {
  const isAvailable = machine.status === 'available';

  return (
    <div className="w-full bg-white rounded-[24px] p-5 flex items-center justify-between shadow-sm border border-gray-100 hover:border-rose-100 transition-colors group">
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl transition-colors ${
          isAvailable ? 'bg-blue-50' : 'bg-rose-50'
        }`}>
          {machine.type === 'washer' ? '🫧' : '💨'}
        </div>
        <div className="flex flex-col">
          <span className="text-lg font-bold text-gray-800">
            {machine.id}번 {machine.type === 'washer' ? '세탁기' : '건조기'}
          </span>
          <div className="flex items-center gap-1.5">
            <div className={`w-2 h-2 rounded-full ${isAvailable ? 'bg-blue-500' : 'bg-rose-500'}`} />
            <span className={`text-sm font-bold ${isAvailable ? 'text-blue-500' : 'text-rose-500'}`}>
              {isAvailable ? '사용 가능' : `사용 중 - ${machine.timeLeft}분 남음`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}