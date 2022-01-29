import React from "react";
import { FlexBox } from "@ui5/webcomponents-react/dist/FlexBox";
import { FlexBoxDirection } from "@ui5/webcomponents-react/dist/FlexBoxDirection";
import { NotificationListItem } from "@ui5/webcomponents-react/dist/NotificationListItem";
import { Avatar } from "@ui5/webcomponents-react/dist/Avatar";
import { AvatarSize } from "@ui5/webcomponents-react/dist/AvatarSize";
import { RatingIndicator } from "@ui5/webcomponents-react/dist/RatingIndicator";
import { Label } from "@ui5/webcomponents-react/dist/Label";

const messageText = () => {
  return (
    <>
      And with a very long description that will not be ellipsed:
      <br />
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat,
      turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum
      lectus turpis at nunc. Lorem ipsum dolor sit amet, consectetur adipiscing
      elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio
      vehicula dolor, nec elementum lectus turpis at nunc. <br />
    </>
  );
};

function Review({
  icon = "customer",
  img,
  title = "A very good review",
  message = messageText(),
  readOnly = true,
  stars = 0.5,
  name = "An Username",
  date = new Date(),
}) {
  return (
    <NotificationListItem
      titleText={title}
      avatar={
        <Avatar
          size={AvatarSize.M}
          icon={icon}
          children={img && <img src={img} alt="Profile" />}
        />
      }
      footnotes={
        <>
          <Label>{name}</Label>
          <Label>{date.toLocaleDateString()}</Label>
        </>
      }
    >
      <FlexBox direction={FlexBoxDirection.Column}>
        <RatingIndicator readonly={readOnly} value={stars} />
        {message}
      </FlexBox>
    </NotificationListItem>
  );
}

export default Review;
