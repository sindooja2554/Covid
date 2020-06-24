import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import "./Graph.scss";

export class Tested extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showGraph: "all",
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

  receiveProps = () => {
    this.state.test_data.labels.splice(0, this.state.test_data.labels.length);
    this.state.test_data.datasets[0].data.splice(
      0,
      this.state.test_data.datasets[0].data.length
    );
    let count = 0;
    if (this.props.showGraph === "all") {
      this.props.tested.forEach((element) => {
        count++;
        this.state.test_data.labels.push(element.updatetimestamp.split(" ")[0]);
        this.state.test_data.datasets[0].data.push(element.totalsamplestested);
      });
    } else if (this.props.showGraph === "month") {
      for (
        let i = this.props.tested.length - 31;
        i < this.props.tested.length - 1;
        i++
      ) {
        count++;
        this.state.test_data.labels.push(
          this.props.tested[i].updatetimestamp.split(" ")[0]
        );
        this.state.test_data.datasets[0].data.push(
          this.props.tested[i].totalsamplestested
        );
      }
    } else if (this.props.showGraph === "2weeks") {
      for (
        let i = this.props.tested.length - 15;
        i < this.props.tested.length - 1;
        i++
      ) {
        count++;
        this.state.test_data.labels.push(
          this.props.tested[i].updatetimestamp.split(" ")[0]
        );
        this.state.test_data.datasets[0].data.push(
          this.props.tested[i].totalsamplestested
        );
      }
    }

    if (this.props.tested.length === count || 30 === count || 14 === count) {
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
  };

  UNSAFE_componentWillReceiveProps = (nextProps) => {
    if (nextProps.tested.length !== 0) {
      this.receiveProps();
    }
  };

  componentDidUpdate() {
    if (
      this.props.showGraph !== this.state.showGraph &&
      this.props.tested.length !== 0
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
        <h2>Samples Tested</h2>
        {this.state.test_data.labels.length !== 0 && (
          <Bar
            data={this.state.test_data}
            options={{ maintainAspectRatio: false }}
            redraw={true}
          />
        )}
      </div>
    );
  }
}

export default Tested;
