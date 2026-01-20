import { useState } from "react";
import { Upload, X, FileSpreadsheet, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";

interface UploadDataDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const UploadDataDialog = ({ open, onOpenChange }: UploadDataDialogProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type === "text/csv" || selectedFile.name.endsWith(".csv")) {
        setFile(selectedFile);
      } else {
        toast({
          title: "Invalid File Type",
          description: "Please upload a CSV file",
          variant: "destructive",
        });
      }
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    
    setIsUploading(true);
    // Simulate upload
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsUploading(false);
    setUploadSuccess(true);
    
    toast({
      title: "Data Uploaded",
      description: "Your sales data has been uploaded successfully!",
    });

    setTimeout(() => {
      setUploadSuccess(false);
      setFile(null);
      onOpenChange(false);
    }, 1500);
  };

  const removeFile = () => setFile(null);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5 text-primary" />
            Upload Sales Data
          </DialogTitle>
          <DialogDescription>
            Upload your historical sales data in CSV format for analysis
          </DialogDescription>
        </DialogHeader>

        {uploadSuccess ? (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="h-16 w-16 rounded-full bg-accent/20 flex items-center justify-center mb-4">
              <CheckCircle className="h-8 w-8 text-accent" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">Upload Complete!</h3>
            <p className="text-muted-foreground text-sm">Processing your data...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {!file ? (
              <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-border rounded-xl cursor-pointer hover:bg-muted/50 transition-colors">
                <div className="flex flex-col items-center">
                  <FileSpreadsheet className="h-10 w-10 text-muted-foreground mb-2" />
                  <p className="text-sm font-medium text-foreground">Click to upload CSV</p>
                  <p className="text-xs text-muted-foreground mt-1">or drag and drop</p>
                </div>
                <input type="file" className="hidden" accept=".csv" onChange={handleFileChange} />
              </label>
            ) : (
              <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50 border border-border">
                <div className="flex items-center gap-3">
                  <FileSpreadsheet className="h-8 w-8 text-primary" />
                  <div>
                    <p className="font-medium text-foreground text-sm">{file.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {(file.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={removeFile}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button
                variant="gradient"
                disabled={!file || isUploading}
                onClick={handleUpload}
              >
                {isUploading ? "Uploading..." : "Upload Data"}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default UploadDataDialog;
