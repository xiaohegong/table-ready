import React from "react";
import {shallow} from "enzyme";
import {configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Menu from "./Menu";
import uid from "uid";

configure({adapter: new Adapter()});

describe("Menu", () => {
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
    const wrapper = shallow(<Menu res_id="12"/>);
    const button = wrapper.find('button').length;
    expect(button).toEqual(1);
    const link = wrapper.find('Link').length;
    expect(link).toEqual(1);
  });

});