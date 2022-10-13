import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Check from "@mui/icons-material/Check";

export default function VerticalLinearStepper(props) {
  //{label: "label", steps: [{quizId: string, amount: number}]}
  let steps = props.steps || [];
  let label = props.label || "";
  return (
    <Box
      sx={{
        minWidth: 300,
        maxWidth: 300,
        marginTop: "8em",
        marginLeft: "0",
        padding: "0.5em",
      }}
    >
      <Paper elevation={0} sx={{ padding: "1em" }}>
        <Typography variant="h6" gutterBottom>
          {label}
        </Typography>
        <Stepper orientation="vertical">
          {steps.length > 0 &&
            steps.map((step, index) => (
              <Step key={step.label} active={true}>
                <StepLabel StepIconComponent={Check}>{step.quizId}</StepLabel>
                <StepContent>
                  <Typography
                    variant="body2"
                    gutterBottom
                    sx={step.amount > 200 ? { color: "red" } : null}
                  >
                    $ADA {step.amount}
                  </Typography>
                </StepContent>
              </Step>
            ))}
        </Stepper>
      </Paper>
    </Box>
  );
}
