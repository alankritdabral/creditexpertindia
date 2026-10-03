'use client';

import React from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

const ROTATION_RANGE = 5;
const PERSPECTIVE = 400;
const INITIAL_DELAY = 0.2;
const CARD_ANIMATION_DURATION = 0.5;

const fadeInVariants = {
  hidden: { opacity: 0, y: 20, rotate: -2 },
  visible: { opacity: 1, y: 0, rotate: 0 },
};

const springTransition = {
  type: 'spring' as const,
  stiffness: 100,
  damping: 30,
};

export const AnimatedCreditCard = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-50, 50], [ROTATION_RANGE, -ROTATION_RANGE]);
  const rotateY = useTransform(x, [-50, 50], [-ROTATION_RANGE, ROTATION_RANGE]);

  const cardData = {
    number: '4111 1111 1111 9743',
    holder: 'John Doe',
    expiry: '12/24',
  };

  const handleMove = (
    clientX: number,
    clientY: number,
    currentTarget: HTMLElement,
  ) => {
    const rect = currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(clientX - centerX);
    y.set(clientY - centerY);
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    handleMove(event.clientX, event.clientY, event.currentTarget);
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    event.preventDefault();
    const touch = event.touches[0];
    handleMove(touch.clientX, touch.clientY, event.currentTarget);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className="flex items-center justify-center w-full -mt-68">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInVariants}
        transition={{ duration: CARD_ANIMATION_DURATION }}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleLeave}
        onMouseLeave={handleLeave}
        style={{ perspective: PERSPECTIVE }}
        className="relative touch-none"
      >
        <motion.div style={{ rotateX, rotateY }} transition={springTransition} className="w-full">
          <motion.div
            className="relative w-full aspect-[1.58] max-w-[320px] mx-auto overflow-hidden rounded-[20px] bg-gradient-to-br from-[#624bff] to-[#3a79ff] p-5 shadow-[0_15px_40px_rgba(58,121,255,0.3)] mb-4 flex flex-col justify-between"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: CARD_ANIMATION_DURATION }}
          >
            {/* Dotted texture */}
            <div className="absolute inset-0 opacity-[0.2]" style={{
              backgroundImage: 'radial-gradient(white 1px, transparent 1px)',
              backgroundSize: '12px 12px',
              maskImage: 'linear-gradient(to bottom, black 30%, transparent 80%)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 30%, transparent 80%)'
            }}></div>

            <div className="relative z-10 flex justify-between items-start">
              {/* Chip */}
              <div className="w-11 h-8 bg-white/20 rounded-[6px] border border-white/30 flex flex-col justify-evenly px-1 backdrop-blur-sm">
                <div className="w-full h-[1px] bg-white/30"></div>
                <div className="w-full h-[1px] bg-white/30"></div>
                <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-white/30 -translate-x-1/2"></div>
              </div>
            </div>

            <motion.div
              className="relative z-10 text-[18px] md:text-[20px] font-semibold tracking-[0.2em] text-white drop-shadow-sm mt-auto mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {cardData.number}
            </motion.div>

            <div className="relative z-10 flex justify-between items-end text-white">
              <div className="flex space-x-5 md:space-x-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: CARD_ANIMATION_DURATION }}
                >
                  <div className="text-[8px] md:text-[9px] opacity-70 uppercase tracking-widest mb-0.5">Card Holder</div>
                  <div className="font-medium text-[11px] md:text-[13px] drop-shadow-sm">{cardData.holder}</div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: CARD_ANIMATION_DURATION }}
                >
                  <div className="text-[8px] md:text-[9px] opacity-70 uppercase tracking-widest mb-0.5">Expires</div>
                  <div className="font-medium text-[11px] md:text-[13px] drop-shadow-sm">
                    {cardData.expiry}
                  </div>
                </motion.div>
              </div>

              <motion.div
                className="text-xl md:text-2xl font-bold text-white italic tracking-widest"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: INITIAL_DELAY,
                  duration: CARD_ANIMATION_DURATION,
                }}
              >
                <span>VISA</span>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};
