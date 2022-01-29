import React from "react";
import { DynamicPageTitle } from "@ui5/webcomponents-react/dist/DynamicPageTitle";
import { Title } from "@ui5/webcomponents-react/dist/Title";
import { TitleLevel } from "@ui5/webcomponents-react/dist/TitleLevel";
import { Breadcrumbs } from "@ui5/webcomponents-react/dist/Breadcrumbs";
import { BreadcrumbsItem } from "@ui5/webcomponents-react/dist/BreadcrumbsItem";
import { Badge } from "@ui5/webcomponents-react/dist/Badge";
import { Icon } from "@ui5/webcomponents-react/dist/Icon";
import ObjectAttribute from "./ObjectAttribute";
import HeaderAction from "../Actions/HeaderAction";
import ObjectNumber from "./ObjectNumber";

function ObjectTitle(props) {
  const {
    object = { title: "Unknown Product", id: "N/A", units: 0, price: "0" },
  } = props;

  return (
    <DynamicPageTitle
      header={
        <Title level={TitleLevel.H4} tooltip="Product Name">
          {object.title}
        </Title>
      }
      subHeader={
        <ObjectAttribute text={object.id} icon="bar-code" tooltip="SKU" />
      }
      breadcrumbs={
        <Breadcrumbs>
          <BreadcrumbsItem href={"/products"}>Products</BreadcrumbsItem>
          <BreadcrumbsItem>{object.title}</BreadcrumbsItem>
        </Breadcrumbs>
      }
      tooltip="Product details"
      actions={
        <HeaderAction
          text="Add to Cart"
          design="Positive"
          icon="cart-4"
          disabled={object.units === 0}
        />
      }
    >
      <Badge
        icon={<Icon name="lead" />}
        colorScheme="7"
        tooltip="Pricing"
        children={<ObjectNumber number={object.price} />}
      />
    </DynamicPageTitle>
  );
}

export default ObjectTitle;
