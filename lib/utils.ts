import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date | string): string {
  const d = new Date(date);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export function getPriorityColor(priority: string): string {
  switch (priority) {
    case 'URGENT':
      return 'bg-red-500 text-white';
    case 'IMPORTANT':
      return 'bg-orange-500 text-white';
    case 'MINOR':
      return 'bg-gray-400 text-white';
    default:
      return 'bg-gray-400 text-white';
  }
}

export function getPriorityBadgeColor(priority: string): string {
  switch (priority) {
    case 'URGENT':
      return 'bg-red-50 text-red-700 ring-red-600/20';
    case 'IMPORTANT':
      return 'bg-orange-50 text-orange-700 ring-orange-600/20';
    case 'MINOR':
      return 'bg-gray-50 text-gray-700 ring-gray-600/20';
    default:
      return 'bg-gray-50 text-gray-700 ring-gray-600/20';
  }
}
