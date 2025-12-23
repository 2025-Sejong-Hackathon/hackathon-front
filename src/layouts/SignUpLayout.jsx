import { Outlet, useLocation } from 'react-router-dom';
import SignUpProgressBar from '../components/SignUpProgessBar';

export default function SignUpLayout() {
  const location = useLocation();

  const getStep = (pathname) => {
    if (pathname.includes('/signup/lifestyle')) return 2;
    if (pathname.includes('/signup/geek-bti')) return 3;
    if (pathname.includes('/signup/finding')) return 4;
    if (pathname.includes('/signup/recommendation')) return 4;
    return 1; // Default to Basic Info
  };

  const currentStep = getStep(location.pathname);

  return (
    <>
      <header>
        <SignUpProgressBar currentStep={currentStep} />
      </header>
      <main className='min-h-screen bg-rose-500 relative flex flex-col items-center overflow-hidden p-5'>
        <Outlet />
      </main>
    </>
  );
}
