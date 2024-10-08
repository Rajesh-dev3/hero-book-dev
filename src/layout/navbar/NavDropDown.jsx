import { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { StyledCheckbox, StyledMenuItem } from './styled';
import { Link } from 'react-router-dom';
import { activityLog, accountStatement, currentBet, changePasswordPage, secureAuth, casinoResultsPage, unSetteledBet } from '../../routes/PagesUrl';
import EditStack from '../../components/EditStack/EditStack';
import ModalComp from '../../components/modal/Modal';
// import { BpCheckbox } from '@mui/icons-material';

const NavDropDown = ({ setExposure, exposure }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open2, setOpen] = useState(false);
  
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
 
  const handleChange = (event, name) => {
    const value = event.target.checked
    setExposure((prev) => {
      return {
        ...prev, [name]: value
      }
    })
  };

  return (
    <div className='nav-dropdown'>
      <ModalComp isOpen={modalOpen2} onClose={closeModa2} content={<EditStack closeModa2={closeModa2} />} />
 
     

    

      <Button
        id="basic-button"
        sx={{ color: "white", textTransform: "none", }}
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}

      >
        {localStorage.getItem("user_name")} <KeyboardArrowDownIcon sx={{ fontSize: 25, fontWeight: 'bold' }} />
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
        <Link to={unSetteledBet}>

          <StyledMenuItem onClick={handleClose}>Un Setteled Bet</StyledMenuItem>
        </Link>
        {/* <Link to={DepositPage}>

          <StyledMenuItem onClick={handleClose}>Deposit</StyledMenuItem>
          </Link>
        <Link to={''}>

          <StyledMenuItem onClick={handleClose}>Withdrawal</StyledMenuItem>
          </Link> */}
        <Link to={casinoResultsPage}>

          <StyledMenuItem onClick={handleClose}>Casino Statement</StyledMenuItem>
        </Link>
        {/* <Link to={liveCasinoBet}>

          <StyledMenuItem onClick={handleClose}>Live Casino Bet</StyledMenuItem>
        </Link> */}

        <StyledMenuItem className="custom-exposure-hide">Exposure <StyledCheckbox sx={{
          padding: 0, // Removes padding
          margin: 0,  // Removes margin
          '& .MuiSvgIcon-root': {
            fontSize: 22 // Adjust the icon size if needed
          }
        }} className="exposure-Check" checked={exposure?.exposure} onChange={(e) => handleChange(e, "exposure")} inputProps={{ 'aria-label': 'controlled' }} /></StyledMenuItem>
        <StyledMenuItem className="custom-exposure-hide">Balance <StyledCheckbox sx={{
          padding: 0, // Removes padding
          margin: 0,  // Removes margin
          '& .MuiSvgIcon-root': {
            fontSize: 22 // Adjust the icon size if needed
          }
        }} className="exposure-Check" checked={exposure?.balance} onChange={(e) => handleChange(e, "balance")} inputProps={{ 'aria-label': 'controlled' }} /></StyledMenuItem>
        <StyledMenuItem onClick={() => {
          handleClose()
          setModalOpen2(true)
        }}>Set Button Value</StyledMenuItem>
        <Link to={secureAuth}>

          <StyledMenuItem onClick={handleClose}>Secure Auth</StyledMenuItem>
        </Link>
        <Link to={changePasswordPage}>
          <StyledMenuItem onClick={handleClose}>Change Password</StyledMenuItem>
        </Link>

        <hr style={{ height: "1px", marginTop: "10px", borderTop: "1px solid rgba(0, 0, 0, .15)" }} />
        <StyledMenuItem onClick={SignOut}>SignOut</StyledMenuItem>
      </Menu>
    </div>
  )
}

export default NavDropDown