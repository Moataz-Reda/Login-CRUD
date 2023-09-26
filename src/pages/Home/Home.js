import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import styles from './Home.module.css';
import userIcon from '../../images/user.png';
import premiumIcon from '../../images/crown.png';
import {
  Table, Paper, TableRow, TableHead, TableContainer, TableCell,
  TableBody, IconButton, Box, Button, Modal, Typography, Alert, DialogTitle,
  DialogContent, DialogActions, Dialog, DialogContentText
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Add from '@mui/icons-material/Add';
import ExitToApp from '@mui/icons-material/ExitToApp';
import EventForm from '../../components/EventForm/EventForm';
import { useNavigate } from 'react-router-dom';
import { setLoggedInUser, deleteEvent } from '../../actions';
import moment from 'moment';

const Home = (props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const handleOpenConfirmationModal = () => setOpenConfirmationModal(true);
  const handleCloseConfirmationModal = () => setOpenConfirmationModal(false);

  const [selectedEvent, setSelectedEvent] = useState({});
  const [selectedEventIndex, setSelectedEventIndex] = useState(null);

  const style = {
    position: 'absolute',
    height: '500px',
    overflow: 'scroll',
    overflowX: 'hidden',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '0.5px solid #000',
    borderRaduis: '10px',
    boxShadow: 24,
    p: 4,
  };
  const userEvents = props.events[props.loggedInUser.email]?.userEvents;
  const navigate = useNavigate();

  const handleLogout = () => {
    props.setLoggedInUser({});
    navigate('/')
  }

  useEffect(() => {
    if (!props.loggedInUser.email) {
      navigate('/');
    }
    // eslint-disable-next-line
  }, [])

  const totalPrice = userEvents?.map(event => parseFloat(event.price)).reduce((a, b) => a + b, 0);

  const handleEditEvent = (event, index) => {
    setSelectedEvent(event);
    setSelectedEventIndex(index);
    handleOpen();
  }

  const handleDeleteEvent = (event, index) => {
    setSelectedEvent(event);
    setSelectedEventIndex(index);
    handleOpenConfirmationModal();
  }

  const handleConfirmDeleteEvent = () => {
    props.deleteEvent(props.loggedInUser.email, selectedEventIndex);
    handleCloseConfirmationModal();
  }

  return (
    <>
      <div className={styles.header_container}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={userIcon} alt="user_icon" className={styles.user_icon} />
          <span className={styles.logged_in_username}>{props.loggedInUser?.username}</span>
        </div>
        <Button
          variant="outlined"
          onClick={handleLogout}
          style={{ color: 'whitesmoke', borderColor: 'whitesmoke' }}
        >
          <ExitToApp />&nbsp;
          Logout
        </Button>
      </div>
      <div className={styles.events_container}>
        <Box textAlign='left' sx={{ margin: '20px' }}>
          <Button
            variant="contained"
            onClick={() => {
              setSelectedEvent({});
              handleOpen();
            }}
          >
            <Add />&nbsp;
            Add New Event
          </Button>
        </Box>
        <Box textAlign='left' sx={{ margin: '20px' }}>
          <span style={{ fontSize: 'large', color: 'GrayText' }}>Total Price:</span>&nbsp;{totalPrice}
        </Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 550 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell><b>Event Name</b></TableCell>
                <TableCell><b>Event Date</b></TableCell>
                <TableCell><b>Price</b></TableCell>
                <TableCell align="right"><b>Actions</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userEvents?.map((event, index) => (
                <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <div className={styles.event_name_container}>
                      {event.isPremium && <><img title='Premium Event' src={premiumIcon} alt="premium icon" width="18px" />&nbsp; | &nbsp;</>}
                      <span>
                        {event.eventName}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{moment(event.eventDate).format('DD/MM/YYYY')}</TableCell>
                  <TableCell>{`${event.price}  $`}</TableCell>
                  <TableCell align="right">
                    <IconButton aria-label="edit" onClick={() => handleEditEvent(event, index)}>
                      <EditIcon color="primary" />
                    </IconButton>
                    <IconButton aria-label="delete" onClick={() => handleDeleteEvent(event, index)}>
                      <DeleteIcon color="error" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {(!userEvents || userEvents.length === 0) &&
          <Alert severity="warning">
            There's no events yet, please add new event
          </Alert>}
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Event Details
          </Typography>
          <div id="modal-modal-description" sx={{ mt: 2 }}>
            <EventForm
              selectedEvent={selectedEvent}
              selectedEventIndex={selectedEventIndex}
              onClosePopup={handleClose} />
          </div>
        </Box>
      </Modal>
      <Dialog
        open={openConfirmationModal}
        onClose={handleCloseConfirmationModal}
        aria-labelledby="ConfirmationModalTitle"
        aria-describedby="ConfirmationModalDesc"
      >
        <DialogTitle id="ConfirmationModalTitle">
          Delete Event
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="ConfirmationModalDesc">
            Are you sure you want to delete the event with name: <b>{selectedEvent.eventName}</b>?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant='outlined' color="error" onClick={handleCloseConfirmationModal}>No</Button>
          <Button onClick={handleConfirmDeleteEvent} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

const mapStateToProps = ({ loggedInUser, events }) => {
  return { loggedInUser, events }
}

export default connect(mapStateToProps, { setLoggedInUser, deleteEvent })(Home);