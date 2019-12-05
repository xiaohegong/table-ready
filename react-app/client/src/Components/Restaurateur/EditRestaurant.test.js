import React, {ReactPropTypes as react} from "react";
import {shallow} from "enzyme";
import {configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import EditRestaurant from "./EditRestaurant";

configure({adapter: new Adapter()});

describe("DressCode", () => {

  it("num of elements", () => {
    const fake_link = 'fake_link.com';
    const fake_info = {
      name: 'Jason',
      phoneNumber: '321123',
      location: 'Toronto',
      cuisine: 'American',
      operationHour: '24hr',
    };
    const wrapper = shallow(<EditRestaurant.WrappedComponent info={fake_info} link={fake_link}/>);
    const num_input = wrapper.find('input').length;
    expect(num_input).toEqual(5);
  });

});