import axios from "axios";

export function coronaData(callback) {
  axios
    .get("https://api.covid19india.org/raw_data.json")
    .then((data) => {
      return callback(null, data);
    })
    .catch((error) => {
      return callback(error);
    });
}

export function getTotalTestDone(callback) {
  axios
    .get("https://api.covid19india.org/data.json")
    .then((data) => {
      return callback(null, data);
    })
    .catch((error) => {
      return callback(error);
    });
}