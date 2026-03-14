import { motion } from "framer-motion";

interface MeasurementCardProps {
  label: string;
  value: string;
  unit: string;
  confidence: number;
  icon?: React.ReactNode;
}

const MeasurementCard = ({ label, value, unit, confidence }: MeasurementCardProps) => {
  const confidenceColor =
    confidence >= 85 ? "bg-confidence-high" :
    confidence >= 60 ? "bg-confidence-medium" :
    "bg-confidence-low";

  const confidenceTextColor =
    confidence >= 85 ? "text-confidence-high" :
    confidence >= 60 ? "text-confidence-medium" :
    "text-confidence-low";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
      className="bg-card rounded-lg p-4 shadow-functional border border-border"
    >
      <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground font-display mb-1">
        {label}
      </p>
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-display font-bold tabular-nums text-foreground">
          {value}
        </span>
        <span className="text-sm text-muted-foreground font-body">{unit}</span>
      </div>
      <div className="mt-3 flex items-center gap-2">
        <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${confidence}%` }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
            className={`h-full rounded-full ${confidenceColor}`}
          />
        </div>
        <span className={`text-[10px] font-display tabular-nums ${confidenceTextColor}`}>
          {confidence}%
        </span>
      </div>
    </motion.div>
  );
};

export default MeasurementCard;
