import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import CloseIcon from '@mui/icons-material/Close';
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import ChatIcon from "@mui/icons-material/Chat";
import "./Contact.css";

function getModalStyle() {
  const top = 25;

  return {
    top: `${top}%`,
    margin: "auto",
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    borderRadius: "15px",
    border: "none",
    outline: "none",
    minWidth: "60vw",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
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
        <CloseIcon onClick={handleClose} sx={{ color: "#ffffff", fontSize: "3.5em", marginLeft: "auto", border: "1px solid white" }}/>
        <h2 id="simple-modal-title">GET IN TOUCH</h2>

        <div className="columns-container">
          <div className="column">
            <div className="round-div">
              <LocationOnIcon sx={{ color: "#ffffff", fontSize: "3.5em" }} />
            </div>
            <h2>ADDRESS</h2>
            <h3>Chippenham, Wiltshire</h3>
          </div>

          <div className="column">
            <div className="round-div">
              <PhoneIcon sx={{ color: "#ffffff", fontSize: "3.5em" }} />
            </div>
            <h2>PHONE</h2>
            <h3>07593676793</h3>
          </div>

          <div className="column">
            <div className="round-div">
              <ChatIcon sx={{ color: "#ffffff", fontSize: "3.5em" }} />
            </div>
            <h2>EMAIL</h2>
            <h3>pavelnaumovic@gmail.com</h3>
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
        style={{ overflow: 'auto' }}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
