'use client';

import { useState } from 'react';

const PROPERTIES = [
  '今魚店の家',
  '樹々庵',
  'はぎうみ'
];

export default function Page() {
  const [selectedProperty, setSelectedProperty] = useState('');
  const [logs, setLogs] = useState([]);

  const nowTime = () => {
    const now = new Date();
    return now.toLocaleString('ja-JP');
  };

  const handleClock = (type) => {
    if (!selectedProperty) {
      alert('宿を選んでください');
      return;
    }

    const newLog = {
      property: selectedProperty,
      type,
      time: nowTime()
    };

    setLogs((prev) => [newLog, ...prev]);
  };

  return (
    <main style={{ padding: 20 }}>
      <h1>タイムカード</h1>

      {/* 宿選択 */}
      <section style={{ marginBottom: 20 }}>
        <h2>宿を選択</h2>
        {PROPERTIES.map((p) => (
          <button
            key={p}
            onClick={() => setSelectedProperty(p)}
            style={{
              marginRight: 10,
              padding: '8px 12px',
              backgroundColor: selectedProperty === p ? '#333' : '#eee',
              color: selectedProperty === p ? '#fff' : '#000',
              border: 'none',
              borderRadius: 4
            }}
          >
            {p}
          </button>
        ))}
      </section>

      {/* 出勤・退勤 */}
      <section style={{ marginBottom: 20 }}>
        <h2>打刻</h2>
        <button
          onClick={() => handleClock('出勤')}
          style={{ marginRight: 10, padding: '10px 16px' }}
        >
          出勤
        </button>
        <button
          onClick={() => handleClock('退勤')}
          style={{ padding: '10px 16px' }}
        >
          退勤
        </button>
      </section>

      {/* ログ表示 */}
      <section>
        <h2>記録</h2>
        {logs.length === 0 && <p>まだ記録はありません</p>}
        <ul>
          {logs.map((log, index) => (
            <li key={index}>
              [{log.property}] {log.type} - {log.time}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
