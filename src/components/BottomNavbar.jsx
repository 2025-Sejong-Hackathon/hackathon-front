import { useNavigate, useLocation } from 'react-router-dom';

// 아이콘 import
import IconNews from '../assets/navbarSosik.png';
import IconLaundry from '../assets/navbar_laundry.svg';
import IconHome from '../assets/navbar_home.svg';
import IconGongu from '../assets/navbar_gongu.svg';
import IconMypage from '../assets/navbar_mypage.svg';

// 선택된 아이콘 import
import IconNewsSelect from '../assets/navbar_sosik_slect.svg';
import IconLaundrySelect from '../assets/navbar_laundry_select.svg';
import IconHomeSelect from '../assets/navbar_home_select.svg';
import IconGonguSelect from '../assets/navbar_gongu_select.svg';
import IconMypageSelect from '../assets/navbar_mypage_select.svg';

export default function BottomNavbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    {
      id: 'news',
      path: '/news',
      label: '소식',
      icon: IconNews,
      activeIcon: IconNewsSelect,
    },
    {
      id: 'laundry',
      path: '/laundry',
      label: '세탁',
      icon: IconLaundry,
      activeIcon: IconLaundrySelect,
    },
    {
      id: 'home',
      path: '/',
      label: '홈',
      icon: IconHome,
      activeIcon: IconHomeSelect,
    },
    {
      id: 'group-buy',
      path: '/group-buy',
      label: '공구',
      icon: IconGongu,
      activeIcon: IconGonguSelect,
    },
    {
      id: 'mypage',
      path: '/mypage',
      label: '마이',
      icon: IconMypage,
      activeIcon: IconMypageSelect,
    },
  ];

  return (
    <div className='fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[500px] z-50 pointer-events-none'>
      {/* 네비게이션 바 배경 */}
      <div className='relative w-full min-h-[70px] bg-white rounded-t-[35px] shadow-[0_-4px_20px_rgba(0,0,0,0.1)] flex items-end justify-around pointer-events-auto px-6 pt-4 pb-10'>
        {navItems.map((item) => {
          let isActive = location.pathname === item.path;
          if (item.id === 'home') {
            isActive =
              location.pathname === '/' ||
              location.pathname.startsWith('/matching');
          }

          return (
            <div
              key={item.id}
              className='relative w-14 h-full flex flex-col items-center justify-center'
            >
              {/* 활성화된 탭 영역 (부드러운 페이드와 살짝 솟아오르는 애니메이션) */}
              <div
                className={`absolute -top-7 flex flex-col items-center justify-center transition-all duration-300 ease-out ${isActive ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-90 pointer-events-none'}`}
              >
                {/* 1. 흰색 배경 원 */}
                <div className='w-[76px] h-[76px] bg-white rounded-full absolute top-0 shadow-[0_-6px_8px_-2px_rgba(0,0,0,0.1)]'></div>

                {/* 2. 네비바와 겹치는 부분 가림막 */}
                <div className='w-[76px] h-[38px] bg-white absolute top-[38px] left-0'></div>

                {/* 3. 실제 빨간색 버튼 */}
                <div className='relative w-[58px] h-[58px] bg-rose-500 rounded-full flex items-center justify-center z-10 top-[9px] shadow-md shadow-rose-200'>
                  <img
                    src={item.activeIcon}
                    alt={item.label}
                    className='w-[30px] h-[30px] object-contain'
                  />
                </div>
              </div>

              {/* 기본 버튼 (비활성화 상태일 때만 보임) */}
              <button
                onClick={() => navigate(item.path)}
                className={`flex flex-col items-center justify-center w-full h-full transition-all duration-300 ${isActive ? 'opacity-0 pointer-events-none scale-75' : 'opacity-100 scale-100'} z-20`}
              >
                <div className='w-[30px] h-[30px] flex items-center justify-center mb-1'>
                  <img
                    src={item.icon}
                    alt={item.label}
                    className='w-full h-full object-contain'
                  />
                </div>
                <span className='text-[14px] text-gray-400 font-medium'>
                  {item.label}
                </span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
