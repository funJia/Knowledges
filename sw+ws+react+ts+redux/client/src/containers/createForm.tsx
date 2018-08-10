import * as React from "react";
import { Form, Input, Button, Row, Col } from "antd";
const FormItem = Form.Item;
import { connect } from "react-redux";
import Model from "../viewModel/";

// form中包含的组件类型
enum EFormType {
  input = 0,
  button,
  dateRange,
  select
}

// form中组件包含的属性
interface IFormData {
  // 标题
  label: string;
  // 默认值or值 可选 | 可由Rudex全局控制
  value?: any;
  // 组件类型
  type: EFormType;
  // 字段名称
  field?: string;
  // 值改变事件 | 用于更新State中的数据 | 也可由Rudex来更新（默认由Rudex提供更新方法）
  onChange?: any;
  // 表达式 用于特殊的组件
  expression?: any;
  colSpan: any;
  labelCol: any;
  wrapperCol: any;
}

// 创建表单组件需要的属性
interface ICreateFormProps {
  // 表单数据源
  FormData: IFormData[];
  // 表单字段集合
  CreateForm: any;
  ModelName: string;
  // 模型名称 | Redux中state的名称
  Model: string;
  // 更新Redux的state
  setValue: any;
  addModel: any;
}

class CreateForm extends React.Component<ICreateFormProps> {
  constructor(props: ICreateFormProps) {
    super(props);
    this.props.addModel({
      modelName: this.props.ModelName,
      model: new Model[this.props.Model]()
    });
    this.getValue = this.getValue.bind(this);
    this.setValue = this.setValue.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    const filed: string = e.target.attributes["data-field"].value;

    this.props.setValue({
      formInfo: this.props.CreateForm,
      model: this.props.ModelName,
      filed,
      value: e.target.value
    });
  }

  getValue(filed) {
    console.log(filed);
    for (const key in this.props.CreateForm) {
      if (key === filed) {
        return this.props.CreateForm[key];
      } else {
        continue;
      }
    }
    return null;
  }

  setValue(filed, value) {
    for (const key in this.props.CreateForm) {
      if (key === filed) {
        this.props.CreateForm[key] = value;
        return true;
      } else {
        return false;
      }
    }
    return false;
  }

  getFormItem = (i, formItem, renderFormItem, elements) => {
    const formItemLayout = {
      labelCol: { span: formItem.labelCol || 8 },
      wrapperCol: { span: formItem.wrapperCol || 14 }
    };
    renderFormItem.push(
      <Col span={formItem.colSpan || 6} offset={formItem.offset || 0} key={i}>
        <FormItem key={i} label={formItem.label} {...formItemLayout}>
          {elements}
        </FormItem>
      </Col>
    );
  };

  renderItem = (e, i) => {
    return (
      <Row gutter={24} key={i}>
        {e}
      </Row>
    );
  };

  render() {
    let renderForm: any = [];
    let renderFormItem: any = [];
    let elements: any;
    let itemState: any;
    let i = 0;
    for (let formItem of this.props.FormData) {
      // 获取redux中的对象
      itemState = this.getValue(formItem.field);
      switch (formItem.type) {
        case EFormType.input:
          elements = (
            <Input
              placeholder="placeholder"
              value={formItem.value || itemState}
              onChange={formItem.onChange || this.onChange}
              //这里的对应redux中的属性(字段)
              data-field={formItem.field}
            />
          );
          break;
        case EFormType.button:
          elements = <Button type="primary">{formItem.value}</Button>;
          console.log(elements);
          break;
        default:
          break;
      }
      this.getFormItem(i, formItem, renderFormItem, elements);
      elements = null;
      console.log(formItem.value);
      if ((i + 1) % 4 == 0) {
        renderForm.push(this.renderItem(renderFormItem, i));
        renderFormItem = [];
        console.log(78888);
      } else if (i + 1 == this.props.FormData.length) {
        renderForm.push(this.renderItem(renderFormItem, i));
      }
      i++;
    }

    return <Form className="ant-advanced-search-form">{renderForm}</Form>;
  }
}

// const mapState = state => ({
//   CreateForm: state.antDemo.createForm1
// });

const mapDispatch = dispatch => {
  return {
    setValue: dispatch.antDemo.setValue,
    addModel: dispatch.antDemo.addModel
  };
};

export default connect(
  null,
  mapDispatch
)(CreateForm);
