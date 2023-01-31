var mongoose = require("mongoose");

require("../mongodb_helper");
var Post = require("../../models/post");

describe("Post model", () => {
  beforeEach((done) => {
    mongoose.connection.collections.posts.drop(() => {
      done();
    });
  });

  it("has a message", () => {
    var post = new Post({
      message: "some message",
      author: "63cbb81a0854a74d7485f449",
    });
    expect(post.message).toEqual("some message");
  });

  it("can list all posts", (done) => {
    Post.find((err, posts) => {
      expect(err).toBeNull();
      expect(posts).toEqual([]);
      done();
    });
  });

  it("can save a post", (done) => {
    var post = new Post({
      message: "some message",
      author: "63cbb81a0854a74d7485f449",
    });

    post.save((err) => {
      expect(err).toBeNull();

      Post.find((err, posts) => {
        expect(err).toBeNull();

        expect(posts[0].message).toEqual("some message");
        expect(String(posts[0].author)).toEqual("63cbb81a0854a74d7485f449");
        expect(posts[0].comments.constructor.name).toBe("CoreMongooseArray");
        expect(posts[0].likes.constructor.name).toBe("CoreMongooseArray");
        expect(posts[0].likeCount).toEqual(0);
        done();
      });
    });
  });
});
