import '@/public/css/globals.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { TaskProvider } from '@/context/TastContext'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Todo List',
  description: 'by Tidvn',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <TaskProvider>
        <body className={inter.className}>{children}</body>
      </TaskProvider>

    </html>

  )
}
