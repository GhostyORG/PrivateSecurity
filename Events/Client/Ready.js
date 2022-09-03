const {
    Client,
    ActivityType
} = require("discord.js")
const ms = require("ms")
const mongoose = require("mongoose")
const mongodbURL = process.env.MONGODBURL

module.exports = {
    name: "ready",

    /**
     * @param {Client} client 
     */
    async execute(client) {
        const {
            user,
            ws
        } = client

        console.log(`Logged into: ${client.user.tag}.`)

        setInterval(() => {

            const ping = ws.ping

            user.setActivity({
                name: `Ping: ${ping} ms`,
                type: 3
            })
        }, ms("5s"))

        if (!mongodbURL) return

        mongoose.connect(mongodbURL, {


            useNewUrlParser: true,
            useUnifiedtopology: true
        }).then(() => {
            console.log("Connected to the database.")
        }).catch(err => console.log(err))
    }
}