const User = require("../../models/userModel");
require("../mongodb_helper");

describe("User model", () => {
  beforeEach( async () => {
    await User.deleteMany({});
  });

  it("has an email address", () => {
    const user = new User({
      name: "Will Jones",
      email: "someone@example.com",
      password: "ABCabc123!",
    });
    expect(user.email).toEqual("someone@example.com");
  });

  it("has a password", () => {
    const user = new User({
      name: "Will Jones",
      email: "someone@example.com",
      password: "ABCabc123!",
    });
    expect(user.password).toEqual("ABCabc123!");
  });

  it("can list all users", (done) => {
    User.find((err, users) => {
      expect(err).toBeNull();
      expect(users).toEqual([]);
      done();
    });
  });

  it("can save a user", (done) => {
    const user = new User({
      name: "Will Jones",
      email: "someone@example.com",
      password: "password",
    });

    user.save((err) => {
      expect(err).toBeNull();

      User.find((err, users) => {
        expect(err).toBeNull();

        expect(users[0]).toMatchObject({
          name: "Will Jones",
          email: "someone@example.com",
          password: "password",
        });
        done();
      });
    });
  });

  describe("signup static method", () => {
    it("should throw an error if all fields are not filled", async () => {
      try {
        await User.signup("John Doe", "johndoe@example.com");
      } catch (err) {
        expect(err).toEqual(Error("All fields must be filled"));
      }
    });

    it("should throw an error if email is not valid", async () => {
      try {
        await User.signup(
          "John Doe",
          "johndoe@example",
          "ABCabc123!",
        );
      } catch (err) {
        expect(err).toEqual(Error("Email is not valid"));
      }
    });

    it("should throw an error if an email is already in use", async () => {
      await User.signup(
        "Will Jones",
        "will@will.com",
        "ABCabc123!",
      );
      try {
        await User.signup(
          "John Doe",
          "will@will.com",
          "ABCabc123!",
        );
      } catch (err) {
        expect(err).toEqual(Error("Email already in use"));
      }
    });

    it("should throw an error if the password is too weak", async () => {
      try {
        await User.signup("Will Jones", "will@will.com", "1234");
      } catch (err) {
        expect(err).toEqual(
          Error(
            "Password not strong enough"
          )
        );
      }
    });

    it("should return the user if no errors thrown", async () => {
      const user = await User.signup(
        "Will Jones",
        "will@will.com",
        "ABCabc123!"
      );

      expect(user).not.toBeNull();
      expect(user).toHaveProperty("name", "Will Jones");
    });
  });

  describe("login static method", () => {
    it("should throw an error if all fields are not filled", async () => {
      try {
        await User.login("johndoe@example.com");
      } catch (err) {
        expect(err).toEqual(Error("All fields must be filled"));
      }
    });

    it("should throw an error if invalid email", async () => {
      await User.signup("Will Jones", "will@will.com", "ABCabc123!");
      try {
        await User.login("bob@bob.com", "1234");
      } catch (err) {
        expect(err).toEqual(Error("Incorrect email"));
      }
    });

    it("should throw an error if invalid password", async () => {
      await User.signup("Will Jones", "will@will.com", "ABCabc123!");
      try {
        await User.login("will@will.com", "1234");
      } catch (err) {
        expect(err).toEqual(Error("Incorrect password"));
      }
    });

    it("should return the user if no errors thrown", async () => {
      await User.signup("Will Jones", "will@will.com", "ABCabc123!");
      const user = await User.login("will@will.com", "ABCabc123!");

      expect(user).not.toBeNull();
      expect(user).toHaveProperty("name", "Will Jones");
    });
  });
});
