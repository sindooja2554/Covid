import React, { Component } from "react";
import Appbar from "./Appbar";
import Cases from "./Cases";
import TimeSeries from "./TimeSeries";
import Statewise from "./Statewise";
import Tested from "./Tested";
import "./Dashboard.scss";
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
          <div className="series">
            <TimeSeries data={this.state.data} />
          </div>
          <div className="series">
            <Statewise data={this.state.data.statewise} />
          </div>
          <div className="series">
            <Tested tested={this.state.data.tested} />
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
