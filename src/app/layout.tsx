import '@/public/css/globals.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import TaskContextProvider from '@/context/TaskContextProvider';

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
      <TaskContextProvider>
        <body className={inter.className}>{children}</body>
      </TaskContextProvider>
    </html>

  )
}
