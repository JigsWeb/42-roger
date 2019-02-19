import mongoose from 'mongoose'

const Pages = mongoose.model('Pages', {
    slug: String,
    name: String
})

export default Pages;