'use client';

import { signOut } from 'next-auth/react';
import { LogOut } from 'lucide-react';

export function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: '/' })}
      className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
      title="Logga ut"
    >
      <LogOut className="w-5 h-5" />
    </button>
  );
}
