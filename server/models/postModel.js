import mongoose from "mongoose"

// Helper untuk membersihkan HTML
const stripHtml = (html = "") => html.replace(/<[^>]+>/g, "").trim()

// Definisi schema Post
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    excerpt: {
        type: String,
    },
    coverImage: {
        type: String,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, { timestamps: true })

// Hook sebelum save/update agar auto generate excerpt
postSchema.pre("save", function (next) {
    if (!this.excerpt && this.content) {
        this.excerpt = stripHtml(this.content).slice(0, 200)
    } else if (this.excerpt) {
        this.excerpt = stripHtml(this.excerpt).slice(0, 200)
    }

    next()
})

export default mongoose.model("Post", postSchema)