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
      className={`bg-white rounded-2xl shadow-xl p-8 transform transition-all duration-300 hover:scale-[1.02] ${
        isCompleted
          ? "border-l-4 border-green-500"
          : "border-l-4 border-indigo-500"
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-4">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {step.title}
            </h3>
            {isCompleted && (
              <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full flex items-center gap-1">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                완료
              </span>
            )}
          </div>
          <p className="text-gray-600 mb-6 text-lg leading-relaxed">
            {step.description}
          </p>

          <div className="bg-gray-50 rounded-xl p-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <svg
                className="w-5 h-5 text-indigo-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
              학습 리소스
            </h4>
            <div className="space-y-3">
              {step.resources.map((resource, index) => (
                <a
                  key={index}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-white transition-colors group"
                >
                  <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center group-hover:bg-indigo-500 transition-colors">
                    <svg
                      className="w-5 h-5 text-indigo-500 group-hover:text-white transition-colors"
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
                  </div>
                  <span className="text-indigo-600 group-hover:text-indigo-700 font-medium transition-colors">
                    {resource.title}
                  </span>
                </a>
              ))}
            </div>
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
            <div className="w-12 h-12 bg-gray-100 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-11 after:w-11 after:transition-all peer-checked:bg-gradient-to-r from-green-500 to-emerald-500 hover:bg-gray-200 peer-checked:hover:from-green-600 peer-checked:hover:to-emerald-600"></div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default RoadmapCard;
