import { useState, useEffect } from 'react';

export default function LaundryMachineList({ genderZone }) {
  const [machines, setMachines] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMachines = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_URL;
      const accessToken = localStorage.getItem('accessToken');
      
      const response = await fetch(`${API_URL}/api/v1/laundry/machines/zone/${genderZone}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        // Sort machines by number
        const sorted = data.data.sort((a, b) => a.machineNumber - b.machineNumber);
        setMachines(sorted);
      }
    } catch (err) {
      console.error('Failed to fetch machines:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (genderZone) {
      fetchMachines();
    }
  }, [genderZone]);

  const handleRefresh = () => {
    setIsLoading(true);
    fetchMachines();
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-between items-end mb-6">
        <div className="flex flex-col">
          <h2 className="text-xl font-bold text-gray-900 leading-tight">실시간 사용 현황</h2>
          <p className="text-xs text-gray-400 font-medium mt-1">방금 전 업데이트 됨</p>
        </div>
        <button 
          onClick={handleRefresh}
          className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100 active:rotate-180 transition-transform duration-500"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F43F5E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M23 4v6h-6" />
            <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {isLoading ? (
          <div className="text-center py-10 text-gray-400">정보를 불러오는 중...</div>
        ) : machines.length === 0 ? (
          <div className="text-center py-10 text-gray-400">등록된 기기가 없습니다.</div>
        ) : (
          machines.map((machine) => (
            <MachineCard key={machine.id} machine={machine} />
          ))
        )}
      </div>
    </div>
  );
}

function MachineCard({ machine }) {
  const isAvailable = machine.status === 'AVAILABLE';

  return (
    <div className="w-full bg-white rounded-[24px] p-5 flex items-center justify-between shadow-sm border border-gray-100 hover:border-rose-100 transition-colors group">
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl transition-colors ${
          isAvailable ? 'bg-blue-50' : 'bg-rose-50'
        }`}>
          {machine.type === 'WASHER' ? '🫧' : '💨'}
        </div>
        <div className="flex flex-col">
          <span className="text-lg font-bold text-gray-800">
            {machine.machineNumber}번 {machine.type === 'WASHER' ? '세탁기' : '건조기'}
          </span>
          <div className="flex items-center gap-1.5">
            <div className={`w-2 h-2 rounded-full ${isAvailable ? 'bg-blue-500' : 'bg-rose-500'}`} />
            <span className={`text-sm font-bold ${isAvailable ? 'text-blue-500' : 'text-rose-500'}`}>
              {isAvailable ? '사용 가능' : `사용 중 - ${machine.remainingMinutes}분 남음`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}