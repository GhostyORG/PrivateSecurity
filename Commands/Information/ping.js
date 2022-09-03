const { Client, ChatInputCommandInteraction } = require("discord.js")
const Reply = require("../../Systems/Reply")

module.exports = {
    name: "ping",
    description: "Displays the bot ping.",
    category: "Information",

    /**
     * @param {Client} client
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction, client) {

        return Reply(interaction, `The current Websocket latency is : \`${client.ws.ping} ms\``, false)
    }
}