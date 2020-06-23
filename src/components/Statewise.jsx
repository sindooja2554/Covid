import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import "./Graph.scss";

export class Statewise extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statewise_data: {
        labels: [],
        datasets: [
          {
            label: "State Wise",
            data: [],
          },
        ],
      },
    };
  }

  UNSAFE_componentWillReceiveProps = (prevProps, nextProps) => {
    if (prevProps.data !== nextProps.data && this.props.data.length !== 0) {
      let count = 0;
      this.props.data.forEach((element) => {
        count++;
        this.state.statewise_data.labels.push(element.statecode);
        this.state.statewise_data.datasets[0].data.push(element.active);
      });
      if (this.props.data.length === count) {
        this.setState({
          statewise_data: {
            labels: this.state.statewise_data.labels,
            datasets: [
              {
                label: "State Wise",
                data: this.state.statewise_data.datasets[0].data,
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
        <h2>State Wise Active Cases</h2>
        {this.state.statewise_data.labels.length !== 0 && (
          <Bar
            data={this.state.statewise_data}
            options={{ maintainAspectRatio: false }}
          />
        )}
      </div>
    );
  }
}

export default Statewise;
