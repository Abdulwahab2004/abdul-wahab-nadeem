import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { useReveal } from '../hooks/useReveal'
import SectionLabel from './SectionLabel'
import { data } from '../data'

export default function Projects() {
  const [ref, inView] = useReveal()

  return (
    <section
      id="projects"
      ref={ref}
      style={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: '0 clamp(20px,5vw,60px) clamp(80px,10vw,120px)',
      }}
    >
      <SectionLabel inView={inView}>WHAT I BUILT</SectionLabel>

      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.1 }}
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 800,
          fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
          letterSpacing: '-0.03em',
          marginBottom: 48,
        }}
      >
        Featured Projects
      </motion.h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
          gap: 24,
        }}
      >
        {data.projects.map((proj, i) => {
          const CardWrapper = proj.liveUrl !== '#'
            ? motion.a
            : motion.div

          return (
            <CardWrapper
              key={proj.num}
              href={proj.liveUrl !== '#' ? proj.liveUrl : undefined}
              target={proj.liveUrl !== '#' ? '_blank' : undefined}
              rel={proj.liveUrl !== '#' ? 'noopener noreferrer' : undefined}
              initial={{ opacity: 0, y: 36 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: 0.2 + i * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{
                y: -8,
                borderColor: proj.color + '44',
              }}
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 22,
                overflow: 'hidden',
                position: 'relative',
                textDecoration: 'none',
                color: 'inherit',
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100%',
                transition: 'all 0.3s ease',
                cursor: proj.liveUrl !== '#' ? 'pointer' : 'default',
              }}
            >
              {/* Glow Background */}
              <div
                style={{
                  position: 'absolute',
                  top: -60,
                  right: -60,
                  width: 220,
                  height: 220,
                  borderRadius: '50%',
                  background: `radial-gradient(circle, ${proj.color}14, transparent 70%)`,
                  pointerEvents: 'none',
                  zIndex: 0,
                }}
              />

              {/* Project Image */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '16 / 9',
                  overflow: 'hidden',
                  background: '#111',
                }}
              >
                {proj.image ? (
                  <img
                    src={proj.image}
                    alt={proj.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.5s ease',
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: `linear-gradient(135deg, ${proj.color}22, #111)`,
                      color: proj.color,
                      fontFamily: 'var(--font-display)',
                      fontWeight: 700,
                      fontSize: '1rem',
                      letterSpacing: '0.08em',
                    }}
                  >
                    PROJECT PREVIEW
                  </div>
                )}

                {/* Top Right Link Icon */}
                {proj.liveUrl !== '#' && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 14,
                      right: 14,
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      background: 'rgba(0,0,0,0.55)',
                      backdropFilter: 'blur(8px)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '1px solid rgba(255,255,255,0.08)',
                    }}
                  >
                    <ExternalLink size={18} color="#fff" />
                  </div>
                )}
              </div>

              {/* Content */}
              <div
                style={{
                  padding: '28px clamp(18px, 3vw, 30px)',
                  display: 'flex',
                  flexDirection: 'column',
                  flex: 1,
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                {/* Number */}
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 800,
                    fontSize: 'clamp(2.6rem, 6vw, 3.5rem)',
                    lineHeight: 1,
                    color: proj.color + '18',
                    marginBottom: 14,
                  }}
                >
                  {proj.num}
                </div>

                {/* Title */}
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontSize: 'clamp(1.1rem, 2vw, 1.35rem)',
                    marginBottom: 12,
                    letterSpacing: '-0.01em',
                    lineHeight: 1.3,
                  }}
                >
                  {proj.title}
                </h3>

                {/* Description */}
                <p
                  style={{
                    color: 'var(--text2)',
                    fontSize: '0.95rem',
                    lineHeight: 1.8,
                    marginBottom: 24,
                    flex: 1,
                  }}
                >
                  {proj.desc}
                </p>

                {/* Tags */}
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 10,
                  }}
                >
                  {proj.tags.map(tag => (
                    <span
                      key={tag}
                      style={{
                        padding: '6px 14px',
                        borderRadius: 100,
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.72rem',
                        color: proj.color,
                        background: proj.color + '12',
                        border: `1px solid ${proj.color}28`,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Accent Line */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: 2,
                  background: `linear-gradient(90deg, ${proj.color}, transparent)`,
                  transformOrigin: 'left',
                }}
              />
            </CardWrapper>
          )
        })}
      </div>
    </section>
  )
}