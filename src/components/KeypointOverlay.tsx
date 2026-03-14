import { motion } from "framer-motion";

interface KeypointOverlayProps {
  points: Array<{
    x: number;
    y: number;
    label: string;
    value: string;
  }>;
  connections: Array<[number, number]>;
}

const KeypointOverlay = ({ points, connections }: KeypointOverlayProps) => {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 300">
      {/* Skeletal connections */}
      {connections.map(([from, to], i) => (
        <motion.line
          key={`line-${i}`}
          x1={points[from].x}
          y1={points[from].y}
          x2={points[to].x}
          y2={points[to].y}
          stroke="hsl(199, 89%, 48%)"
          strokeWidth="1.5"
          strokeOpacity="0.6"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.4, delay: 0.1 * i, ease: [0.4, 0, 0.2, 1] }}
        />
      ))}

      {/* Keypoints */}
      {points.map((point, i) => (
        <motion.g key={`point-${i}`}>
          <motion.circle
            cx={point.x}
            cy={point.y}
            r="5"
            fill="hsl(199, 89%, 48%)"
            fillOpacity="0.3"
            stroke="hsl(199, 89%, 48%)"
            strokeWidth="1.5"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 + i * 0.08, duration: 0.25 }}
          />
          <motion.rect
            x={point.x - 2}
            y={point.y - 20}
            width={point.label.length * 6 + point.value.length * 6 + 16}
            height="16"
            rx="2"
            fill="hsl(199, 89%, 48%)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.9 }}
            transition={{ delay: 0.5 + i * 0.08 }}
          />
          <motion.text
            x={point.x + 6}
            y={point.y - 8}
            className="text-[9px]"
            fontFamily="monospace"
            fill="hsl(0, 0%, 0%)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 + i * 0.08 }}
          >
            {point.label}: {point.value}
          </motion.text>
        </motion.g>
      ))}
    </svg>
  );
};

export default KeypointOverlay;
