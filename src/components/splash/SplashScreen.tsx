import { motion } from "framer-motion";
import { BarChart3 } from "lucide-react";

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Animated Logo */}
      <motion.div
        className="relative"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 20,
          delay: 0.2,
        }}
      >
        <motion.div
          className="flex h-24 w-24 items-center justify-center rounded-2xl gradient-primary shadow-elevated"
          animate={{
            boxShadow: [
              "0 10px 40px -10px hsl(221 83% 53% / 0.2)",
              "0 10px 60px -10px hsl(221 83% 53% / 0.4)",
              "0 10px 40px -10px hsl(221 83% 53% / 0.2)",
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <BarChart3 className="h-12 w-12 text-primary-foreground" />
        </motion.div>
      </motion.div>

      {/* Animated Title */}
      <motion.div
        className="mt-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-gradient mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          ForecastPro
        </motion.h1>
        <motion.p
          className="text-muted-foreground text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          Retail Demand Intelligence
        </motion.p>
      </motion.div>

      {/* Loading bar */}
      <motion.div
        className="mt-12 w-64 h-1 bg-muted rounded-full overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <motion.div
          className="h-full gradient-primary rounded-full"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ delay: 1.4, duration: 1.5, ease: "easeInOut" }}
          onAnimationComplete={onComplete}
        />
      </motion.div>

      {/* Subtitle */}
      <motion.p
        className="mt-4 text-sm text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
      >
        Powered by Machine Learning
      </motion.p>
    </motion.div>
  );
};

export default SplashScreen;
