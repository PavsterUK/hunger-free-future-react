import React from "react";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import BurgerMenuIcon from "../../img/open-menu-6208.svg";

import "./DrawerMenu.css";

export default function TemporaryDrawer() {
  const [open, setOpen] = React.useState(false);

  const list = () => (
    <div
      role="presentation"
      onClick={() => setOpen(false)}
      onKeyDown={() => setOpen(false)}
    >
      <List>
        {["Mission", "About", "Contact"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
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
