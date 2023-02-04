const mongoose = require("mongoose");
const eventSchema = new mongoose.Schema({
    titre: String,
    nbre_participant: Number,
    description: String,
    date_Event: Date,
    image_Event: String,
},{
    timestamps: true
});
const event = mongoose.model("event", eventSchema);
module.exports = event;