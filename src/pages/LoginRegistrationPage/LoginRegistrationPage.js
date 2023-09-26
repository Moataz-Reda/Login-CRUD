import React, { useEffect, useState } from "react";
import styles from './LoginRegistrationPage.module.css';
import PropTypes from 'prop-types';
import { Tabs, Tab, Box } from '@mui/material';
import TabPanel from "../../components/TabPanel/TabPanel";
import LoginForm from "../../components/LoginForm/LoginForm";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";
import { connect } from 'react-redux';
import { setUsers, setEvents } from '../../actions';
import { useTranslation } from 'react-i18next';


TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const a11yProps = (index) => {
  return {
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`,
  };
}
const LoginRegistrationPage = (props) => {
  const [value, setValue] = useState(0);
  const { t } = useTranslation();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (props.users.length === 0) {
      fetch("dumyData.json")
        .then((response) => response.json())
        .then((jsonData) => {
          props.setUsers(jsonData.users);
          props.setEvents(jsonData.events)
        });
    }
    // eslint-disable-next-line
  }, [])

  return (
    <div className={styles.login_registration_page_container}>
      <div className={styles.login_registration_body_container}>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label={t('login')} {...a11yProps(0)} />
              <Tab label="Registration" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <LoginForm />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <RegistrationForm />
          </TabPanel>
        </Box>
      </div>
    </div>
  )
}
const mapStateToProps = ({ users }) => {
  return { users: users }
}
export default connect(mapStateToProps, { setUsers, setEvents })(LoginRegistrationPage);