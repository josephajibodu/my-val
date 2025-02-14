import { motion } from "framer-motion";

const iconFiles = [
  "_x35_55_x2C__Heart_x2C__Man_x2C__Women_x2C__Love_x2C__Valentine.svg",
  "_x35_56_x2C__Heart_x2C__Emoji_x2C__Smiley_x2C__Face_x2C__smile.svg",
  "_x35_63_x2C__Heart_x2C__valentine_x2C__Love_x2C__hanging.svg",
  "_x36_92_x2C__loveing_x2C__love_x2C__heart_x2C__wedding.svg",
  "_x37_01_x2C__brokan_x2C__love_x2C__heart_x2C__wedding.svg",
  "_x37_08_x2C__Hearts_x2C__love_x2C__loving_x2C__wedding.svg",
  "_x37_19_x2C__heartbeat_x2C__love_x2C__heart_x2C__wedding.svg",
  "_x35_78_x2C__Heart_x2C__Love_x2C__Couple_x2C__Valentine_Greetings.svg",
  "_x35_89_x2C__Heart_x2C__Arrow_x2C__Holidays_x2C__love_x2C__valentine.svg",
  "_x36_09_x2C__heart_x2C__love_x2C__valentine_x2C__valentine_x27_s_day.svg",
  "_x36_11_x2C__love_x2C__health_care_x2C__hospital_x2C__heart_care.svg",
  "_x36_13_x2C__heart_x2C__love_x2C__valentine_x27_s_day_x2C__valentine_x2C_.svg",
  "_x36_14_x2C__sewing_heart_x2C__broken_heart_x2C__heartm_heart_x2C_.svg",
  "_x35_41_x2C__loving_x2C__love_x2C__heart_x2C__wedding.svg",
  "_x35_49_x2C__diamond_x2C__love_x2C__heart_x2C__wedding.svg",
  "_x35_43_x2C__louck_x2C__love_x2C__heart_x2C__weding.svg",
  "_x36_57_x2C__heart_x2C__love_x2C__chain.svg",
  "_x36_79_x2C__board_x2C__love_x2C__heart_x2C__wedding.svg",
  "_x36_80_x2C__target_x2C__love_x2C__heart_x2C__wedding.svg",
];

const randomPosition = () => ({
  x: Math.random() * 100,
  y: Math.random() * 100,
});

const randomIcon = () =>
  iconFiles[Math.floor(Math.random() * iconFiles.length)];

const FloatingIcon = ({ delay = 0 }) => {
  const position = randomPosition();
  const icon = randomIcon();
  const size = 30 + Math.random() * 40; // Random size between 30 and 70

  const pathVariants = {
    start: { pathLength: 0, opacity: 0 },
    end: {
      pathLength: 1,
      opacity: 0.3,
      transition: { duration: 2, ease: "easeInOut" },
    },
  };

  return (
    <motion.g
      initial={{
        x: position.x + "%",
        y: position.y + "%",
        scale: 0,
        rotate: 0,
      }}
      animate={{
        x: [
          `${position.x}%`,
          `${position.x + (Math.random() - 0.5) * 20}%`,
          `${position.x + (Math.random() - 0.5) * 20}%`,
          `${position.x}%`,
        ],
        y: [
          `${position.y}%`,
          `${position.y + (Math.random() - 0.5) * 20}%`,
          `${position.y + (Math.random() - 0.5) * 20}%`,
          `${position.y}%`,
        ],
        scale: [0, 1, 1, 0],
        rotate: [0, 10, -10, 0],
      }}
      transition={{
        duration: 20 + Math.random() * 10,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
    >
      <motion.image
        href={`/images/love/${icon}`}
        width={size}
        height={size}
        style={{ opacity: 0.3 }}
      />
      <motion.path
        d={`M${-size / 2},0 A${size / 2},${size / 2} 0 0,1 ${size / 2},0 A${
          size / 2
        },${size / 2} 0 0,1 ${-size / 2},0`}
        fill="none"
        stroke="rgba(255,255,255,0.5)"
        strokeWidth="1"
        variants={pathVariants}
        initial="start"
        animate="end"
      />
    </motion.g>
  );
};

const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <svg className="w-full h-full">
        {Array.from({ length: 25 }).map((_, i) => (
          <FloatingIcon key={i} delay={i * 0.8} />
        ))}
      </svg>
    </div>
  );
};

export default AnimatedBackground;
