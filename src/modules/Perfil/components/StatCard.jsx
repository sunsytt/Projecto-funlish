export default function StatCard({ icon: Icon, iconBg, iconColor, label, value, valueColor, footer, footerColor }) {
  return (
    <div className="bg-brand-white rounded-2xl shadow-sm p-5">
      <div className="flex items-center gap-2 mb-3">
        <span className={`rounded-full p-2 ${iconBg}`}>
          <Icon size={16} className={iconColor} />
        </span>
        <p className="text-sm font-medium text-brand-midnight/70">{label}</p>
      </div>
      <p className={`text-3xl font-extrabold mb-1 ${valueColor ?? "text-brand-midnight"}`}>
        {value}
      </p>
      {footer && <p className={`text-xs ${footerColor ?? "text-brand-midnight/50"}`}>{footer}</p>}
    </div>
  );
}