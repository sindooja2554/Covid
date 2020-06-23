import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import "./Graph.scss";

export class TimeSeries extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time_series_data: {
        labels: [],
        datasets: [
          {
            label: "Time Series",
            xAxisID: "Days",
            data: [],
          },
        ],
      },
    };
  }

  UNSAFE_componentWillReceiveProps = (prevProps, nextProps) => {
    if (prevProps.data !== nextProps.data) {
      let count = 0;
      this.props.data.cases_time_series.forEach((element) => {
        count++;
        this.state.time_series_data.labels.push(element.date);
        this.state.time_series_data.datasets[0].data.push(
          element.totalconfirmed
        );
      });
      if (this.props.data.cases_time_series.length === count) {
        this.setState({
          time_series_data: {
            labels: this.state.time_series_data.labels,
            datasets: [
              {
                label: "Time Series",
                // xAxisID: "Days",
                data: this.state.time_series_data.datasets[0].data,
              },
            ],
          },
        });
      }
    }
  };

  render() {
    return (
      <div className="timeseries">
        <h2>Time Series Per Day</h2>
        {this.state.time_series_data.labels.length !== 0 && (
          <Bar
            data={this.state.time_series_data}
            options={{ maintainAspectRatio: false }}
          />
        )}
      </div>
    );
  }
}

export default TimeSeries;
