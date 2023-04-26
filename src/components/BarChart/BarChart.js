import {Bar} from 'react-chartjs-2';
import {Chart as ChartJS} from 'chart.js/auto'

const BarChart = ({chartData, chartDataOptions}) => {
    return (
        <Bar
            data={chartData}
            options={chartDataOptions}
        />
    );
};

export default BarChart;