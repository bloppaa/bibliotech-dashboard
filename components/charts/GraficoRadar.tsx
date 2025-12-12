"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Legend,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";

interface CategoriaData {
  nombre: string;
  cantidad: number;
}

interface Props {
  data: CategoriaData[];
}

export function GraficoRadar({ data }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Radar de Categorías</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          {data.length > 2 ? (
            <RadarChart
              cx="50%"
              cy="50%"
              outerRadius="80%"
              data={data.slice(0, 6)}
            >
              <PolarGrid />
              <PolarAngleAxis dataKey="nombre" tick={{ fontSize: 12 }} />
              <PolarRadiusAxis angle={30} domain={[0, "auto"]} />
              <Radar
                name="Cantidad"
                dataKey="cantidad"
                stroke="#ec4899"
                fill="#ec4899"
                fillOpacity={0.6}
              />
              <Legend />
            </RadarChart>
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-gray-500">
              Se necesitan al menos 3 categorías con libros para mostrar el
              radar.
            </div>
          )}
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
