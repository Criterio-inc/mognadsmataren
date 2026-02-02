'use client';

import Image from 'next/image';
import { signIn } from 'next-auth/react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function LoginContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur rounded-2xl p-8 shadow-xl">
          <div className="flex justify-center mb-8">
            <Image
              src="/curago-logo.png"
              alt="Curago"
              width={180}
              height={60}
              className="h-12 w-auto"
              priority
            />
          </div>

          <h1 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-2">
            Konsultportal
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-center mb-8">
            Logga in för att hantera dina kundprojekt
          </p>

          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl"
            >
              <p className="text-sm text-red-600 dark:text-red-400 text-center">
                {error === 'AccessDenied'
                  ? 'Endast @curago.se-konton har tillgång till konsultportalen.'
                  : 'Ett fel uppstod vid inloggningen. Försök igen.'}
              </p>
            </motion.div>
          )}

          <motion.button
            onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl shadow-sm hover:shadow-md transition-shadow"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span className="font-medium text-gray-700 dark:text-gray-200">
              Logga in med Google
            </span>
          </motion.button>

          <p className="mt-6 text-xs text-gray-400 dark:text-gray-500 text-center">
            Endast för Curago-konsulter med @curago.se-konto
          </p>
        </div>

        <p className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          <a href="/" className="hover:text-blue-600 transition-colors">
            ← Tillbaka till startsidan
          </a>
        </p>
      </motion.div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="animate-pulse text-gray-400">Laddar...</div>
      </div>
    }>
      <LoginContent />
    </Suspense>
  );
}
