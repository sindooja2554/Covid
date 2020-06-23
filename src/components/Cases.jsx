import React, { Component } from "react";
// import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import FavoriteIcon from "@material-ui/icons/Favorite";
import "./Appbar.scss";
import { Typography } from "@material-ui/core";

export class Cases extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="paperDiv">
        <div className="paper">
          <Card className="card">
            <CardContent className="confirm">
              <div className="name">
                <SentimentVeryDissatisfiedIcon />
                <Typography>Confirmed</Typography>
              </div>
              <span className="cases">{this.props.confirmed}</span>
            </CardContent>
          </Card>
          <Card className="card">
            <CardContent className="active">
              <div className="name">
                <TrendingUpIcon />
                <Typography>Tested</Typography>
              </div>
              <span className="cases">{this.props.tested}</span>
            </CardContent>
          </Card>
          <Card className="card">
            <CardContent className="recovered">
              <div className="name">
                <FavoriteIcon />
                <Typography>Recovered</Typography>
              </div>
              <span className="cases">{this.props.recovered}</span>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
}

export default Cases;
