StructureTerminal.prototype.market = function() {

    var sellAll = false
    var orderBlacklist = []

    var hydrogenNeed = false
    var oxygenNeed = false

    if (this.room.name != "W17N54" && this.store[RESOURCE_HYDROGEN] >= 2500 && Game.rooms["W17N54"].terminal.store[RESOURCE_HYDROGEN] <= 25000) {

        hydrogenNeed = true

    }
    if (hydrogenNeed == true) {

        Game.rooms[this.room.name].terminal.send(RESOURCE_HYDROGEN, 25000, 'W17N54', 'Hydrogen');

    }
    if (this.room.name != "W17N54" && this.store[RESOURCE_OXYGEN] >= 2500 && Game.rooms["W17N54"].terminal.store[RESOURCE_OXYGEN] <= 25000) {

        oxygenNeed = true

    }
    if (oxygenNeed == true) {

        Game.rooms[this.room.name].terminal.send(RESOURCE_OXYGEN, 25000, 'W17N54', 'Oxygen');

    }
    _.forEach(Game.market.orders, order => {

        if (sellAll == true) {

            console.log("Terminal is deleting it all")
            Game.market.cancelOrder(order.id)

        } else {
            for (let resource in this.store) {

                if (order.remainingAmount == 0) {

                    console.log("Terminal " + this.room.name + " wants to delete order for:" + resource)
                    Game.market.cancelOrder(order.id)

                } else if (order.resourceType == resource) {


                    orderBlacklist.push(resource)
                    console.log("Terminal " + this.room.name + " has a market offer for: " + resource + ", " + (order.remainingAmount / 1000).toFixed(0) + "k")

                }
            }
        }
    })
    for (let resource in this.store) {
        if (orderBlacklist.indexOf(resource) == -1 && this.store[resource] >= 20000 && Object.keys(Game.market.orders).length < 300) {

            let resourceHistory = Game.market.getHistory(resource);
            let sellPrice = resourceHistory[0]["avgPrice"] * 0.6
            console.log("SP: " + sellPrice + ", " + resource);
            //console.log(orderBlacklist)

            console.log("Terminal " + this.room.name + " wants to make a sell order for: " + resource)
            Game.market.createOrder({ type: ORDER_SELL, resourceType: resource, price: sellPrice, totalAmount: 15000, roomName: this.room.name });

        }
    }

    let gameResources = ["XUH2O", "XUHO2", "XKH2O", "XKHO2", "XLH2O", "XLHO2", "XZH2O", "XZHO2", "XGH2O", "XGHO2", "UH2O", "UHO2", "KH2O", "KHO2", "LH2O", "LHO2", "ZH2O", "ZHO2", "GH2O", "GHO2", "UH", "UO", "KH", "KO", "LH", "LO", "ZH", "ZO", "GH", "GO", "OH", "ZK", "UL", "G", "OH", "ZK", "UL", "G", "H", "O", "U", "K", "L", "Z", "X"]

    let t3Boosts = ["XUH2O", "XUHO2", "XKH2O", "XKHO2", "XLH2O", "XLHO2", "XZH2O", "XZHO2", "XGH2O", "XGHO2"]
    let t2Boosts = ["UH2O", "UHO2", "KH2O", "KHO2", "LH2O", "LHO2", "ZH2O", "ZHO2", "GH2O", "GHO2"]
    let t1Boosts = ["UH", "UO", "KH", "KO", "LH", "LO", "ZH", "ZO", "GH", "GO"]
    let bases = ["OH", "ZK", "UL", "G"]
    let minerals = ["H", "O", "U", "K", "L", "Z", "X"]

    if (this.room.controller.level >= 7) {
        for (let resources of gameResources) {

            for (let resource of t3Boosts) {

                if (resources == resource && this.store.getUsedCapacity([resource]) < 5000) {

                    //console.log(resources)

                }
            }
            for (let resource of t2Boosts) {

                if (resources == resource && this.store.getUsedCapacity([resource]) < 3000) {

                    //console.log(resources)

                }
            }
            for (let resource of t1Boosts) {

                if (resources == resource && this.store.getUsedCapacity([resource]) < 2000) {

                    //console.log(resources)

                }
            }
            for (let resource of bases) {

                if (resources == resource && this.store.getUsedCapacity([resource]) < 5000) {

                    //console.log(resources)

                }
            }
            for (let resource of minerals) {

                let filteredMinerals = []

                if (resources == resource && this.store.getUsedCapacity([resources]) < 5000) {

                    filteredMinerals.push(resources)

                }

                for (let filteredResource of filteredMinerals) {

                    console.log(filteredResource + ", " + this.room.name)

                    let buyOrders = Game.market.getAllOrders(order => order.type == ORDER_SELL && order.resourceType == filteredResource && order.price < 1 && order.amount >= (6000 - this.store.getUsedCapacity([filteredResource])))

                    if (buyOrders[0]) {

                        console.log("Found order for: " + filteredResource + this.room + buyOrders[0]["id"])
                        Game.market.deal(buyOrders[0]["id"], 6000 - this.store.getUsedCapacity([filteredResource]), this.room.name)

                    }
                }
            }
        }
    }
};