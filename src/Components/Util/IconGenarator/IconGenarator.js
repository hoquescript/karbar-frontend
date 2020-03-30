import React from "react";
import * as Icon from '@ant-design/icons'


export default type => {
  if (typeof Icon[type] !== "undefined") {
    return React.createElement(Icon[type]);
  }
  return React.createElement(Icon['QuestionCircleOutlined']);
};
