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
      {/* Buffalo body - stockier, heavier build */}
      <motion.path
        d="M55 175 C55 155, 70 115, 110 105 L130 100 C138 96, 142 88, 145 82 L150 76 C154 72, 160 70, 165 74 L170 82 C174 88, 182 95, 190 100 L195 102 C200 100, 205 98, 210 100 L290 105 C315 108, 335 120, 342 140 L348 158 C350 168, 345 178, 340 182 L342 205 L348 252 L335 254 L330 215 L318 205 L312 252 L300 254 L296 215 L165 215 L160 252 L148 254 L145 218 L128 215 L122 252 L110 254 L112 218 C95 212, 72 200, 55 175 Z"
        stroke={strokeColor}
        strokeWidth="2"
        strokeDasharray={aligned ? "0" : "8 4"}
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
      />

      {/* Buffalo head - broader, heavier muzzle */}
      <motion.path
        d="M145 82 C135 75, 120 74, 115 80 L108 92 C105 98, 108 105, 115 108 L120 106"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeDasharray={aligned ? "0" : "6 3"}
        fill="none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      />

      {/* Buffalo curved horns - wide sweeping curves */}
      <motion.path
        d="M140 78 C132 62, 118 52, 108 58 M158 74 C162 58, 176 48, 188 54"
        stroke={strokeColor}
        strokeWidth="2"
        fill="none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      />

      {/* Ear */}
      <motion.path
        d="M162 72 C168 60, 174 62, 172 72"
        stroke={strokeColor}
        strokeWidth="1.5"
        fill="none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      />

      {/* Hump on back */}
      <motion.path
        d="M195 102 C198 88, 210 82, 225 85 C235 87, 240 95, 238 100"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeDasharray={aligned ? "0" : "6 3"}
        fill="none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      />
    </svg>
  );
};

export default CattleSilhouette;
