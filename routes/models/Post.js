const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Creating the Post Schema
const PostSchema = new Schema({
    user: {
        type: Schema.Type.ObjectId,
        ref: 'users'
    },
    text: {
        type: String,
        required: true
    },
    name: {
        type: String
    },
    avatar: {
        type: String
    },
    likes: [    // keep track of which users have liked a post so no one can like more than once
        {
            user: {
                type: Schema.Type.ObjectId,
                ref: 'users'
            }
        }
    ],
    comments: [
        {
            user: {
                type: Schema.Type.ObjectId,
                ref: 'users'
            },
            text: {
                type: String,
                required: true
            },
            name: {
                type: String
            },
            avatar: {
                type: String
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }

});

module.exports = Post = mongoose.model('post', PostSchema);    // (name we wanna use, the schema);