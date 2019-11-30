import React, {ReactPropTypes as react} from "react";
import {shallow} from "enzyme";
import {configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Setting from "./Setting";

configure({adapter: new Adapter()});

describe("Setting", () => {
  it("num of elements", () => {
    const wrapper = shallow(<Setting />);
    const num_input = wrapper.find('Input').length;
    expect(num_input).toEqual(4);
    const num_btn = wrapper.find('Button').length;
    expect(num_btn).toEqual(2);
  });
});