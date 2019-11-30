import React from "react";
import {shallow} from "enzyme";
import {configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ImageUploader from "./ImageUploader";

configure({adapter: new Adapter()});

describe("AddNewMenuItem", () => {

  it("num of elements", () => {
    const wrapper = shallow(<ImageUploader.WrappedComponent />);
    wrapper.setState({
      url: 'nothing.com',
      isUploading: false,
    });
    const has_img = wrapper.find('img').length;
    expect(has_img).toEqual(1);
    const num_input = wrapper.find('input').length;
    expect(num_input).toEqual(1);
    const num_label = wrapper.find('label').length;
    expect(num_label).toEqual(1);
  });


});