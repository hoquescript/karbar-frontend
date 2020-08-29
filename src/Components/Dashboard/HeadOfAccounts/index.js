import React, { useState } from "react";
import Card from "../../Util/Card";
import Chart from "react-apexcharts";

const HeadOfAccounts = () => {
  const [summaryData, setSummaryData] = useState(chartData());

  return (
    <Card>
      <div style={{ overflow: "none" }}>
        <Chart
          type="bar"
          series={summaryData.series}
          options={summaryData.options}
          width="100%"
          height={600}
          style={{ borderRadius: "3.25rem" }}
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
          data: [26500, 14800, 19450, 32050, 17490, 22000, 16500, 20800, 16450, 12050, 29490, 32050, 17490, 22000, 26500, 14800, 19450],
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
            columnWidth: '5%',
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
          categories: [
            'Office Expense', 'Transport - Fuel', 'Printing & Stationery', 'Consumable', 'Vehicle Expense', 'Repairs or maintenance', 'ADVERTISEMENT', 'DUTY ACCOUNT', 'CAPITAL ACCOUNT', 'DISCOUNT ACCOUNT', 'CAPITAL ACCOUNT', 'SALES ACCOUNT', 'SALARY ACCOUNT', 'WAGES ACCOUNT', 'PURCHASE ACCOUNT', 'CASH ACCOUNT', 'LOANS TO STAFF'
          ],
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

export default HeadOfAccounts;
