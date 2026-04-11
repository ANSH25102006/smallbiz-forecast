import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import QuickSetup, { type ShopProfile } from "@/components/dashboard/QuickSetup";
import QuickDailyInput from "@/components/dashboard/QuickDailyInput";
import KeyMetrics from "@/components/dashboard/KeyMetrics";
import ForecastChart from "@/components/dashboard/ForecastChart";
import TopInsights from "@/components/dashboard/TopInsights";
import FloatingAddSale from "@/components/dashboard/FloatingAddSale";
import AIChatbot from "@/components/dashboard/AIChatbot";
import { useLanguage } from "@/contexts/LanguageContext";

const PROFILE_KEY = "shopProfile";

const Dashboard = () => {
  const { t } = useLanguage();
  const [profile, setProfile] = useState<ShopProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem(PROFILE_KEY);
    if (saved) setProfile(JSON.parse(saved));
    setLoading(false);
  }, []);

  const handleSetupComplete = (p: ShopProfile) => {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(p));
    setProfile(p);
  };

  if (loading) return null;

  // No-data mode: show setup wizard
  if (!profile) {
    return (
      <div className="min-h-screen bg-background">
        <Header activeTab="dashboard" />
        <main className="container py-8">
          <QuickSetup onComplete={handleSetupComplete} />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header activeTab="dashboard" />

      <main className="container py-8 space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground">{t("dashboard.title")}</h2>
          <p className="text-muted-foreground">{t("dashboard.subtitle")}</p>
        </div>

        {/* Step 1: Quick 10-second daily input */}
        <QuickDailyInput profile={profile} />

        {/* Step 2: Key Metrics */}
        <KeyMetrics />

        {/* Step 3: Forecast — hero visualization */}
        <ForecastChart />

        {/* Step 4: What should you do next? */}
        <TopInsights />
      </main>

      <footer className="border-t border-border bg-card/50 mt-12">
        <div className="container py-6 text-center text-sm text-muted-foreground">
          <p>{t("footer.tagline")}</p>
          <p className="text-xs mt-1">{t("footer.powered")}</p>
        </div>
      </footer>

      <FloatingAddSale />
      <AIChatbot />
    </div>
  );
};

export default Dashboard;
