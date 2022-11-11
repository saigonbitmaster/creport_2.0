const choices = [
  { id: "inProgress", name: "In progress" },
  { id: "complete", name: "Completed" },
  { id: "stopped", name: "Stopped" },
  { id: "notStartYet", name: "Not started yet" },
];

const sheets = [
  {
    id: "funds",
    name: "Fund",
    forceReplace: false,
    sheet:
      "https://docs.google.com/spreadsheets/d/1WJi1odv0vGT3ylz01flNpqErmCr-G6Kb37yxaVZOzVM/edit#gid=1508013900",
  },
  {
    id: "challenges",
    name: "Challenge",
    forceReplace: false,
    sheet:
      "https://docs.google.com/spreadsheets/d/1WJi1odv0vGT3ylz01flNpqErmCr-G6Kb37yxaVZOzVM/edit#gid=1508013900",
  },
  {
    id: "proposers",
    name: "Proposer",
    forceReplace: false,
    sheet:
      "https://docs.google.com/spreadsheets/d/1WJi1odv0vGT3ylz01flNpqErmCr-G6Kb37yxaVZOzVM/edit#gid=1508013900",
  },
  {
    id: "proposals",
    name: "Proposal",
    forceReplace: false,
    sheet:
      "https://docs.google.com/spreadsheets/d/1WJi1odv0vGT3ylz01flNpqErmCr-G6Kb37yxaVZOzVM/edit#gid=1508013900",
  },
];

export { choices, sheets };
