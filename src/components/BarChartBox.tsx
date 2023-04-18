import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const BarChartBox = ({ data }: { data: any }) => {
  return (
    <BarChart
      width={500}
      height={350}
      data={data}
      margin={{
        top: 40,
        right: 45,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="age" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="male" fill="#7799C5" />
      <Bar dataKey="female" fill="#CB9C9C" />
    </BarChart>
  );
};

export default BarChartBox;
