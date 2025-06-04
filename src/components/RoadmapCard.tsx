import React from "react";

interface Resource {
  title: string;
  url: string;
}

interface RoadmapStep {
  id: number;
  title: string;
  description: string;
  resources: Resource[];
}

interface RoadmapCardProps {
  step: RoadmapStep;
  isCompleted: boolean;
  onToggleComplete: (id: number) => void;
}

const RoadmapCard: React.FC<RoadmapCardProps> = ({
  step,
  isCompleted,
  onToggleComplete,
}) => {
  return (
    <div
      className={`bg-white rounded-2xl shadow-xl p-8 transform transition-all duration-300 ${
        isCompleted
          ? "border-l-4 border-green-500"
          : "border-l-4 border-indigo-500"
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-4">
            <h3 className="text-2xl font-bold text-gray-800">{step.title}</h3>
            {isCompleted && (
              <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                완료
              </span>
            )}
          </div>
          <p className="text-gray-600 mb-6 text-lg">{step.description}</p>
          <div className="space-y-3">
            {step.resources.map((resource, index) => (
              <a
                key={index}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium"
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
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
                {resource.title}
              </a>
            ))}
          </div>
        </div>
        <div className="ml-6">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={isCompleted}
              onChange={() => onToggleComplete(step.id)}
              className="sr-only peer"
            />
            <div className="w-11 h-11 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-10 after:w-10 after:transition-all peer-checked:bg-indigo-500"></div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default RoadmapCard;
