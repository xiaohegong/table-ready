import React from "react";
import {shallow} from "enzyme";
import {configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import AvatarModal from "./AvatarModal";

configure({adapter: new Adapter()});

describe("AvatarModal", () => {

  it("num of elements", () => {
    const fake = {
      params: {
        id: 123,
      },
    };
    const wrapper = shallow(<AvatarModal.WrappedComponent match={fake}/>);
    const num = wrapper.find('img').length;
    expect(num).toEqual(1);
    const num_btn = wrapper.find('Modal').length;
    expect(num).toEqual(1);
    // const instance = wrapper.instance();
    // jest.spyOn(instance, 'confirm');
    // console.log(wrapper.find('Button').first());
    // wrapper.find('Button').first().simulate('click');
    // expect(instance.confirm).toHaveBeenCalledWith(0);
  });

});