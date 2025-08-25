import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  tone?: "green" | "red" | "yellow" | "blue"|"success"| "warning";
 // ou string si tu veux libre
}

const Badge: React.FC<BadgeProps> = ({ children, tone = "blue" }) => {
  // Mapping simple des couleurs selon le tone
  const toneClass = {
    green: "bg-green-500",
    red: "bg-red-500",
    yellow: "bg-yellow-500",
    blue: "bg-blue-500",
    success: "bg-green-500",
    warning: "bg-yellow-500",
  }[tone] || "bg-blue-500";

  return (
    <span className={`px-2 py-1 text-white text-xs rounded ${toneClass}`}>
      {children}
    </span>
  );
};

export default Badge;
