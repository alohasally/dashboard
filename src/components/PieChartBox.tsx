import React, { PureComponent } from "react";
import { PieChart, Pie, Sector, Cell } from "recharts";

const data = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  totalCount,
}: {
  cx: any;
  cy: any;
  midAngle: any;
  innerRadius: any;
  outerRadius: any;
  percent: any;
  totalCount: any;
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <>
      <text
        x={x - 20}
        y={y - 20}
        fill="white"
        // textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
      <text
        x={x - 30}
        y={y}
        fill="white"
        // textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * totalCount).toLocaleString("ko-KR")}명`}
      </text>
    </>
  );
};

const PieChartBox = ({ data }: { data: any }) => {
  return (
    <PieChart width={400} height={400}>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        labelLine={false}
        label={(props) =>
          renderCustomizedLabel({
            ...props,
            totalCount: data.reduce(
              (acc: any, curr: any) => (acc += curr.count),
              0
            ),
          })
        }
        outerRadius={130}
        fill="#8884d8"
        dataKey="count"
      >
        {data.map((entry: any, index: any) => (
          <Cell
            key={`cell-${index}`}
            fill={entry.gender === "male" ? "#7799C5" : "#CB9C9C"}
          />
        ))}
      </Pie>
    </PieChart>
  );
};

export default PieChartBox;
