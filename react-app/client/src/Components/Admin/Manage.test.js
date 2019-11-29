import React from "react";
import {shallow} from "enzyme";
import {configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Manage from "./Manage";
const manage = require("./Manage")

configure({adapter: new Adapter()});

describe("Manage", () => {
  // let wrapper;
  //
  // beforeEach(() => {
  //   const initial_state = {
  //     page: 'user',
  //     query: ''
  //   };
  //   wrapper = shallow(<Manage/>);
  //   wrapper.setState(initial_state);
  // });

  describe("manageUsers", () => {
    it("should set state", () => {
      const wrapper = shallow(<Manage/>);
      const instance = wrapper.instance();
      const event = {
        target: {
          classList: {
            add: jest.fn(),
          },
          parentNode: {
            childNodes: [

            ],
          },
        },
      };
      // instance.manageUsers(event);
      // expect(wrapper.state().page).toEqual("user");
      const spy = jest.spyOn(wrapper.instance(), "manageRestaurant");
      // const a = instance.manageRestaurant(event);
      wrapper.find("#manageRes").simulate('click', event);
      expect(spy).toHaveBeenCalled();
    });
  });
});