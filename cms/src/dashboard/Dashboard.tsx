import React, { CSSProperties } from "react";
import { useMediaQuery, Theme } from "@mui/material";

import MonthlyPayout from "./funds";
import NewQuizzes from "./fundedProject";
import PendingReviews from "./completeProject";
import NewMembers from "./pendingProject";
import { quizPostData, payoutData, monthlyRevenue, newQuiz } from "./data";
import ProjectStatus from './projectStatus';
import FundAlow from './fundAllow';

const styles = {
  flex: { display: "flex" },
  flexColumn: { display: "flex", flexDirection: "column" },
  leftCol: { flex: 1, marginRight: "0.5em" },
  rightCol: { flex: 1, marginLeft: "0.5em" },
  singleCol: { marginTop: "1em", marginBottom: "1em" },
};

const Spacer = () => <span style={{ width: "1em" }} />;
const VerticalSpacer = () => <span style={{ height: "1em" }} />;

const Dashboard = () => {
  const isXSmall = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );
  const isSmall = useMediaQuery((theme: Theme) => theme.breakpoints.down("lg"));

  return isXSmall ? (
    <div>
      <div style={styles.flexColumn as CSSProperties}>
        <MonthlyPayout value={monthlyRevenue} />
        <VerticalSpacer />
        <NewQuizzes value={newQuiz} />
        <VerticalSpacer />
        <FundAlow orders={quizPostData} />
      </div>
    </div>
  ) : isSmall ? (
    <div style={styles.flexColumn as CSSProperties}>
      <div style={styles.singleCol}></div>
      <div style={styles.flex}>
        <MonthlyPayout value={monthlyRevenue} />
        <Spacer />
        <NewQuizzes value={newQuiz} />
      </div>
      <div style={styles.singleCol}>
      <FundAlow orders={quizPostData} />
       
      </div>
      <div style={styles.singleCol}>
      <ProjectStatus orders={payoutData} />
      </div>
    </div>
  ) : (
    <>
      <div style={styles.flex}>
        <div style={styles.leftCol}>
          <div style={styles.flex}>
            <MonthlyPayout value={monthlyRevenue} />
            <Spacer />
            <NewQuizzes value={newQuiz} />
          </div>
          <div style={styles.singleCol}>
          <FundAlow orders={quizPostData} />
          
          </div>
          <div style={styles.singleCol}>
          <ProjectStatus orders={payoutData} />
          </div>
        </div>
        <div style={styles.rightCol}>
          <div style={styles.flex}>
            <PendingReviews />
            <Spacer />
            <NewMembers />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
