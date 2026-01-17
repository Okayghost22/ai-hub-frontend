import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <div className="relative h-screen w-full bg-obsidian flex flex-col items-center justify-center overflow-hidden">
      
      {/* SPATIAL BACKGROUND ELEMENTS */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
          opacity: [0.3, 0.6, 0.3] 
        }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute w-[500px] h-[500px] bg-neonPurple/20 rounded-full blur-[120px]"
      />

      {/* BIG BOLD TYPOGRAPHY (Misfits Style) */}
      <div className="z-10 text-center px-4">
        <motion.h1 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-7xl md:text-9xl font-display font-black text-white leading-none uppercase"
        >
          CODE <span className="text-neonPurple italic text-outline">EVOLVED</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-6 text-sage text-xl md:text-2xl font-light tracking-widest uppercase"
        >
          Spatial Intelligence for Modern Developers
        </motion.p>

        {/* INTERACTIVE BUTTON */}
        <motion.button
          whileHover={{ scale: 1.1, rotate: -2 }}
          whileTap={{ scale: 0.9 }}
          className="mt-12 px-10 py-4 bg-white text-black font-bold text-lg rounded-none hover:bg-neonPurple hover:text-white transition-colors uppercase tracking-tighter"
        >
          Analyze My Workflow —&gt;
        </motion.button>
      </div>

      {/* MOUSE PARALLAX DECORATION */}
      <motion.div 
        drag
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        className="absolute bottom-10 right-10 text-white/20 text-9xl font-black select-none cursor-grab"
      >
        GITHUB
      </motion.div>
    </div>
  );
};

export default Hero;