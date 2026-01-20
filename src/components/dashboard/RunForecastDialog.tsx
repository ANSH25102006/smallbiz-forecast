import { useState } from "react";
import { RefreshCw, Loader2, CheckCircle, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/hooks/use-toast";

interface RunForecastDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const RunForecastDialog = ({ open, onOpenChange }: RunForecastDialogProps) => {
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  const runForecast = async () => {
    setIsRunning(true);
    setProgress(0);

    const stages = [
      { progress: 20, text: "Loading historical data..." },
      { progress: 40, text: "Preprocessing data..." },
      { progress: 60, text: "Training ML model..." },
      { progress: 80, text: "Generating predictions..." },
      { progress: 100, text: "Finalizing forecast..." },
    ];

    for (const s of stages) {
      setProgress(s.progress);
      setStage(s.text);
      await new Promise(resolve => setTimeout(resolve, 800));
    }

    setIsComplete(true);
    toast({
      title: "Forecast Complete",
      description: "Demand predictions updated successfully!",
    });

    setTimeout(() => {
      setIsRunning(false);
      setIsComplete(false);
      setProgress(0);
      onOpenChange(false);
    }, 1500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            Run Demand Forecast
          </DialogTitle>
          <DialogDescription>
            Generate ML-powered demand predictions for your inventory
          </DialogDescription>
        </DialogHeader>

        {isComplete ? (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="h-16 w-16 rounded-full bg-accent/20 flex items-center justify-center mb-4">
              <CheckCircle className="h-8 w-8 text-accent" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">Forecast Complete!</h3>
            <p className="text-muted-foreground text-sm">Predictions have been updated</p>
          </div>
        ) : isRunning ? (
          <div className="py-8 space-y-6">
            <div className="flex items-center justify-center">
              <div className="relative">
                <div className="h-20 w-20 rounded-full gradient-primary flex items-center justify-center animate-pulse">
                  <Brain className="h-10 w-10 text-primary-foreground" />
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Progress value={progress} className="h-2" />
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{stage}</span>
                <span className="font-medium text-foreground">{progress}%</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="py-6 space-y-4">
            <div className="rounded-xl bg-muted/50 p-4 space-y-2">
              <h4 className="font-medium text-foreground">Forecast Parameters</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Prediction horizon: 30 days</li>
                <li>• Model: Time Series ML</li>
                <li>• Data points: 180 days historical</li>
                <li>• Products: All inventory items</li>
              </ul>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button variant="hero" onClick={runForecast}>
                <RefreshCw className="h-4 w-4" />
                Start Forecast
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default RunForecastDialog;
