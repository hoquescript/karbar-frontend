import React, { useState } from "react";
import Card from "../../Util/Card";
import Chart from "react-apexcharts";

const VoucherApproved = () => {
  const [summaryData, setSummaryData] = useState(chartData());

  return (
    <Card>
      <div style={{ overflow: "none" }}>
        <Chart
          type="pie"
          series={summaryData.series}
          options={summaryData.options}
          width="100%"
          height={400}
          style={{ borderRadius: "3.25rem" }}
        />
      </div>
    </Card>
  );
};

function chartData() {
  return {
    series: [6500, 4800, 9450, 12050, 7490, 6000],
    options: {
      chart: {
        width: '100%',
        type: 'pie',
      },
      labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      theme: {
        monochrome: {
          enabled: true
        }
      },
      plotOptions: {
        pie: {
          dataLabels: {
            offset: -5
          }
        }
      },
      // title: {
      //   text: "Number of leads"
      // },
      dataLabels: {
        formatter(val, opts) {
          const name = opts.w.globals.labels[opts.seriesIndex]
          return [name, val.toFixed(1) + '%']
        }
      },
      // legend: {
      //   show: false
      // }
    },
  };
}


export default VoucherApproved;
