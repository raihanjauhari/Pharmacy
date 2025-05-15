import React from "react";
import Chart from "react-apexcharts";

const LaporanPenyakit = () => {
  const options = {
    chart: {
      type: "bar",
      stacked: true,
      toolbar: { show: false },
      fontFamily: "Inter, sans-serif",
    },
    plotOptions: {
      bar: {
        borderRadius: 6,
        horizontal: false,
        columnWidth: "50%",
      },
    },
    xaxis: {
      categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      labels: {
        style: {
          fontSize: "14px",
          colors: "#111827",
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
    colors: ["#f87171", "#3b82f6", "#0ea5e9", "#93c5fd"],
    legend: {
      position: "bottom",
      labels: {
        colors: "#6B7280",
      },
    },
    dataLabels: {
      enabled: false,
    },
    grid: {
      strokeDashArray: 4,
    },
  };

  const series = [
    {
      name: "Demam",
      data: [30, 15, 30, 15, 20, 30],
    },
    {
      name: "Batuk",
      data: [10, 20, 5, 10, 10, 8],
    },
    {
      name: "Diare",
      data: [5, 10, 0, 5, 8, 6],
    },
    {
      name: "Covid-19",
      data: [20, 15, 15, 14, 15, 20],
    },
  ];

  return (
    <div className="w-full bg-white rounded-xl shadow-sm p-4">
      <div className="mb-2">
        <h5 className="text-lg font-bold text-gray-900">Laporan Penyakit</h5>
      </div>
      <Chart options={options} series={series} type="bar" height={300} />
    </div>
  );
};

export default LaporanPenyakit;
