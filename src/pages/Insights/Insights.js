import BarChart from "../../components/BarChart/BarChart";
import "./Insights.scss"
import { useEffect, useState } from "react";

const Insights = ({orders}) => {

    const salesData = new Array(31).fill(0);

    orders.forEach(order => {
    const day = parseInt(order.order_date.slice(8, 10)) - 1; 
    salesData[day] += parseInt(order.total_sale_amount); 
    });

    const [salesChartData, setSalesChartData] = useState(
        {
            labels: new Array(31).fill().map((_, i) => i + 1),
            datasets: [{
                label: "Sales This Month",
                data: salesData,
                backgroundColor: ["#EDB055"],
                borderRadius: Number.MAX_VALUE,
            }]
        }
    )

    console.log("Sales This Month", salesData)
    
    const [statsToday, setStatsToday] = useState({
        dollar: "0",
        volume: "0"
    })

    const [statsThisMonth, setStatsThisMonth] = useState({
        dollar: "0",
        volume: "0"
    })

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
            volume: cumulativeVolumeTotal
        })
        setStatsThisMonth({
            dollar: cumulativeDollarTotalMonth,
            volume: cumulativeVolumeTotalMonth
        })
    }

    useEffect(() => {
        caltSalesToday();
    }, [])


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
            <div>
                <BarChart chartData={salesChartData}/>
            </div>
        </section>
    );
};

export default Insights;