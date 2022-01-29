import React, { useState, useEffect } from "react";
import { ObjectPage } from "@ui5/webcomponents-react/dist/ObjectPage";
import { IllustratedMessage } from "@ui5/webcomponents-react/dist/IllustratedMessage";
import { IllustrationMessageType } from "@ui5/webcomponents-react/dist/IllustrationMessageType";
import { Avatar } from "@ui5/webcomponents-react/dist/Avatar";
import ObjectTitle from "../../components/ObjectPage/ObjectTitle";
import ObjectHeader from "../../components/ObjectPage/ObjectHeader";
import "@ui5/webcomponents-fiori/dist/illustrations/NoData.js";
import "@ui5/webcomponents-icons/dist/product";
import {
  BusyIndicator,
  BusyIndicatorSize,
  FlexBox,
  ObjectPageSection,
} from "@ui5/webcomponents-react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Helmet from "react-helmet";
import FireBaseAPI from "../../api/FireBaseAPI";
import { List } from "@ui5/webcomponents-react";
import Review from "../../components/Reviews/Review";

function Product(props) {
  let params = useParams();
  let productId = params.id;
  const [busy, setBusy] = useState(true);

  const [product, setProduct] = useState(undefined);

  useEffect(() => {
    FireBaseAPI.findById("products", productId).then((p) => {
      setProduct(p);
      setTimeout(() => setBusy(false), p ? 500 : 1500);
    });
  }, [productId]);

  return (
    <>
      <Navbar />
      <Helmet
        title={`UI5 Shop - Products | ${product ? product.title : 404}`}
      />

      {busy ? (
        <FlexBox fitContainer justifyContent="Center">
          <BusyIndicator
            active
            delay={350}
            size={BusyIndicatorSize.Large}
            style={{
              marginTop: "40vh",
            }}
          ></BusyIndicator>
        </FlexBox>
      ) : (
        <>
          <ObjectPage
            slot={props.slot}
            headerTitle={ObjectTitle({ object: product })}
            headerContent={ObjectHeader(product)}
            style={{ height: "100vh" }}
            image={
              product?.image ?? (
                <Avatar size="XL" icon="product" colorScheme="Accent5" />
              )
            }
            imageShapeCircle
            placeholder={
              !product && (
                <IllustratedMessage name={IllustrationMessageType.NoData} />
              )
            }
          >
            <ObjectPageSection
              titleText="Reviews"
              id="reviews"
              aria-label="Reviews"
            >
              <List noDataText="There are yet no reviews" headerText="Reviews">
                {product?.comments.map((review, i) => {
                  return (
                    <Review
                      key={i}
                      img={review.img}
                      title={review.title}
                      stars={review.stars}
                      name={review.name}
                      date={review?.date}
                    />
                  );
                })}
              </List>
            </ObjectPageSection>
          </ObjectPage>
        </>
      )}
    </>
  );
}

export default Product;
