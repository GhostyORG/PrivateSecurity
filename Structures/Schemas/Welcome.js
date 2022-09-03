const { model, Schema } = require("mongoose")

module.exports = model("welcome", new Schema({

    Guild: String,
    Channel: String
}))