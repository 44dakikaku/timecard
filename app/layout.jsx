export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <head>
        <title>宿泊管理アプリ</title>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/icon-192.png" sizes="192x192" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
