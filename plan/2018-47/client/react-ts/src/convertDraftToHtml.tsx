import * as React from "react";
import { WhiteSpaceProperty } from "csstype";

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

// 转换自定义组件
const transform = (entityMap, block) => {
  const entity = entityMap[block.entityRanges[0].key];
  const {
    type,
    data: { title, src }
  } = entity;
  return transformMedia(type, title, src);
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

// 转换Draft对象为Html
const reDraftContent = data => {
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
              {transform(data.entityMap, element)}
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
const renderHtml = dataRaw => {
  try {
    return reDraftContent(JSON.parse(dataRaw));
  } catch (error) {
    return dataRaw;
  }
};

export default renderHtml;
