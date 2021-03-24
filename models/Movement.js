const mongoose = require('mongoose');

//Defining Schema
// fields: movementCreatedAt, movementDescription, movementAmount, movementCategory
const MovementSchema = new mongoose.Schema({
    
    movementDescription: {
        type: String,
        trim: true, //removes initial and ending whitespace
        required: [true, 'Invalid Movement Description: Please add some text'] // [bool,error string message]
    },
    
    movementAmount: {
        type: Number,
        required: [true, 'Invalid Amount: Please type a positive or negative number -e.g: 1234.5 or -1234.5']
    },
    
    //TODO: category validation (finite list of Categories)
    movementCategory: {
        type: String,
        enum: ["Salary", "Services", "Extra Incomes"]
        //required:false as default
    },
    //by defining a default: Date.now it'll set the creation date automatically
    movementCreatedAt: {
        type: Date,
        default: Date.now
    }
    
})

module.exports = mongoose.model('Movement', MovementSchema); //modelName, modelSchema