function config() {

    if (!Memory.data) {

        Memory.data = {}
    }

    // Creep data

    Memory.data.mineralsHarvested = 0

    Memory.data.boostsProduced = 0

    Memory.data.powerHarvested = 0

    Memory.data.powerProcessed = 0

    Memory.data.commoditiesHarvested = 0

    Memory.data.energyHarvested = 0

    Memory.data.controlPoints = 0

    Memory.data.energySpentOnConstruction = 0

    Memory.data.energySpentOnRepairs = 0

    Memory.data.energySpentOnBarricades = 0

    // Other data

    Memory.data.timeSpentSpawning = 0

    Memory.data.energySpentOnCreeps = 0

    Memory.data.energySpentOnPower = 0

    Memory.data.opsGenerated = 0

    Memory.data.cpuPerCreep = 0

    Memory.data.roomManager = {}

    // Global

    if (!Memory.global) Memory.global = {}

    Memory.global.communes = []

    Memory.global.totalEnergy = 0

    if (Memory.global == false || !Memory.global) {

        Memory.global = {}
    }

    Memory.global.establishedRooms = []

    if (Memory.global.hasBoosts == false || !Memory.global.hasBoosts) {

        Memory.global.hasBoosts = 0
    }

    Memory.global.needsEnergy = []
}

module.exports = config