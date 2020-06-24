import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import "./Graph.scss";
const service = require("../services/service");

export class SpreadTrend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 1,
      showGraph: "all",
      state_dist_data: {},
      states: [],
      dist_active_data: {
        labels: [],
        datasets: [
          {
            label: "Active",
            data: [],
            backgroundColor: "#80C342",
          },
        ],
      },
      dist_confirmed_data: {
        labels: [],
        datasets: [
          {
            label: "Confirmed",
            data: [],
          },
        ],
      },
      dist_recovered_data: {
        labels: [],
        datasets: [
          {
            label: "Recovered",
            data: [],
          },
        ],
      },
      dist_deceased_data: {
        labels: [],
        datasets: [
          {
            label: "Deceased",
            data: [],
          },
        ],
      },
    };
  }

  getStateDistData = (index) => {
    service.getStateDistData((error, data) => {
      if (error) {
        console.log(error);
      } else {
        this.setState({
          states: Object.keys(data.data),
          state_dist_data: data.data,
        });
        this.clickedState(1);
      }
    });
  };

  clickedState = (index) => {
    let active = [],
      confirmed = [],
      recovered = [],
      deceased = [],
      count = 0;
    for (var key in this.state.state_dist_data[
      Object.keys(this.state.state_dist_data)[index]
    ].districtData) {
      count++;
      if (
        this.state.state_dist_data[
          Object.keys(this.state.state_dist_data)[index]
        ].districtData.hasOwnProperty(key)
      ) {
        active.push(
          this.state.state_dist_data[
            Object.keys(this.state.state_dist_data)[index]
          ].districtData[key].active
        );
        confirmed.push(
          this.state.state_dist_data[
            Object.keys(this.state.state_dist_data)[index]
          ].districtData[key].confirmed
        );
        recovered.push(
          this.state.state_dist_data[
            Object.keys(this.state.state_dist_data)[index]
          ].districtData[key].recovered
        );
        deceased.push(
          this.state.state_dist_data[
            Object.keys(this.state.state_dist_data)[index]
          ].districtData[key].deceased
        );
      }
    }
    if (
      count ===
      Object.keys(
        this.state.state_dist_data[
          Object.keys(this.state.state_dist_data)[index]
        ].districtData
      ).length
    ) {
      this.setState({
        index: index,
        dist_active_data: {
          labels: Object.keys(
            this.state.state_dist_data[
              Object.keys(this.state.state_dist_data)[index]
            ].districtData
          ),
          datasets: [
            {
              label: "Active",
              data: active,
            },
          ],
        },
        dist_confirmed_data: {
          labels: Object.keys(
            this.state.state_dist_data[
              Object.keys(this.state.state_dist_data)[index]
            ].districtData
          ),
          datasets: [
            {
              label: "Confirmed",
              data: confirmed,
            },
          ],
        },
        dist_recovered_data: {
          labels: Object.keys(
            this.state.state_dist_data[
              Object.keys(this.state.state_dist_data)[index]
            ].districtData
          ),
          datasets: [
            {
              label: "Recovered",
              data: recovered,
            },
          ],
        },
        dist_deceased_data: {
          labels: Object.keys(
            this.state.state_dist_data[
              Object.keys(this.state.state_dist_data)[index]
            ].districtData
          ),
          datasets: [
            {
              label: "Deceased",
              data: deceased,
            },
          ],
        },
      });
    }
  };

  componentDidMount() {
    this.getStateDistData(1);
  }

  render() {
    return (
      <div className="timeseries_spread">
        <h2>State District Wise</h2>
        <div className="expansion">
          <ExpansionPanel className="expansion_panel">
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              {this.state.states[this.state.index]}
            </ExpansionPanelSummary>
            <List className="list">
              {this.state.states.map((item, index) => (
                <ListItem
                  button
                  className="listButton"
                  key={index}
                  onClick={() => this.clickedState(index)}
                >
                  <ListItemText primary={item} />
                </ListItem>
              ))}
            </List>
          </ExpansionPanel>
        </div>
        <div className="bars">
          {this.state.dist_active_data.labels.length !== 0 && (
            <div className="bar">
              <Bar
                data={this.state.dist_active_data}
                options={{ maintainAspectRatio: false }}
                redraw={true}
              />
            </div>
          )}
          {this.state.dist_confirmed_data.labels.length !== 0 && (
            <div className="bar">
              <Bar
                data={this.state.dist_confirmed_data}
                options={{ maintainAspectRatio: false }}
                redraw={true}
              />
            </div>
          )}
          {this.state.dist_recovered_data.labels.length !== 0 && (
            <div className="bar">
              <Bar
                data={this.state.dist_recovered_data}
                options={{ maintainAspectRatio: false }}
                redraw={true}
              />
            </div>
          )}
          {this.state.dist_deceased_data.labels.length !== 0 && (
            <div className="bar">
              <Bar
                data={this.state.dist_deceased_data}
                options={{ maintainAspectRatio: false }}
                redraw={true}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default SpreadTrend;
