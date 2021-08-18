let roomVariables = require("roomVariables")
var roleUpgrader = require('role.upgrader')

function builderManager(room, builders) {

    const anchorPoint = room.memory.anchorPoint

    if (!anchorPoint) return

    let mySites = room.get("mySites")

    let targetSite = findObjectWithId(room.memory.targetSite)

    if (!targetSite && mySites.length > 0) {

        if (builders.length == 1) {


            targetSite = builders[0].pos.findClosestByRange(mySites)
            room.memory.targetSite = targetSite.id

        } else {

            targetSite = room.memory.targetSite = new RoomPosition(anchorPoint.x, anchorPoint.y, anchorPoint.roomName).findClosestByRange(mySites)
            room.memory.targetSite = targetSite.id
        }
    }

    if (mySites.length == 0) {

        for (let creep of builders) {

            roleUpgrader.run(creep)
            return
        }
    }

    if (!targetSite) return

    room.visual.text("🚧", targetSite.pos.x, targetSite.pos.y + 0.25, { align: 'center' })

    for (let creep of builders) {

        creep.isFull()
        const isFull = creep.memory.isFull

        if (isFull) {

            creep.say("🚧")

            creep.constructionBuild(targetSite)

        } else {

            let terminal = creep.room.terminal

            if (terminal && terminal.store[RESOURCE_ENERGY] >= 30000) {

                creep.say("T")

                creep.advancedWithdraw(terminal)
            } else {

                let storage = creep.room.storage

                if (storage) {

                    creep.say("S")

                    let target = storage

                    if (target.store[RESOURCE_ENERGY] >= 35000) {

                        creep.advancedWithdraw(target)
                    }
                } else {

                    creep.searchSourceContainers()

                    if (creep.container != null && creep.container) {

                        creep.say("SC")

                        creep.advancedWithdraw(creep.container)
                    } else {

                        let droppedResources = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES, {
                            filter: (s) => s.resourceType == RESOURCE_ENERGY && s.energy >= creep.store.getCapacity() * 0.5
                        });

                        if (droppedResources) {

                            creep.say("💡")

                            creep.pickupDroppedEnergy(droppedResources)
                        }
                    }
                }
            }
        }

        creep.avoidHostiles()
    }
}

module.exports = builderManager