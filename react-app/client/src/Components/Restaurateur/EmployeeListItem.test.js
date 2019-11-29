import React from "react";
import {shallow} from "enzyme";
import {configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import EmployeeListItem from "./EmployeeListItem";
import uid from "uid";

configure({adapter: new Adapter()});

describe("EmployeeListItem", () => {
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
    const wrapper = shallow(<EmployeeListItem key="12"
                                              image="A"
                                              name="name"
                                              id="12"
                                              telephone="12"
                                              deleteEmployee={myMock}/>);
    const text = wrapper.find('p').length;
    expect(text).toEqual(3);
    const image = wrapper.find('img').length;
    expect(image).toEqual(1);

  });

});