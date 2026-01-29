'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

interface SearchCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  gradient: string;
  index: number;
}

export function SearchCard({ title, description, icon, href, gradient, index }: SearchCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.03, y: -5 }}
      whileTap={{ scale: 0.98 }}
    >
      <Link href={href}>
        <div className={`bg-gradient-to-br ${gradient} rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all cursor-pointer h-full min-h-[200px] flex flex-col justify-between`}>
          <div>
            <div className="text-5xl mb-4">{icon}</div>
            <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
            <p className="text-white/90 text-lg">{description}</p>
          </div>
          <div className="flex justify-end mt-4">
            <motion.div whileHover={{ x: 5 }} className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
