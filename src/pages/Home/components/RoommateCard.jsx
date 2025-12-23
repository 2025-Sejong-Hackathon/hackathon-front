import { getCharacterByGeekBti } from '../../../utils/geekBtiCharacter';

export default function RoommateCard({
  name,
  major,
  grade,
  geekBti,
  quote,
  matchScore,
  isLast,
  onClick,
}) {
  const characterImage = getCharacterByGeekBti(geekBti);

  return (
    <div
      onClick={onClick}
      className={`flex-shrink-0 w-[160px] h-[320px] rounded-[20px] relative overflow-hidden bg-white shadow-md cursor-pointer hover:scale-[1.02] transition-transform ${isLast ? 'mr-6' : ''}`}
    >
      {/* Background Gradient */}
      <div className='absolute inset-0 bg-gradient-to-b from-[#F48E98] to-[#DA4C5E] opacity-90' />

      {/* Glass Effect Overlay */}
      <div className='absolute inset-0 bg-white/10 backdrop-blur-[1px]' />

      <div className='relative z-10 flex flex-col items-center h-full pt-4 px-3 pb-6'>
        {/* GeekBTI Badge */}
        <div className='bg-white/20 backdrop-blur-sm px-4 py-1 rounded-full border border-white/30'>
          <span className='text-white font-bold text-lg tracking-wider'>
            {geekBti}
          </span>
        </div>

        {/* Character Image */}
        <div className='w-24 h-24 mb-2'>
          {characterImage ? (
            <img
              src={characterImage}
              alt={name}
              className='w-full h-full object-contain'
            />
          ) : (
            <div className='w-full h-full bg-white/20 rounded-full flex items-center justify-center'>
              <span className='text-white text-xs'>?</span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className='flex flex-col items-center text-white mb-2'>
          <h3 className='font-bold text-xl mb-1'>{name}</h3>
          <p className='text-xs opacity-90 font-medium mb-1'>
            {major} / {grade}
          </p>
          {/* Match Score */}
          {matchScore !== undefined && (
            <div className='bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full border border-white/30 mt-1'>
              <span className='text-white text-xs font-semibold'>
                매칭점수 : {matchScore}%
              </span>
            </div>
          )}
        </div>

        {/* Quote */}
        <div className='mt-auto w-full'>
          <div className='bg-white/30 backdrop-blur-sm rounded-2xl px-2 pb-2 text-center shadow-sm'>
            <p className='text-white text-[10px] leading-tight px-1 pt-2 break-keep'>
              {quote}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
