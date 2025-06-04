import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import RoadmapCard from "./RoadmapCard";
import roadmaps from "../data/roadmaps.json";

const RoadmapPage: React.FC = () => {
  const { careerId } = useParams<{ careerId: string }>();
  const navigate = useNavigate();
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  useEffect(() => {
    const savedProgress = localStorage.getItem(`progress-${careerId}`);
    if (savedProgress) {
      setCompletedSteps(JSON.parse(savedProgress));
    }
  }, [careerId]);

  const decodedCareerId = careerId ? decodeURIComponent(careerId) : "";
  const roadmap = roadmaps[decodedCareerId as keyof typeof roadmaps];

  if (!roadmap) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            해당 진로에 대한 로드맵을 찾을 수 없습니다.
          </h1>
          <button
            onClick={() => navigate("/")}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
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
    localStorage.setItem(
      `progress-${careerId}`,
      JSON.stringify(newCompletedSteps)
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">{roadmap.title}</h1>
          <button
            onClick={() => navigate("/")}
            className="text-blue-500 hover:text-blue-600"
          >
            ← 홈으로
          </button>
        </div>
        <div className="space-y-4">
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
