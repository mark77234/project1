import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import RoadmapCard from "./RoadmapCard";
import roadmaps from "../data/roadmaps.json";

const RoadmapPage: React.FC = () => {
  const { careerId } = useParams<{ careerId: string }>();
  const navigate = useNavigate();
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const savedProgress = localStorage.getItem(`progress-${careerId}`);
    if (savedProgress) {
      const completed = JSON.parse(savedProgress);
      setCompletedSteps(completed);
      setProgress((completed.length / 5) * 100);
    }
  }, [careerId]);

  const decodedCareerId = careerId ? decodeURIComponent(careerId) : "";
  const roadmap = roadmaps[decodedCareerId as keyof typeof roadmaps];

  if (!roadmap) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full mx-4">
          <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            해당 진로에 대한 로드맵을 찾을 수 없습니다.
          </h1>
          <p className="text-gray-600 mb-6 text-center">
            다른 직업을 검색해보시거나, 홈으로 돌아가세요.
          </p>
          <button
            onClick={() => navigate("/")}
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-3 px-6 rounded-xl hover:from-indigo-600 hover:to-purple-600 transition-all"
          >
            홈으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  const handleToggleComplete = (stepId: number) => {
    const newCompletedSteps = completedSteps.includes(stepId)
      ? completedSteps.filter((id) => id !== stepId)
      : [...completedSteps, stepId];

    setCompletedSteps(newCompletedSteps);
    setProgress((newCompletedSteps.length / 5) * 100);
    localStorage.setItem(
      `progress-${careerId}`,
      JSON.stringify(newCompletedSteps)
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full -mr-32 -mt-32 opacity-50"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-pink-100 to-purple-100 rounded-full -ml-32 -mb-32 opacity-50"></div>

          <div className="relative">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-4xl font-bold text-gray-800 mb-2">
                  {roadmap.title}
                </h1>
                <p className="text-gray-600">
                  당신의 꿈을 향한 여정을 시작해보세요
                </p>
              </div>
              <button
                onClick={() => navigate("/")}
                className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-semibold transition-colors"
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
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                홈으로
              </button>
            </div>

            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-600">
                  전체 진행률
                </span>
                <span className="text-sm font-medium text-indigo-600">
                  {Math.round(progress)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500"></div>

          <div className="space-y-8">
            {roadmap.steps.map((step, index) => (
              <div key={step.id} className="relative">
                <div className="absolute -left-4 w-8 h-8 bg-white rounded-full border-2 border-indigo-500 flex items-center justify-center z-10">
                  <span className="text-indigo-600 font-bold">{index + 1}</span>
                </div>

                <RoadmapCard
                  step={step}
                  isCompleted={completedSteps.includes(step.id)}
                  onToggleComplete={handleToggleComplete}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoadmapPage;
