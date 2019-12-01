import React, {ReactPropTypes as react} from "react";
import {shallow} from "enzyme";
import {configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Page404 from "./404";

configure({adapter: new Adapter()});

describe("Page404", () => {
  it("num of elements", () => {
    const wrapper = shallow(<Page404 />);
    const num_input = wrapper.find('Container').length;
    expect(num_input).toEqual(1);
  });
});