const axios = require('axios').default
const fs = require('fs')
const privateDashboard = require('./privateDashboard.js')
const mmoDashboard = require('./privateDashboard.js')
const powerShell = require('node-powershell').PowerShell
const { execSync } = require('child_process')

const isWindows = process.platform.includes('win')

function sleep(seconds) {
     return new Promise(resolve => setTimeout(resolve, seconds * 1000))
}

const isMMoDestination = process.argv[2] === undefined

;(async function () {
     let ps
     if (isWindows)
          ps = new powerShell({
               executionPolicy: 'Default',
               noProfile: true,
          })
     const grafanaPort = isWindows ? 4000 : 3000

     const preStartDockerCommands = [
          'docker network create --driver bridge grafana',
          'docker container stop grafana graphite push-statsd',
          'docker rm -f $(docker ps -a -q)',
          'docker volume rm $(docker volume ls -q)',
          'docker build --quiet -t pushstatsd .'
     ]

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
          `docker run -d --network grafana --name=grafana -p ${grafanaPort}:3000 -e "GF_AUTH_ANONYMOUS_ENABLED=true" grafana/grafana-oss:9.0.2-ubuntu`,
          `docker container run -p 8080:8080 -it -d --network grafana -e "isMMoDestination=${isMMoDestination}" --name push-statsd pushstatsd`,
          'docker network connect bridge grafana',
     ])
     for (let i = 0; i < commands.length; i++) {
          try {
               if (isWindows) await ps.invoke(commands[i])
               else execSync(commands[i], (err, stdout, stderr) => {})
          } catch (error) {
               console.log('NUMBER' + i, error)
          }
     }
     console.log('Pre setup done!')
     if (isWindows) ps.dispose()

     const grafanaUrl = 'http://localhost:' + grafanaPort
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
                    data: isMMoDestination ? mmoDashboard : privateDashboard,
               })
          } catch (err) {
               console.log(err)
          }
     }
     await sleep(30)
     await SetupDataSources()
     await SetupDashboard()
     console.log('Setup done!')
})()
