"use client"

import { Bar, BarChart, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts"

const chartData = [
  { name: "Comida", "Tu Local": 4.5, "Competidor 1": 4.2, "Competidor 2": 4.6 },
  { name: "Servicio", "Tu Local": 4.7, "Competidor 1": 4.5, "Competidor 2": 4.4 },
  { name: "Ambiente", "Tu Local": 4.3, "Competidor 1": 4.6, "Competidor 2": 4.1 },
  { name: "Precio", "Tu Local": 4.0, "Competidor 1": 3.8, "Competidor 2": 4.2 },
]

export function ComparisonChart() {
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
        <Bar dataKey="Tu Local" fill="#8EE0B2" radius={[4, 4, 0, 0]} animationBegin={0} animationDuration={1500} />
        <Bar
          dataKey="Competidor 1"
          fill="#a78bfa"
          radius={[4, 4, 0, 0]}
          animationBegin={300}
          animationDuration={1500}
        />
        <Bar
          dataKey="Competidor 2"
          fill="#facc15"
          radius={[4, 4, 0, 0]}
          animationBegin={600}
          animationDuration={1500}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}
