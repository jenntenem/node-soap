import request from "./soap/request.js";

const data = await request({
  Name: "Jenntenem",
});

console.log(data);
