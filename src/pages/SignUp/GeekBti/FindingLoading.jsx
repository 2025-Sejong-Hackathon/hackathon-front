import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Lottie from 'lottie-react';
import loadingData from '../../../assets/Ai_loading_model.json';

export default function FindingLoading() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.log('FindingLoading component mounted');
    const fetchUser = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL;
        const accessToken = localStorage.getItem('accessToken');
        const response = await fetch(`${API_URL}/api/v1/members/me`, {
          method: 'GET',
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        if (response.ok) {
          const data = await response.json();
          setUser(data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchUser();

    // Get next destination from query param, default to home
    const params = new URLSearchParams(location.search);
    const nextPath = params.get('next') || '/';

    // Navigate after 3 seconds
    const timer = setTimeout(() => {
      console.log(`Navigating to ${nextPath}`);
      if (nextPath === '/') {
      }
      navigate(nextPath);
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate, location.search]);

  const userName = user?.name || '회원';

  if (!loadingData) {
    console.error('Loading data is missing');
    return (
      <div className='text-white text-center mt-20'>
        Loading animation missing...
      </div>
    );
  }

  return (
    <div className='w-full flex flex-col flex-grow animate-fade-in relative overflow-hidden'>
      <h1 className='text-white text-xl font-bold mt-10 ml-4 leading-relaxed self-start z-10'>
        {userName}님의 긱BTI를 토대로 추천 상대를
        <br />
        찾는 중이에요!
      </h1>

      <div className='flex-grow flex flex-col items-center justify-center relative z-10 -mt-10'>
        {/* Soft Background Glow */}
        <div className='absolute w-72 h-72 bg-rose-400/50 rounded-full blur-3xl animate-pulse' />

        {/* Lottie Container */}
        <div className='w-72 h-72 relative'>
          <Lottie
            animationData={loadingData}
            loop={true}
            className='w-full h-full'
            style={{ backgroundColor: 'transparent' }}
          />
        </div>

        <p className='text-rose-100 text-sm mt-4 font-medium animate-pulse'>
          잠시만 기다려주세요...
        </p>
      </div>
    </div>
  );
}
