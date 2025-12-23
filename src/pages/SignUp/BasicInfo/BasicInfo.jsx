import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileIcon from '../../../assets/profile.svg';
import FemaleIcon from '../../../assets/Female.svg';
import FemaleSelectIcon from '../../../assets/FemaleSelect.svg';
import MaleIcon from '../../../assets/Male.svg';
import MaleSelectIcon from '../../../assets/MaleSelect.svg';

export default function BasicInfo() {
  const [user, setUser] = useState(null);
  const [gender, setGender] = useState('female');
  const [birthdate, setBirthdate] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL;
        const accessToken = localStorage.getItem('accessToken');
        const response = await fetch(`${API_URL}/api/v1/members/me`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const data = await response.json();
        if (!response.ok) throw new Error(`HTTP Error - ${response.status}`);
        console.log(data);
        setUser(data.data);
      } catch (err) {
        alert(err);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className='w-full flex flex-col flex-grow'>
      {/* User Info Card */}
      <div className='w-full bg-white rounded-3xl p-6 flex items-center gap-6 mb-8 shadow-sm'>
        <div className='w-20 h-20 bg-rose-400 rounded-full flex items-center justify-center flex-shrink-0'>
          <img src={ProfileIcon} alt='Profile' className='w-12 h-12' />
        </div>
        <div>
          <h2 className='text-xl font-bold text-gray-900'>
            {user
              ? `${user.name} (${user.status === 'ACTIVE' ? '재학' : '휴학'})`
              : '로딩 중...'}
          </h2>
          <p className='text-gray-500 text-lg'>
            {user ? user.major : '로딩 중...'}
          </p>
          <p className='text-gray-400 text-lg'>
            {user ? user.studentId : '로딩 중...'}
          </p>
        </div>
      </div>

      <div className='mb-8'>
        <h3 className='text-white font-bold text-lg mb-4'>성별</h3>
        <div className='flex gap-8 justify-center w-full px-4'>
          <button
            onClick={() => setGender('female')}
            className='flex-1 max-w-[140px] transition-transform active:scale-95'
          >
            <img
              src={gender === 'female' ? FemaleSelectIcon : FemaleIcon}
              alt='Female'
              className='w-full h-auto'
            />
          </button>
          <button
            onClick={() => setGender('male')}
            className='flex-1 max-w-[140px] transition-transform active:scale-95'
          >
            <img
              src={gender === 'male' ? MaleSelectIcon : MaleIcon}
              alt='Male'
              className='w-full h-auto'
            />
          </button>
        </div>
      </div>

      <div className='mb-auto'>
        <h3 className='text-white font-bold text-lg mb-4'>생년월일</h3>
        <div className='relative'>
          <input
            type='date' // type을 date로 변경
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
            className='w-full bg-white rounded-2xl p-4 pr-4 text-lg text-gray-700 outline-none'
          />
        </div>
      </div>

      {/* Next Button */}
      <button
        onClick={() => {
          if (!birthdate) {
            alert('생년월일을 입력해주세요.');
            return;
          }
          navigate('/signup/lifestyle', { 
            state: { 
              gender: gender.toUpperCase(), 
              birthDate: birthdate 
            } 
          });
        }}
        className='w-full bg-white/30 hover:bg-white/40 text-white text-lg font-bold p-4 rounded-2xl mt-8 transition-colors backdrop-blur-sm'
      >
        다음
      </button>
    </div>
  );
}
