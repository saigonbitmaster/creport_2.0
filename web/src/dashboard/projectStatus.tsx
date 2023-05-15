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
import { useTranslate, useGetList } from "react-admin";

/* 
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
 */

const ProjectStatus = (props) => {
  const {
    isLoading: proposalsLoading,
    data: proposals,
    total: totalProposals,
  } = useGetList<any>("proposals", {
    filter: {},
    sort: { field: "name", order: "ASC" },
    pagination: { page: 1, perPage: 2000 },
  });

  const {
    isLoading: fundLoading,
    data: funds,
    total: totalFunds,
  } = useGetList<any>("funds", {
    filter: {},
    sort: { field: "name", order: "ASC" },
    pagination: { page: 1, perPage: 2000 },
  });

  let data = [];
  if (funds && proposals) {
    data = proposals.reduce(function (r, a) {
      let record = r.find((item) => item.fundId === a.fundId) || {};
      record.fundId = a.fundId;
      let fundName = funds.find((item) => item.id === a.fundId)?.name || null;
      record.name = fundName;
      record[a.projectStatus] = record[a.projectStatus]
        ? record[a.projectStatus] + 1
        : 1;

      r.filter((item) => item.fundId === a.fundId).length === 0
        ? r.push(record)
        : r.map((item) => (item.fundId === a.fundId ? record : null));

      return r;
    }, []);
  }

  return (
    <Card>
      <CardHeader title="Project status" />
      <CardContent>
        <div style={{ width: "100%", height: 280 }}>
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
