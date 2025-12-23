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
          const isActive = location.pathname === item.path;

          return (
            <div
              key={item.id}
              className='relative w-14 h-full flex flex-col items-center justify-center'
            >
              {isActive && (
                // 활성화된 탭 영역
                <div className='absolute -top-7 flex flex-col items-center justify-center'>
                  {/* 1. 흰색 배경 원 (테두리 역할) */}
                  {/* - 그림자를 위쪽으로만 주어서 아래쪽은 네비바와 자연스럽게 연결되도록 함 */}
                  {/* - w-[70px]로 빨간 원보다 크게 설정 */}
                  <div className='w-[76px] h-[76px] bg-white rounded-full absolute top-0 shadow-[0_-6px_8px_-2px_rgba(0,0,0,0.1)]'></div>

                  {/* 2. 네비바와 겹치는 부분의 그림자 제거를 위한 가림막 (선택적, 더 완벽한 결합을 위해) */}
                  <div className='w-[76px] h-[38px] bg-white absolute top-[38px] left-0'></div>

                  {/* 3. 실제 빨간색 버튼 */}
                  <div className='relative w-[58px] h-[58px] bg-rose-500 rounded-full flex items-center justify-center z-10 top-[9px]'>
                    <img
                      src={item.activeIcon}
                      alt={item.label}
                      className='w-[30px] h-[30px] object-contain'
                    />
                  </div>
                </div>
              )}

              {/* 기본 버튼 (비활성화 상태일 때만 보임) */}
              <button
                onClick={() => navigate(item.path)}
                className={`flex flex-col items-center justify-center w-full h-full ${isActive ? 'opacity-0 pointer-events-none' : 'opacity-100'} transition-opacity duration-200 z-20`}
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
