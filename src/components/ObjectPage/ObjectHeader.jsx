import React from "react";
import { FlexBox } from "@ui5/webcomponents-react/dist/FlexBox";
import { FlexBoxDirection } from "@ui5/webcomponents-react/dist/FlexBoxDirection";
import { DynamicPageHeader } from "@ui5/webcomponents-react/dist/DynamicPageHeader";
import ObjectAttribute from "./ObjectAttribute";
import ObjectNumber from "./ObjectNumber";
import Formatter from "../../utils/formatter";
import { productState } from "../../hooks/Products";

function ObjectHeader(product = { units: 0 }) {
  return (
    <DynamicPageHeader>
      <FlexBox direction={FlexBoxDirection.Row}>
        <FlexBox direction={FlexBoxDirection.Column}>
          <ObjectAttribute
            label="Location"
            text={product?.units > 0 ? product.location : " N/A"}
          />
          <ObjectAttribute
            label="Halfway"
            text={product?.units > 0 ? product.halfway : " N/A"}
          />
          <ObjectNumber
            label="Rack"
            number={product?.units > 0 ? product.rack : " N/A"}
          />
        </FlexBox>
        <ObjectAttribute
          direction={FlexBoxDirection.Column}
          label="Availability"
          stateValue={productState(product)}
          text={`${productState(product)} (${product?.units})`}
          stateFormatter={Formatter.stockState}
        />
      </FlexBox>
    </DynamicPageHeader>
  );
}

export default ObjectHeader;
