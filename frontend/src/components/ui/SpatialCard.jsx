import { motion, useMotionValue, useTransform } from "framer-motion";

export const SpatialCard = ({ children }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // This creates the 3D rotation effect based on mouse position
  const rotateX = useTransform(y, [-100, 100], [30, -30]);
  const rotateY = useTransform(x, [-100, 100], [-30, 30]);

  function handleMouse(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - rect.left - rect.width / 2);
    y.set(event.clientY - rect.top - rect.height / 2);
  }

  return (
    <div className="perspective-1000" onMouseMove={handleMouse} onMouseLeave={() => { x.set(0); y.set(0); }}>
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="w-80 h-96 bg-glass border border-white/10 rounded-3xl backdrop-blur-xl p-8 flex flex-col justify-end"
      >
        <div style={{ transform: "translateZ(50px)" }} className="text-white">
          {children}
        </div>
      </motion.div>
    </div>
  );
};