import * as React from "react";
import Immutable from "immutable";
//import redraft from "redraft";
import "./App.css";
import "./styles/iconfont/iconfont.css";

import * as qiniu from "qiniu-js";
const uuidv1 = require("uuid/v1");

import axios from "axios";

import {
  Editor,
  EditorState,
  RichUtils,
  // ContentState,
  // convertFromHTML,
  DefaultDraftBlockRenderMap,
  convertFromRaw,
  convertToRaw,
  AtomicBlockUtils
  //  moveSelectionToEnd,
  //  moveFocusToEnd
} from "draft-js";
//import "react-quill/dist/quill.snow.css"; // ES6

import logo from "./logo.svg";
import { WhiteSpaceProperty } from "csstype";

const blockRenderMap = Immutable.Map({
  a: {
    element: "LINK"
  },
  atomic: {
    element: "div"
  },
  unstyled: {
    element: "span"
  }
});

// Include 'paragraph' as a valid block and updated the unstyled element but
// keep support for other draft default block types
const extendedBlockRenderMap = DefaultDraftBlockRenderMap.merge(blockRenderMap);

function mediaBlockRenderer(block) {
  if (block.getType() === "atomic") {
    return {
      component: Media,
      editable: false
    };
  }

  return null;
}

// 视频
const Audio = props => {
  return <audio controls src={props.src} style={styles.media} />;
};

// 图片
const Image = props => {
  return <img src={props.src} style={styles.media} />;
};

// 音频
const Video = props => {
  return <video controls src={props.src} style={styles.media} />;
};

// 返回自定义组件
const Media = props => {
  try {
    const entity = props.contentState.getEntity(props.block.getEntityAt(0));
    const { src, title } = entity.getData();

    const type = entity.getType();

    let media = transformMedia(type, title, src);

    return media;
  } catch (error) {
    console.error(error);
    return null;
  }
};

// 转换自定义组件
const transformMedia = (type, title, src) => {
  let media: any = null;
  if (type === "audio") {
    media = <Audio src={src} />;
  } else if (type === "image") {
    media = <Image src={src} />;
  } else if (type === "video") {
    media = <Video src={src} />;
  } else if (type === "excel") {
    media = (
      <div>
        <a href={src} target="_blank">
          <i className="action-user action-web-icon-" />
          {title}
        </a>
      </div>
    );
  } else if (type === "word") {
    media = (
      <div>
        <a href={src} target="_blank">
          <i className="action-user action-word" />
          {title}
        </a>
      </div>
    );
  } else if (type === "txt") {
    media = (
      <div>
        <a href={src} target="_blank">
          <i className="action-user action-txt" />
          {title}
        </a>
      </div>
    );
  } else if (type === "url") {
    media = (
      <div>
        <a href={src} target="_blank">
          <i className="action-user action-tiaozhuan" />
          {src.trim()}
        </a>
      </div>
    );
  }

  return media;
};

const styles = {
  root: {
    fontFamily: "'Georgia', serif"
    // padding: 20
    // width: 600
  },
  buttons: {
    marginBottom: 10
  },
  urlInputContainer: {
    marginBottom: 10
  },
  urlInput: {
    fontFamily: "'Georgia', serif",
    marginRight: 10,
    padding: 3
  },
  editor: {
    border: "1px solid #ccc",
    cursor: "text",
    minHeight: 80,
    padding: 10
  },
  button: {
    marginTop: 10,
    textAlign: "center"
  },
  media: {
    width: 80,
    whiteSpace: "initial" as WhiteSpaceProperty
  }
};

