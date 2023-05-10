import * as React from "react";
import { CardanoWallet, useWallet } from "@meshsdk/react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";

const Donate = () => {
  const [state, setState] = React.useState({
    amount: 0,
    message: "",
    notification: "",
  });
  const handleChange = (e) => {
    setState({ ...state, [e.target.id]: e.target.value });
  };
  return (
    <Box sx={{ m: 3, display: "flex", flex: 1, flexDirection: "column" }}>
      <Box sx={{ m: 3, display: "flex", flex: 1, flexDirection: "row" }}>
        <Box sx={{ width: "100%", typography: "body1" }}>
          <Typography variant="subtitle1" gutterBottom>
            Please help us by donate to
            <Link
              sx={{ ml: 1 }}
              target="_blank"
              variant="subtitle1"
              underline="hover"
              href="https://preprod.cardanoscan.io/address/00bf80f3dcd7b8c65b9ef5541beaa6d0600dfdf6a356155285cd1f475d6aea157f5b08f0dab5cddda35742496005a08b8c75147002d87f719c"
            >
              cReports Cardano address:
            </Link>
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            addr_test1qzlcpu7u67uvvku7742ph64x6psqml0k5dtp2559e505wht2ag2h7kcg7rdttnwa5dt5yjtqqksghrr4z3cq9krlwxwqspw54v
          </Typography>

          <TextField
            required
            id="amount"
            label="Amount to donate"
            type="number"
            value={state.amount}
            sx={{ width: 300 }}
            onChange={handleChange}
          />
          <TextField
            required
            id="message"
            label="Message to us"
            value={state.message}
            sx={{ ml: 1, width: 300 }}
            onChange={handleChange}
          />
          <Button variant="text" sx={{ mt: 3, ml: 1 }}>
            Donate
          </Button>
          <Typography variant="subtitle2" gutterBottom>
            {state.notification}
          </Typography>
        </Box>

        <CardanoWallet />
      </Box>
    </Box>
  );
};

export default Donate;
