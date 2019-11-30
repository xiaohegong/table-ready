import React from "react";
import {shallow} from "enzyme";
import {configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Employees from "./Employees";

configure({adapter: new Adapter()});

describe("AddNewMenuItem", () => {

  it("num of elements", () => {
    const wrapper = shallow(<Employees/>);
    wrapper.setState({
      employees: [{
        image: "jason.png",
        username: "John Walker",
        id: 'on one',
        tel: '1242113',
        email: 'nothing@gmail.com'
      },
        {
          image: "jason.png",
          username: "John Walker",
          id: 'on one',
          tel: '1242113',
          email: 'nothing@gmail.com'
        }
      ]
    });
    const num = wrapper.find('EmployeeListItem').length;
    expect(num).toEqual(2);
  });

  it('test state message', () => {
    const wrapper = shallow(<Employees/>);
    const num = wrapper.find('input').length;
    const num_btn = wrapper.find('button').length;
    expect(num).toEqual(1);
    expect(num_btn).toEqual(1);
  });

});