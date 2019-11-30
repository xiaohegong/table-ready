// import React from "react";
// import {shallow} from "enzyme";
// import Admin from "./Admin";
// import {configure} from "enzyme";
// import Adapter from "enzyme-adapter-react-16";
// import store from '../../store';
// import {testStore} from "../../util";
//
//
// configure({adapter: new Adapter()});
//
//
// const setUp = (initialState = {}) => {
//   const store = testStore(initialState);
//   const wrapper = shallow(<Admin.WrappedComponent store={store}/>);
//   console.log(wrapper.instance());
//   return wrapper;
// };
//
// describe("Admin", () => {
//   let wrapper;
//   beforeEach(() => {
//     const initialState = {
//       page: "nothing"
//     };
//     wrapper = setUp(initialState);
//   });
//
//   describe("chooseManage", () => {
//     it("should call setState", () => {
//       const instance = wrapper.instance();
//       console.log(instance);
//       const outcome = instance.chooseManage({page: "manage"});
//       expect(wrapper.state().page).toEqual('manage');
//       const component = wrapper.find(wrapper, 'appComponent');
//       expect(component.length).toBe(1);
//     });
//   });
//
// });