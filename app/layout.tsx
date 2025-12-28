import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'

export const metadata: Metadata = {
  title: 'HackerNews API',
  description: 'HackerNews API 代理服务',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body>
        <Script
          src="https://cdn.tailwindcss.com"
          strategy="lazyOnload"
        />
        {children}
      </body>
    </html>
  )
}

