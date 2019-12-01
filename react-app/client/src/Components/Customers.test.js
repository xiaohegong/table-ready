import React, {ReactPropTypes as react} from "react";
import {shallow} from "enzyme";
import {configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Customers from "./Customers";

configure({adapter: new Adapter()});

describe("Customers", () => {
  it("num of elements", () => {
    const wrapper = shallow(<Customers />);
    wrapper.setState({customers:[{firstName: 'jason', lastName: 'wang'}, {firstName: 'jack', lastName: 'ma'}]});
    const num = wrapper.find('li').length;
    expect(num).toEqual(2);
  });
});