import * as React from "react";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import MuiTextField from "@mui/material/TextField";
import { List, Datagrid, TextField, DateField, UrlField } from "react-admin";
import { Box } from "@mui/material";

const FetchGithub = (props) => {
  const choices = [
    {
      id: "commit",
      name: "Repo commits",
      value: "commit",
      textLabel: "Repo url",
    },
    {
      id: "codescan",
      name: "Code scan",
      value: "codescan",
      textLabel: "Repo url",
    },
  ];

  const [state, setState] = React.useState({
    choice: "commit",
    textLabel: "Repo url",
  });

  const [textFieldValue, setTextFieldValue] = React.useState("");

  const [filter, setFilter] = React.useState({ queryType: null, value: null, started: false });

  const handleChange = (event) => {
    setState({
      choice: event.target.value,
      textLabel: choices.find((item) => item.value === event.target.value)
        .textLabel,
    });
  };

  const onClick = () => {
    setFilter({ queryType: state.choice, value: textFieldValue, started: true});
  };

  const handleTextFieldChange = (event) => {
    setTextFieldValue(event.target.value);
  };

  return (
    <>
      <Grid container spacing={2} sx={{ marginBottom: "2em" }}>
        <Grid item xs={12} md={4} lg={3} xl={1.5}>
          <FormControl variant="standard" fullWidth>
            <InputLabel id="demo-simple-select-standard-label">
              Query type
            </InputLabel>

            <Select
              labelId="select-query-type"
              id="select-query-type"
              value={state.choice}
              onChange={handleChange}
              label="query-type"
            >
              {choices
                ? choices.map((item) => (
                    <MenuItem value={item.value}>{item.name}</MenuItem>
                  ))
                : null}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={8} lg={6} xl={4}>
          <MuiTextField
            id="standard-basic"
            label={state.textLabel}
            variant="standard"
            fullWidth
            value={textFieldValue}
            onChange={handleTextFieldChange}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          lg={3}
          xl={2}
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
          }}
        >
          <Button onClick={onClick} sx={{ alignSelf: "flex-end" }}>
            Query
          </Button>
        </Grid>
        {(!filter.queryType || !filter.value) && filter.started ? (
          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom sx={{ color: "red" }}>
              Invalid form data
            </Typography>
          </Grid>
        ) : null}
      </Grid>

      <List
        resource="tools/commits"
        perPage={25}
        hasCreate={false}
        actions={null}
        sort={{ field: "date", order: "desc" }}
        filter={filter}
        empty={<></>}
      >
        {filter.queryType === "commit" ? (
          <Datagrid bulkActionButtons={false}>
            <TextField source="sha" />
            <TextField source="message" />
            <TextField source="author" />
            <DateField source="date" />
            <UrlField source="url" />
          </Datagrid>
        ) : (
          <Datagrid bulkActionButtons={false}>
          
          <TextField source="name" />
          <TextField source="severity" />
          <TextField source="description" />
          <TextField source="url" />
         
        </Datagrid>
        )}
      </List>
    </>
  );
};

export default FetchGithub;
