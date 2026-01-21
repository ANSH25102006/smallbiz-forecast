import Header from "@/components/layout/Header";
import SalesChart from "@/components/dashboard/SalesChart";
import InsightCard from "@/components/dashboard/InsightCard";
import { Button } from "@/components/ui/button";
import { RefreshCw, Calendar, TrendingUp, Download } from "lucide-react";
import { useState } from "react";
import RunForecastDialog from "@/components/dashboard/RunForecastDialog";
import ExportReportDialog from "@/components/dashboard/ExportReportDialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Forecasts = () => {
  const [forecastOpen, setForecastOpen] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);

  const forecastMetrics = [
    { label: "7-Day Forecast", value: "₹48,200", trend: "+12%" },
    { label: "30-Day Forecast", value: "₹1,85,600", trend: "+8%" },
    { label: "Accuracy Rate", value: "94.2%", trend: "+2.1%" },
    { label: "Next Restock", value: "3 days", trend: "6 items" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header activeTab="forecasts" />
      
      <main className="container py-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 animate-fade-in">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Demand Forecasts</h2>
            <p className="text-muted-foreground">AI-powered predictions for inventory planning</p>
          </div>
          
          <div className="flex gap-3">
            <Button variant="outline">
              <Calendar className="h-4 w-4 mr-2" />
              Last 30 Days
            </Button>
            <Button variant="hero" onClick={() => setForecastOpen(true)}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Run New Forecast
            </Button>
          </div>
        </div>

        {/* Forecast Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {forecastMetrics.map((metric, index) => (
            <Card 
              key={metric.label} 
              className="animate-fade-in" 
              style={{ animationDelay: `${0.1 + index * 0.05}s` }}
            >
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground mb-1">{metric.label}</p>
                <p className="text-2xl font-bold text-foreground">{metric.value}</p>
                <p className="text-sm text-accent mt-1 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  {metric.trend}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <SalesChart />
          </div>
          <div className="animate-fade-in" style={{ animationDelay: "0.35s" }}>
            <InsightCard />
          </div>
        </div>

        {/* Export Section */}
        <Card className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <CardHeader>
            <CardTitle className="text-lg">Export Forecast Data</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Download detailed forecast reports for planning and analysis.
            </p>
            <Button variant="outline" onClick={() => setExportOpen(true)}>
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </CardContent>
        </Card>
      </main>

      {/* Dialogs */}
      <RunForecastDialog open={forecastOpen} onOpenChange={setForecastOpen} />
      <ExportReportDialog open={exportOpen} onOpenChange={setExportOpen} />
    </div>
  );
};

export default Forecasts;
