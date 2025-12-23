import PropTypes from 'prop-types';

export default function MyLaundryStatus({ machine }) {
  return (
    <div className="w-full bg-rose-500 rounded-[24px] p-6 shadow-lg shadow-rose-200 relative overflow-hidden">
      {/* 배경 장식 원 */}
      <div className="absolute -right-4 -top-4 w-24 h-24 bg-white opacity-10 rounded-full" />
      
      <div className="flex justify-between items-center relative z-10">
        <div className="flex flex-col">
          <span className="text-rose-100 text-sm font-medium mb-1">현재 사용 중</span>
          <h3 className="text-2xl font-bold text-white leading-tight">
            {machine.id}번 {machine.type === 'washer' ? '세탁기' : '건조기'}
          </h3>
        </div>
        <div className="text-right">
          <span className="text-white text-3xl font-black italic">
            {machine.timeLeft}
            <span className="text-lg font-bold not-italic ml-1">분</span>
          </span>
          <p className="text-rose-100 text-xs mt-1 font-medium">남음</p>
        </div>
      </div>

      {/* 프로그레스 바 (선택사항) */}
      <div className="mt-4 w-full h-1.5 bg-rose-400 rounded-full overflow-hidden">
        <div 
          className="h-full bg-white transition-all duration-1000" 
          style={{ width: '40%' }} // 남은 시간에 따른 비율 계산 가능
        />
      </div>
    </div>
  );
}

MyLaundryStatus.propTypes = {
  machine: PropTypes.shape({
    id: PropTypes.number.isRequired,
    type: PropTypes.oneOf(['washer', 'dryer']).isRequired,
    timeLeft: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
  }),
};