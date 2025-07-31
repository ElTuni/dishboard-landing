"use client"

import { Line, LineChart, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts"

const chartData = [
  { month: "Enero", "Tu Local": 4.8, "Competidor 1": 4.0, "Competidor 2": 3.9 },
  { month: "Febrero", "Tu Local": 4.8, "Competidor 1": 4.1, "Competidor 2": 4.0 },
  { month: "Marzo", "Tu Local": 4.7, "Competidor 1": 4.2, "Competidor 2": 4.3 },
  { month: "Abril", "Tu Local": 4.7, "Competidor 1": 4.4, "Competidor 2": 4.5 },
  { month: "Mayo", "Tu Local": 4.6, "Competidor 1": 4.6, "Competidor 2": 4.7 },
  { month: "Junio", "Tu Local": 4.5, "Competidor 1": 4.7, "Competidor 2": 4.8 },
]

export function EvolutionChart() {
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
          dataKey="Tu Local"
          stroke="#8EE0B2"
          strokeWidth={3}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
          animationBegin={0}
          animationDuration={2000}
        />
        <Line
          type="monotone"
          dataKey="Competidor 1"
          stroke="#a78bfa"
          strokeWidth={2}
          activeDot={{ r: 6 }}
          animationBegin={500}
          animationDuration={2000}
        />
        <Line
          type="monotone"
          dataKey="Competidor 2"
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
