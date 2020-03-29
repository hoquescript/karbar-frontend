import React from "react";
import * as Icon from '@material-ui/icons'


export default type => {
  if (typeof Icon[type] !== "undefined") {
    return React.createElement(Icon[type]);
  }
  return React.createElement(
    () => <div>The component has not been created yet.</div>,
    // { key: block._uid }
  );
};
