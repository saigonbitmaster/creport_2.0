import * as React from "react";
import { Fragment } from "react";
import { Checkbox, Card, CardContent, Grid, Typography } from "@mui/material";
import { useRecordContext } from "react-admin";

import { Invoice } from "../types";

const RowClick = () => {
  const record = useRecordContext<Invoice>();
  if (!record) return null;
  return (
    <Card sx={{ width: "auto", margin: "auto" }}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Quiz: {record.title}
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={0}>
          <Grid item xs={8}>
            <Typography variant="body1" gutterBottom>
              Answers
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body1" gutterBottom>
              Correct answer?
            </Typography>
          </Grid>

          {record.choices &&
            record.choices.map((item) => (
              <Fragment>
                <Grid item xs={8}>
                  <Typography variant="body1" gutterBottom>
                    {item.label}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Checkbox checked={item.isRights} />
                </Grid>
              </Fragment>
            ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default RowClick;
