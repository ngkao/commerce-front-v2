import BarChart from "../../../../components/BarChart/BarChart";
import "./Insights.scss";
import { useEffect, useState } from "react";

const Insights = ({ orders }) => {
  const today = new Date();
  const currentMonth = today.getMonth() + 1; // getMonth() returns 0-indexed month
  const salesData = Array.from({ length: 31 }, (_, i) => i + 1).fill(0);

  orders.forEach((order) => {
    const orderMonth = parseInt(order.order_date.slice(5, 7));

    if (orderMonth === currentMonth) {
      const day = parseInt(order.order_date.slice(8, 10)) - 1;
      salesData[day + 1] += parseInt(order.total_sale_amount);
    }
  });
  // eslint-disable-next-line
  const [salesChartData, setSalesChartData] = useState({
    labels: new Array(31).fill().map((_, i) => i + 1),
    datasets: [
      {
        label: "Sales This Month",
        data: salesData,
        backgroundColor: ["#EDB055"],
        borderRadius: Number.MAX_VALUE,
      },
    ],
    options: {
      scales: {
        y: {
          title: {
            display: true,
            text: "Sales in $",
          },
        },
        x: {
          title: {
            display: true,
            text: "Days in Month",
          },
          ticks: {
            autoSkip: false,
            maxRotation: 0,
            minRotation: 0,
            callback: (value, index, values) => {
              // Show labels every other one on mobile breakpoint
              if (window.innerWidth < 768) {
                return index % 2 !== 0 ? value : "";
              }
              return value;
            },
          },
        },
      },
      plugins: {
        legend: {
          display: true,
        },
      },
    },
  });

  const [statsToday, setStatsToday] = useState({
    dollar: "0",
    volume: "0",
  });

  const [statsThisMonth, setStatsThisMonth] = useState({
    dollar: "0",
    volume: "0",
  });

  const caltSalesToday = () => {
    const today = new Date().toISOString().slice(0, 10);
    const thisMonth = new Date().toISOString().slice(0, 7);

    let cumulativeDollarTotal = 0;
    let cumulativeVolumeTotal = 0;
    let cumulativeDollarTotalMonth = 0;
    let cumulativeVolumeTotalMonth = 0;

    orders.forEach((order) => {
      const orderDate = order.order_date.slice(0, 10);
      if (orderDate === today) {
        cumulativeDollarTotal += parseInt(order.total_sale_amount);
        cumulativeVolumeTotal += parseInt(order.total_quantity);
      }
      if (orderDate.slice(0, 7) === thisMonth) {
        cumulativeDollarTotalMonth += parseInt(order.total_sale_amount);
        cumulativeVolumeTotalMonth += parseInt(order.total_quantity);
      }
    });

    setStatsToday({
      dollar: cumulativeDollarTotal,
      volume: cumulativeVolumeTotal,
    });
    setStatsThisMonth({
      dollar: cumulativeDollarTotalMonth,
      volume: cumulativeVolumeTotalMonth,
    });
  };

  useEffect(() => {
    caltSalesToday(); // eslint-disable-next-line
  }, []);

  return (
    <section className="insights">
      <div className="insights__container">
        <div className="insights__top-ctr">
          <div className="insights__sales-dollar">
            <p className="insights__title">Sales in $ Today</p>
            <p className="insights__stats">${statsToday.dollar}</p>
          </div>
          <div className="insights__sales-volume">
            <p className="insights__title">Sales Volume Today</p>
            <p className="insights__stats">{statsToday.volume}</p>
          </div>
        </div>
        <div className="insights__top-ctr">
          <div className="insights__sales-dollar">
            <p className="insights__title">Sales in $ This Month</p>
            <p className="insights__stats">${statsThisMonth.dollar}</p>
          </div>
          <div className="insights__sales-volume">
            <p className="insights__title">Sales Volume This Month</p>
            <p className="insights__stats">{statsThisMonth.volume}</p>
          </div>
        </div>
      </div>
      <div className="insights__chart">
        <BarChart
          chartData={salesChartData}
          chartDataOptions={salesChartData.options}
        />
      </div>
    </section>
  );
};

export default Insights;
