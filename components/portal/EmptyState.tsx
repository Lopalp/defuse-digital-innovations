import type { LucideIcon } from "lucide-react";

export function EmptyState({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mb-4">
        <Icon className="w-4 h-4 text-gray-400" />
      </div>
      <p className="text-sm font-medium text-gray-900 mb-1">{title}</p>
      <p className="text-sm text-gray-400 max-w-xs leading-relaxed">
        {description}
      </p>
    </div>
  );
}
