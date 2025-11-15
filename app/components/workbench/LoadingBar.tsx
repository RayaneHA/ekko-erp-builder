import { motion } from 'framer-motion';
import { memo } from 'react';

interface LoadingBarProps {
  isLoading: boolean;
}

export const LoadingBar = memo(({ isLoading }: LoadingBarProps) => {
  if (!isLoading) return null;

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none">
      {/* Animated background particles with improved positioning */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 rounded-full bg-accent-500/15 blur-sm"
            initial={{
              x: `${15 + (i % 4) * 25}%`,
              y: `${25 + Math.floor(i / 4) * 30}%`,
              scale: 0,
            }}
            animate={{
              scale: [0, 1.5, 0],
              x: [`${15 + (i % 4) * 25}%`, `${18 + (i % 4) * 25}%`, `${15 + (i % 4) * 25}%`],
              y: [`${25 + Math.floor(i / 4) * 30}%`, `${28 + Math.floor(i / 4) * 30}%`, `${25 + Math.floor(i / 4) * 30}%`],
            }}
            transition={{
              duration: 4 + i * 0.4,
              repeat: Infinity,
              delay: i * 0.2,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Centered content container */}
      <div className="flex flex-col items-center justify-center gap-12 relative z-10 px-4">
        {/* Logo Ekko with enhanced animations */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7, y: -30, rotateY: -90 }}
          animate={{ opacity: 1, scale: 1, y: 0, rotateY: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          {/* Glowing ring around logo */}
          <motion.div
            className="absolute inset-0 rounded-2xl"
            animate={{
              boxShadow: [
                '0 0 20px rgba(138, 95, 255, 0.3)',
                '0 0 40px rgba(138, 95, 255, 0.5)',
                '0 0 20px rgba(138, 95, 255, 0.3)',
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{
              width: '140%',
              height: '140%',
              left: '-20%',
              top: '-20%',
            }}
          />
          
          <motion.div
            animate={{
              scale: [1, 1.08, 1],
              rotate: [0, 2, -2, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="w-28 h-28 relative"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 120" className="w-full h-full drop-shadow-2xl">
              <defs>
                <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#000000" />
                  <stop offset="50%" stopColor="#1a1a1a" />
                  <stop offset="100%" stopColor="#000000" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <rect width="240" height="120" fill="url(#logoGradient)" rx="14" />
              <g transform="translate(120, 28)" filter="url(#glow)">
                <path
                  d="M -42 -20 L -42 20 L -30 20 L -30 8 L -18 8 L -18 2 L -30 2 L -30 -2 L -18 -2 L -18 -8 L -30 -8 L -30 -20 Z"
                  fill="#FFFFFF"
                  stroke="#FFFFFF"
                  strokeWidth="0.5"
                />
                <path
                  d="M -18 -20 L -18 20 L -6 20 L -6 2 L 2 -14 L 14 -20 L 10 -14 L 2 2 L 10 14 L 14 8 L 2 2 L 10 20 L -6 20 L -6 2 Z"
                  fill="#FFFFFF"
                  stroke="#FFFFFF"
                  strokeWidth="0.5"
                />
              </g>
              <text
                x="120"
                y="92"
                fontFamily="'Arial', 'Helvetica Neue', Helvetica, sans-serif"
                fontSize="30"
                fontWeight="700"
                fill="#FFFFFF"
                textAnchor="middle"
                letterSpacing="4"
              >
                EKKO
              </text>
            </svg>
          </motion.div>
        </motion.div>

        {/* Enhanced Progress Bar with creative design */}
        <div className="w-[480px] max-w-[90vw] relative">
          {/* Outer glow container - enhanced */}
          <motion.div
            className="absolute inset-0 rounded-full blur-2xl"
            animate={{
              opacity: [0.4, 0.7, 0.4],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{
              background: 'linear-gradient(90deg, #8a5fff 0%, #b44aff 40%, #ff6b9d 60%, #b44aff 100%)',
              height: '150%',
              top: '-25%',
            }}
          />
          
          {/* Secondary glow layer */}
          <motion.div
            className="absolute inset-0 rounded-full blur-lg"
            animate={{
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.5,
            }}
            style={{
              background: 'linear-gradient(90deg, #8a5fff 0%, #b44aff 50%, #8a5fff 100%)',
              height: '130%',
              top: '-15%',
            }}
          />
          
          {/* Main progress bar container */}
          <div className="relative h-3.5 bg-bolt-elements-background-depth-3/70 rounded-full overflow-hidden border border-accent-500/30 backdrop-blur-md shadow-2xl">
            {/* Animated gradient bar - main fill with enhanced colors */}
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: [0.4, 0, 0.2, 1],
              }}
              style={{
                background: 'linear-gradient(90deg, #8a5fff 0%, #b44aff 25%, #ff6b9d 50%, #b44aff 75%, #8a5fff 100%)',
                backgroundSize: '300% 100%',
              }}
            />
            
            {/* Animated gradient background movement */}
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{
                backgroundPosition: ['0% 50%', '300% 50%'],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'linear',
              }}
              style={{
                background: 'linear-gradient(90deg, #8a5fff 0%, #b44aff 20%, #ff6b9d 40%, #b44aff 60%, #8a5fff 80%, #b44aff 100%)',
                backgroundSize: '300% 100%',
              }}
            />
            
            {/* Animated gradient wave overlay */}
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{
                backgroundPosition: ['0% 50%', '200% 50%'],
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: 'linear',
              }}
              style={{
                background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 20%, transparent 40%, rgba(255,255,255,0.4) 60%, transparent 80%, rgba(255,255,255,0.4) 100%)',
                backgroundSize: '200% 100%',
              }}
            />
            
            {/* Enhanced shimmer effect */}
            <motion.div
              className="absolute inset-y-0 left-0 w-2/5 rounded-full bg-gradient-to-r from-transparent via-white/60 to-transparent"
              animate={{
                x: ['-100%', '350%'],
              }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
            
            {/* Additional light sweep */}
            <motion.div
              className="absolute inset-y-0 left-0 w-1/3 rounded-full bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={{
                x: ['-100%', '400%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'linear',
                delay: 0.5,
              }}
            />
          </div>
        </div>

        {/* Enhanced loading text with creative typography */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex flex-col items-center gap-3"
        >
          <motion.div
            className="flex items-center gap-3"
            animate={{
              scale: [1, 1.02, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <motion.span
              className="text-base font-bold text-bolt-elements-textPrimary tracking-wide"
              animate={{
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              Building your ERP
            </motion.span>
            <motion.div
              className="flex gap-1.5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="w-2 h-2 rounded-full bg-accent-500 shadow-lg shadow-accent-500/50"
                  animate={{
                    y: [0, -10, 0],
                    scale: [1, 1.3, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 0.9,
                    repeat: Infinity,
                    delay: i * 0.25,
                    ease: 'easeInOut',
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
          
          {/* Subtitle with animated gradient text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="text-xs text-bolt-elements-textSecondary font-medium"
          >
            Crafting your business solution
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
});

LoadingBar.displayName = 'LoadingBar';

