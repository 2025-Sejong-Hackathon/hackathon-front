import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <div className='min-h-screen bg-rose-500 relative flex flex-col items-center overflow-hidden'>
      <Outlet />
    </div>
  );
}
