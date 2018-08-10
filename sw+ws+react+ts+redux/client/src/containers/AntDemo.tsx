import { connect } from "react-redux";
import AntDemo from "../components/AntDemo";

const mapState = state => ({
  CreateForm: state.antDemo.createForm1,
  CreateForm2: state.antDemo.createForm2,
  orderList: state.order.orderList
});

export default connect(
  mapState,
  null
)(AntDemo);
