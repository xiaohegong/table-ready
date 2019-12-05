import React from "react";
import {shallow} from "enzyme";
import {configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import MenuItem from "./MenuItem";
import uid from "uid";

configure({adapter: new Adapter()});

describe("MenuItem", () => {
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
    const wrapper  = shallow(<MenuItem key="12"
                                      res_id="12"
                                      image="A"
                                      name="name"
                                      price="12"
                                      id="12"
                                      ingredients="12"
                                      calories = "12"
                                      deleteItem= {myMock}/>);
    const text = wrapper.find('p').length;
    expect(text).toEqual(4);
    const link = wrapper.find('Link').length;
    expect(link).toEqual(1);

  });

});