import { motion } from 'framer-motion';

export default function DelayFade({ delay = 0, children }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 0.5, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  );
}
