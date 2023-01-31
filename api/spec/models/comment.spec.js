const mongoose = require("mongoose");

require("../mongodb_helper");
const Comment = require("../../models/comment");

describe("Comment model", () => {
  beforeEach((done) => {
    mongoose.connection.collections.comments.drop(() => {
      done();
    });
  });

  it("should create a new comment", () => {
    const comment = new Comment({
      message: "This is a test comment",
      author: "5f2e2a6f7b9d5c3b8a9e3f3d",
      image: "imageUrlhere",
      post_id: "5f2e2a6f7b9d5c3b8a9e3f4d",
    });

    expect(comment.message).toEqual("This is a test comment");
    expect(String(comment.author)).toEqual("5f2e2a6f7b9d5c3b8a9e3f3d");
    expect(comment.image).toEqual("imageUrlhere");
    expect(String(comment.post_id)).toEqual("5f2e2a6f7b9d5c3b8a9e3f4d");
  });

  it("should not create a new comment without required fields", async () => {
    const comment = new Comment({ message: "This is a test comment" });

    try {
      await comment.save();
    } catch (err) {
      expect(err.message).toEqual(
        "Comment validation failed: post_id: Path `post_id` is required., author: Path `author` is required."
      );
    }
  });

  it("can list all comments", async () => {
    await Comment.find((err, comments) => {
      expect(err).toBeNull();
      expect(comments).toEqual([]);
    });
  });
});
