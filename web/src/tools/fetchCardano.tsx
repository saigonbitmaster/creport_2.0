import * as React from "react";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import MuiTextField from "@mui/material/TextField";
import {
  List,
  Datagrid,
  TextField,
  NumberField,
  ArrayField,
} from "react-admin";
import { Box } from "@mui/material";

const FetchCardano = (props) => {
  const choices = [
    {
      id: "address",
      name: "Cardano address",
      value: "address",
      textLabel: "Wallet address",
    },
    {
      id: "contract",
      name: "Smart contract",
      value: "contract",
      textLabel: "Smart contract address",
    },
    {
      id: "utx",
      name: "Transaction hash",
      value: "utx",
      textLabel: "Transaction hash",
    },
  ];

  const [state, setState] = React.useState({
    choice: "address",
    textLabel: "Wallet address",
  });

  const [textFieldValue, setTextFieldValue] = React.useState("");

  const [filter, setFilter] = React.useState({ queryType: null, value: null, started: false });

  /*  
  //dont use query button, auto fetch
  React.useEffect(() => {
    setFilter({ queryType: state.choice, value: textFieldValue });
  }, [state, textFieldValue]);

 */
  const handleChange = (event) => {
    setState({
      choice: event.target.value,
      textLabel: choices.find((item) => item.value === event.target.value)
        .textLabel,
    });
  };
  //use query button, dont use auto fetch
  const onClick = () => {
    setFilter({ queryType: state.choice, value: textFieldValue, started: true });
  };

  const handleTextFieldChange = (event) => {
    setTextFieldValue(event.target.value);
  };

  return (
    <Box>
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
        {(!filter.queryType || !filter.value) && filter.started? (
          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom sx={{ color: "red" }}>
              Invalid form data
            </Typography>
          </Grid>
        ) : null}
      </Grid>

      <List
        resource="tools/utxos"
        perPage={25}
        hasCreate={false}
        actions={null}
        sort={{ field: "date", order: "desc" }}
        filter={filter}
        empty={<></>}
      >
        {filter.queryType === "utx" ? (
          <Grid container spacing={0}>
            <Grid item xs={12}>
              <Datagrid bulkActionButtons={false}>
                <ArrayField source="inputs">
                  <Datagrid bulkActionButtons={false}>
                    <TextField source="address" />
                    <ArrayField source="amount">
                      <Datagrid bulkActionButtons={false}>
                        <TextField source="unit" />
                        <NumberField source="quantity" />
                      </Datagrid>
                    </ArrayField>
                  </Datagrid>
                </ArrayField>
              </Datagrid>
            </Grid>

            <Grid item xs={12}>
              <Datagrid bulkActionButtons={false}>
                <ArrayField source="outputs">
                  <Datagrid bulkActionButtons={false}>
                    <TextField source="address" />
                    <ArrayField source="amount">
                      <Datagrid bulkActionButtons={false}>
                        <TextField source="unit" />
                        <NumberField source="quantity" />
                      </Datagrid>
                    </ArrayField>
                  </Datagrid>
                </ArrayField>
              </Datagrid>
            </Grid>
          </Grid>
        ) : (
          <Datagrid bulkActionButtons={false}>
            <TextField source="tx_hash" />
            <TextField source="block" />
            <ArrayField source="amount">
              <Datagrid bulkActionButtons={false}>
                <TextField source="unit" />
                <NumberField source="quantity" />
              </Datagrid>
            </ArrayField>
          </Datagrid>
        )}
      </List>
    </Box>
  );
};

export default FetchCardano;
