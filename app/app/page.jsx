'use client';

import { useState, useEffect } from 'react';

export default function Page() {
  const [宿, set宿] = useState('');
  const [records, setRecords] = useState([]);
  const [csvData, setCsvData] = useState(null);
  const [集計, set集計] = useState(null);

  // 宿選択  
  const handleSelect宿 = (name) => {
    localStorage.setItem('current宿', name);
    set宿(name);
  };

  // 出勤・退勤の記録  
  const handle出勤 = () => {
    if (!宿) return;
    const now = new Date();
    const newRecord = {
      date: now.toISOString().slice(0, 10),
      時刻: now.toTimeString().slice(0, 8),
      type: '出勤',
    };
    setRecords((prev) => [...prev, newRecord]);
    saveRecords([...records, newRecord]);
  };

  const handle退勤 = () => {
    if (!宿) return;
    const now = new Date();
    const newRecord = {
      date: now.toISOString().slice(0, 10),
      時刻: now.toTimeString().slice(0, 8),
      type: '退勤',
    };
    setRecords((prev) => [...prev, newRecord]);
    saveRecords([...records, newRecord]);
  };

  // ローカルストレージ保存  
  const saveRecords = (records) => {
    localStorage.setItem(`records_${宿}`, JSON.stringify(records));
  };

  // ローカルストレージ読み込み  
  useEffect(() => {
    const current宿 = localStorage.getItem('current宿');
    if (current宿) set宿(current宿);
    if (current宿) {
      const savedRecords = localStorage.getItem(`records_${current宿}`);
      if (savedRecords) setRecords(JSON.parse(savedRecords));
    }
  }, []);

  // CSVアップロードと解析  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const text = reader.result;
      parseCSV(text);
    };
    reader.readAsText(file);
  };

  const parseCSV = (text) => {
    const lines = text.split(/\r?\n/);
    const headers = lines
