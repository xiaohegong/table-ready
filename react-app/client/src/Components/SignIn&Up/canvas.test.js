import React, {ReactPropTypes as react} from "react";
import {shallow} from "enzyme";
import {configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Canvas from "./canvas";

configure({adapter: new Adapter()});

describe("Canvas", () => {
  it("num of elements", () => {
    const wrapper = shallow(<Canvas />);
    const num_input = wrapper.find('canvas').length;
    expect(num_input).toEqual(1);
  });
});