import React, {ReactPropTypes as react} from "react";
import {shallow} from "enzyme";
import {configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Restaurants from "./Restaurants";

configure({adapter: new Adapter()});

describe("AddAdmin", () => {
  it("num of elements", () => {
    const wrapper = shallow(<Restaurants />);
    const num_input = wrapper.find('input').length;
    expect(num_input).toEqual(1);
    const num_btn = wrapper.find('button').length;
    expect(num_btn).toEqual(1);
  });
});