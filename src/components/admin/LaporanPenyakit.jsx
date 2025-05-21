import React from "react";
import Chart from "react-apexcharts";

const LaporanPenyakit = () => {
  const options = {
    chart: {
      type: "bar",
      stacked: true,
      height: 250,
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
    { name: "Demam", data: [30, 15, 30, 15, 20, 30] },
    { name: "Batuk", data: [10, 20, 5, 10, 10, 8] },
    { name: "Diare", data: [5, 10, 0, 5, 8, 6] },
    { name: "Covid-19", data: [20, 15, 15, 14, 15, 20] },
  ];

  return (
    <div className="w-full bg-white border-2 border-gray-200 rounded-xl shadow-sm p-4">
      <div className="mb-2">
        <h5 className="text-3xl font-bold text-gray-900">Laporan Penyakit</h5>
        <p className="text-base text-gray-500 dark:text-gray-400 mt-2">
          Laporan Penyakit dalam 1 Bulan
        </p>
      </div>
      <Chart options={options} series={series} type="bar" height={250} />
    </div>
  );
};

export default LaporanPenyakit;
