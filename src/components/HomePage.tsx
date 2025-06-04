import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import careers from "../data/careers.json";

const HomePage: React.FC = () => {
  const [career, setCareer] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // 입력값이 변경될 때마다 연관 검색어 업데이트
    if (career.trim()) {
      const filtered = careers.careers.filter((c) =>
        c.toLowerCase().includes(career.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [career]);

  useEffect(() => {
    // 외부 클릭 시 연관 검색어 닫기
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (career.trim()) {
      navigate(`/roadmap/${encodeURIComponent(career.trim())}`);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setCareer(suggestion);
    setShowSuggestions(false);
    navigate(`/roadmap/${encodeURIComponent(suggestion)}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            당신의 꿈을 위한 로드맵
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            100+ 직업에 대한 맞춤형 커리어 로드맵을 찾아보세요
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-2xl shadow-xl p-8 transform hover:scale-105 transition-transform">
            <h2 className="text-2xl font-bold text-indigo-600 mb-4">
              프론트엔드 개발자
            </h2>
            <p className="text-gray-600 mb-4">
              웹의 시각적 요소를 구현하는 전문가
            </p>
            <button
              onClick={() => navigate("/roadmap/프론트엔드%20개발자")}
              className="bg-indigo-500 text-white px-6 py-2 rounded-full hover:bg-indigo-600 transition-colors"
            >
              로드맵 보기
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 transform hover:scale-105 transition-transform">
            <h2 className="text-2xl font-bold text-pink-600 mb-4">
              피트니스 트레이너
            </h2>
            <p className="text-gray-600 mb-4">
              건강한 라이프스타일을 만드는 전문가
            </p>
            <button
              onClick={() => navigate("/roadmap/피트니스%20트레이너")}
              className="bg-pink-500 text-white px-6 py-2 rounded-full hover:bg-pink-600 transition-colors"
            >
              로드맵 보기
            </button>
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              다른 직업 찾아보기
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative" ref={suggestionsRef}>
                <input
                  type="text"
                  value={career}
                  onChange={(e) => setCareer(e.target.value)}
                  placeholder="원하는 직업을 검색해보세요"
                  className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 text-lg"
                />
                {showSuggestions && suggestions.length > 0 && (
                  <div className="absolute z-10 w-full mt-2 bg-white border-2 border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto">
                    {suggestions.map((suggestion, index) => (
                      <div
                        key={index}
                        className="px-6 py-3 hover:bg-indigo-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        {suggestion}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-4 px-6 rounded-xl text-lg font-semibold hover:from-indigo-600 hover:to-purple-600 transition-all transform hover:scale-105"
              >
                로드맵 찾기
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
