import React, {ReactPropTypes as react} from "react";
import {shallow} from "enzyme";
import {configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import AddAdmin from "./newAdmin";

configure({adapter: new Adapter()});

describe("AddAdmin", () => {
  it("num of elements", () => {
    const wrapper = shallow(<AddAdmin />);
    const num_input = wrapper.find('InputGroup').length;
    expect(num_input).toEqual(4);
    const num_btn = wrapper.find('Button').length;
    expect(num_btn).toEqual(1);
  });
});