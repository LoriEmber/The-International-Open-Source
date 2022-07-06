const axios = require('axios').default
const fs = require('fs')
const dashboard = require('./dashboard.js')
const powerShell = require('node-powershell').PowerShell

function sleep(seconds) {
     return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
   }

;(async function () {
     const ps = new powerShell({
          executionPolicy: 'Bypass',
          noProfile: true,
     })

     const preStartDockerCommands = ['docker network create --driver bridge grafana','docker container stop grafana graphite','docker rm -f $(docker ps -a -q)','docker volume rm $(docker volume ls -q)']

     const commands = preStartDockerCommands.concat([
          'docker run -d \
      --name graphite \
      --restart=always \
      -p 80:80 \
      -p 2003-2004:2003-2004 \
      -p 2023-2024:2023-2024 \
      -p 8125:8125/udp \
      -p 8126:8126 \
      --network grafana \
      graphiteapp/graphite-statsd',
          'docker run -d --network grafana --name=grafana -p 3000:3000 grafana/grafana-oss:9.0.2-ubuntu',
          'docker network connect bridge grafana',
     ])
     for (let i = 0; i < commands.length; i++) {
          try {
               await ps.invoke(commands[i])
          } catch (error) {
               console.log("NUMBER"+i,error)
          }
     }
     ps.dispose()


const grafanaUrl = 'http://localhost:3000'
async function SetupDataSources() {
          try {
               await axios({
                    url: grafanaUrl + '/api/datasources',
                    method: 'post',
                    auth: {
                         username: 'admin',
                         password: 'admin',
                    },
                    data: {
                         name: 'Graphite',
                         type: 'graphite',
                         url: 'http://graphite:8080',
                         access: 'proxy',
                    },
               })
          } catch (err) {
               console.log(err)
          }
     }
     async function SetupDashboard() {
          try {
               await axios({
                    url: grafanaUrl + '/api/dashboards/db',
                    method: 'post',
                    auth: {
                         username: 'admin',
                         password: 'admin',
                    },
                    data: dashboard,
               })
          } catch (error) {
               console.log(err)
          }
     }
     await sleep(5);
     await SetupDataSources()
     await SetupDashboard()
     console.log('Done!')
})()
