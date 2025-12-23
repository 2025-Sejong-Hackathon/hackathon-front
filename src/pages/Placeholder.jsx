export default function Placeholder({ title }) {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center pt-20">
      <h1 className="text-2xl font-bold text-gray-700 mb-4">{title}</h1>
      <p className="text-gray-500">준비 중인 페이지입니다.</p>
    </div>
  );
}
