import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import "./Graph.scss";

export class TimeSeries extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showGraph: "all",
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

  receiveProps = () => {
    this.state.time_series_data.labels.splice(
      0,
      this.state.time_series_data.labels.length
    );
    this.state.time_series_data.datasets[0].data.splice(
      0,
      this.state.time_series_data.datasets[0].data.length
    );
    let count = 0;
    if (this.props.showGraph === "all") {
      this.props.data.cases_time_series.forEach((element) => {
        count++;
        this.state.time_series_data.labels.push(element.date);
        this.state.time_series_data.datasets[0].data.push(
          element.totalconfirmed
        );
      });
    } else if (this.props.showGraph === "month") {
      for (
        let i = this.props.data.cases_time_series.length - 31;
        i < this.props.data.cases_time_series.length - 1;
        i++
      ) {
        count++;
        this.state.time_series_data.labels.push(
          this.props.data.cases_time_series[i].date
        );
        this.state.time_series_data.datasets[0].data.push(
          this.props.data.cases_time_series[i].totalconfirmed
        );
      }
    } else if (this.props.showGraph === "2weeks") {
      for (
        let i = this.props.data.cases_time_series.length - 15;
        i < this.props.data.cases_time_series.length - 1;
        i++
      ) {
        count++;
        this.state.time_series_data.labels.push(
          this.props.data.cases_time_series[i].date
        );
        this.state.time_series_data.datasets[0].data.push(
          this.props.data.cases_time_series[i].totalconfirmed
        );
      }
    }

    if (
      this.props.data.cases_time_series.length === count ||
      30 === count ||
      14 === count
    ) {
      this.setState({
        time_series_data: {
          labels: this.state.time_series_data.labels,
          datasets: [
            {
              label: "Time Series",
              data: this.state.time_series_data.datasets[0].data,
            },
          ],
        },
      });
    }
  };

  UNSAFE_componentWillReceiveProps = (nextProps) => {
    if (nextProps.data.cases_time_series.length !== 0) {
      this.receiveProps();
    }
  };

  componentDidUpdate() {
    if (
      this.props.showGraph !== this.state.showGraph &&
      this.props.data.cases_time_series.length !== 0
    ) {
      this.setState({
        showGraph: this.props.showGraph,
      });
      this.receiveProps();
    }
  }

  render() {
    return (
      <div className="timeseries">
        <h2>Time Series Per Day</h2>
        {this.state.time_series_data.labels.length !== 0 && (
          <Bar
            data={this.state.time_series_data}
            options={{ maintainAspectRatio: false }}
            redraw={true}
          />
        )}
      </div>
    );
  }
}

export default TimeSeries;
