import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MAIN_CATEGORIES = ['음식', '물품'];
const FOOD_CATEGORIES = [
  '한식',
  '카페',
  '디저트',
  '일식',
  '중식',
  '양식',
  '치킨',
  '패스트푸드',
  '분식',
  '피자',
  '기타',
];

export default function GroupBuyCreate() {
  const navigate = useNavigate();
  const [mainCategory, setMainCategory] = useState('음식');
  const [subCategory, setSubCategory] = useState('');
  const [title, setTitle] = useState('');
  const [maxParticipants, setMaxParticipants] = useState('');
  const [productLink, setProductLink] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    // TODO: API 호출
    console.log({
      mainCategory,
      subCategory,
      title,
      maxParticipants,
      productLink,
      description,
    });
    navigate('/group-buy');
  };

  // 물품일 때는 subCategory가 자동으로 '물품'으로 설정되므로, 음식일 때만 subCategory 체크
  const isFormValid =
    (mainCategory === '물품' || subCategory) &&
    title &&
    maxParticipants &&
    productLink &&
    description;

  return (
    <div className='w-full flex flex-col min-h-screen'>
      {/* Header */}
      <div className='px-6 pt-12 pb-6 flex items-center gap-4'>
        <button
          onClick={() => navigate('/group-buy')}
          className='w-10 h-10 flex items-center justify-center rounded-full hover:bg-rose-50 transition-colors group'
        >
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2.5'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='text-gray-700 group-hover:text-rose-500 transition-colors'
          >
            <polyline points='15 18 9 12 15 6' />
          </svg>
        </button>
        <h1 className='text-2xl font-bold text-gray-900'>공동 구매 등록</h1>
      </div>

      {/* Form */}
      <div className='flex-1 px-6 pb-8'>
        <div className='bg-white rounded-3xl p-6 shadow-sm border border-rose-50'>
          {/* Main Category Selection */}
          <div className='mb-6'>
            <h3 className='text-base font-bold text-gray-900 mb-3'>
              공동 구매 카테고리
            </h3>
            <div className='flex gap-3'>
              {MAIN_CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setMainCategory(category);
                    // 물품 선택 시 자동으로 카테고리 설정, 음식 선택 시 초기화
                    setSubCategory(category === '물품' ? '물품' : '');
                  }}
                  className={`flex-1 py-3 rounded-2xl font-semibold transition-all ${
                    mainCategory === category
                      ? 'bg-rose-500 text-white shadow-sm'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Sub Category Selection - 음식일 때만 표시 */}
          {mainCategory === '음식' && (
            <div className='mb-6'>
              <div className='flex flex-wrap gap-2'>
                {FOOD_CATEGORIES.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSubCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                      subCategory === category
                        ? 'bg-rose-500 text-white shadow-sm'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Title */}
          <div className='mb-6'>
            <label className='block text-base font-bold text-gray-900 mb-2'>
              게시글 제목
            </label>
            <input
              type='text'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder='예: 호랑이 비빔밥 같이 먹어요!'
              className='w-full px-4 py-3 bg-gray-50 rounded-2xl border border-gray-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-100 outline-none transition-all'
            />
          </div>

          {/* Max Participants */}
          <div className='mb-6'>
            <label className='block text-base font-bold text-gray-900 mb-2'>
              모집 인원
            </label>
            <input
              type='number'
              value={maxParticipants}
              onChange={(e) => setMaxParticipants(e.target.value)}
              placeholder='예: 3'
              min='1'
              className='w-full px-4 py-3 bg-gray-50 rounded-2xl border border-gray-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-100 outline-none transition-all'
            />
          </div>

          {/* Product Link */}
          <div className='mb-6'>
            <label className='block text-base font-bold text-gray-900 mb-2'>
              제품 링크
            </label>
            <input
              type='url'
              value={productLink}
              onChange={(e) => setProductLink(e.target.value)}
              placeholder='https://...'
              className='w-full px-4 py-3 bg-gray-50 rounded-2xl border border-gray-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-100 outline-none transition-all'
            />
          </div>

          {/* Description */}
          <div className='mb-6'>
            <label className='block text-base font-bold text-gray-900 mb-2'>
              설명글 작성
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder='공구에 대한 설명을 작성해주세요'
              rows='5'
              className='w-full px-4 py-3 bg-gray-50 rounded-2xl border border-gray-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-100 outline-none transition-all resize-none'
            />
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={!isFormValid}
            className={`w-full py-4 rounded-2xl font-bold transition-all ${
              isFormValid
                ? 'bg-rose-500 hover:bg-rose-600 text-white shadow-sm active:scale-[0.99]'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            등록하기
          </button>
        </div>
      </div>
    </div>
  );
}
