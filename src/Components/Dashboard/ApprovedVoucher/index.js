import React, { useState } from "react";
import Card from "../../Util/Card";
import Chart from "react-apexcharts";

const ApprovedVoucher = () => {
  const [summaryData, setSummaryData] = useState(chartData());
  // backgroundColor: "#1a202e"
  return (
    <Card>
      <div style={{ overflow: "none" }}>
        <Chart
          type="bar"
          series={summaryData.series}
          options={summaryData.options}
          width="100%"
          height={400}
        />
      </div>
    </Card>
  );
};

function chartData() {
    return {
      series: [
        {
          name: "series-1",
          data: [6500, 4800, 9450, 12050, 7490, 6000],
        },
      ],
      options: {
        chart: {
          height: 850,
          type: 'bar',
          toolbar: {
            show: false,
          },
  
        },
        plotOptions: {
          bar: {
            columnWidth: '70%',
            // endingShape: 'rounded'  
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          width: 2
        },
        
        grid: {
          row: {
            colors: ['#fff', '#f2f2f2']
          }
        },
        xaxis: {
          labels: {
            rotate: -45
          },
          categories: ['Mar 2020', 'Apr 2020', 'May 2020', 'Jun 2020', 'Jul 2020', 'Aug 2020'],
          tickPlacement: 'on'
        },
        yaxis: {
          // title: {
          //   text: 'Servings',
          // },
        },
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'light',
            type: "horizontal",
            shadeIntensity: 0.25,
            gradientToColors: undefined,
            inverseColors: true,
            opacityFrom: 0.85,
            opacityTo: 0.85,
            stops: [50, 0, 100]
          },
        }
      },
    };
}

export default ApprovedVoucher;
