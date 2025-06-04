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
    <div className="bg-white rounded-lg shadow-md p-6 mb-4 border-l-4 border-blue-500">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            {step.title}
          </h3>
          <p className="text-gray-600 mb-4">{step.description}</p>
          <div className="space-y-2">
            {step.resources.map((resource, index) => (
              <a
                key={index}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-blue-500 hover:text-blue-600"
              >
                {resource.title} →
              </a>
            ))}
          </div>
        </div>
        <div className="ml-4">
          <input
            type="checkbox"
            checked={isCompleted}
            onChange={() => onToggleComplete(step.id)}
            className="w-5 h-5 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
};

export default RoadmapCard;
