import React, {Component} from "react";
// import {Chart} from 'react-charts';
import {Line, Radar} from "react-chartjs-2";
import {Card, CardBody, CardHeader} from "reactstrap";
// import {Card, CardBody, CardColumns, CardHeader} from 'reactstrap';
import "../../Stylesheets/admin_page.scss";

const statsLine = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
        {
            label: "My First dataset",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [65, 59, 80, 81, 56, 55, 40]
        }
    ]
};

const radar = {
    labels: ["Toronto", "New York", "Atlanta", "Los Angeles", "San Francisco"],
    datasets: [
        {
            label: "My First dataset",
            backgroundColor: "rgba(179,181,198,0.2)",
            borderColor: "rgba(179,181,198,1)",
            pointBackgroundColor: "rgba(179,181,198,1)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(179,181,198,1)",
            data: [65, 59, 90, 81, 56, 55, 40]
        },
        {
            label: "My Second dataset",
            backgroundColor: "rgba(255,99,132,0.2)",
            borderColor: "rgba(255,99,132,1)",
            pointBackgroundColor: "rgba(255,99,132,1)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(255,99,132,1)",
            data: [28, 48, 40, 19, 96, 27, 100]
        }
    ]
};

const options = {
    tooltips: {
        enabled: false
        // custom: CustomTooltips
    },
    maintainAspectRatio: false
};

class Overview extends Component {
    state = {};

    // myChart = () => {
    //   const data = React.useMemo(
    //     () => [
    //       {
    //         label: 'Series 1',
    //         data: [[0, 1], [1, 2], [2, 4], [3, 2], [4, 7]]
    //       },
    //       {
    //         label: 'Series 2',
    //         data: [[0, 3], [1, 1], [2, 5], [3, 6], [4, 4]]
    //       }
    //     ],
    //     []
    //   );
    //
    //   const axes = React.useMemo(
    //     () => [
    //       {primary: true, type: 'linear', position: 'bottom'},
    //       {type: 'linear', position: 'left'}
    //     ],
    //     []
    //   );
    //
    //   const lineChart = (
    //     // A react-chart hyper-responsively and continuusly fills the available
    //     // space of its parent element automatically
    //     <div
    //       style={{
    //         width: '400px',
    //         height: '300px'
    //       }}
    //     >
    //       <Chart data={data} axes={axes}/>
    //     </div>
    //   )
    // };

    render() {
        return (
            <div className="overview">
                <div className="animated fadeIn d-flex justify-content-lg-center">
                    {/*<CardColumns className="">*/}
                    <Card className={"card"}>
                        <CardHeader>Trend</CardHeader>
                        <CardBody>
                            <div className="chart-wrapper">
                                <Line data={statsLine} options={options}/>
                            </div>
                        </CardBody>
                    </Card>

                    <Card>
                        <CardHeader>Restaurant Locations</CardHeader>
                        <CardBody>
                            <div className="chart-wrapper">
                                <Radar data={radar}/>
                            </div>
                        </CardBody>
                    </Card>
                    {/*</CardColumns>*/}
                </div>

                {/*<img className="chart" src='../../../images/chart_sample.png' alt=""/>*/}
                {/*<img className="chart" src='../../../images/chart_sample.png' alt=""/>*/}
            </div>
        );
    }
}

export default Overview;
