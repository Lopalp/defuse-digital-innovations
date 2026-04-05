export function ProgressBar({ value }: { value: number }) {
  return (
    <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
      <div
        className="h-full bg-gray-900 rounded-full transition-all duration-500"
        style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
      />
    </div>
  );
}
