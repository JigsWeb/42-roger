import mongoose from 'mongoose'

const Queries = mongoose.model('Queries', {
    name: String,
    outputType: {
        type: String,
        enum: ['array', 'object']
    },
    shellType: {
        type: String,
        enum: ['command', 'script']
    },
    data: {
        command: String,
        values: [],
        last_values: []
    },
    interval: Number,
    size: Number,
    height: Number,
    page: String,
});

export default Queries;