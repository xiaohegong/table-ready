import React, {ReactPropTypes as react} from "react";
import {shallow} from "enzyme";
import {configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Users from "./Users";

configure({adapter: new Adapter()});

describe("Users", () => {
  it("num of elements", () => {
    const wrapper = shallow(<Users />);
    const num_input = wrapper.find('input').length;
    expect(num_input).toEqual(1);
    const num_btn = wrapper.find('button').length;
    expect(num_btn).toEqual(1);
    wrapper.setState({query: '', users:[{name: 'jason'}, {name: 'John'}]});
    const num_UserRow = wrapper.find('UserRow').length;
    expect(num_UserRow).toEqual(2);
  });
});