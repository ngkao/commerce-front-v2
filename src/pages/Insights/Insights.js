import "./Insights.scss"
import { useEffect, useState } from "react";

const Insights = ({orders}) => {

    const [statsToday, setStatsToday] = useState({
        dollar: "0",
        volume: "0"
    })

    const caltSalesToday = () => {
        const today = new Date().toISOString().slice(0, 10); 
        let cumulativeDollarTotal = 0;
        let cumulativeVolumeTotal = 0;


        orders.forEach((order) => {
        const orderDate = order.order_date.slice(0, 10); 
        if (orderDate === today) {
            cumulativeDollarTotal += parseInt(order.total_sale_amount);
            cumulativeVolumeTotal += parseInt(order.total_quantity);
        }
        });

        setStatsToday({
            dollar: cumulativeDollarTotal,
            volume: cumulativeVolumeTotal
        })
    }

    useEffect(() => {
        caltSalesToday();
    }, [])


    return (
        <section className="insights">
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
        </section>
    );
};

export default Insights;