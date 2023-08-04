const fs = require("fs");

const data = [];

const proposalStatus = fs.readFileSync("proposals.txt", "utf-8");
proposalStatus.split(/\r?\n/).forEach((line) => {
  const arr = line.split(/\s+/);
  const projectItem = {};
  arr.forEach((item, index) => {
    let projectStatus =
      item === "COMPLETED" && index === 1 ? "complete" : "inProgress";
    index === 0
      ? (projectItem.projectId = item)
      : index === 1
      ? (projectItem.projectStatus = projectStatus)
      : null;
    data.push(projectItem);
  });
});

console.log(JSON.stringify(data))

/*
copy the terminal log as data to run below mongodb scrip to update proposal status:
const data = [
    { projectId: '800001', projectStatus: 'complete' },
]
data.forEach(item => {
    db.proposals.update(
        { projectId: item.projectId },
        {
            $set:
            {
                projectStatus: item.projectStatus
            }
        },
        { upsert: true }
    )
})
*/