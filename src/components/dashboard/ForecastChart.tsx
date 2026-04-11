import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine,
} from "recharts";
import { Zap, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";

const rawData = Array.from({ length: 30 }, (_, i) => {
  const base = 2000 + Math.sin(i / 5) * 400;
  return {
    day: `${i + 1}`,
    sales: i <= 22 ? Math.round(base + Math.random() * 200) : null,
    forecast: i >= 20 ? Math.round(base + 150 + Math.random() * 150) : null,
    avg: Math.round(base + 50),
  };
});

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg bg-card border border-border p-2.5 shadow-elevated text-xs">
      <p className="font-medium text-foreground mb-1">Day {label}</p>
      {payload.map((e: any, i: number) =>
        e.value != null ? (
          <div key={i} className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full" style={{ backgroundColor: e.color }} />
            <span className="text-muted-foreground">{e.name}:</span>
            <span className="font-medium text-foreground">₹{e.value.toLocaleString()}</span>
          </div>
        ) : null
      )}
    </div>
  );
};

const ForecastChart = () => {
  const { t } = useLanguage();

  return (
    <div className="rounded-xl bg-card p-6 border border-border/50 shadow-sm">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10">
            <Zap className="h-4 w-4 text-accent" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">{t("forecast.smartTitle")}</h3>
            <p className="text-xs text-muted-foreground">{t("forecast.smartSubtitle")}</p>
          </div>
        </div>
        <Badge variant="secondary" className="text-xs gap-1">
          <TrendingUp className="h-3 w-3 text-accent" />
          {t("forecast.demandIncreasing")}
        </Badge>
      </div>

      {/* Forecast summary */}
      <div className="grid grid-cols-2 gap-3 my-4">
        <div className="p-3 rounded-lg bg-muted/50 border border-border/30">
          <p className="text-[10px] text-muted-foreground">{t("forecast.next7")}</p>
          <p className="text-lg font-bold text-foreground">₹48,200</p>
          <span className="text-xs font-semibold text-accent">+12% ↑</span>
        </div>
        <div className="p-3 rounded-lg bg-muted/50 border border-border/30">
          <p className="text-[10px] text-muted-foreground">{t("forecast.next30")}</p>
          <p className="text-lg font-bold text-foreground">₹1,85,600</p>
          <span className="text-xs font-semibold text-accent">+8% ↑</span>
        </div>
      </div>

      {/* Chart */}
      <div className="h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={rawData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
            <XAxis
              dataKey="day"
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }}
              axisLine={false}
              tickLine={false}
              interval={4}
              label={{ value: "Day", position: "insideBottomRight", offset: -5, fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
            />
            <YAxis
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `₹${v / 1000}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ paddingTop: "8px", fontSize: "11px" }} />
            <ReferenceLine x="23" stroke="hsl(var(--muted-foreground))" strokeDasharray="3 3" label={{ value: "Today", position: "top", fontSize: 10, fill: "hsl(var(--muted-foreground))" }} />
            <Line type="monotone" dataKey="sales" name={t("charts.dailySales")} stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="avg" name={t("charts.movingAverage")} stroke="hsl(var(--muted-foreground))" strokeWidth={1.5} strokeDasharray="4 4" dot={false} />
            <Line type="monotone" dataKey="forecast" name={t("charts.predicted")} stroke="hsl(var(--accent))" strokeWidth={2.5} strokeDasharray="6 3" dot={false} connectNulls={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ForecastChart;
