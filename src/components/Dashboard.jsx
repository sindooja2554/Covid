import React, { Component } from "react";
import Appbar from "./Appbar";
import Cases from "./Cases";
import TimeSeries from "./TimeSeries";
import Statewise from "./Statewise";
import Tested from "./Tested";
import SpreadTrend from "./SpreadTrend";
import "./Dashboard.scss";
import { Button } from "@material-ui/core";
const service = require("../services/service");

export class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalConfirmed: null,
      totalTested: null,
      totalRecovered: null,
      data: {
        cases_time_series: [],
        statewise: [],
        tested: [],
      },
      showGraph: "all",
    };
  }

  getData = () => {
    service.coronaData((error, data) => {
      if (error) {
        console.log("error");
      } else {
        this.setState({
          // noOfPatients: Object.keys(data.data.raw_data).length,
        });
      }
    });
  };

  getTotalTestDone = () => {
    service.getTotalTestDone((error, data) => {
      if (error) {
        console.log(error);
      } else {
        this.setState({
          totalConfirmed: data.data.statewise[0].confirmed,
          totalTested:
            data.data.tested[Object.keys(data.data.tested).length - 1]
              .totalsamplestested,
          totalRecovered: data.data.statewise[0].recovered,
          data: {
            cases_time_series: data.data.cases_time_series,
            statewise: data.data.statewise,
            tested: data.data.tested,
          },
        });
      }
    });
  };

  clicked = (value) => {
    if (value === 1) {
      this.setState({
        showGraph: "all",
      });
    } else if (value === 2) {
      this.setState({
        showGraph: "month",
      });
    } else {
      this.setState({
        showGraph: "2weeks",
      });
    }
  };

  UNSAFE_componentWillMount() {
    this.getData();
    this.getTotalTestDone();
  }

  render() {
    return (
      <div className="dashboard">
        <div className="appbar">
          <Appbar />
        </div>
        <div className="main">
          <Cases
            confirmed={this.state.totalConfirmed}
            tested={this.state.totalTested}
            recovered={this.state.totalRecovered}
          />
          <SpreadTrend showGraph={this.state.showGraph} />
          <div>
            <Button variant="contained" onClick={() => this.clicked(1)}>
              All
            </Button>
            <Button variant="contained" onClick={() => this.clicked(2)}>
              1 Month
            </Button>
            <Button variant="contained" onClick={() => this.clicked(3)}>
              2 Weeks
            </Button>
          </div>
          <div className="series">
            <TimeSeries
              data={this.state.data}
              showGraph={this.state.showGraph}
            />
          </div>
          <div className="series">
            <Statewise data={this.state.data.statewise} />
          </div>
          <div className="series">
            <Tested
              tested={this.state.data.tested}
              showGraph={this.state.showGraph}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
