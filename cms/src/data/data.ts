
const choices = [
  { id: "inProgress", name: "In progress" },
  { id: "complete", name: "Completed" },
  { id: "stopped", name: "Stopped" },
  { id: "notStartYet", name: "Not started yet" },
];

const sheets = [
  {
    id: "fund",
    name: "Fund",
    forceReplace: false,
    sheet:
      "https://docs.google.com/spreadsheets/d/1MjFttx4SDvULRLDEJf1JFA-ZhehMyIfDhVm0NyR6ZkU/edit#gid=0",
  },
  {
    id: "challenge",
    name: "Challenge",
    forceReplace: false,
    sheet:
      "https://docs.google.com/spreadsheets/d/18i76uPTi3zTBkGMlxUDeSoW21tVyzuRwUJzyl2dMD0g/edit#gid=0",
  },
  {
    id: "proposer",
    name: "Proposer",
    forceReplace: false,
    sheet:
      "https://docs.google.com/spreadsheets/d/1kTlafv3squMj5FGcObTBUzjTTXoa9bM-0uv02spVkvo/edit#gid=0",
  },
  {
    id: "proposal",
    name: "Proposal",
    forceReplace: false,
    sheet:
      "https://docs.google.com/spreadsheets/d/10Dv68dFmOVsbSzQIlu3vFsRpBDLcwpIb_ZnuF5uvA94/edit#gid=0",
  },
];

export {choices, sheets};