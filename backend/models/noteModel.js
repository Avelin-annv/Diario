const mongoose = require("mongoose");

const noteSchema = mongoose.Schema(
  {
    title: {
      type: String,
    },
    content: {
      type: String,
    },
    category: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true },
  {
    methods: {},
  }
);

const Note = mongoose.model("Note", noteSchema);
module.exports = Note;
