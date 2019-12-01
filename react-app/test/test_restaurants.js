const app = require("../server");
const chai = require("chai");
const chaiHttp = require("chai-http");
const mongoose = require("mongoose");
const url = 'mongodb://localhost:27017/TableReadyTest';
const Restaurant = require("../models/restaurant.js");
const Table = require("../models/table");
const {expect} = chai;
chai.use(chaiHttp);

describe("Restaurant", () => {

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

  describe("POST ./restaurants", () => {
    before(done => {
      Restaurant.deleteMany({}, () => {
      });
      const test_table = new Table({
        rest_id: "test_restaurant_id",
      });
      test_table.save().then(() => {
        done()
      })
    });

    after(done => {
      Restaurant.deleteMany({}, () => {
        done()
      });
    });

    it("create new restaurant", done => {
      chai.request(app).post("/api/restaurants/newRestaurant").send({
        name: "TasteGoodRestaurant",
        phoneNumber: "6778928837",
        location: "Mars",
        cuisine: "Sushi",
        hours: "8am-11pm",
        owner: "Mike",
        tables: 3
      }).then(res => {
        // console.log(res);
        expect(res).to.have.status(200);
        expect(res.text).to.equals('restaurant TasteGoodRestaurant saved to database');
        done()
      }).catch((err) => {
        done(err)
      })
    });

    it("create restaurant without owner", done => {
      chai.request(app).post("/api/restaurants/newRestaurant").send({
        name: "TasteGoodRestaurants",
        phoneNumber: "6778928837",
        location: "Mars",
        cuisine: "Sushi",
        hours: "8am-11pm",
        tables: 3
      }).then(res => {
        // console.log(res);
        expect(res).to.have.status(404);
        expect(res.body).to.have.property("err");
        done()
      }).catch((err) => {
        done(err)
      })
    });

    it("create new table", done => {
      chai.request(app).post("/api/restaurants/newTable").send({
        restaurant_id: "test_restaurant_id"
      }).then(res => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("_id");
        done()
      })
    });

    describe("get table id then test update", () => {
      let table_id = "";
      before(done => {
        Table.find({rest_id: "test_restaurant_id"}).then(tables => {
          table_id = tables[0]._id;
          done()
        })
      });

      it("update table", done => {
        chai.request(app).post("/api/restaurants/updateTable").send({
          _id: table_id,
          tableNum: 10,
          name: "updated_table"
        }).then(res => {
          // console.log(res);
          expect(res).to.have.status(200);
          expect(res.body.table_capacity).to.equals(10);
          expect(res.body.name).to.equals("updated_table");
          done()
        })
      });
    });

    describe("get restaurant id then test update", () => {
      let restaurant_id = "";
      before(done => {
        Restaurant.find({name: "TasteGoodRestaurant"}).then(restaurants => {
          restaurant_id = restaurants[0]._id;
          done()
        })
      });
      it("update restaurant", done => {
        chai.request(app).post("/api/restaurants/updateRestaurant").send({
          _id: restaurant_id,
          name: "updated name",
          phoneNumber: "12345",
          location: "Mercury",
          cuisine: "Burger",
          operationHour: "Not Open"
        }).then(res => {
          expect(res).to.have.status(200);
          expect(res.text).to.equals('restaurant TasteGoodRestaurant updated to database');
          done()
        });
      });

      it("update dress code for restaurant", done => {
        chai.request(app).post("/api/restaurants/updateDressCode").send({
          _id: restaurant_id,
          dressCode: "updated_dresscode"
        }).then(res => {
          expect(res).to.have.status(200);
          expect(res.body.name).to.equals("updated name");
          done()
        })
      });

      it("find restaurant", done => {
        chai.request(app).post("/api/restaurants/findRestaurant").send({
          _id: restaurant_id
        }).then((res) => {
          // console.log(res);
          expect(res).to.have.status(200);
          expect(res.body).to.have.lengthOf(2);
          done()
        })
      });

      it("find restaurant by id", done => {
        chai.request(app).post("/api/restaurants/findRestaurantById").send({
          _id: restaurant_id
        }).then(res => {
          expect(res).to.have.status(200);
          expect(res.body.name).to.equals("updated name");
          done()
        });
      });

    });

    it("find restaurants by owner", done => {
      chai.request(app).post("/api/restaurants/findRestaurantByOwner").send({
        owner: "Mike"
      }).then(res => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.lengthOf(1);
        done()
      })
    });


  });

  describe("Get ./restaurants", () => {
    before(done => {
      Restaurant.deleteMany({}, () => {
      });
      const test_restaurant = new Restaurant({
        name: "TasteGoodRestaurant",
        phoneNumber: "6778928837",
        location: "Mars",
        cuisine: "Sushi",
        hours: "8am-11pm",
        owner: "Mike",
        tables: 3
      });
      test_restaurant.save().then(() => {
        done()
      })
    });

    it("get all restaurant", done => {
      chai.request(app).get("/api/restaurants/").then(res => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.lengthOf(1);
        done()
      })
    });
  });

  describe("Delete ./restaurants", () => {
    before(done => {
      Restaurant.deleteMany({}, () => {
      });
      const restaurant = new Restaurant({
        owner: "Mike",
        name: "TasteGoodRestaurant",
        location: "Mars",
        phoneNumber: "6778928837",
      });
      restaurant.save().then(() => done());
    });

    after(done => {
      Restaurant.deleteMany({}, () => {
        done()
      });
    });

    describe("get restaurant id then delete", () => {
      let rest_id = "";
      before((done) => {
        Restaurant.find({name: "TasteGoodRestaurant"}).then((restaurants) => {
          rest_id = restaurants[0]._id;
          done()
        })
      });

      it("delete restaurant by id", done => {
        chai.request(app).delete("/api/restaurants/" + rest_id).then(res => {
          expect(res).to.have.status(200);
          expect(res.text).to.equals('res ' + rest_id + ' deleted.');
          done()
        })
      });
    })

  });

  describe("PATCH ./restaurants", () => {
    before(done => {
      Restaurant.deleteMany({}, () => {
      });
      const restaurant = new Restaurant({
        owner: "Mike",
        name: "TasteGoodRestaurant",
        location: "Mars",
        phoneNumber: "6778928837",
      });
      restaurant.save().then(() => done());
    });

    after(done => {
      Restaurant.deleteMany({}, () => {
        done()
      });
    });

    describe("get restaurant id then update", () => {
      let rest_id = "";
      before((done) => {
        Restaurant.find({name: "TasteGoodRestaurant"}).then((restaurants) => {
          rest_id = restaurants[0]._id;
          done()
        })
      });

      it("update restaurant", done => {
        chai.request(app).patch("/api/restaurants/" + rest_id).send({
          name: "updated name"
        }).then(res => {
          expect(res).to.have.status(200);
          expect(res.body.name).to.equals("updated name");
          done()
        })
      })
    })

  });

});
