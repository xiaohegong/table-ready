import React from "react";
import {shallow} from "enzyme";
import {configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import TableItem from "./TableItem";
import uid from "uid";

configure({adapter: new Adapter()});

describe("TableItem", () => {
  // let wrapper;
  //
  // beforeEach(() => {
  //   const initial_state = {
  //     page: 'user',
  //     query: ''
  //   };
  //   wrapper = shallow(<Manage/>);
  //   wrapper.setState(initial_state);
  // });


  it("num of elements", () => {
    const myMock = jest.fn();

    const wrapper = shallow(<TableItem key="12"
                                       id = "12"
                                       capacity = "1"
                                       name = "A"
                                       deleteItem={myMock}/>);
    const text = wrapper.find('p').length;
    expect(text).toEqual(3);
    const span = wrapper.find('span').length;
    expect(span).toEqual(2);
  });

});