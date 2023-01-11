import * as React from "react";
import { Card, CardHeader, CardContent } from "@mui/material";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { useTranslate, useGetList } from "react-admin";

/* 
const data = [
  {
    name: "Fund 1",
    Allocated: 4000,
    Distributed: 2400,
  },
  {
    name: "Fund 2",
    Allocated: 3000,
    Distributed: 1398,
  },
  {
    name: "Fund 3",
    Allocated: 2000,
    Distributed: 9800,
  },
  {
    name: "Fund 4",
    Allocated: 2780,
    Distributed: 3908,
  },
  {
    name: "Fund 5",
    Allocated: 1890,
    Distributed: 4800,
  },
  {
    name: "Fund 6",
    Allocated: 2390,
    Distributed: 3800,
  },
  {
    name: "Fund 7",
    Allocated: 3490,
    Distributed: 4300,
  },
  {
    name: "Fund 8",
    Allocated: 3490,
    Distributed: 4300,
  },
  {
    name: "Fund 9",
    Allocated: 3490,
    Distributed: 4300,
  },
];
 */
const FundAllow = (props: { orders?: any[] }) => {

const {
  isLoading,
  data: funds,
  total,
} = useGetList<any>("funds", {
  filter: {},
  sort: { field: 'name', order: 'ASC' },
  pagination: { page: 1, perPage: 20 },
});

const data = funds? funds.map(item => ({...item, Allocated: item.budget/1000000})) : []
  return (
    <Card>
      <CardHeader title="Fund allocation history (m$)" />
      <CardContent>
        <div style={{ width: "100%", height: 280 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              width={500}
              height={200}
              data={data}
              syncId="anyId"
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area
                type="monotone"
                dataKey="Allocated"
                stroke="#82ca9d"
                fill="#82ca9d"
              />
              <Area
                type="monotone"
                dataKey="Distributed"
                stroke="#8884d8"
                fill="#8884d8"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default FundAllow;
