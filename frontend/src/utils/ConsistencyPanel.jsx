// src/utils/ConsistencyPanel.jsx
import React from 'react';

export const ConsistencyPanel = ({ errors = [] }) => {
  if (errors.length === 0) {
    return (
      <div className="p-4 bg-emerald-50 text-emerald-700 rounded-xl border border-emerald-200 flex items-center gap-2 text-sm my-4">
        <span>✨ All style, tense, and layout validations look perfectly uniform!</span>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm my-4">
      <h3 className="text-base font-bold text-gray-800 mb-3 flex items-center gap-2">
        <span>🔍 Content Consistency Insights</span>
        <span className="text-xs font-semibold px-2 py-0.5 bg-amber-100 text-amber-800 rounded-full">
          {errors.length}
        </span>
      </h3>
      <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
        {errors.map((err, idx) => (
          <div 
            key={idx} 
            className={`p-3 rounded-lg border text-sm ${
              err.severity === 'error' 
                ? 'bg-rose-50 border-rose-100 text-rose-800' 
                : 'bg-amber-50 border-amber-100 text-amber-800'
            }`}
          >
            <p className="font-semibold capitalize flex items-center gap-1.5 mb-1">
              <span>{err.type === 'date' ? '📅' : err.type === 'tense' ? '⏳' : '🗂️'}</span>
              <span>{err.type} Consistency Warning</span>
            </p>
            <p className="text-xs opacity-90">{err.message}</p>
            {err.offendingText && (
              <blockquote className="mt-1.5 pl-2 border-l-2 border-current italic text-xs opacity-75 truncate">
                "{err.offendingText}"
              </blockquote>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};