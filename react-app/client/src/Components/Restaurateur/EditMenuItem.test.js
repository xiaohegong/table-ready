import React from "react";
import {shallow} from "enzyme";
import {configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import AddNewMenuItem from "./AddNewMenuItem";
import uid from "uid";

configure({adapter: new Adapter()});

describe("AddNewMenuItem", () => {
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
        id: "13",
        res_id: "13",
        name: "OMG",
        price: "100000",
        ingredients: "void",
        calories: "infinity"
      }
    };
    const wrapper = shallow(<AddNewMenuItem.WrappedComponent location={fake}/>);
    const image = wrapper.find('button').length;
    expect(image).toEqual(1);
    const text = wrapper.find('input').length;
    expect(text).toEqual(4);
  });

});