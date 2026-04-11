import { DollarSign, TrendingUp, Target } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const KeyMetrics = () => {
  const { t } = useLanguage();

  const metrics = [
    {
      label: t("kpi.totalRevenue"),
      value: "₹62,400",
      change: "+18.2%",
      positive: true,
      icon: DollarSign,
    },
    {
      label: t("kpi.growth"),
      value: "18.2%",
      change: "+2.1%",
      positive: true,
      icon: TrendingUp,
    },
    {
      label: t("kpi.forecastAccuracy"),
      value: "94.2%",
      change: "+2.1%",
      positive: true,
      icon: Target,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {metrics.map((m) => {
        const Icon = m.icon;
        return (
          <div
            key={m.label}
            className="rounded-xl bg-card p-5 border border-border/50 shadow-sm flex items-center gap-4"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10">
              <Icon className="h-5 w-5 text-primary" />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground truncate">{m.label}</p>
              <p className="text-xl font-bold text-foreground leading-tight">{m.value}</p>
              <span className="text-xs font-semibold text-accent">{m.change}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default KeyMetrics;
