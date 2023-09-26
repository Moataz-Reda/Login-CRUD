import { Box, Button, Checkbox, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from '@mui/material';
import React, { useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { connect } from 'react-redux';
import { setNewEvent, updateEvent } from '../../actions';

const EventForm = (props) => {
  const [eventName, setEventName] = useState(props.selectedEvent?.eventName || "");
  const [eventDate, setEventDate] = useState(props.selectedEvent?.eventDate ?
    dayjs(props.selectedEvent?.eventDate) : null);
  const [eventPrice, setEventPrice] = useState(props.selectedEvent?.price || "");
  const [eventDescription, setEventDescription] = useState(props.selectedEvent?.eventDescription);
  const [isPremium, setIsPremium] = useState(props.selectedEvent?.isPremium || false);
  const [isChecked, setIsChecked] = useState(false);

  const addOrEditEvent = () => {
    const event = {
      eventName,
      eventDate: new Date(eventDate),
      eventDescription,
      price: eventPrice,
      isPremium: isPremium === 'true' ? true : false
    }

    if (props.selectedEvent?.eventName) {
      props.updateEvent(props.loggedInUser.email, props.selectedEventIndex, event);
    } else {
      props.setNewEvent(props.loggedInUser.email, event);
    }
    props.onClosePopup()
  }

  return <div>
    <TextField
      sx={{ m: 1, width: '95%' }}
      id="eventName"
      label="Event Name"
      required
      variant="outlined"
      onChange={(e) => {
        setEventName(e.target.value);
      }}
      value={eventName}
    />
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        sx={{ m: 1, width: '95%' }}
        label="Event Date *"
        id="eventDate"
        type="date"
        onChange={(dateValue) => {
          setEventDate(dateValue);
        }}
        format="DD/MM/YYYY"
        value={eventDate} />
    </LocalizationProvider>
    <TextField
      sx={{ m: 1, width: '95%' }}
      id="description"
      label="Event Description"
      multiline
      rows={4}
      onChange={(e) => {
        setEventDescription(e.target.value);
      }}
      value={eventDescription}
    />
    <TextField
      sx={{ m: 1, width: '95%' }}
      id="price"
      label="Price"
      type="number"
      required
      variant="outlined"
      onChange={(e) => {
        setEventPrice(e.target.value < 0 ? 0 : e.target.value);
      }}
      InputProps={{ inputProps: { min: 0 } }}
      value={eventPrice}
    />
    <FormLabel sx={{ m: 1, width: '95%' }} id="eventType">Event Type</FormLabel>
    <RadioGroup
      sx={{ ml: 1, width: '95%' }}
      row
      aria-labelledby="eventType"
      name="eventType"
      value={isPremium}
      onChange={(e) => setIsPremium(e.target.value)}
    >
      <FormControlLabel value={true} control={<Radio />} label="Premium Booking" />
      <FormControlLabel value={false} control={<Radio />} label="Normal Booking" />
    </RadioGroup>
    {!props.selectedEvent.eventName && <FormControlLabel
      value={isChecked}
      onChange={(e) => setIsChecked(e.target.checked)}
      sx={{ ml: -0.2, width: '95%' }}
      control={<Checkbox />} label="I accept terms and conditions" />}
    <Box textAlign='center' sx={{ marginTop: '20px' }}>
      <Button
        variant="contained"
        onClick={() => addOrEditEvent()}
        disabled={!eventName || !eventDate || !eventPrice || (!props.selectedEvent?.eventName && !isChecked)}
        >
        Submit
      </Button>
    </Box>
  </div>
}

const mapStateToProps = ({ loggedInUser }) => {
  return { loggedInUser }
}

export default connect(mapStateToProps, { setNewEvent, updateEvent })(EventForm);