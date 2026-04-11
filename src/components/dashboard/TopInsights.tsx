import { Lightbulb, AlertTriangle, TrendingUp, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";

const TopInsights = () => {
  const { t } = useLanguage();

  const insights = [
    {
      icon: AlertTriangle,
      titleKey: "smartInsight.stockDepletion",
      descKey: "smartInsight.stockDepletionDesc",
      actionKey: "smartInsight.restockNow",
      accent: "border-l-destructive bg-destructive/5",
      btnVariant: "default" as const,
    },
    {
      icon: TrendingUp,
      titleKey: "smartInsight.salesGrowth",
      descKey: "smartInsight.salesGrowthDesc",
      actionKey: "smartInsight.increasePrice",
      accent: "border-l-accent bg-accent/5",
      btnVariant: "outline" as const,
    },
    {
      icon: ShoppingCart,
      titleKey: "smartInsight.bestSeller",
      descKey: "smartInsight.bestSellerDesc",
      actionKey: "smartInsight.restockNow",
      accent: "border-l-primary bg-primary/5",
      btnVariant: "outline" as const,
    },
  ];

  return (
    <div className="rounded-xl bg-card p-6 border border-border/50 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
          <Lightbulb className="h-4 w-4 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">{t("smartInsight.title")}</h3>
          <p className="text-xs text-muted-foreground">{t("smartInsight.subtitle")}</p>
        </div>
      </div>

      <div className="space-y-3">
        {insights.map((ins) => {
          const Icon = ins.icon;
          return (
            <div key={ins.titleKey} className={`p-4 rounded-lg border-l-4 ${ins.accent}`}>
              <div className="flex items-start gap-3">
                <Icon className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground text-sm">{t(ins.titleKey)}</p>
                  <p className="text-sm text-muted-foreground mt-0.5 leading-relaxed">{t(ins.descKey)}</p>
                  <Button
                    variant={ins.btnVariant}
                    size="sm"
                    className="h-7 text-xs mt-2"
                    onClick={() => toast.success(t("smartInsight.actionTaken"), { description: t(ins.actionKey) })}
                  >
                    {t(ins.actionKey)}
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TopInsights;
