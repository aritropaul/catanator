'use client';

import { useEffect, useState } from 'react';
import { generateMap, generatePorts } from '@/lib/catan';
import { shareCode } from '@/lib/share';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [mode] = useState('catan')
  const router = useRouter()

  useEffect(() => {
    const code = shareCode(generateMap(mode), generatePorts(mode))
    router.replace('/map/' + code)
  }, [mode, router])

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-neutral-900">
      <p className="text-neutral-500 text-sm animate-pulse">Generating board...</p>
    </main>
  )
}
