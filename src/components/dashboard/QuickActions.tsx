import { useState } from "react";
import { Upload, RefreshCw, Download, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import UploadDataDialog from "./UploadDataDialog";
import RunForecastDialog from "./RunForecastDialog";
import ExportReportDialog from "./ExportReportDialog";
import AddProductDialog from "./AddProductDialog";

const QuickActions = () => {
  const [uploadOpen, setUploadOpen] = useState(false);
  const [forecastOpen, setForecastOpen] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const [addProductOpen, setAddProductOpen] = useState(false);

  return (
    <>
      <div className="rounded-xl bg-card p-6 shadow-card border border-border/50">
        <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
        
        <div className="grid grid-cols-2 gap-3">
          <Button 
            variant="outline" 
            className="h-auto py-4 flex-col gap-2 hover:border-primary hover:bg-primary/5"
            onClick={() => setUploadOpen(true)}
          >
            <Upload className="h-5 w-5 text-primary" />
            <span className="text-xs font-medium">Upload Data</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="h-auto py-4 flex-col gap-2 hover:border-primary hover:bg-primary/5"
            onClick={() => setForecastOpen(true)}
          >
            <RefreshCw className="h-5 w-5 text-primary" />
            <span className="text-xs font-medium">Run Forecast</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="h-auto py-4 flex-col gap-2 hover:border-primary hover:bg-primary/5"
            onClick={() => setExportOpen(true)}
          >
            <Download className="h-5 w-5 text-primary" />
            <span className="text-xs font-medium">Export Report</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="h-auto py-4 flex-col gap-2 hover:border-primary hover:bg-primary/5"
            onClick={() => setAddProductOpen(true)}
          >
            <Plus className="h-5 w-5 text-primary" />
            <span className="text-xs font-medium">Add Product</span>
          </Button>
        </div>
      </div>

      {/* Dialogs */}
      <UploadDataDialog open={uploadOpen} onOpenChange={setUploadOpen} />
      <RunForecastDialog open={forecastOpen} onOpenChange={setForecastOpen} />
      <ExportReportDialog open={exportOpen} onOpenChange={setExportOpen} />
      <AddProductDialog open={addProductOpen} onOpenChange={setAddProductOpen} />
    </>
  );
};

export default QuickActions;
