import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import careers from "../data/careers.json";

const HomePage: React.FC = () => {
  const [jobTitle, setJobTitle] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // 입력값이 변경될 때마다 제안 목록 업데이트
  useEffect(() => {
    if (jobTitle.trim()) {
      const filtered = careers.careers.filter((job) =>
        job.toLowerCase().includes(jobTitle.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [jobTitle]);

  // 외부 클릭 시 제안 목록 닫기
  useEffect(() => {
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
    if (jobTitle.trim()) {
      setIsLoading(true);
      // 실제 구현에서는 API 호출 등이 들어갈 수 있습니다
      setTimeout(() => {
        navigate(`/roadmap/${encodeURIComponent(jobTitle)}`);
      }, 1000);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setJobTitle(suggestion);
    setShowSuggestions(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* 헤더 섹션 */}
          <div className="text-center mb-16 space-y-6">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient">
              커리어 로드맵 생성기
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              당신의 꿈꾸는 직업을 입력하세요.
              <br />
              AI가 최적의 학습 로드맵을 만들어드립니다.
            </p>
          </div>

          {/* 메인 카드 */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 transform transition-all duration-300 hover:shadow-3xl">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="relative" ref={suggestionsRef}>
                <div className="flex items-center bg-gray-50 rounded-2xl p-4 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:bg-white transition-all duration-300">
                  <svg
                    className="w-6 h-6 text-indigo-500 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  <input
                    type="text"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    placeholder="예: 프론트엔드 개발자"
                    className="flex-1 bg-transparent border-none focus:outline-none text-lg placeholder-gray-400"
                  />
                  {jobTitle && (
                    <button
                      type="button"
                      onClick={() => setJobTitle("")}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  )}
                </div>

                {/* 제안 목록 */}
                {showSuggestions && suggestions.length > 0 && (
                  <div className="absolute w-full mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-10 animate-slideDown">
                    {suggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="w-full px-4 py-3 text-left hover:bg-indigo-50 transition-colors flex items-center gap-3 group"
                      >
                        <svg
                          className="w-5 h-5 text-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={!jobTitle.trim() || isLoading}
                className={`w-full py-4 rounded-2xl text-lg font-semibold text-white transition-all duration-300 transform hover:scale-[1.02] ${
                  !jobTitle.trim() || isLoading
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    로드맵 생성 중...
                  </div>
                ) : (
                  "로드맵 생성하기"
                )}
              </button>
            </form>
          </div>

          {/* 특징 섹션 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {[
              {
                icon: "🎯",
                title: "맞춤형 로드맵",
                description:
                  "당신의 목표에 맞는 최적의 학습 경로를 제시합니다.",
              },
              {
                icon: "📚",
                title: "체계적인 학습",
                description: "단계별로 구성된 체계적인 학습 계획을 제공합니다.",
              },
              {
                icon: "🚀",
                title: "빠른 성장",
                description: "효율적인 학습으로 빠르게 성장할 수 있습니다.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
