import { Avatar } from "@mui/material";
import React, { useState, useEffect } from "react";

/**
 * Convenience method for generating random avatar colors
 * @function
 * @param {boolean} isLoading
 * @returns {ui5.webcomponents.react.Avar.backgroundColor.Accent} An Accent UI5 Color or PlaceHolder
 */
export const generateRandomColor = (isLoading = false) => {
  return isLoading
    ? "Placeholder"
    : `Accent${Math.floor(Math.random() * 10 + 1)}`;
};

export default function UserAvatar(user) {
  const [initials, setInitials] = useState("");
  const [accentColor, setAccentColor] = useState(generateRandomColor(true));
  console.log(user.displayName);

  useEffect(() => {
    setInitials(
      user?.displayName
        .match(/(?<!\p{L}\p{M}*)\p{L}/gu)
        .join("")
        .substring(0, 2)
        .toUpperCase()
    );
    setAccentColor(generateRandomColor());
  }, [user, initials]);

  return (
    <Avatar
      icon={!user.displayName ? null : "product"}
      initials={initials}
      backgroundColor={accentColor}
    >
      {user.phoroURL && <img src={user.phoroURL} alt="Profile" />}
    </Avatar>
  );
}
