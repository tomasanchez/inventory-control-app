import * as React from "react";

import { Bar } from "@ui5/webcomponents-react/dist/Bar";
import { TabContainer } from "@ui5/webcomponents-react/dist/TabContainer";
import { Tab } from "@ui5/webcomponents-react/dist/Tab";
import { TabSeparator } from "@ui5/webcomponents-react/dist/TabSeparator";
import { SemanticColor } from "@ui5/webcomponents-react/dist/SemanticColor";
import { Title } from "@ui5/webcomponents-react/dist/Title";
import { Helmet } from "react-helmet";
import Navbar from "../../components/Navbar/Navbar";
import { productState } from "../../hooks/Products";
import { List } from "@ui5/webcomponents-react/dist/List";
import { FlexBox, StandardListItem } from "@ui5/webcomponents-react";
import Formatter from "../../utils/formatter";
import { useNavigate } from "react-router-dom";
import FireBaseAPI from "../../api/FireBaseAPI";

const { useState, useEffect } = React;

function IconTabBar(props) {
  const tabIndex = ["All", "Plenty of Stock", "Shortage", "Out of Stock"];
  const products = props.data || [];
  return (
    <TabContainer
      slot={props?.slot}
      collapsed={true}
      fixed={true}
      onTabSelect={(e) =>
        setTimeout(() => props.onFilter(tabIndex[e.detail.tabIndex]), 0)
      }
    >
      <Helmet title="Shop UI5 - Products" />
      <Tab
        text={"Products"}
        selected
        additionalText={
          products.filter((p) => productState(p).includes("")).length
        }
        icon="product"
        design={SemanticColor.Neutral}
      />
      <TabSeparator />
      <Tab
        text={tabIndex[1]}
        additionalText={
          products.filter((p) => productState(p).includes(tabIndex[1])).length
        }
        icon="message-success"
        design={SemanticColor.Positive}
      />
      <Tab
        text={tabIndex[2]}
        additionalText={
          products.filter((p) => productState(p).includes(tabIndex[2])).length
        }
        icon="message-warning"
        design={SemanticColor.Critical}
      />
      <Tab
        text={tabIndex[3]}
        additionalText={
          products.filter((p) => productState(p).includes(tabIndex[3])).length
        }
        icon="message-error"
        design={SemanticColor.Negative}
      />
    </TabContainer>
  );
}

function Worklist() {
  const [busy, setBusy] = useState(true);
  const [products, setProducts] = useState([]);
  const [sQuery, setQuery] = useState("");
  const aList = [...products]?.filter((p) => productState(p).includes(sQuery));
  let navigate = useNavigate();

  const onFilter = (filter) => {
    setTimeout(() => {
      if (filter) {
        try {
          setQuery(filter === "All" ? "" : filter);
        } catch (e) {
          setQuery("");
        }
      }
    }, 0);
  };

  useEffect(() => {
    FireBaseAPI.findAll("products").then((result) => {
      setProducts(result);
      setTimeout(() => setBusy(false), 500);
    });
  });

  const onNavTo = (oEvent) => {
    navigate(`./${oEvent.detail.item.dataset.id}`);
  };

  return (
    <>
      <Navbar />
      <Bar startContent={<Title children="Listing Products" />} />
      <IconTabBar onFilter={onFilter} data={[...products]} />
      <List
        busy={busy}
        busyDelay={300}
        noDataText="No products available"
        onItemClick={onNavTo}
      >
        {aList.map((product) => (
          <StandardListItem
            key={product.documentId}
            image={product.image}
            description={product.supplier}
            additionalText={productState(product)}
            additionalTextState={Formatter.stockState(productState(product))}
            data-id={product.documentId}
          >
            <FlexBox direction="Column">{product.title}</FlexBox>
          </StandardListItem>
        ))}
      </List>
    </>
  );
}

export default Worklist;
