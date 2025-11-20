import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { useEffect, useState } from "react";
import apiClient from "@/API/ApiClient";
import Loading from "@/pages/OtherPage/Loading";
interface SummaryData {
  month: string[];
  applied: number[];
  alloted: number[];
  totalIpo: number[];
}
export default function IPOAlloted() {
  const [summary, setSummary] = useState<SummaryData>({
    month: [],
    applied: [],
    alloted: [],
    totalIpo: [],
  });
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const year = new Date().getFullYear();

    apiClient.get(`/user/monthly-summary?year=${year}`).then((res) => {
      const key = `Year-${year}`;

      setSummary(res.data[key]);
      setLoading(false);
    });
  }, []);
  const options: ApexOptions = {
    colors: ["#465fff", "#10B981", "#808080"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "bar",
      height: 180,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "66%",
        borderRadius: 5,
        borderRadiusApplication: "end",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 4,
      colors: ["transparent"],
    },
    xaxis: {
      categories: summary?.month,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "left",
      fontFamily: "Outfit",
    },
    yaxis: {
      title: {
        text: undefined,
      },
    },
    grid: {
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    fill: {
      opacity: 1,
    },

    tooltip: {
      x: {
        show: false,
      },
      y: {
        formatter: (val: number) => `${val}`,
      },
    },
  };
  const series = [
    {
      name: "Alloted",
      data: summary?.alloted,
    },
    {
      name: "Applied",
      data: summary?.applied,
    },
    {
      name: "Total IPO",
      data: summary?.totalIpo,
    },
  ];
  if (loading) {
    return <Loading />;
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          IPO Alloted
        </h3>
      </div>

      <div className="max-w-full overflow-x-auto custom-scrollbar">
        <div className="-ml-5 min-w-[650px] xl:min-w-full pl-2">
          <Chart options={options} series={series} type="bar" height={200} />
        </div>
      </div>
    </div>
  );
}
