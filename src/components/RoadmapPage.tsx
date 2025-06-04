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
      setProgress((completed.length / 5) * 100); // 5단계 기준
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
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">
              {roadmap.title}
            </h1>
            <button
              onClick={() => navigate("/")}
              className="text-indigo-500 hover:text-indigo-600 font-semibold"
            >
              ← 홈으로
            </button>
          </div>

          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-600">진행률</span>
              <span className="text-sm font-medium text-indigo-600">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {roadmap.steps.map((step) => (
            <RoadmapCard
              key={step.id}
              step={step}
              isCompleted={completedSteps.includes(step.id)}
              onToggleComplete={handleToggleComplete}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoadmapPage;
