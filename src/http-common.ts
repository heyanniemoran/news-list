import axios from "axios";
export default axios.create({
  baseURL: "https://api.hnpwa.com/v0/",
  headers: {
    "Content-type": "application/json",
  },
});
