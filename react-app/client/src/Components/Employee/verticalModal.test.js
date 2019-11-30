import React, {ReactPropTypes as react} from "react";
import {shallow} from "enzyme";
import {configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import VerticalModal from "./verticalModal";

configure({adapter: new Adapter()});

describe("VerticalModal", () => {
  it("num of elements", () => {
    const wrapper = shallow(<VerticalModal />);
    const num_input = wrapper.find('Form').length;
    expect(num_input).toEqual(1);
    const num_btn = wrapper.find('Button').length;
    expect(num_btn).toEqual(1);
  });
});