import mongoose from 'mongoose';

// Bunlar birer post modelidir.

const postSchema = mongoose.Schema({
    title: String,
    subtitle: String,
    content: String,
    tag: String,
    image: String,
}, {
    timestamps: true,
});

const Post = mongoose.model("Post", postSchema);

export default Post;