const {Schema, model} = require("mongoose")

const lastCountSchema = new Schema({
    value:Number
}, {timestamps:true})

const lastCount = model("lastCount", lastCountSchema)

module.exports = lastCount