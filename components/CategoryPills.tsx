import React from 'react';
import { Category } from '../types';

interface CategoryPillsProps {
  categories: Category[];
  selectedId: string;
  onSelect: (id: string) => void;
}

const CategoryPills: React.FC<CategoryPillsProps> = ({ categories, selectedId, onSelect }) => {
  return (
    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide no-scrollbar">
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onSelect(cat.id)}
          className={`px-6 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${
            selectedId === cat.id
              ? 'bg-gradient-to-r from-[#2DD4BF] to-[#0F766E] text-white shadow-lg shadow-teal-900/50'
              : 'bg-surfaceLight text-gray-400 hover:bg-gray-700 hover:text-white border border-white/5'
          }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
};

export default CategoryPills;