class App extends React.Component {
  state = {
    editorState: null,
    editorState2: null
  };

  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(), //EditorState.createWithContent(state),
      editorState2: EditorState.createEmpty()
    };

    this.handleKeyCommand = this.handleKeyCommand.bind(this);
  }

  isUpload = false;

  handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return "handled";
    }
    return "not-handled";
  }

  // 判断字符串是否为Url
  checkUrl(str) {
    var urlRegex =
      "^(?!mailto:)(?:(?:http|https|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$";
    var url = new RegExp(urlRegex, "i");
    return str.length < 2083 && url.test(str);
  }
  // 过滤外部链接
  filterUrl = data => {
    if (data.type === "unstyled") return this.checkUrl(data.text);
    else return false;
  };

  // 添加链接
  addUrl = (oldData, addUrl) => {
    let newEditorStatesss = null;
    let _editorState = null;
    if (oldData.blocks.length != 0) {
      newEditorStatesss = convertFromRaw(oldData);
      _editorState = EditorState.createWithContent(newEditorStatesss);
    } else {
      _editorState = EditorState.createEmpty();
    }

    _editorState = EditorState.moveFocusToEnd(_editorState);
    return this.addEntity(_editorState, "url", "", addUrl.text);
  };

  // 添加编辑器实体
  addEntity = (editorState, type, title, src) => {
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      type,
      "IMMUTABLE",
      {
        src: src,
        title: title
      }
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity
    });

    const newEditorStatess = AtomicBlockUtils.insertAtomicBlock(
      newEditorState,
      entityKey,
      " "
    );
    const data = convertToRaw(newEditorStatess.getCurrentContent());
    console.log("666", data);

    const len = data.blocks.length;
    const _data = data.blocks[len - 3];
    if (_data.type == "unstyled" && _data.text == "") {
      data.blocks.splice(len - 3, 1);
    }

    const newEditorStatesss = convertFromRaw(data);
    console.log("datadata", newEditorStatess);
    console.log("datadata", data);
    console.log("datadata", newEditorStatesss);
    let _editorState = EditorState.createWithContent(newEditorStatesss);
    _editorState = EditorState.moveFocusToEnd(_editorState);
    return _editorState;
  };

  // 编辑器数据更新事件
  onChange = editorState => {
    const data1 = convertToRaw(editorState.getCurrentContent());
    const data = data1.blocks;
    console.log(data);
    const lastData = data[data.length - 1];
    const res = this.filterUrl(lastData);

    if (res) {
      data.splice(data.length - 1, 1);
      return this.setState({ editorState: this.addUrl(data1, lastData) });
    } else {
      return this.setState({ editorState });
    }
  };

  domEditor = null;
  setDomEditorRef = ref => {
    this.domEditor = ref;
  };

  // 获取编辑器焦点
  focus = () => {
    const domEditor: any = this.domEditor;
    if (domEditor != null) domEditor.focus();
  };

  // 转换自定义组件
  transform = (entityMap, block) => {
    const entity = entityMap[block.entityRanges[0].key];
    const {
      type,
      data: { title, src }
    } = entity;
    return transformMedia(type, title, src);
  };

  // 转换Draft对象为Html
  reDraftContent = data => {
    const htmls: any = [];
    const blocks = data.blocks;
    try {
      blocks.forEach((element, index) => {
        switch (element.type) {
          case "unstyled":
            htmls.push(<div key={index}>{element.text}</div>);
            break;
          case "atomic":
            htmls.push(
              <React.Fragment key={index}>
                {this.transform(data.entityMap, element)}
              </React.Fragment>
            );
            break;
          default:
            break;
        }
      });
    } catch (error) {
      console.warn(error);
    }

    return htmls;
  };

  // 渲染为Html
  renderHtml = () => {
    const editorState: any = this.state.editorState;
    return this.reDraftContent(convertToRaw(editorState.getCurrentContent()));
  };

  // 上传
  upLoad = (title = "", url, type = "image") => {
    debugger;
    let editorState: any = this.state.editorState;
    editorState = this.addEntity(
      editorState,
      type,
      title,
      url || "http://t2.hddhhn.com/uploads/tu/201610/198/53qyx0kkory.jpg"
    );
    this.setState({
      editorState: editorState
    });
    return;
  };

  // 上传文件
  upLoadFile = (title = "", url, type) => {
    return () => this.upLoad(title, url, type);
  };

  // 获取文件信息
  getFileInfo = file => {
    let name: any, type: any;
    const lastIndex = file.name.lastIndexOf("."),
      fileType = file.type;

    name = file.name.substr(0, lastIndex);

    switch (fileType) {
      case "application/msword":
      case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        type = "word";
        break;
      case "application/vnd.ms-excel":
      case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
        type = "excel";
        break;
      case "text/plain":
        type = "txt";
        break;
      default:
        // 默认为txt类型
        if (fileType.indexOf("image/") != -1) type = "image";
        else type = "txt";
        break;
    }
    return { name, type };
  };

  uploadQNFile = (file, token, domain, target) => {
    const key = uuidv1();
    const config = {
      useCdnDomain: true,
      region: qiniu.region.z0
    };

    const putExtra = {
      fname: file.name,
      params: {}
      // mimeType: qn.allowe.split(',')
    };

    // const addContent = (name, url, type) => {
    //   this.upLoadFile(name, url, type);
    // };

    const observable = qiniu.upload(file, key, token, putExtra, config);
    observable.subscribe(
      (next: any) => {
        console.log("next");
      },
      (error: any) => {
        console.log("error");
        console.log(error);
      },
      (res: any) => {
        console.log("上传完成后", res);
        const url = domain + "/" + res.key;
        //window.open(url);
        const { name, type } = this.getFileInfo(file);
        // addContent(name, url, type);
        this.upLoad(name, url, type);
        target.value = "";
        // this.setState({
        //   lineProgressShow: false,
        //   url
        // });
        // this.props.onValue(url);
      }
    );
  };

  getQNConfig = (next, file, target) => {
    axios
      .get("xxxxxxxx")
      .then(function(res: any) {
        console.log(res);
        const _data = res.data;
        if (_data.code == "0000")
          next(file, _data.data.token, _data.data.url, target);
        else {
          next(
            file,
            "bXYqJXBrhXTr6tzGC78MlguHXuz6CoX7nhqI5_zd:0q6YluktUun5oolAm5_NyPihrmw=:eyJzY29wZSI6Imxhbm1hbyIsImRlYWRsaW5lIjoxNTQyNzA2NTQ5fQ==",
            "https://static.lanmao.cn",
            target
          );
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  // 文件选择
  onFileChange = event => {
    const input = event.target;
    // console.log(input)
    const files = input.files;
    if (files && files.length > 0) {
      const file = files[0];
      console.log(file);
      const fileSize = file.size;
      var size = fileSize / 1024;
      if (size > 1024) {
        alert("附件不能大于1M");
        input.value = "";
        return;
      }
      this.getQNConfig(this.uploadQNFile, file, input);
    }
  };

  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="render">
          <h5>编辑器内容呈现</h5>
          <div className="DraftEditor-root">{this.renderHtml()}</div>
        </div>
        <div className="container">
          <h5>编辑器</h5>
          <div onClick={this.focus}>
            <Editor
              ref={this.setDomEditorRef}
              editorState={this.state.editorState}
              handleKeyCommand={this.handleKeyCommand}
              onChange={this.onChange}
              blockRendererFn={mediaBlockRenderer}
              blockRenderMap={extendedBlockRenderMap}
            />
          </div>
          <button onClick={this.upLoadFile("", "", "image")}>上传图片</button>
          <button onClick={this.upLoadFile("订单列表", "", "excel")}>
            上传Excel
          </button>
          <button onClick={this.upLoadFile("需求文档", "", "word")}>
            上传word
          </button>
          <button onClick={this.upLoadFile("客户资料", "", "txt")}>
            上传txt
          </button>
          使用qiniu sdk 上传文件
          <a href="javascript:void(0)">
            <label html-for="file">
              上传
              <input
                type="file"
                id="file"
                name="SocSecNum"
                style={{ display: "none" }}
                accept="image/*, image/*,application/msword,
                application/vnd.openxmlformats-officedocument.wordprocessingml.document,
                application/vnd.ms-excel,	application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,
                text/plain
                "
                onChange={this.onFileChange}
              />
            </label>
          </a>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
