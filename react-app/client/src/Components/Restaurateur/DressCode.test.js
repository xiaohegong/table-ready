import React, {ReactPropTypes as react} from "react";
import {shallow} from "enzyme";
import {configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import DressCode from "./DressCode";

configure({adapter: new Adapter()});

describe("DressCode", () => {

  it("num of elements", () => {
    const wrapper = shallow(<DressCode id={123}/>);
    const instance = wrapper.instance();
    jest.spyOn(instance, 'editCode');
    wrapper.setState({info:{dressCode: 'Formal suit.'}});
    wrapper.find('button').simulate('click');
    expect(instance.editCode).toHaveBeenCalled();
  });

});