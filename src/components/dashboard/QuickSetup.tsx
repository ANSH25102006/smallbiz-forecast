import { useState } from "react";
import { Store, Users, Receipt, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";

const shopTypes = [
  { value: "grocery", emoji: "🛒", labelKey: "setup.grocery" },
  { value: "clothing", emoji: "👕", labelKey: "setup.clothing" },
  { value: "electronics", emoji: "📱", labelKey: "setup.electronics" },
  { value: "pharmacy", emoji: "💊", labelKey: "setup.pharmacy" },
  { value: "restaurant", emoji: "🍽️", labelKey: "setup.restaurant" },
  { value: "general", emoji: "🏪", labelKey: "setup.general" },
];

export interface ShopProfile {
  shopType: string;
  customersPerDay: number;
  avgBillValue: number;
  estimatedDailySales: number;
}

interface QuickSetupProps {
  onComplete: (profile: ShopProfile) => void;
}

const QuickSetup = ({ onComplete }: QuickSetupProps) => {
  const { t } = useLanguage();
  const [step, setStep] = useState(0);
  const [shopType, setShopType] = useState("");
  const [customers, setCustomers] = useState("");
  const [avgBill, setAvgBill] = useState("");

  const handleFinish = () => {
    const c = parseInt(customers) || 30;
    const b = parseInt(avgBill) || 200;
    onComplete({
      shopType: shopType || "general",
      customersPerDay: c,
      avgBillValue: b,
      estimatedDailySales: c * b,
    });
  };

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="w-full max-w-md mx-auto">
        <div className="rounded-2xl bg-card border border-border/50 shadow-sm p-8">
          {/* Progress */}
          <div className="flex gap-1.5 mb-8">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`h-1.5 flex-1 rounded-full transition-colors ${
                  i <= step ? "bg-primary" : "bg-muted"
                }`}
              />
            ))}
          </div>

          {step === 0 && (
            <div className="space-y-5">
              <div className="text-center">
                <Store className="h-10 w-10 text-primary mx-auto mb-3" />
                <h2 className="text-xl font-bold text-foreground">{t("setup.welcomeTitle")}</h2>
                <p className="text-sm text-muted-foreground mt-1">{t("setup.shopTypeQuestion")}</p>
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                {shopTypes.map((s) => (
                  <button
                    key={s.value}
                    onClick={() => { setShopType(s.value); setStep(1); }}
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      shopType === s.value
                        ? "border-primary bg-primary/5"
                        : "border-border/50 hover:border-primary/50 hover:bg-muted/50"
                    }`}
                  >
                    <span className="text-xl">{s.emoji}</span>
                    <p className="text-sm font-medium text-foreground mt-1">{t(s.labelKey)}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-5">
              <div className="text-center">
                <Users className="h-10 w-10 text-primary mx-auto mb-3" />
                <h2 className="text-xl font-bold text-foreground">{t("setup.customersTitle")}</h2>
                <p className="text-sm text-muted-foreground mt-1">{t("setup.customersDesc")}</p>
              </div>
              <Input
                type="number"
                placeholder="e.g. 30"
                value={customers}
                onChange={(e) => setCustomers(e.target.value)}
                className="text-center text-2xl h-14 font-bold"
                autoFocus
              />
              <div className="flex gap-2">
                {["15", "30", "60", "100"].map((v) => (
                  <button
                    key={v}
                    onClick={() => setCustomers(v)}
                    className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-colors ${
                      customers === v ? "border-primary bg-primary/5 text-primary" : "border-border/50 text-muted-foreground hover:bg-muted/50"
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" onClick={() => setStep(0)}>{t("setup.back")}</Button>
                <Button className="flex-1" onClick={() => setStep(2)} disabled={!customers}>
                  {t("setup.next")} <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5">
              <div className="text-center">
                <Receipt className="h-10 w-10 text-primary mx-auto mb-3" />
                <h2 className="text-xl font-bold text-foreground">{t("setup.avgBillTitle")}</h2>
                <p className="text-sm text-muted-foreground mt-1">{t("setup.avgBillDesc")}</p>
              </div>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl font-bold text-muted-foreground">₹</span>
                <Input
                  type="number"
                  placeholder="e.g. 200"
                  value={avgBill}
                  onChange={(e) => setAvgBill(e.target.value)}
                  className="text-center text-2xl h-14 font-bold pl-10"
                  autoFocus
                />
              </div>
              <div className="flex gap-2">
                {["100", "200", "500", "1000"].map((v) => (
                  <button
                    key={v}
                    onClick={() => setAvgBill(v)}
                    className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-colors ${
                      avgBill === v ? "border-primary bg-primary/5 text-primary" : "border-border/50 text-muted-foreground hover:bg-muted/50"
                    }`}
                  >
                    ₹{v}
                  </button>
                ))}
              </div>

              {/* Estimation preview */}
              {customers && avgBill && (
                <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
                  <p className="text-xs text-muted-foreground mb-1">{t("setup.estimatedDaily")}</p>
                  <p className="text-2xl font-bold text-primary">
                    ₹{(parseInt(customers) * parseInt(avgBill)).toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {customers} {t("setup.customers")} × ₹{avgBill} {t("setup.perBill")}
                  </p>
                </div>
              )}

              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" onClick={() => setStep(1)}>{t("setup.back")}</Button>
                <Button className="flex-1" onClick={handleFinish} disabled={!avgBill}>
                  <Sparkles className="h-4 w-4 mr-1" />
                  {t("setup.getStarted")}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuickSetup;
