import React from "react";
import { Button } from "@ui5/webcomponents-react/dist/Button";
import { sapUiSmallMarginEnd } from "@ui5/webcomponents-react-base/dist/spacing";

function HeaderAction(props) {
  return (
    <Button
      key={props.key}
      icon={props.icon}
      design={props.design}
      style={sapUiSmallMarginEnd}
      tooltip={props.tooltip}
      iconEnd
      {...props}
    >
      {props.text}
    </Button>
  );
}

export default HeaderAction;
