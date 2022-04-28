import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from '@mui/icons-material/Phone';
import ChatIcon from '@mui/icons-material/Chat';
import "./Contact.css";

function getModalStyle() {
  return {
    minWidth: "100vw",
    maxWidth: "100vw",
    top: "20%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    borderRadius: "none",
    border: "none",
    outline: "none",
    minWidth: "60vw",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    width: 400,
    backgroundColor: "#005051",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function SimpleModal(props) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(props.isOpen);

  useEffect(() => {
    if (props.openTab === "contact") {
      handleOpen();
      props.setOpenTab("");
    }
  }, [props]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">GET IN TOUCH</h2>
      <div className="columns-container">
        <div>
          <div className="round-div">
            <LocationOnIcon sx={{ color: "#ffffff", fontSize: "3.5em"}}/>
          </div>
        </div>

        <div>
          <div className="round-div">
            <PhoneIcon  sx={{ color: "#ffffff", fontSize: "3.5em" }}/>
          </div>
        </div>

        <div>
          <div className="round-div">
            <ChatIcon  sx={{ color: "#ffffff", fontSize: "3.5em" }}/>
          </div>
        </div>
       
      </div>
    </div>
  );

  return (
    <div className="about-container">
      <h3 onClick={handleOpen}>Contact</h3>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
