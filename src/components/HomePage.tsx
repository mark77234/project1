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
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          당신의 꿈은 무엇인가요?
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative" ref={suggestionsRef}>
            <input
              type="text"
              value={career}
              onChange={(e) => setCareer(e.target.value)}
              placeholder="예: 프론트엔드 개발자"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="px-4 py-2 hover:bg-blue-50 cursor-pointer"
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
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
          >
            로드맵 보기
          </button>
        </form>
      </div>
    </div>
  );
};

export default HomePage;
