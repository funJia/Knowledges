import { connect } from "react-redux";

import Link from "../components/Link";

//  映射 model中的state
//  [{state},ownProps] state:model中的state ownProps:组件自身的prop
const mapStateToProps = (state: any, ownProps: any) => ({
  active: ownProps.filter === state.visibilityFilter
});

//  映射 model中reducers的方法
//  [{model,model2,...},ownProps] model,model2:model对象名 ownProps: 组件自身的prop
//  [{model:{func1,func2},model2,...},ownProps] func1，func2:model中reducers的函数
const mapDispatchToProps = ({ visibilityFilter }: any, ownProps: any) => ({
  onClick: () => {
    return visibilityFilter.setVisibilityFilter(ownProps.filter);
  }
});

// 把redux store 注入到组件
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Link);
