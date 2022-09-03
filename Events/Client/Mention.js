const {
    Client,
    Message,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    ActionRow,
} = require("discord.js")
const ms = require("ms")

module.exports = {
    name: "messageCreate",

    /**
     * @param {Message} message
     * @param {Client} client 
     */
    async execute(message, client) {
        const {
            author,
            guild,
            content
        } = message
        const {
            user
        } = client

        if (!guild || author.bot) return
        if (content.includes("@here") || content.includes("@everyone")) return
        if (!content.includes(user.id)) return

        return message.reply({
            embeds: [
                new EmbedBuilder()
                .setColor(client.color)
                .setAuthor({
                    name: user.username,
                    iconURL: user.displayAvatarURL()
                })
                .setDescription(`Hey, you called me? Im totally a human. \`/\` & click on my logo to see all my commands!\n\n*This message will be deleted within \`10 seconds\`!*`)
                .setThumbnail(user.displayAvatarURL())
                .setFooter({
                    text: "Introducing a bot!"
                })
                .setTimestamp()
            ],
            components: [
                new ActionRowBuilder().addComponents(

                    new ButtonBuilder()
                    .setStyle(ButtonStyle.Link)
                    .setURL("https://discord.gg/lost-paradise")
                    .setLabel("Join the server!")
                )
            ],

            components: [
                new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                    .setStyle(ButtonStyle.Link)
                    .setURL("https://discord.gg/")
                    .setLabel("Admin Dashboard (COMING SOON)")
                )
            ]
        }).then(msg => {
            setTimeout(() => {
                msg.delete().catch(err => {
                    if (err.code !== 1008) return console.log(err)
                })
            }, ms("10s"))
        })
    }
}