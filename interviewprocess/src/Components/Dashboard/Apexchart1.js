import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const ApexChart1 = () => {
  const [chartData, setChartData] = useState({
    series: [
        // {
        //   name: "pooja",
        //   data: [],
        // },
        // {
        //   name: "khushbhu",
        //   data: [],
        // },
      // {
      //   name: "",
      //   data: [],
      // },
      // {
      //   name: "",
      //   data: [],
      // },
    ],
    options: {
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: [5, 7, 5],
        curve: "straight",
        dashArray: [0, 8, 5],
      },
      title: {
        text: "BD Results by month",
        align: "left",
      },
      legend: {
        tooltipHoverFormatter: function (val, opts) {
          return (
            val +
            " - <strong>" +
            opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
            "</strong>"
          );
        },
      },
      markers: {
        size: 0,
        hover: {
          sizeOffset: 6,
        },
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "March",
          "April",
          "May",
          "June",
          "July",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
      tooltip: {
        y: [
          {
            title: {
              formatter: function (val) {
                return val ;
              },
            },
          },
          {
            title: {
              formatter: function (val) {
                return val;
              },
            },
          },
          {
            title: {
              formatter: function (val) {
                return val;
              },
            },
          },
        ],
      },
      grid: {
        borderColor: "#f1f1f1",
      },
    },
  });

  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };

  const finalresult = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/interview_tracking/dashboard/`,
        config
      );
      const data = response.data;
      // console.log("data is:", data);

      // const BDdata = data.bde_interview_scheduled.map((item) => ({
      //   sheduled_count_by_month: item.sheduled_count_by_month,
      //   sheduled_by__first_name: item.sheduled_by__first_name,
      //   month: item.month,
      // }));
      // console.log("BDDATA : ",BDdata);
      // const date = new Date(BDdata[0].month)
      // console.log("month : ",date.getMonth());
      // console.log("date month : ", chartData.options.xaxis.categories[date.getMonth()-1] );
      // console.log("bddata is",BDdata);
      // setChartData((prevChartData) => {
      //   // console.log("Previous Chart Data:", prevChartData);
      //   debugger
      //   return {
      //     ...prevChartData,
          
      //     series: prevChartData.series.map((seriesItem) => {
      //       // if (seriesItem.name === "BDdata") {
      //       //   return { ...seriesItem, data: BDdata };
      //       // } else {
      //       //   return seriesItem;
      //       // }
      //       seriesItem.name : data.sheduled_by__first_name,
      //     }),
      //   };
      // });

      // setChartData((prevChartData) => ({
      //   ...prevChartData,
      //   series: prevChartData.series.map((series) => ({
      //     ...series,
      //      data.bde_interview_scheduled.map((item)=>{
      //       name:item.sheduled_by__first_name,
      //       data : data.push(data.sheduled_count_by_month)
      //     }),
      //   })),
      // }));
      // setChartData((prevChartData) => {
      //   const updatedSeries = prevChartData.series.map((series) => {
      //     const matchingData = data.bde_interview_scheduled.find((item) => item.sheduled_by__first_name === series.name);
      
      //     return {
      //       ...series,
      //       data: matchingData ? [matchingData.sheduled_count_by_month] : series.data,
      //       name : matchingData.sheduled_by__first_name,
      //     };
      //   });
      
      //   return {
      //     ...prevChartData,
      //     series: updatedSeries,
      //   };
      // });

      setChartData((prevChartData) => {
        if (data.bde_interview_scheduled) {
          const updatedSeries = data.bde_interview_scheduled.map((item) => ({
            name: item.sheduled_by__first_name,
            data: [item.sheduled_count_by_month],
          }));
      
          return {
            ...prevChartData,
            series: [...updatedSeries],
          };
        } else {
          return prevChartData; 
        }
      });
      
      // setChartData((prevChartData) => {
      //   const updatedSeries = data.bde_interview_scheduled.map((item) => ({
      //     name: item.sheduled_by__first_name,
      //     data: [item.sheduled_count_by_month],
      //   }));
      
      //   return {
      //     ...prevChartData,
      //     series: [ ...updatedSeries],
      //   };
      // });

    } catch (error) {
      // console.error("Error fetching data:", error);
    }
  };

  console.log("chartData in apexchart1 : ", chartData );

  useEffect(() => {
    finalresult();
  }, []);

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type="line"
          height={350}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default ApexChart1;
