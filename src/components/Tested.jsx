import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import "./Graph.scss";

export class Tested extends Component {
  constructor(props) {
    super(props);
    this.state = {
      test_data: {
        labels: [],
        datasets: [
          {
            label: "Test Done",
            data: [],
          },
        ],
      },
    };
  }

  UNSAFE_componentWillReceiveProps = (prevProps, nextProps) => {
    if (
      prevProps.tested !== nextProps.tested &&
      this.props.tested.length !== 0
    ) {
      let count = 0;
      this.props.tested.forEach((element) => {
        count++;
        this.state.test_data.labels.push(element.updatetimestamp.split(" ")[0]);
        this.state.test_data.datasets[0].data.push(element.totalsamplestested);
      });
      if (this.props.tested.length === count) {
        this.setState({
          test_data: {
            labels: this.state.test_data.labels,
            datasets: [
              {
                label: "Samples Tested",
                data: this.state.test_data.datasets[0].data,
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
        <h2>Samples Tested</h2>
        {this.state.test_data.labels.length !== 0 && (
          <Bar
            data={this.state.test_data}
            options={{ maintainAspectRatio: false }}
          />
        )}
      </div>
    );
  }
}

export default Tested;
