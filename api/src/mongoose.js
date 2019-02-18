import mongoose from 'mongoose'

function initMongoose() {
    mongoose.connect('mongodb://localhost:27017/ssui', {useNewUrlParser: true});
}

export default initMongoose;