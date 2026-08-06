"use client";

import { MotionConfig } from "framer-motion";

/**
 * globals.css'teki reduced-motion kuralı yalnızca CSS animasyonlarını durdurur;
 * framer-motion inline transform yazdığı için o kuraldan etkilenmez.
 * MotionConfig, kullanıcı hareket azaltma istediğinde framer'ın konum/ölçek
 * animasyonlarını atlar, opaklık ve renk geçişlerini korur.
 */
export default function MotionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
