const express = require("express");
const lynx = require("lynx");
var bodyParser = require('body-parser')
var app = express()

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

var metrics = new lynx('graphite', 8125); // StatsD IP & Port

function report(data, prefix="") {
    // \/ ???
    if (prefix == '') console.log("Pushing to gauges - " + new Date())
    for (const k in data) {
        if (Object.hasOwnProperty.call(data, k)) {
            const v = data[k];
            if (typeof v === 'object')report(v, prefix+k+'.')
            else metrics.gauge(prefix+k, v)
        }
    }
}
module.exports.push = report;

app.post("/push", (req, res) => {
    console.log("Received request");
    report(req.body)
        res.send("OK");
});

app.listen('8080', () => {
    console.log("Started Listening in Port 8080");
});

