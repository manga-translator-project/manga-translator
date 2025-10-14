import Navbar from "@/components/Navbar";
import HistoryCard from "@/components/HistoryCard";

export default function HistoryPage() {
  const mockHistory = [
    { image: "/sample1.png", result: "Hello World!", date: "2025-09-20" },
    { image: "/sample2.png", result: "How are you?", date: "2025-09-18" },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <div className="p-8 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Translation History</h1>
        <div className="flex flex-col gap-4">
          {mockHistory.map((h, i) => (
            <HistoryCard key={i} {...h} />
          ))}
        </div>
      </div>
    </div>
  );
}
