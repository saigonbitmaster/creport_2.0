import * as React from "react";
import { Card, CardHeader, CardContent } from "@mui/material";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";


const data = [
  {
    name: "Fund 1",
    complete: 4000,
    inProgress: 2400,
  },
  {
    name: "Fund 2",
    complete: 3000,
    inProgress: 1398,
  },
  {
    name: "Fund 3",
    complete: 2000,
    inProgress: 9800,
  },
  {
    name: "Fund 4",
    complete: 2780,
    inProgress: 3908,
  },
  {
    name: "Fund 5",
    complete: 1890,
    inProgress: 4800,
  },
  {
    name: "Fund 6",
    complete: 2390,
    inProgress: 3800,
  },
  {
    name: "Fund 7",
    complete: 3490,
    inProgress: 4300,
  },
  {
    name: "Fund 8",
    complete: 3490,
    inProgress: 4300,
  },
  {
    name: "Fund 9",
    complete: 3490,
    inProgress: 4300,
  },
];


const ProjectStatus = (props: { orders?: any[] }) => {
  const { orders } = props;
  if (!orders) return null;

  return (
    <Card>
      <CardHeader title="Project status" />
      <CardContent>
        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              width={500}
              height={300}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="inProgress" fill="#8884d8" />
              <Bar dataKey="complete" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};


export default ProjectStatus;
