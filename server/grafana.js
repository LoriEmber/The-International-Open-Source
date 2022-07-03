const axios = require('axios').default

;(async function () {
     async function SetupDataSources() {
               const result = await axios({
                    url: 'http://localhost:3000/api/datasources',
                    method: 'post',
                    auth: {
                         username: 'admin',
                         password: 'admin',
                    },
                    data:{
                        "name": "Graphite",
                        "type": "graphite",
                        "url": "http://graphite:8080",
                        "access": "proxy",
                    }

               })
               console.log(result)
     }
     await SetupDataSources()
})()
