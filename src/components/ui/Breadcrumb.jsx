import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Breadcrumb({ items = [] }) {
  if (items.length === 0) return <div />;

  return (
    <div className="flex items-center gap-2 text-lg font-semibold">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-2">
          {item.to ? (
            <Link to={item.to} className="text-brand-white/70 hover:text-brand-white">
              {item.label}
            </Link>
          ) : (
            <span className="text-brand-white">{item.label}</span>
          )}
          {i < items.length - 1 && (
            <ChevronRight size={16} className="text-brand-white/50" />
          )}
        </span>
      ))}
    </div>
  );
}