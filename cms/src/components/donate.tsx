import * as React from "react";
import { CardanoWallet, useWallet } from "@meshsdk/react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import { Transaction } from "@meshsdk/core";
import { BlockfrostProvider } from "@meshsdk/core";
import { useDataProvider } from "react-admin";

const Donate = () => {
  const [state, setState] = React.useState({
    amount: 0,
    message: "",
    notification: "No connected wallet",
    balance: null,
  });

  const donateAddress = process.env.REACT_APP_DONATE_ADDRESS;
  const donateAssets = `https://preprod.cardanoscan.io/address/${donateAddress}`;
  const dataProvider = useDataProvider();

  React.useEffect(() => {
    dataProvider
      .customMethod(
        "customapis/addressbalance",
        { filter: { address: donateAddress } },
        "GET"
      )
      .then((result) => {
        setState({ ...state, balance: result.data });
      })
      .catch((error) => console.error(error));
  }, []);

  const handleChange = (e) => {
    if (e.target.id === "amount" && e.target.value <= 0) {
      return;
    }
    setState({ ...state, [e.target.id]: e.target.value });
  };
  const { wallet, connected, connecting } = useWallet();
  React.useEffect(() => {
    let message = connected ? "" : "No connected wallet";
    setState({
      ...state,
      notification: message,
    });
  }, [connected]);

  const onClick = async () => {
    let txHash;
    if (!connected || state.amount <= 0) {
      setState({
        ...state,
        notification: !connected
          ? "No connected wallet"
          : "Please select an amount to donate",
      });
      return;
    }

    try {
      const tx = new Transaction({ initiator: wallet }).sendLovelace(
        donateAddress,
        (state.amount * 1000000).toString()
      );
      const unsignedTx = await tx.build();
      const signedTx = await wallet.signTx(unsignedTx);
      txHash = await wallet.submitTx(signedTx);
      setState({
        ...state,
        notification: `Thanks for donating, your transaction ID: ${txHash}`,
      });
    } catch (err) {
      setState({
        ...state,
        notification: `Thanks for donating, your transaction is failed`,
      });
    }
  };
  return (
    <Box sx={{ m: 3, display: "flex", flex: 1, flexDirection: "column" }}>
      <Box sx={{ m: 3, display: "flex", flex: 1, flexDirection: "row" }}>
        <Box sx={{ width: "100%", typography: "body1" }}>
          <Typography variant="subtitle1" gutterBottom>
           Donate to help maintain and extend cReports,
            <Link
              sx={{ ml: 1 }}
              target="_blank"
              variant="subtitle1"
              underline="hover"
              href={donateAssets}
            >
              cReports Cardano donate wallet:
            </Link>
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            addr_test1qzlcpu7u67uvvku7742ph64x6psqml0k5dtp2559e505wht2ag2h7kcg7rdttnwa5dt5yjtqqksghrr4z3cq9krlwxwqspw54v
          </Typography>
          <Typography variant="subtitle2" gutterBottom>
            Current balance: {state.balance} (ADA)
          </Typography>
          <TextField
            required
            id="amount"
            label="Amount to donate (ADA)"
            type="number"
            value={state.amount}
            sx={{ width: 300 }}
            onChange={handleChange}
          />
          <TextField
            id="message"
            label="Message to us"
            value={state.message}
            sx={{ ml: 1, width: 300 }}
            onChange={handleChange}
          />
          <Button variant="text" sx={{ mt: 3, ml: 1 }} onClick={onClick}>
            Donate
          </Button>
          <Typography variant="subtitle2" gutterBottom sx={{ color: "orange" }}>
            {state.notification}
          </Typography>
        </Box>

        <CardanoWallet />
      </Box>
    </Box>
  );
};

export default Donate;
