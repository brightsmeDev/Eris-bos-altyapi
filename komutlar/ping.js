
const Eris = require('eris');

module.exports = {
    config:{
        nameID: "ping",
        aliases: new Array('pong'),
        description: "ping pong"
    },
    async execute(client, msg, args) {
        msg.channel.createMessage(`${client.shards.get(0).latency}ms`)
    }
}