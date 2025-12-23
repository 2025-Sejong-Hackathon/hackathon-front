import { useState } from 'react';
import LoginLogo from '../../assets/login_logo.svg';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const fetchLogin = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_URL;
      const response = await fetch(`${API_URL}/api/v1/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          studentId: studentId,
          password: password,
        }),
      });
      const data = await response.json();
      localStorage.setItem('accessToken', data.data.accessToken);
      if (!response.ok) throw new Error(`HTTP Error - ${response.status}`);
      alert(`환영합니다 ${data.data.name}님`);
      navigate('/signup/basic-info');
    } catch (err) {
      alert('아이디 또는 비밀번호를 확인 해주세요');
    }
  };

  return (
    <div className='absolute bottom-0 w-full h-[65%] bg-white rounded-t-[30px] px-8 pt-24 pb-10 flex flex-col shadow-lg animate-slide-up'>
      <img
        src={LoginLogo}
        alt='Login Logo'
        className='absolute -top-40 left-1/2 transform -translate-x-1/2 w-60 h-60 object-contain drop-shadow-xl'
      />

      <div className='text-center mb-10'>
        <h1 className='text-xl font-bold text-gray-800'>
          세종대학교 <span className='text-rose-500'>포털 아이디</span>로 로그인
          하세요!
        </h1>
      </div>

      <div className='flex flex-col gap-4'>
        <input
          name='student-id'
          type='text'
          placeholder='학번'
          onChange={(e) => setStudentId(e.target.value)}
          className='w-full p-4 bg-gray-100 rounded-2xl text-lg outline-none focus:ring-2 focus:ring-rose-500 transition-all placeholder-gray-400'
        />
        <input
          name='password'
          type='password'
          placeholder='비밀번호'
          onChange={(e) => setPassword(e.target.value)}
          className='w-full p-4 bg-gray-100 rounded-2xl text-lg outline-none focus:ring-2 focus:ring-rose-500 transition-all placeholder-gray-400'
        />
      </div>

      <button
        onClick={() => fetchLogin()}
        className='w-full bg-rose-500 hover:bg-rose-600 text-white text-lg font-bold p-4 rounded-2xl mt-4 transition-colors shadow-md'
      >
        확인
      </button>
    </div>
  );
}
