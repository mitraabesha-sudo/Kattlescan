import { motion } from "framer-motion";

const CattleSilhouette = ({ aligned = false }: { aligned?: boolean }) => {
  const strokeColor = aligned ? "hsl(142, 71%, 45%)" : "hsl(199, 89%, 48%)";

  return (
    <svg
      viewBox="0 0 400 300"
      className="w-full h-full"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Simplified cattle profile silhouette */}
      <motion.path
        d="M60 180 C60 160, 80 120, 120 110 L140 105 C150 100, 155 90, 160 85 L170 80 C175 78, 180 80, 182 85 L185 95 C188 100, 195 105, 200 108 L280 108 C300 108, 320 115, 330 130 L340 145 C345 155, 340 170, 335 175 L338 200 L342 250 L330 252 L325 210 L310 200 L305 250 L293 252 L290 210 L160 210 L155 250 L143 252 L140 215 L120 210 L115 250 L103 252 L105 215 C90 210, 70 200, 60 180 Z"
        stroke={strokeColor}
        strokeWidth="2"
        strokeDasharray={aligned ? "0" : "8 4"}
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
      />

      {/* Head detail */}
      <motion.path
        d="M155 90 C145 82, 135 80, 130 85 L125 95 C122 100, 125 105, 130 108"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeDasharray={aligned ? "0" : "6 3"}
        fill="none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      />

      {/* Horns */}
      <motion.path
        d="M152 85 L148 72 M160 83 L162 70"
        stroke={strokeColor}
        strokeWidth="1.5"
        fill="none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      />

      {/* Ear */}
      <motion.path
        d="M165 78 C170 68, 178 68, 175 78"
        stroke={strokeColor}
        strokeWidth="1.5"
        fill="none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      />
    </svg>
  );
};

export default CattleSilhouette;
