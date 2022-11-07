import * as React from "react";
import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { useTranslate } from "react-admin";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import data from "./data";

//sample sheets: https://drive.google.com/drive/u/1/folders/15hO1IrdqWsTLXfZdWVvuZyuk7pok5UUC
const ImportSheets = () => {
  const translate = useTranslate();
  const [state, setState] = React.useState(data);

  const onChangeCheckbox = (id) => (event) => {
    const newState = state.map((item) => {
      if (item.id === id) {
        item.forceReplace = event.target.checked;
      }
      return item;
    });
    setState(newState);
  };

  const onChangeTextField = (id) => (event) => {
    const newState = state.map((item) => {
      if (item.id === id) {
        item.sheet = event.target.value;
      }
      return item;
    });

    setState(newState);
  };

  const onClick = (id) => {
    //fetch API
    console.log(id);
  };

  return (
    <Card sx={{ mt: 8 }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Google sheet</TableCell>
            <TableCell>Force replace</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {state.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{translate(item.name)}</TableCell>
              <TableCell>
                <TextField
                  id="standard-basic"
                  InputProps={{ disableUnderline: false }}
                  fullWidth
                  defaultValue={item.sheet}
                  variant="standard"
                  onChange={onChangeTextField(item.id)}
                />
              </TableCell>
              <TableCell>
                <Checkbox
                  checked={item.forceReplace}
                  onChange={onChangeCheckbox(item.id)}
                />
              </TableCell>
              <TableCell>
                <Button variant="text" onClick={() => onClick(item.id)}>
                  Import
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export default ImportSheets;
