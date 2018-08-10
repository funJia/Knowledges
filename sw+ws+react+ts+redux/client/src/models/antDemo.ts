// import TestModel from "../viewModel/testModel";
// const testModel = new TestModel();

export const antDemo = {
  name: "antDemo",
  state: {},
  reducers: {
    // 更新state项
    setValue(state, data: any) {
      let createForm = {};
      for (const key in data.formInfo) {
        if (key === data.filed) {
          createForm[key] = data.value;
        } else {
          createForm[key] = data.formInfo[key];
        }
      }
      state[data.model] = createForm;

      return {
        ...state
      };
    },
    addModel(state, data: any) {
      state[data.modelName] = data.model;
      return { ...state };
    }
  }
};
