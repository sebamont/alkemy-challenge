//When upgrading mongoose to ^5.11.16  we get an avoidable warning: Ref: https://github.com/Automattic/mongoose/issues/9900#issuecomment-778535254
const mongoose = require('mongoose');
const colors = require('colors')


const connectCloudMongoDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGODB_CLOUD_URI, 
            {
                //Avoid deprecation warnings. Ref: https://mongoosejs.com/docs/deprecations.html
                useNewUrlParser: true,
                useCreateIndex: true,
                useUnifiedTopology: true,
                useFindAndModify: false
            })
        console.log(`Conection success, connected to: ${connection.connection.host}`.cyan);
    } catch (err) {
        console.log(`Connection Failed: Detailed error: ${err}`.red);
        //exiting Node process in case of error.
        process.exit(1);
    }
}

module.exports = connectCloudMongoDB;