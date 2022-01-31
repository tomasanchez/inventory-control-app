import React, { useContext, useRef, useState, useEffect } from "react";
import { ShellBar } from "@ui5/webcomponents-react/dist/ShellBar";
import { ShellBarItem } from "@ui5/webcomponents-react/dist/ShellBarItem";
import { Avatar } from "@ui5/webcomponents-react/dist/Avatar";
import { AuthContext } from "../../auth/Auth";
import { Popover } from "@ui5/webcomponents-react/dist/Popover";
import { FlexBox, Link } from "@ui5/webcomponents-react";
import FireBaseAPI from "../../api/FireBaseAPI";
import { useNavigate } from "react-router-dom";
import { generateRandomColor } from "../Avatar/UserAvatar";

const style = {
  shell: {
    overflow: "hidden",
    top: 0,
    width: "100%",
    zIndex: 100,
  },
  emptySpace: {
    paddingTop: "44px",
  },
};

function Navbar(props) {
  let navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const profilePopOverRef = useRef(null);

  const [initials, setInitials] = useState("");
  const [accent, setAccent] = useState(generateRandomColor(true));

  const handleProfileClick = (e) => {
    profilePopOverRef.current.showAt(e.detail.targetRef);
  };

  useEffect(() => {
    setInitials(
      currentUser?.displayName
        .match(/(?<!\p{L}\p{M}*)\p{L}/gu)
        .join("")
        .substring(0, 2)
        .toUpperCase()
    );
    setAccent(generateRandomColor());
  }, [currentUser, initials]);

  return (
    <>
      <ShellBar
        slot={props.slot}
        style={style.shell}
        primaryTitle="Shop UI5"
        showCoPilot={true}
        logo={
          <img
            src="https://www.seekpng.com/png/full/145-1457731_2-color-tracks-sap-ui-5-logo.png"
            alt="Logo"
          />
        }
        profile={
          currentUser && (
            <Avatar
              icon={currentUser.displayName ? null : "employee"}
              initials={initials}
              colorScheme={accent}
              children={
                currentUser.phoroURL && (
                  <img src={currentUser.phoroURL} alt="Profile" />
                )
              }
            />
          )
        }
        onProfileClick={handleProfileClick}
      >
        {!currentUser && (
          <ShellBarItem
            icon="visits"
            title="Sign In"
            onClick={(e) => {
              navigate("/login");
            }}
          />
        )}
      </ShellBar>
      <Popover ref={profilePopOverRef} placementType="Bottom">
        <FlexBox fitContainer>
          <Link
            onClick={() => {
              FireBaseAPI.logOut().then(() => {
                navigate("/login");
              });
            }}
          >
            Sign Out
          </Link>
        </FlexBox>
      </Popover>
    </>
  );
}

export default Navbar;
