const app = require("../server");
const chai = require("chai");
const chaiHttp = require("chai-http");
const mongoose = require("mongoose");
const url = 'mongodb://localhost:27017/TableReadyTest';
const MenuItem = require("../models/MenuItem");
const Restaurant = require("../models/restaurant.js");
const {expect} = chai;
chai.use(chaiHttp);

describe("Menu", () => {

  before(function (done) {
    mongoose.connect(url, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})
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
      MenuItem.deleteMany({}, () => {
      });

      const test_restaurant = new Restaurant({
        name: "TasteGoodRestaurant",
        phoneNumber: "6778928837",
        location: "Mars",
        cuisine: "Sushi",
        hours: "8am-11pm",
        tables: 3,
        owner: "Mike"
      });

      test_restaurant.save().then(() => {
        done()
      })
    });

    describe("find restaurant id then find menu", () => {
      let rest_id = "";
      before(done => {
        Restaurant.find({name: "TasteGoodRestaurant"}).then(restaurants => {
          rest_id = restaurants[0]._id;
          done()
        })
      });

      it("create a new menu item", done => {
        chai.request(app).post("/api/menu/newMenuItem").send({
          name: "Takoyaki",
          price: 100,
          ingredients: "apple",
          calories: 2,
          restaurant: rest_id
        }).then(res => {
          expect(res).to.have.status(200);
          expect(res.text).to.equals('menuItem Takoyaki saved to database');
          done()
        })
      });

      it("findMenuByRestaurant", done => {
        chai.request(app).post("/api/menu/findMenuByRestaurant").send({
          restaurant_id: rest_id
        }).then(res => {
          // console.log(res);
          expect(res).to.have.status(200);
          expect(res.body).to.have.lengthOf(1);
          done()
        })
      });
    });

  });

  describe("Delete ./menu", () => {
    before((done) => {
      MenuItem.deleteMany({}, () => {
      });

      const menu = new MenuItem({
        name: "Takoyaki",
        price: 100,
        ingredients: "apple",
        calories: 2,
        restaurant: "dummy"
      });
      menu.save().then(() => done());
    });
    describe("get menu id then delete", () => {
      let menu_id = "";
      before(done => {
        MenuItem.find({}).then(menus => {
          menu_id = menus[0]._id;
          done()
        })
      });

      it("delete menu", done => {
        chai.request(app).delete("/api/menu/deleteMenuItem/" + menu_id)
          .then(res => {
            // console.log(res);
            expect(res).to.have.status(200);
            expect(res.body.name).to.equals("Takoyaki");
            done()
          })
      })
    });

  });

  describe("PATCH ./users", () => {
    before((done) => {
      MenuItem.deleteMany({}, () => {
      });

      const menu = new MenuItem({
        name: "Takoyaki",
        price: 100,
        ingredients: "apple",
        calories: 2,
        restaurant: "dummy"
      });
      menu.save().then(() => done());
    });

    describe("get menu id then update", () => {
      let menu_id = "";
      before(done => {
        MenuItem.find({}).then(menus => {
          menu_id = menus[0]._id;
          done()
        })
      });

      it("update menu", done => {
        chai.request(app).patch("/api/menu/" + menu_id)
          .send({
            image: "updated"
          })
          .then(res => {
            expect(res).to.have.status(200);
            expect(res.body.image).to.equals("updated");
            done()
          })
      })
    });

  });

  describe("PUT ./menu", () => {
    before((done) => {
      MenuItem.deleteMany({}, () => {
      });
      const menu = new MenuItem({
        name: "Takoyaki",
        price: 100,
        ingredients: "apple",
        calories: 2,
        restaurant: "dummy"
      });
      menu.save().then(() => done());
    });
    describe("get menu id then put", () => {
      let menu_id = "";
      before(done => {
        MenuItem.find({}).then(menus => {
          menu_id = menus[0]._id;
          done()
        })
      });

      it("put menu", done => {
        chai.request(app).put("/api/menu/EditMenuItem")
          .send({
            id: menu_id,
            name: "burger",
            price: 1,
            ingredients: "nothing",
            calories: 2
          })
          .then(res => {
            expect(res).to.have.status(200);
            expect(res.body.name).to.equals("burger");
            done()
          })
      })
    });
  });

});
