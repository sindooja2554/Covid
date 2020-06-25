import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import "./Graph.scss";
const service = require("../services/service");

export class TravelHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showGraph: "all",
      travel_history_data: {
        labels: [],
        datasets: [
          {
            label: "Travel History",
            labelBackgroundColor: "rgba(128,182,244,1)",
            borderColor: "#80b6f4",
            pointBorderColor: "#80b6f4",
            pointBackgroundColor: "#80b6f4",
            fill: false,
            data: [],
          },
        ],
      },
    };
  }

  receiveProps() {
    service.getTravelHistroy((error, data) => {
      if (error) {
        console.log(error);
      } else {
        console.log(data.data);
        this.state.travel_history_data.labels.splice(
          0,
          this.state.travel_history_data.labels.length
        );
        this.state.travel_history_data.datasets[0].data.splice(
          0,
          this.state.travel_history_data.datasets[0].data.length
        );
        let count = 0;
        if (this.props.showGraph === "all") {
          data.data.travel_history.forEach((element) => {
            count++;
            this.state.travel_history_data.labels.push(
              element.timefrom.split(" ")[0]
            );
            this.state.travel_history_data.datasets[0].data.push(
              element._cn6ca
            );
          });
        } else if (this.props.showGraph === "month") {
          for (
            let i = data.data.travel_history.length - 31;
            i < data.data.travel_history.length - 1;
            i++
          ) {
            count++;
            this.state.travel_history_data.labels.push(
              data.data.travel_history[i].timefrom.split(" ")[0]
            );
            this.state.travel_history_data.datasets[0].data.push(
              data.data.travel_history[i]._cn6ca
            );
          }
        } else if (this.props.showGraph === "2weeks") {
          for (
            let i = data.data.travel_history.length - 15;
            i < data.data.travel_history.length - 1;
            i++
          ) {
            count++;
            this.state.travel_history_data.labels.push(
              data.data.travel_history[i].timefrom.split(" ")[0]
            );
            this.state.travel_history_data.datasets[0].data.push(
              data.data.travel_history[i]._cn6ca
            );
          }
        }

        if (
          data.data.travel_history.length === count ||
          30 === count ||
          14 === count
        ) {
          this.setState({
            test_data: {
              labels: this.state.travel_history_data.labels,
              datasets: [
                {
                  label: "Travel History",
                  data: this.state.travel_history_data.datasets[0].data,
                },
              ],
            },
          });
        }
      }
    });
  }

  componentDidUpdate() {
    if (this.props.showGraph !== this.state.showGraph) {
      this.setState({
        showGraph: this.props.showGraph,
      });
      this.receiveProps();
    }
  }

  componentDidMount() {
    this.receiveProps();
  }

  render() {
    return (
      <div className="travel">
        <h2>Travel History</h2>
        <Line
          data={this.state.travel_history_data}
          options={{
            maintainAspectRatio: false,
            legend: {
              display: true,
              position: "top",
              align: "center",
              fillStyle: "rgba(128,182,244,1)",
              labels: {
                fontColor: "rgba(128,182,244,1)",
              },
            },
            scales: {
              yAxes: [
                {
                  ticks: {
                    fontColor: "rgba(128,182,244,1)",
                  },
                  gridLines: {
                    zeroLineColor: "rgba(128,182,244,1)",
                  },
                },
              ],
              xAxes: [
                {
                  ticks: {
                    fontColor: "rgba(128,182,244,1)",
                  },
                  gridLines: {
                    zeroLineColor: "rgba(128,182,244,1)",
                  },
                },
              ],
            },
          }}
          redraw={true}
        />
      </div>
    );
  }
}

export default TravelHistory;
