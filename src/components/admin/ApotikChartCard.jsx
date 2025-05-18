import React from "react";
import Chart from "react-apexcharts";

const ApotikChartCard = () => {
  const options = {
    chart: {
      type: "line",
      height: 250,
      toolbar: { show: false },
      fontFamily: "Inter, sans-serif",
    },
    stroke: {
      width: 4,
      curve: "smooth",
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      labels: {
        style: {
          fontSize: "12px",
          colors: "#6B7280",
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          fontSize: "12px",
          colors: "#6B7280",
        },
      },
    },
    colors: ["#0F172A", "#67E8F9"],
    legend: {
      position: "top",
      horizontalAlign: "right",
      labels: {
        colors: ["#0F172A", "#67E8F9"],
      },
    },
  };

  const series = [
    {
      name: "Pasien Baru",
      data: [50, 250, 300, 260, 150, 200, 280, 320, 250, 300, 400, 500],
    },
    {
      name: "Pasien Lama",
      data: [100, 500, 350, 120, 400, 350, 390, 370, 280, 210, 100, 30],
    },
  ];

  return (
    <div className="w-full bg-white border-2 border-gray-200 rounded-lg shadow-sm dark:bg-gray-800">
      <div className="flex justify-between p-4 md:p-6 pb-0 md:pb-0">
        <div>
          <h5 className="text-3xl font-bold text-gray-900 dark:text-white pb-2">
            Survei Apotik
          </h5>
          <p className="text-base text-gray-500 dark:text-gray-400">
            Jumlah pasien per bulan
          </p>
        </div>
      </div>
      <div className="px-4 pt-2">
        <Chart options={options} series={series} type="line" height={250} />
      </div>
    </div>
  );
};

export default ApotikChartCard;
