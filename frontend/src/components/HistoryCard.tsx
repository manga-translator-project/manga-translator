import Image from 'next/image';

export default function HistoryCard({ image, result, date }: { image: string, result: string, date: string }) {
  return (
    <div className="flex bg-gray-800 text-white p-4 rounded-lg shadow-lg gap-4">
      <Image src={image} alt="manga" width={96} height={96} className="w-24 h-24 object-cover rounded" />
      <div>
        <p className="text-sm text-gray-400">{date}</p>
        <p className="mt-2">{result}</p>
      </div>
    </div>
  );
}
