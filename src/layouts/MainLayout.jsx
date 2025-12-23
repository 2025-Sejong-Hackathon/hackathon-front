import { Outlet } from 'react-router-dom';
import BottomNavbar from '../components/BottomNavbar';

export default function MainLayout() {
  return (
    <div className="w-full min-h-screen bg-[#F2F4F6] flex justify-center">
      <div className="w-full max-w-[500px] bg-[#F2F4F6] relative min-h-screen flex flex-col shadow-2xl">
        <main className="flex-1 flex flex-col pb-[70px]">
          <Outlet />
        </main>
        <BottomNavbar />
      </div>
    </div>
  );
}