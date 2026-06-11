import type { Variants } from 'framer-motion'

// ─── Spring physics ───────────────────────────────────────────────────────────
// Use only transform + opacity for GPU-composited 60fps animations.

export const springs = {
  // Tabs, nav pill, toggles — fast, responsive
  snappy: { type: 'spring' as const, stiffness: 420, damping: 30 },
  // General UI cards, panels — balanced
  smooth: { type: 'spring' as const, stiffness: 320, damping: 28 },
  // Bookmarks, checkboxes, celebrations — satisfying pop
  bouncy: { type: 'spring' as const, stiffness: 460, damping: 20 },
  // Liquid glass nav pill — soft overshoot, fluid morph between tabs
  liquid: { type: 'spring' as const, stiffness: 280, damping: 22 },
}

// ─── Screen-level stagger container ──────────────────────────────────────────
// Apply to the outermost div; children with `fadeUp` will cascade in.
export const screenStagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.065, delayChildren: 0.04 },
  },
}

// Tighter stagger for inner sections (category grid, fresh picks, etc.)
export const sectionStagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.055 },
  },
}

// ─── Stagger item: fade up from slight offset ─────────────────────────────────
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 360, damping: 28 },
  },
}

// ─── Scale in from center — icons, badges, empty states ───────────────────────
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.72 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', stiffness: 420, damping: 22 },
  },
}

// ─── Plain fade — search result sections, overlays ───────────────────────────
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.18, ease: 'easeOut' },
  },
}
