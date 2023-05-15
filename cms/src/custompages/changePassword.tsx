import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useDataProvider } from "react-admin";

export default function FormPropsTextFields() {
  const dataProvider = useDataProvider();

  const [state, setState] = React.useState({
    password: "",
    repeatPassword: "",
  });

  const [message, setMessage] = React.useState("");

  const handleChangePassword = (e) => {
    setState({ ...state, [e.target.id]: e.target.value });
  };

  const handleClick = () => {
    if (state.password !== state.repeatPassword) {
      setMessage("Password mismatch");
      return;
    }

    dataProvider
      .customMethod(
        "users/changepassword",
        { data: { password: state.password } },
        "POST"
      )
      .then((result) => {
        setMessage("updated password");
        setState({ password: "", repeatPassword: "" });
      })
      .catch((error) => {
        setMessage("update failed");
      }, setState({ password: "", repeatPassword: "" }));
  };

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          id="password"
          label="New password"
          type="password"
          autoComplete="current-password"
          value={state.password}
          onChange={handleChangePassword}
        />
        <TextField
          id="repeatPassword"
          label="Repeat password"
          type="password"
          autoComplete="current-password"
          value={state.repeatPassword}
          onChange={handleChangePassword}
        />
        <Button
          sx={{ borderRadius: 0 }}
          size="small"
          color="primary"
          onClick={handleClick}
        >
          <Box p={0} m={2} sx={{ color: "primary.main" }}>
            Update
          </Box>
        </Button>
        <Typography
          variant="caption"
          display="block"
          gutterBottom
          sx={{ p: 1 }}
        >
          {message}
        </Typography>
      </div>
    </Box>
  );
}
