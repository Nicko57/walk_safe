// const app = require("../../app");
// const request = require("supertest");
// require("../mongodb_helper");
// const User = require("../../models/user");
// const mongoose = require("mongoose");

// describe("/tokens", () => {
//   beforeEach(async () => {
//     await User.deleteMany({});

//     const name = "Will Jones";
//     const email = "bill@bill.com";
//     const password = "ABCabc123!";
//     const profilePicture = "url";
//     const coverPicture = "url";

//     await User.signup(name, email, password, profilePicture, coverPicture);
//   });

//   test("a token is returned when creds are valid", async () => {
//     let response = await request(app)
//       .post("/tokens")
//       .send({ email: "bill@bill.com", password: "ABCabc123!" });
//     expect(response.status).toEqual(201);
//     expect(response.body.token).not.toEqual(undefined);
//     expect(response.body.message).toEqual("OK");
//   });

//   test("a token is not returned when creds are invalid", async () => {
//     let response = await request(app)
//       .post("/tokens")
//       .send({ email: "bill@bill.com", password: "1234" });
//     expect(response.status).toEqual(400);
//     expect(response.body.token).toEqual(undefined);
//     expect(response.body.message).toEqual("Incorrect password");
//   });
// });
