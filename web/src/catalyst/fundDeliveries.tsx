import * as React from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import {
 
  useGetList,
} from "react-admin";


const Configuration = () => {
  const { data, total, isLoading, error, refetch } = useGetList("settings", {
    filter: { key: "catalystReport" },
  });
  if (error || isLoading || data?.length === 0) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <iframe
        style={{ height: "100vh", width: "100%" }}
        src={data[0].url}
        title="Catalyst report"
      ></iframe>
    </div>
  );
};

export default Configuration;
