import Header from "@/components/layout/Header";
import DailyRecordUpload from "@/components/dashboard/DailyRecordUpload";
import KeyMetrics from "@/components/dashboard/KeyMetrics";
import ForecastChart from "@/components/dashboard/ForecastChart";
import TopInsights from "@/components/dashboard/TopInsights";
import FloatingAddSale from "@/components/dashboard/FloatingAddSale";
import AIChatbot from "@/components/dashboard/AIChatbot";
import { useLanguage } from "@/contexts/LanguageContext";

const Dashboard = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <Header activeTab="dashboard" />

      <main className="container py-8 space-y-6">
        {/* Title */}
        <div>
          <h2 className="text-2xl font-bold text-foreground">{t("dashboard.title")}</h2>
          <p className="text-muted-foreground">{t("dashboard.subtitle")}</p>
        </div>

        {/* Step 1: Key Metrics */}
        <KeyMetrics />

        {/* Step 2: Data Input */}
        <DailyRecordUpload />

        {/* Step 3: Forecast — the hero visualization */}
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
