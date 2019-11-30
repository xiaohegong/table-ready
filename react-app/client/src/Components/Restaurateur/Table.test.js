import React from "react";
import {shallow} from "enzyme";
import {configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Table from "./Table";
import uid from "uid";

configure({adapter: new Adapter()});

describe("Table", () => {
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
    const wrapper = shallow(<Table res_id="12"/>);
    const button = wrapper.find('button').length;
    expect(button).toEqual(1);
    const div = wrapper.find('div').length;
    expect(div).toEqual(1);
  });

});