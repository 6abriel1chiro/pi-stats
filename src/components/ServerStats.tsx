"use client";

import { useEffect, useState } from "react";

interface ServerStats {
  cpuUsage: number;
  memoryUsage: number;
  temperature: number;
  uptime: string;
  osName: string;
}

export default function ServerStats() {
  const [stats, setStats] = useState<ServerStats>({
    cpuUsage: 0,
    memoryUsage: 0,
    temperature: 0,
    uptime: "0:00:00",
    osName: "Loading...",
  });

  // In a real implementation, you would fetch these stats from your API
  useEffect(() => {
    const fetchStats = async () => {
      // Replace with actual API call
      const response = await fetch("/api/stats");
      const data = await response.json();
      setStats(data);
    };

    fetchStats();
    const interval = setInterval(fetchStats, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 w-full max-w-2xl shadow-lg border border-white/20">
      <h2 className="text-2xl font-bold mb-6 text-green-400">
        Raspberry Pi Server Stats
      </h2>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <div className="bg-black/30 p-4 rounded-lg">
          <div className="text-raspberry-red font-semibold">CPU Usage</div>
          <div className="text-2xl font-bold">{stats.cpuUsage}%</div>
        </div>
        <div className="bg-black/30 p-4 rounded-lg">
          <div className="text-raspberry-red font-semibold">OS</div>
          <div className="text-xl font-bold truncate">{stats.osName}</div>
        </div>

        <div className="bg-black/30 p-4 rounded-lg">
          <div className="text-raspberry-red font-semibold">Memory</div>
          <div className="text-2xl font-bold">{stats.memoryUsage}%</div>
        </div>
        <div className="bg-black/30 p-4 rounded-lg">
          <div className="text-raspberry-red font-semibold">Temperature</div>
          <div className="text-2xl font-bold">{stats.temperature}°C</div>
        </div>
        <div className="bg-black/30 p-4 rounded-lg">
          <div className="text-raspberry-red font-semibold">Uptime</div>
          <div className="text-2xl font-bold">{stats.uptime}</div>
        </div>
      </div>
    </div>
  );
}
