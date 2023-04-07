import React, { PureComponent } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

// const data = [
//   {
//     date: "20230301",
//     count: 111,
//   },
//   {
//     date: "20230301",
//     count: 111,
//   },
//   {
//     date: "20230301",
//     count: 111,
//   },
//   {
//     date: "20230301",
//     count: 111,
//   },
// ];

export default function LineChartBox({ data }: { data: any[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart width={500} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Line
          type="monotone"
          dataKey="count"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
