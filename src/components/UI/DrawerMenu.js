import React from "react";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import BurgerMenuIcon from "../../img/open-menu-6208.svg";

import "./DrawerMenu.css";

export default function TemporaryDrawer(props) {
  const [open, setOpen] = React.useState(false);

  const list = () => (
    <div
      role="presentation"
      onClick={() => setOpen(false)}
      onKeyDown={() => setOpen(false)}
    >
      <List>
        <ListItem
          onClick={() => props.setOpenTab("about")}
          button
          key={"about"}
        >
          <ListItemText primary={"ABOUT"} />
        </ListItem>

        <ListItem
          onClick={() => props.setOpenTab("contact")}
          button
          key={"contact"}
        >
          <ListItemText primary={"CONTACT"} />
        </ListItem>
      </List>
      <Divider />
    </div>
  );

  return (
    <div className="burger-menu-container">
      <img src={BurgerMenuIcon} alt="" onClick={() => setOpen(true)} />
      <Drawer anchor={"right"} open={open} onClose={() => setOpen(false)}>
        {list()}
      </Drawer>
    </div>
  );
}
