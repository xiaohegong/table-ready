import React from "react";
import {shallow} from "enzyme";
import {configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import AddNewMenuItem from "./AddNewMenuItem";

configure({adapter: new Adapter()});

describe("AddNewMenuItem", () => {
  it("num of elements", () => {
    const myMock = jest.fn();
    const fake = {
      state: {id: "13"}
    };
    const wrapper = shallow(<AddNewMenuItem.WrappedComponent location={fake}/>);
    const image = wrapper.find('button').length;
    expect(image).toEqual(1);
    const text = wrapper.find('input').length;
    expect(text).toEqual(4);
  });

});