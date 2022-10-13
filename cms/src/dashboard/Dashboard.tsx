import React, { CSSProperties } from "react";
import { useMediaQuery, Theme } from "@mui/material";

import MonthlyPayout from "./MonthlyPayout";
import NewQuizzes from "./NewQuizzes";
import QuizPostHistory from "./QuizPostHistory";
import PendingReviews from "./PendingReviews";
import NewMembers from "./NewMembers";
import PayoutHistory from "./PayoutHistory";
import { quizPostData, payoutData, monthlyRevenue, newQuiz } from "./data";

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
        <QuizPostHistory orders={quizPostData} />
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
        <PayoutHistory orders={payoutData} />
      </div>
      <div style={styles.singleCol}>
        <QuizPostHistory orders={quizPostData} />
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
            <PayoutHistory orders={payoutData} />
          </div>
          <div style={styles.singleCol}>
            <QuizPostHistory orders={quizPostData} />
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
