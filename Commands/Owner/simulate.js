const { Client, ChatInputCommandInteraction } = require("discord.js")
const editReply = require("../../Systems/Reply")

module.exports = {
    name: "simulate",
    description: "OWNER COMMAND!",
    UserPerms: ["Administrator"],
    BotPerms: ["Administrator"],
    category: "Owner",
    options: [
        {
            name: "options",
            description: "Choose an option",
            type: 3,
            required: true,
            choices: [
                {
                    name: "Join",
                    value: "join"
                },
                {
                    name: "Leave",
                    value: "leave"
                },
            ],
        }
    ],

    /**
     * @param {Client} client
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction, client) {
        await interaction.deferReply({ ephemeral: true })
        
        const { options, user, member } = interaction

        const Options = options.getString("options")

        if(user.id !== "719660045817872394") return editReply(interaction, ":x:", `This command is classified.`)

        switch (Options) {
            case "join":{
                editReply(interaction, "✅", "Simulated Join Event")

                client.emit("guildMemberAdd", member)
            }
                break;

                case "leave":{
                    editReply(interaction, "✅", "Simulated Leave Event")
    
                    client.emit("guildMemberRemove", member)
                }
                    break;
        }
        
    }
}