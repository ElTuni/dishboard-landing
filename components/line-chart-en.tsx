"use client"

import { Line, LineChart, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts"

const chartData = [
  { month: "Jan", "Your Place": 4.8, "Competitor 1": 4.0, "Competitor 2": 3.9 },
  { month: "Feb", "Your Place": 4.8, "Competitor 1": 4.1, "Competitor 2": 4.0 },
  { month: "Mar", "Your Place": 4.7, "Competitor 1": 4.2, "Competitor 2": 4.3 },
  { month: "Apr", "Your Place": 4.7, "Competitor 1": 4.4, "Competitor 2": 4.5 },
  { month: "May", "Your Place": 4.6, "Competitor 1": 4.6, "Competitor 2": 4.7 },
  { month: "Jun", "Your Place": 4.5, "Competitor 1": 4.7, "Competitor 2": 4.8 },
]

export function EvolutionChartEN() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
        <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} domain={[3.5, 5]} />
        <Tooltip
          contentStyle={{
            backgroundColor: "#fff",
            border: "1px solid #e5e7eb",
            borderRadius: "0.5rem",
          }}
        />
        <Legend wrapperStyle={{ fontSize: "14px", textAlign: "center" }} />
        <Line
          type="monotone"
          dataKey="Your Place"
          stroke="#8EE0B2"
          strokeWidth={3}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
          animationBegin={0}
          animationDuration={2000}
        />
        <Line
          type="monotone"
          dataKey="Competitor 1"
          stroke="#a78bfa"
          strokeWidth={2}
          activeDot={{ r: 6 }}
          animationBegin={500}
          animationDuration={2000}
        />
        <Line
          type="monotone"
          dataKey="Competitor 2"
          stroke="#facc15"
          strokeWidth={2}
          activeDot={{ r: 6 }}
          animationBegin={1000}
          animationDuration={2000}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
