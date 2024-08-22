import { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { StyledMenuItem } from './styled';
import { Link } from 'react-router-dom';
import { accountStatement, currentBet, changePasswordPage ,secureAuth, activityLog} from '../../routes/PagesUrl';
import { Modal } from '@mui/material';
import { Box } from '@mui/system';
import EditStack from '../../components/EditStack/EditStack';
import ModalComp from '../../components/modal/Modal';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: "white",
  border: '2px solid #384b5e',
  boxShadow: 24,
  borderRadius: "5px",
  // pt: 2,
  // px: 4,
  pb: 1,
  h2: {
    py: 1,
    px: 1,
    color: "white",
    bgcolor: "#384b5e",

  },
  p: {
    pl: 1,
  },
  div: {
    width: "calc(100% - 5px)",
    display: "flex",
    justifyContent: "end",
    marginTop: "10px",
    gap: "10px",
    paddingRight: "5px",
    button: {
      border: "none",
      paddingTop: "5px",
      paddingBottom: "7px",
      paddingInline: "20px",
      borderRadius: "5px",
      color: "white",
      bgcolor: "green",

    },
    '& > button:first-of-type': {
      // This targets the first button inside the div
      // You can add specific styles for the first button here
      // Example:
      bgcolor: "red",
      fontWeight: "bold",
    },
  }
};
const NavDropDown = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open2, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setOpen(false)
    setAnchorEl(null);
  };
  const SignOut = () => {
    localStorage.clear()
    window.location.replace("/login")
  }
  const [modalOpen2, setModalOpen2] = useState(false)
  const closeModa2 = () => {
    setModalOpen2(false)
  };

  return (
    <div className='nav-dropdown'>
      <ModalComp isOpen={modalOpen2} onClose={closeModa2} content={<EditStack />} />
      <Modal
        open={open2}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <h2 id="parent-modal-title">Log Out</h2>
          <p id="parent-modal-description" style={{ paddingBlock: "10px", paddingInline: "10px" }}>
            Do You Want To Continue..
          </p>
          <div><button onClick={handleClose}>Cancel</button> <button onClick={SignOut}>Continue</button></div>
        </Box>

      </Modal>

      <Button
        id="basic-button"
        sx={{ color: "white" }}
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        {localStorage.getItem("user_name")} <KeyboardArrowDownIcon />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <Link to={accountStatement}>
          <StyledMenuItem onClick={handleClose}>Account Statement</StyledMenuItem>
        </Link>
        <Link to={currentBet}>

          <StyledMenuItem onClick={handleClose}>Current Bet</StyledMenuItem>
        </Link>
        <Link to={activityLog}>

          <StyledMenuItem onClick={handleClose}>Activity Log</StyledMenuItem>
        </Link>
        <Link to={secureAuth}>

          <StyledMenuItem onClick={handleClose}>Secure Auth</StyledMenuItem>
        </Link>
        <Link to={changePasswordPage}>
          <StyledMenuItem onClick={handleClose}>Change Password</StyledMenuItem>
        </Link>
        <StyledMenuItem onClick={() => {
          handleClose()
          setModalOpen2(true)
        }}>Set Button Value</StyledMenuItem>
        <hr style={{ height: "1px", borderTop: "1px solid rgba(0, 0, 0, .15)" }} />
        <StyledMenuItem onClick={handleOpen}>SignOut</StyledMenuItem>
      </Menu>
    </div>
  )
}

export default NavDropDown