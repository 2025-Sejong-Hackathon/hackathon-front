import { Outlet } from 'react-router-dom';

export default function MainLayout() {
  return (
    <>
      <header className='p-4 border-b'>헤더</header>
      <main className='p-4'>
        <Outlet />
      </main>
      <footer className='p-4 border-t'>푸터</footer>
    </>
  );
}
