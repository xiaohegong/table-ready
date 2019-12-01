import React, {ReactPropTypes as react} from "react";
import {shallow} from "enzyme";
import {configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import VerticalModal from "./verticalmodal";
configure({adapter: new Adapter()});

describe("VerticalModal", () => {
  it("num of elements", () => {
    const wrapper = shallow(<VerticalModal />);
    const num_link = wrapper.find('Link').length;
    expect(num_link).toEqual(1);
  });
});