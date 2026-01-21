import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Download, FileText, Calendar, BarChart3, TrendingUp, Package } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import ExportReportDialog from "@/components/dashboard/ExportReportDialog";

const Reports = () => {
  const [exportOpen, setExportOpen] = useState(false);

  const reportTypes = [
    {
      title: "Sales Performance",
      description: "Daily, weekly, and monthly sales analysis with trends",
      icon: TrendingUp,
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
    {
      title: "Inventory Status",
      description: "Current stock levels, reorder points, and turnover rates",
      icon: Package,
      color: "text-chart-3",
      bgColor: "bg-chart-3/10",
    },
    {
      title: "Demand Forecast",
      description: "AI-generated predictions for the next 7-30 days",
      icon: BarChart3,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Financial Summary",
      description: "Revenue, costs, and profit margins breakdown",
      icon: FileText,
      color: "text-chart-4",
      bgColor: "bg-chart-4/10",
    },
  ];

  const recentReports = [
    { name: "Weekly Sales Report - Jan 15, 2026", date: "Jan 15, 2026", type: "Sales" },
    { name: "Monthly Inventory Report - Dec 2025", date: "Jan 1, 2026", type: "Inventory" },
    { name: "Q4 Forecast Accuracy Report", date: "Dec 31, 2025", type: "Forecast" },
    { name: "Annual Financial Summary 2025", date: "Dec 30, 2025", type: "Financial" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header activeTab="reports" />
      
      <main className="container py-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 animate-fade-in">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Reports</h2>
            <p className="text-muted-foreground">Generate and download business reports</p>
          </div>
          
          <div className="flex gap-3">
            <Button variant="outline">
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Report
            </Button>
            <Button variant="hero" onClick={() => setExportOpen(true)}>
              <Download className="h-4 w-4 mr-2" />
              Generate Report
            </Button>
          </div>
        </div>

        {/* Report Types Grid */}
        <h3 className="text-lg font-semibold text-foreground mb-4">Available Reports</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {reportTypes.map((report, index) => (
            <Card 
              key={report.title} 
              className="cursor-pointer hover:shadow-elevated transition-shadow animate-fade-in"
              style={{ animationDelay: `${0.1 + index * 0.05}s` }}
              onClick={() => setExportOpen(true)}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`h-12 w-12 rounded-xl ${report.bgColor} flex items-center justify-center`}>
                    <report.icon className={`h-6 w-6 ${report.color}`} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground mb-1">{report.title}</h4>
                    <p className="text-sm text-muted-foreground">{report.description}</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Reports */}
        <Card className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <CardHeader>
            <CardTitle className="text-lg">Recent Reports</CardTitle>
            <CardDescription>Previously generated reports</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentReports.map((report, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium text-foreground">{report.name}</p>
                      <p className="text-sm text-muted-foreground">{report.date}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Export Dialog */}
      <ExportReportDialog open={exportOpen} onOpenChange={setExportOpen} />
    </div>
  );
};

export default Reports;
