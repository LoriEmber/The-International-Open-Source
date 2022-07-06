module.exports = {
    "dashboard": {
        "annotations": {
            "list": [
                {
                    "builtIn": 1,
                    "datasource": "-- Grafana --",
                    "enable": true,
                    "hide": true,
                    "iconColor": "rgba(0, 211, 255, 1)",
                    "name": "Annotations & Alerts",
                    "type": "dashboard"
                }
            ]
        },
        "editable": true,
        "gnetId": null,
        "graphTooltip": 0,
        "links": [],
        "panels": [
            {
                "aliasColors": {},
                "bars": false,
                "dashLength": 10,
                "dashes": false,
                "datasource": "Docker InfluxDB",
                "fill": 0,
                "gridPos": {
                    "h": 9,
                    "w": 12,
                    "x": 0,
                    "y": 0
                },
                "id": 101,
                "legend": {
                    "avg": false,
                    "current": false,
                    "max": false,
                    "min": false,
                    "show": true,
                    "total": false,
                    "values": false
                },
                "lines": true,
                "linewidth": 1,
                "links": [],
                "nullPointMode": "connected",
                "options": {},
                "percentage": false,
                "pointradius": 2,
                "points": true,
                "renderer": "flot",
                "seriesOverrides": [],
                "spaceLength": 10,
                "stack": false,
                "steppedLine": false,
                "targets": [
                    {
                        "alias": "RTT",
                        "groupBy": [
                            {
                                "params": [
                                    "$__interval"
                                ],
                                "type": "time"
                            }
                        ],
                        "measurement": "Cisco-IOS-XE-ip-sla-oper:ip-sla-stats/sla-oper-entry",
                        "orderByTime": "ASC",
                        "policy": "default",
                        "refId": "A",
                        "resultFormat": "time_series",
                        "select": [
                            [
                                {
                                    "params": [
                                        "stats/rtt/sla_time_values/avg"
                                    ],
                                    "type": "field"
                                },
                                {
                                    "params": [],
                                    "type": "mean"
                                }
                            ]
                        ],
                        "tags": [
                            {
                                "key": "source",
                                "operator": "=",
                                "value": "CSR1"
                            },
                            {
                                "condition": "AND",
                                "key": "oper_id",
                                "operator": "=",
                                "value": "101"
                            }
                        ]
                    },
                    {
                        "alias": "Jitter",
                        "groupBy": [
                            {
                                "params": [
                                    "$__interval"
                                ],
                                "type": "time"
                            }
                        ],
                        "measurement": "Cisco-IOS-XE-ip-sla-oper:ip-sla-stats/sla-oper-entry",
                        "orderByTime": "ASC",
                        "policy": "default",
                        "refId": "B",
                        "resultFormat": "time_series",
                        "select": [
                            [
                                {
                                    "params": [
                                        "stats/jitter/sd/avg"
                                    ],
                                    "type": "field"
                                },
                                {
                                    "params": [],
                                    "type": "mean"
                                }
                            ]
                        ],
                        "tags": [
                            {
                                "key": "source",
                                "operator": "=",
                                "value": "CSR1"
                            },
                            {
                                "condition": "AND",
                                "key": "oper_id",
                                "operator": "=",
                                "value": "101"
                            }
                        ]
                    },
                    {
                        "alias": "Latency",
                        "groupBy": [
                            {
                                "params": [
                                    "$__interval"
                                ],
                                "type": "time"
                            },
                            {
                                "params": [
                                    "null"
                                ],
                                "type": "fill"
                            }
                        ],
                        "measurement": "Cisco-IOS-XE-ip-sla-oper:ip-sla-stats/sla-oper-entry",
                        "orderByTime": "ASC",
                        "policy": "default",
                        "refId": "C",
                        "resultFormat": "time_series",
                        "select": [
                            [
                                {
                                    "params": [
                                        "stats/oneway_latency/sd/avg"
                                    ],
                                    "type": "field"
                                },
                                {
                                    "params": [],
                                    "type": "mean"
                                }
                            ]
                        ],
                        "tags": [
                            {
                                "key": "source",
                                "operator": "=",
                                "value": "CSR1"
                            },
                            {
                                "condition": "AND",
                                "key": "oper_id",
                                "operator": "=",
                                "value": "101"
                            }
                        ]
                    }
                ],
                "thresholds": [],
                "timeFrom": null,
                "timeRegions": [],
                "timeShift": null,
                "title": "CSR1 to CSR1",
                "tooltip": {
                    "shared": true,
                    "sort": 0,
                    "value_type": "individual"
                },
                "type": "graph",
                "xaxis": {
                    "buckets": null,
                    "mode": "time",
                    "name": null,
                    "show": true,
                    "values": []
                },
                "yaxes": [
                    {
                        "format": "short",
                        "label": "ms",
                        "logBase": 1,
                        "max": null,
                        "min": null,
                        "show": true
                    },
                    {
                        "format": "short",
                        "label": null,
                        "logBase": 1,
                        "max": null,
                        "min": null,
                        "show": true
                    }
                ],
                "yaxis": {
                    "align": false,
                    "alignLevel": null
                }
            },
            {
                "aliasColors": {},
                "bars": false,
                "dashLength": 10,
                "dashes": false,
                "datasource": "Docker InfluxDB",
                "fill": 0,
                "gridPos": {
                    "h": 9,
                    "w": 12,
                    "x": 0,
                    "y": 0
                },
                "id": 102,
                "legend": {
                    "avg": false,
                    "current": false,
                    "max": false,
                    "min": false,
                    "show": true,
                    "total": false,
                    "values": false
                },
                "lines": true,
                "linewidth": 1,
                "links": [],
                "nullPointMode": "connected",
                "options": {},
                "percentage": false,
                "pointradius": 2,
                "points": true,
                "renderer": "flot",
                "seriesOverrides": [],
                "spaceLength": 10,
                "stack": false,
                "steppedLine": false,
                "targets": [
                    {
                        "alias": "RTT",
                        "groupBy": [
                            {
                                "params": [
                                    "$__interval"
                                ],
                                "type": "time"
                            }
                        ],
                        "measurement": "Cisco-IOS-XE-ip-sla-oper:ip-sla-stats/sla-oper-entry",
                        "orderByTime": "ASC",
                        "policy": "default",
                        "refId": "A",
                        "resultFormat": "time_series",
                        "select": [
                            [
                                {
                                    "params": [
                                        "stats/rtt/sla_time_values/avg"
                                    ],
                                    "type": "field"
                                },
                                {
                                    "params": [],
                                    "type": "mean"
                                }
                            ]
                        ],
                        "tags": [
                            {
                                "key": "source",
                                "operator": "=",
                                "value": "CSR1"
                            },
                            {
                                "condition": "AND",
                                "key": "oper_id",
                                "operator": "=",
                                "value": "102"
                            }
                        ]
                    },
                    {
                        "alias": "Jitter",
                        "groupBy": [
                            {
                                "params": [
                                    "$__interval"
                                ],
                                "type": "time"
                            }
                        ],
                        "measurement": "Cisco-IOS-XE-ip-sla-oper:ip-sla-stats/sla-oper-entry",
                        "orderByTime": "ASC",
                        "policy": "default",
                        "refId": "B",
                        "resultFormat": "time_series",
                        "select": [
                            [
                                {
                                    "params": [
                                        "stats/jitter/sd/avg"
                                    ],
                                    "type": "field"
                                },
                                {
                                    "params": [],
                                    "type": "mean"
                                }
                            ]
                        ],
                        "tags": [
                            {
                                "key": "source",
                                "operator": "=",
                                "value": "CSR1"
                            },
                            {
                                "condition": "AND",
                                "key": "oper_id",
                                "operator": "=",
                                "value": "102"
                            }
                        ]
                    },
                    {
                        "alias": "Latency",
                        "groupBy": [
                            {
                                "params": [
                                    "$__interval"
                                ],
                                "type": "time"
                            },
                            {
                                "params": [
                                    "null"
                                ],
                                "type": "fill"
                            }
                        ],
                        "measurement": "Cisco-IOS-XE-ip-sla-oper:ip-sla-stats/sla-oper-entry",
                        "orderByTime": "ASC",
                        "policy": "default",
                        "refId": "C",
                        "resultFormat": "time_series",
                        "select": [
                            [
                                {
                                    "params": [
                                        "stats/oneway_latency/sd/avg"
                                    ],
                                    "type": "field"
                                },
                                {
                                    "params": [],
                                    "type": "mean"
                                }
                            ]
                        ],
                        "tags": [
                            {
                                "key": "source",
                                "operator": "=",
                                "value": "CSR1"
                            },
                            {
                                "condition": "AND",
                                "key": "oper_id",
                                "operator": "=",
                                "value": "102"
                            }
                        ]
                    }
                ],
                "thresholds": [],
                "timeFrom": null,
                "timeRegions": [],
                "timeShift": null,
                "title": "CSR1 to CSR2",
                "tooltip": {
                    "shared": true,
                    "sort": 0,
                    "value_type": "individual"
                },
                "type": "graph",
                "xaxis": {
                    "buckets": null,
                    "mode": "time",
                    "name": null,
                    "show": true,
                    "values": []
                },
                "yaxes": [
                    {
                        "format": "short",
                        "label": "ms",
                        "logBase": 1,
                        "max": null,
                        "min": null,
                        "show": true
                    },
                    {
                        "format": "short",
                        "label": null,
                        "logBase": 1,
                        "max": null,
                        "min": null,
                        "show": true
                    }
                ],
                "yaxis": {
                    "align": false,
                    "alignLevel": null
                }
            }
        ],
        "schemaVersion": 18,
        "style": "dark",
        "tags": [
            "nsla"
        ],
        "templating": {
            "list": []
        },
        "time": {
            "from": "now-1h",
            "to": "now"
        },
        "timepicker": {
            "refresh_intervals": [
                "5s",
                "10s",
                "30s",
                "1m",
                "5m",
                "15m",
                "30m",
                "1h",
                "2h",
                "1d"
            ],
            "time_options": [
                "5m",
                "15m",
                "1h",
                "6h",
                "12h",
                "24h",
                "2d",
                "7d",
                "30d"
            ]
        },
        "timezone": "",
        "title": "CSR1 SLA Performance",
        "version": 1
    }
}
