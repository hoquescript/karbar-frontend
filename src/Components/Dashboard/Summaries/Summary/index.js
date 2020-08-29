import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { makeStyles } from "@material-ui/core/styles";
import Card from "../../../Util/Card";
import Chart from "react-apexcharts";

const useStyles = makeStyles((theme) => ({
  summary: {
    padding: "2.5rem",
    paddingBottom: 0
  },
  info: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: '2.4rem'
  },
  percentage: {
    display: "flex",
    alignItems: "center",
    fontWeight: 400,
    //  '400 1.5rem/2.4rem '
  },
  primaryHead: {
    fontWeight: 200,
    textTransform:'uppercase',
    color: '#d4d4d4',
    fontSize:'1.8rem'
  },
  secondaryHead:{
    fontWeight: 400,
    color: '#24317b',
    fontSize: '3.5rem'
  }
}));

const Summary = () => {
  const classes = useStyles();

  const [summaryData, setSummaryData] = useState(chartData());

  return (
    <Grid item xs={3}>
      <Card>
        <div className={classes.summary}>
          <div className={classes.info}>
            <h5 className={classes.primaryHead}>Users</h5>
            <h6 className={classes.percentage}>
              <ArrowDropDownIcon />
              <span>12.4%</span>
            </h6>
          </div>
          <h3 className={classes.secondaryHead}>2,390</h3>
        </div>
        <div style={{ overflow: "none" }}>
          <Chart
            type="area"
            series={summaryData.series}
            options={summaryData.options}
            width="100%"
            height={120}
            style={{ borderRadius: "3.25rem" }}
          />
        </div>
      </Card>
    </Grid>
  );
};

function chartData() {
  return {
    options: {
      chart: {
        id: "basic-bar",
        toolbar: {
          show: false,
        },
        sparkline: {
          enabled: true,
        },
      },
      xaxis: {
        labels: {
          show: false,
        },
      },
      yaxis: {
        labels: {
          show: false,
        },
      },
      grid: {
        show: false,
        padding: {
          left: 0,
          right: 0,
        },
      },
      tooltip: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      dataLabels: {
        enabled: true,
        style: {
          fontSize: "0",
        },
      },
    },
    series: [
      {
        name: "series-1",
        data: [30, 40, 45, 50, 49, 60, 70, 91],
      },
    ],
  };
}

export default Summary;
