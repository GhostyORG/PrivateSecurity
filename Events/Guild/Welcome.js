const {
    Client,
    GuildMember,
    EmbedBuilder
} = require("discord.js")
const DB = require("../../Structures/Schemas/Welcome")

module.exports = {
    name: "guildMemberAdd",

    /**
     * @param {GuildMember} member
     * @param {Client} client
     */
    async execute(member, client) {
        const {
            user,
            guild
        } = member

        const Data = await DB.findOne({
            Guild: guild.id
        }).catch(err => {})
        if (!Data) return

        const Message = `Hey ${user}, welcome to **${guild.name}**!`

        if (Data.Channel !== null) {
            const Channel = guild.channels.cache.get(Data.Channel)
            if (!Channel) return

            const Embed = new EmbedBuilder()
                .setColor(client.color)
                .setAuthor({ name: user.tag, iconURL: user.displayAvatarURL()})
                .setDescription(`Welcome ${member} to the server!\n\nAccount Created: <t:${parseInt(user.createdTimestamp / 1000)}:R>\nMember Count: \`${guild.memberCount}\``)
                .setThumbnail(user.displayAvatarURL())
                .setFooter({ text: "Welcome!"})
                .setTimestamp()

            Channel.send({ content: `${Message}`, embeds: [Embed]})
        }
    }
}