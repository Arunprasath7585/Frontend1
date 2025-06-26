import React from "react";

const StatsCard = ({ title, value, icon, color }) => {
  const colorClasses = {
    blue: {
      border: 'border-blue-600',
      bg: 'bg-blue-100',
      text: 'text-blue-600'
    },
    purple: {
      border: 'border-purple-600',
      bg: 'bg-purple-100',
      text: 'text-purple-600'
    },
    green: {
      border: 'border-green-600',
      bg: 'bg-green-100',
      text: 'text-green-600'
    }
  };

  return (
    <div className={`bg-white p-6 rounded-xl shadow border-l-4 ${colorClasses[color].border}`}>
      <div className="flex items-center justify-between">
        <div>
          {title && <h4 className="section-title">{title}</h4>}
          <h3 className="text-2xl font-bold text-gray-800 mt-1">{value}</h3>
        </div>
        <div className={`${colorClasses[color].bg} p-3 rounded-full`}>
          <i className={`fas ${icon} ${colorClasses[color].text} text-xl`}></i>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;