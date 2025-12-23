import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RoommateEvaluation() {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = () => {
    if (rating === 0) {
      alert('별점을 선택해주세요.');
      return;
    }
    // TODO: API 호출
    console.log({ rating, comment });
    alert('평가가 완료되었습니다.');
    navigate('/mypage');
  };

  return (
    <div className="w-full flex flex-col min-h-screen">
      {/* Header */}
      <div className="px-6 pt-12 pb-6 flex items-center gap-4">
        <button
          onClick={() => navigate('/mypage')}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-rose-50 transition-colors group"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-700 group-hover:text-rose-500 transition-colors"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <h1 className="text-2xl font-bold text-gray-900">나의 룸메이트 평가하기</h1>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 pb-8">
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-rose-50">
          {/* Info Text */}
          <p className="text-base text-gray-600 mb-8">
            평가한 정보는 룸메이트에게 공개되지 않아요
          </p>

          {/* Star Rating */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">별점</h3>
            <div className="flex gap-3 justify-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className="transition-transform active:scale-95"
                >
                  <svg
                    width="60"
                    height="60"
                    viewBox="0 0 24 24"
                    fill={star <= rating ? '#F43F5E' : '#E5E7EB'}
                    stroke={star <= rating ? '#F43F5E' : '#D1D5DB'}
                    strokeWidth="1"
                    className="transition-all"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                </button>
              ))}
            </div>
          </div>

          {/* Comment */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">평가</h3>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="어쩌구 저쩌구 잘 살았다 인간아~"
              rows="6"
              className="w-full px-4 py-3 bg-gray-50 rounded-2xl border border-gray-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-100 outline-none transition-all resize-none text-base text-gray-700 placeholder-gray-400"
            />
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={rating === 0}
            className={`w-full py-4 rounded-2xl font-bold transition-all ${
              rating > 0
                ? 'bg-rose-500 hover:bg-rose-600 text-white shadow-sm active:scale-[0.99]'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            평가 완료
          </button>
        </div>
      </div>
    </div>
  );
}

