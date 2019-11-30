import React from "react";
import {shallow} from "enzyme";
import {configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Manage from "./Manage";

configure({adapter: new Adapter()});

describe("Manage", () => {
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
      const spy = jest.spyOn(wrapper.instance(), "showManaging");
      const a = instance.manageRestaurant(event);
      expect(spy).toHaveBeenCalled();
    });
  });
});