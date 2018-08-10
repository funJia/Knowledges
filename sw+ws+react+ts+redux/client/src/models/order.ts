export const order = {
  name: "order",
  state: {
    orderList: []
  },
  reducers: {
    update(state, data: any) {
      return { orderList: [...state.orderList, data] };
    }
  }
};
