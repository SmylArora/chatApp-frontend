import { MessageSquare } from "lucide-react";

export default function AuthImagePattern({ title, subtitle }) {
  return (
    <div className="hidden lg:flex flex-col justify-center items-center p-10 bg-[#1e3e3e08]">

      {/* Animated Squares */}
      <div className="grid grid-cols-3 gap-4 mb-10">
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            className="w-24 h-24 rounded-xl bg-primary/30 animate-pulse"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>

      {/* Icon */}
      <div className="size-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
        <MessageSquare className="size-7 text-primary" />
      </div>

      {/* Text */}
      <h2 className="text-2xl font-bold text-center">{title}</h2>

      {subtitle && (
        <p className="text-base-content/60 mt-2 text-center max-w-sm">
          {subtitle}
        </p>
      )}
    </div>
  );
}
