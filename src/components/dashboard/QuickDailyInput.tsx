import { useState, useEffect } from "react";
import { DollarSign, TrendingUp, CheckCircle2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";
import type { ShopProfile } from "./QuickSetup";

interface SalesEntry {
  date: string;
  amount: number;
  topProduct?: string;
}

interface QuickDailyInputProps {
  profile: ShopProfile;
}

const QuickDailyInput = ({ profile }: QuickDailyInputProps) => {
  const { t } = useLanguage();
  const [amount, setAmount] = useState("");
  const [topProduct, setTopProduct] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [history, setHistory] = useState<SalesEntry[]>([]);

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const saved = localStorage.getItem("salesHistory");
    if (saved) {
      const parsed: SalesEntry[] = JSON.parse(saved);
      setHistory(parsed);
      const todayEntry = parsed.find((e) => e.date === today);
      if (todayEntry) {
        setSubmitted(true);
        setAmount(String(todayEntry.amount));
      }
    }
    // Smart default: pre-fill with estimated or last entry
    if (!amount) {
      const saved2 = localStorage.getItem("salesHistory");
      if (saved2) {
        const h: SalesEntry[] = JSON.parse(saved2);
        if (h.length > 0 && !h.find((e) => e.date === today)) {
          setAmount(String(h[h.length - 1].amount));
        }
      } else {
        setAmount(String(profile.estimatedDailySales));
      }
    }
  }, []);

  const handleSubmit = () => {
    const val = parseInt(amount) || 0;
    if (val <= 0) return;
    const entry: SalesEntry = { date: today, amount: val, topProduct: topProduct || undefined };
    const updated = [...history.filter((e) => e.date !== today), entry];
    localStorage.setItem("salesHistory", JSON.stringify(updated));
    setHistory(updated);
    setSubmitted(true);
  };

  const todayAmount = parseInt(amount) || 0;
  const recentEntries = history.filter((e) => e.date !== today).slice(-6);
  const avgRecent = recentEntries.length > 0
    ? Math.round(recentEntries.reduce((s, e) => s + e.amount, 0) / recentEntries.length)
    : profile.estimatedDailySales;
  const changePercent = avgRecent > 0 ? (((todayAmount - avgRecent) / avgRecent) * 100).toFixed(1) : "0";
  const isUp = parseFloat(changePercent) >= 0;

  // Lightweight AI insight
  const getInsight = (): string => {
    if (recentEntries.length < 2) return t("insight.keepTracking");
    const last3 = recentEntries.slice(-3);
    const increasing = last3.every((e, i) => i === 0 || e.amount >= last3[i - 1].amount);
    const decreasing = last3.every((e, i) => i === 0 || e.amount <= last3[i - 1].amount);
    const dayOfWeek = new Date().getDay();
    if (increasing) return t("insight.salesIncreasing");
    if (decreasing) return t("insight.salesDecreasing");
    if (dayOfWeek === 5 || dayOfWeek === 6) return t("insight.weekendDemand");
    return t("insight.salesSteady");
  };

  if (submitted) {
    return (
      <div className="rounded-xl bg-card border border-border/50 shadow-sm p-6">
        <div className="flex items-center gap-2 mb-4">
          <CheckCircle2 className="h-5 w-5 text-accent" />
          <h3 className="text-base font-semibold text-foreground">{t("quickInput.todaySummary")}</h3>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
            <p className="text-xs text-muted-foreground">{t("quickInput.todaysSales")}</p>
            <p className="text-2xl font-bold text-foreground">₹{todayAmount.toLocaleString()}</p>
            <span className={`text-xs font-semibold ${isUp ? "text-accent" : "text-destructive"}`}>
              {isUp ? "↑" : "↓"} {changePercent}% {t("quickInput.vsAvg")}
            </span>
          </div>
          <div className="p-4 rounded-xl bg-muted/50 border border-border/30">
            <p className="text-xs text-muted-foreground">{t("quickInput.avgDaily")}</p>
            <p className="text-2xl font-bold text-foreground">₹{avgRecent.toLocaleString()}</p>
            <span className="text-xs text-muted-foreground">
              {t("quickInput.basedOn")} {recentEntries.length || 1} {t("quickInput.days")}
            </span>
          </div>
        </div>

        {/* AI Insight */}
        <div className="p-3 rounded-lg bg-accent/5 border border-accent/20 flex items-start gap-2.5">
          <Sparkles className="h-4 w-4 text-accent mt-0.5 shrink-0" />
          <div>
            <p className="text-xs font-semibold text-accent mb-0.5">{t("insight.aiInsight")}</p>
            <p className="text-sm text-muted-foreground leading-relaxed">{getInsight()}</p>
          </div>
        </div>

        <Button
          variant="ghost"
          size="sm"
          className="mt-3 text-xs text-muted-foreground"
          onClick={() => setSubmitted(false)}
        >
          {t("quickInput.updateSales")}
        </Button>
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-card border border-border/50 shadow-sm p-6">
      <div className="flex items-center gap-2 mb-4">
        <DollarSign className="h-5 w-5 text-primary" />
        <div>
          <h3 className="text-base font-semibold text-foreground">{t("quickInput.title")}</h3>
          <p className="text-xs text-muted-foreground">{t("quickInput.subtitle")}</p>
        </div>
      </div>

      <div className="space-y-3">
        {/* Main input */}
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-bold text-muted-foreground">₹</span>
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="text-center text-2xl h-14 font-bold pl-10"
            placeholder={String(profile.estimatedDailySales)}
          />
        </div>

        {/* Optional top product */}
        <Input
          value={topProduct}
          onChange={(e) => setTopProduct(e.target.value)}
          placeholder={t("quickInput.topProductOptional")}
          className="text-sm"
        />

        {/* Smart default hint */}
        {amount === String(profile.estimatedDailySales) && (
          <p className="text-[10px] text-muted-foreground text-center">
            {t("quickInput.prefilled")}
          </p>
        )}

        <Button className="w-full h-11" onClick={handleSubmit} disabled={!amount || parseInt(amount) <= 0}>
          <TrendingUp className="h-4 w-4 mr-2" />
          {t("quickInput.saveAndSee")}
        </Button>
      </div>
    </div>
  );
};

export default QuickDailyInput;
