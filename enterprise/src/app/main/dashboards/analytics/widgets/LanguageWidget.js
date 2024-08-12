import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { memo, useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { useSelector } from "react-redux";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import { selectWidgets } from "../store/widgetsSlice";
import { http } from "src/app/api/http";

function LanguageWidget(props) {
  const widgets = useSelector(selectWidgets);
  const { series, labels, uniqueVisitors } = widgets?.language;
  const theme = useTheme();

  const [awaitRender, setAwaitRender] = useState(true);
  const [monthlyStatByType, setMonthlyStatByType] = useState({
    isFetched: false,
    labels: [],
    percents: [],
    counts: [],
  });

  useEffect(() => {
    http(true)
      .get("products/statistics_by_type/")
      .then((res) =>
        setMonthlyStatByType({
          isFetched: true,
          labels: res.data?.map((item) => item.type),
          percents: res.data?.map((item) => item.percent),
          counts: res.data?.map((item) => item.count),
        })
      )
      .catch((err) => console.log(err));
  }, []);

  const chartOptions = {
    chart: {
      animations: {
        speed: 400,
        animateGradually: {
          enabled: false,
        },
      },
      fontFamily: "inherit",
      foreColor: "inherit",
      height: "100%",
      type: "donut",
      sparkline: {
        enabled: true,
      },
    },
    colors: ["#805AD5", "#B794F4"],
    labels: monthlyStatByType?.labels,
    plotOptions: {
      pie: {
        customScale: 0.9,
        expandOnClick: false,
        donut: {
          size: "70%",
        },
      },
    },
    stroke: {
      colors: [theme.palette.background.paper],
    },
    series: monthlyStatByType?.counts,
    states: {
      hover: {
        filter: {
          type: "none",
        },
      },
      active: {
        filter: {
          type: "none",
        },
      },
    },
    tooltip: {
      enabled: true,
      fillSeriesColor: false,
      theme: "dark",
      custom: ({ seriesIndex, w }) =>
        `<div class="flex items-center h-32 min-h-32 max-h-23 px-12">
            <div class="w-12 h-12 rounded-full" style="background-color: ${w.config.colors[seriesIndex]};"></div>
            <div class="ml-8 text-md leading-none">${w.config.labels[seriesIndex]}:</div>
            <div class="ml-8 text-md font-bold leading-none">${w.config.series[seriesIndex]} ta</div>
        </div>`,
    },
  };

  useEffect(() => {
    setAwaitRender(false);
  }, []);

  if (awaitRender) {
    return null;
  }
  return (
    <Paper className="flex flex-col flex-auto shadow rounded-2xl overflow-hidden p-24">
      <div className="flex flex-col sm:flex-row items-start justify-between">
        <Typography className="text-lg font-medium tracking-tight leading-6 truncate">
          Kategoriya bo’yicha
        </Typography>
        <div className="ml-8">
          <Chip size="small" className="font-medium text-sm" label=" 30 kun" />
        </div>
      </div>

      <div className="flex flex-col flex-auto mt-24 h-192">
        <ReactApexChart
          className="flex flex-auto items-center justify-center w-full h-full"
          options={chartOptions}
          series={monthlyStatByType?.counts}
          type={chartOptions.chart.type}
          height={chartOptions.chart.height}
        />
      </div>
      <div className="mt-32">
        <div className="-my-12 divide-y">
          {monthlyStatByType.counts.map((_, i) => (
            <div className="grid grid-cols-3 py-12" key={i}>
              <div className="flex items-center">
                <Box
                  className="flex-0 w-8 h-8 rounded-full"
                  sx={{ backgroundColor: chartOptions.colors[i] }}
                />
                <Typography className="ml-12 truncate">
                  {monthlyStatByType.labels[i]}
                </Typography>
              </div>
              <Typography className="font-medium text-right">
                {monthlyStatByType.counts[i]}
              </Typography>
              <Typography className="text-right" color="text.secondary">
                {monthlyStatByType.percents[i]}%
              </Typography>
            </div>
          ))}
        </div>
      </div>
    </Paper>
  );
}

export default memo(LanguageWidget);
