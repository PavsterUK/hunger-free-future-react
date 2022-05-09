import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import "./About.css";
import CloseIcon from "@mui/icons-material/Close";

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
    backgroundColor: "#064635",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function SimpleModal(props) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState();

  useEffect(() => {
    if (props.openTab === "about") {
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
      <CloseIcon
        onClick={handleClose}
        sx={{
          color: "#ffffff",
          fontSize: "3.5em",
          marginLeft: "auto",
          border: "1px solid white",
        }}
      />
      <h2 id="simple-modal-title">ABOUT</h2>
      <p id="simple-modal-description">
        Foodbanks help people in difficult financial situations all around UK.
        People can receive a food bank parcel of three days' nutritionally
        balanced, non-perishable food from their local food bank.
        <br/><br/>
        This website will help you to find nearest food bank.
        <br/><br/>
        Big thanks to guys from https://www.givefood.org.uk for maintaining great API.
      </p>
    </div>
  );

  return (
    <div className="about-container">
      <h3 onClick={handleOpen}>About</h3>
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
