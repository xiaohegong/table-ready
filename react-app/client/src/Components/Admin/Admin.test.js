import React from "react";
import {shallow} from "enzyme";
import Admin from "./Admin";
import {configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import store from '../../store';


configure({adapter: new Adapter()});

const setUp = () => {
  const wrapper = shallow(<Admin store={store}/>).childAt(0).dive();
  console.log(wrapper.instance());
  return wrapper;
};

describe("Admin", () => {
  let wrapper;
  beforeEach(() => {
    const initialState = {
      page: "nothing"
    };
    wrapper = setUp();
  });

  describe("chooseManage", () => {
    it("should call setState", () => {
      const instance = wrapper.instance();
      const outcome = instance.chooseManage({page: "manage"});
      expect(wrapper.state().page).toEqual('manage');
    });
  });

});