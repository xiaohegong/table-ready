import React from "react";
import {shallow} from "enzyme";
import {configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import RestaurantListItem from "./RestaurantListItem";
import uid from "uid";

configure({adapter: new Adapter()});

describe("RestaurantListItem", () => {
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


  it("num of elements", () => {
    const myMock = jest.fn();
    const fake = {
      pathname: "13",
      state: {
        restaurant_id: "13",
      }
    };
    const wrapper = shallow(<RestaurantListItem
                            location={fake}
                            name="name"
                            image="12"
                            _id="12"
                            address="12"
                            telephone="12"
                          />);
    const text = wrapper.find('p').length;
    expect(text).toEqual(2);
    const image = wrapper.find('img').length;
    expect(image).toEqual(1);
    const button = wrapper.find('button').length;
    expect(button).toEqual(1);

  });

});