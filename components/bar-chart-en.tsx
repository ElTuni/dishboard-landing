"use client"

import { Bar, BarChart, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts"

const chartData = [
  { name: "Food", "Your Place": 4.5, "Competitor 1": 4.2, "Competitor 2": 4.6 },
  { name: "Service", "Your Place": 4.7, "Competitor 1": 4.5, "Competitor 2": 4.4 },
  { name: "Ambiance", "Your Place": 4.3, "Competitor 1": 4.6, "Competitor 2": 4.1 },
  { name: "Price", "Your Place": 4.0, "Competidor 1": 3.8, "Competidor 2": 4.2 },
]

export function ComparisonChartEN() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
        <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} domain={[3, 5]} />
        <Tooltip
          contentStyle={{
            backgroundColor: "#fff",
            border: "1px solid #e5e7eb",
            borderRadius: "0.5rem",
          }}
        />
        <Legend wrapperStyle={{ fontSize: "14px", textAlign: "center" }} />
        <Bar dataKey="Your Place" fill="#8EE0B2" radius={[4, 4, 0, 0]} animationBegin={0} animationDuration={1500} />
        <Bar
          dataKey="Competitor 1"
          fill="#a78bfa"
          radius={[4, 4, 0, 0]}
          animationBegin={300}
          animationDuration={1500}
        />
        <Bar
          dataKey="Competitor 2"
          fill="#facc15"
          radius={[4, 4, 0, 0]}
          animationBegin={600}
          animationDuration={1500}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}
