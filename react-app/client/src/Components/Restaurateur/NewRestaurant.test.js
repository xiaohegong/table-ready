import React from "react";
import {shallow} from "enzyme";
import {configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import NewRestaurant from "./NewRestaurant";
import uid from "uid";

configure({adapter: new Adapter()});

describe("NewRestaurant", () => {
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
      state: {
        id:"12",
        owner_id: "13",
      }
    };
    const wrapper = shallow(<NewRestaurant.WrappedComponent
      location={fake}

    />);
    const text = wrapper.find('input').length;
    expect(text).toEqual(6);
    const button = wrapper.find('button').length;
    expect(button).toEqual(1);

  });

});