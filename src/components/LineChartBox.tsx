import React, { PureComponent } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    date: "20230301",
    count: 111,
  },
  {
    date: "20230301",
    count: 111,
  },
  {
    date: "20230301",
    count: 111,
  },
  {
    date: "20230301",
    count: 111,
  },
];

export default function LineChartBox({ data }: { data: any }) {
  console.log(data);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{ top: 20, right: 40, left: 0, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="2 2" />
        <XAxis
          dataKey="date"
          fontSize={10}
          stroke="#7a7a7a"
          fontWeight="thin"
        />
        <YAxis fontSize={11} stroke="#7a7a7a" fontWeight="thin" />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="count"
          stroke="#0092A2"
          activeDot={{ r: 2 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
