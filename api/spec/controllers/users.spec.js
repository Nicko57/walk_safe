const app = require("../../server");
const request = require("supertest");
const User = require('../../models/userModel');
require("../mongodb_helper");

describe("/users", () => {
  beforeEach( async () => {
    await User.deleteMany({});
  });

  describe("POST, when name, email and password are provided", () => {
    test("the response code is 201", async () => {
      let response = await request(app)
        .post("/api/user/signup")
        .send({name: 'poppy', email: "poppy@email.com", password: "passwordQ123!"})
      expect(response.statusCode).toBe(200)
    })

    test("a user is created", async () => {
      await request(app)
        .post("/api/user/signup")
        .send({name: 'scarlett', email: "scarlett@email.com", password: "passwordQ123!"})
      let users = await User.find()
      let newUser = users[users.length - 1]
      expect(newUser.email).toEqual("scarlett@email.com")
    })
  })

  describe("POST, when password is missing", () => {
    test("response code is 400", async () => {
      let response = await request(app)
        .post("/api/user/signup")
        .send({name: 'skye', email: "skye@email.com"})
      expect(response.statusCode).toBe(400)
    });

    test("does not create a user", async () => {
      await request(app)
        .post("/api/user/signup")
        .send({name: 'skye', email: "skye@email.com"})
        let users = await User.find()
        expect(users.length).toEqual(0)
    });
  })
  
  describe("POST, when email is missing", () => {
    test("response code is 400", async () => {
      let response = await request(app)
        .post("/api/user/signup")
        .send({name: 'skye', password: "passwordQWERT123!"})
      expect(response.statusCode).toBe(400)
    });

    test("does not create a user", async () => {
      await request(app)
        .post("/api/user/signup")
        .send({name: 'skye', password: "passwordQWERT123!"})
      let users = await User.find()
      expect(users.length).toEqual(0)
    });
  })

  describe("POST, when name is missing", () => {
    test("response code is 400", async () => {
      let response = await request(app)
        .post("/api/user/signup")
        .send({email: 'skye@skye.com', password: "passwordQWERT123!"})
      expect(response.statusCode).toBe(400)
    });

    test("does not create a user", async () => {
      await request(app)
        .post("/api/user/signup")
        .send({email: 'skye@skye.com', password: "passwordQWERT123!"})
      let users = await User.find()
      expect(users.length).toEqual(0)
    });
  })
})