const app = require("../server");
const chai = require("chai");
const chaiHttp = require("chai-http");
const mongoose = require("mongoose");
const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/TableReadyTest';
const MenuItem = require("../models/MenuItem");
const {expect} = chai;
chai.use(chaiHttp);

describe("Menu", () => {

  before(function (done) {
    mongoose.connect(url, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})
      .then(() => done())
      .catch((error) => done(error));
  });

  after(function (done) {
    mongoose.disconnect()
      .then(() => done())
      .catch((error) => done(error))
  });

  describe("POST ./menu", () => {
    before(done => {
      User.deleteMany({}, () => {});
      //create dummy user
      const user = new User({
        accountType: "Admin",
        username: "Mike",
        password: "12345",
        email: "goodcitizen@mail.com",
        tel: "6478828888",
        workFor: "abc123"
      });
      user.save();
      done()
    });

  });

  describe("Get ./users", () => {
    before(done => {
      User.deleteMany({}, () => {});
      //create dummy user
      const user1 = new User({
        accountType: "Admin",
        username: "Mike",
        password: "12345",
        email: "goodcitizen@mail.com",
        tel: "6478828888",
        workFor: "abc123"
      });

      const user2 = new User({
        accountType: "SuperAdmin",
        username: "Juliet",
        password: "12345",
        email: "goodcitizen2@mail.com",
        tel: "6478828888",
        workFor: ""
      });

      user1.save();
      user2.save().then(()=>done());
    });

    it("get normal user info", (done) => {
      chai.request(app).post('/api/users/login').send({
        username: "Mike",
        password: "12345"
      }).then((res) => {
        expect(res).to.have.status(200);
        chai.request(app).get("/api/users/auth").set('x-auth-token', res.body.token)
          .then((res) => {
            // console.log(res);
            expect(res).to.have.status(200);
            expect(res.body.username).to.equals("Mike");
            done();
          });
      });
    });

    describe("get specific test as super admin", () => {
      let Mike_id = "";

      before(done => {
        User.find({username: "Mike"}).then((users) => {
          Mike_id = users[0]._id;
          done()
        });
      });

      it("get user info as super admin", (done) => {
        chai.request(app).post('/api/users/login').send({
          username: "Juliet",
          password: "12345"
        }).then((res) => {
          expect(res).to.have.status(200);
          chai.request(app).get("/api/users/auth/"+ Mike_id).set('x-auth-token', res.body.token)
            .then((response) => {
              expect(response).to.have.status(200);
              expect(response.body.username).to.equals("Mike");
              done();
            });
        });
      });
    });

    describe("get specific test not as super admin with error", () => {
      let Juliet_id = "";

      before(done => {
        User.find({username: "Juliet"}).then((users) => {
          Juliet_id = users[0]._id;
          done()
        })
      });

      it("get other users info with error", (done) => {
        chai.request(app).post('/api/users/login').send({
          username: "Mike",
          password: "12345"
        }).then((res) => {
          expect(res).to.have.status(200);
          chai.request(app).get("/api/users/auth/"+ Juliet_id).set('x-auth-token', res.body.token)
            .then((response) => {
              // console.log(res);
              expect(response).to.have.status(401);
              expect(response.text).to.equals('NOT AUTHORIZED!!');
              done();
            });
        });
      });

    });

    it("get all users", (done) => {
      chai.request(app).get("/api/users/").then((res) => {
        expect(res.body).lengthOf(2);
        done()
      })
    });

  });

  describe("Delete ./users", () => {
    let Mike_id = "";
    before((done) => {
      User.deleteMany({}, () => {});
      //create dummy user
      const user1 = new User({
        accountType: "Admin",
        username: "Mike",
        password: "12345",
        email: "goodcitizen@mail.com",
        tel: "6478828888",
        workFor: "abc123"
      });
      user1.save().then(() => done());
    });

    describe("get user id then delete", () => {
      before((done) => {
        User.find({username: "Mike"}).then((users) => {
          Mike_id = users[0]._id;
          done();
        })
      });

      it("delete user by id", (done) => {
        chai.request(app).delete("/api/users/" + Mike_id)
          .then(res => {
            expect(res).to.have.status(200);
            expect(res.body.message).to.equals('User '+ Mike_id + ' deleted.');
            done();
          })
      });

      it("delete user with non existed id", (done) => {
        chai.request(app).delete("/api/users/" + "random_id")
          .then(res => {
            // console.log(res.body);
            expect(res).to.have.status(400);
            expect(res.body).to.equals("Error: CastError: Cast to ObjectId failed " +
              "for value \"random_id\" at path \"_id\" for model \"User\"");
            done();
          })
      });

    });


  });

  describe("PATCH ./users", () => {
    before((done) => {
      User.deleteMany({}, () => {});
      //create dummy user
      const user1 = new User({
        accountType: "Admin",
        username: "Mike",
        password: "12345",
        email: "goodcitizen@mail.com",
        tel: "6478828888",
        workFor: "abc123"
      });
      user1.save().then(() => done());
    });

    describe("get user id and then change info", () => {
      let Mike_id = "";
      before((done) => {
        User.find({username: "Mike"}).then((users) => {
          Mike_id = users[0]._id;
          done();
        })
      });

      it("change setting of the user", (done) => {
        chai.request(app).patch("/api/users/setting/" + Mike_id).send({
          email: "changed@mail.com",
          tel: "123",
          old_password: "12345",
          new_password: "changed"
        }).then(res => {
          expect(res).to.have.status(200);
          expect(res.body.email).to.equals("changed@mail.com");
          done()
        })
      });

      it("change setting error with incorrect password", (done) => {
        chai.request(app).patch("/api/users/setting/" + Mike_id).send({
          email: "changed@mail.com",
          tel: "123",
          old_password: "1234",
          new_password: "changed2"
        }).then(res => {
          expect(res).to.have.status(400);
          expect(res.text).to.equals('Password incorrect');
          done()
        })
      });

      it("change avatar", (done) => {
        chai.request(app).patch("/api/users/change-avatar/" + Mike_id)
          .then(res => {
            expect(res).to.have.status(200);
            expect(res.text).to.equals('avatar updated');
            done()
          })
      });

    });

  });

  describe("PUT ./users", () =>{
    before((done) => {
      User.deleteMany({}, () => {});
      //create dummy user
      const user1 = new User({
        accountType: "Admin",
        username: "Mike",
        password: "12345",
        email: "goodcitizen@mail.com",
        tel: "6478828888",
        workFor: "abc123"
      });
      user1.save().then(() => done());
    });
    describe("get user id and then change info", () => {
      let Mike_id = "";
      before((done) => {
        User.find({username: "Mike"}).then((users) => {
          Mike_id = users[0]._id;
          done();
        })
      });

      it("update changes", done => {
        chai.request(app).put("/api/users/get/"+ Mike_id).then((res) => {
          // console.log(res);
          expect(res).to.have.status(200);
          done()
        })
      });
    })

  });

});
