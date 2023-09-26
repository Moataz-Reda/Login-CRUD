import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginRegistrationPage from './pages/LoginRegistrationPage/LoginRegistrationPage';
import { Provider } from 'react-redux';
import reducer from './reducer'
import { legacy_createStore as createStore } from 'redux';
import Home from './pages/Home/Home';
import { useTranslation, Trans } from 'react-i18next';
import { Button } from '@mui/base';

const store = createStore(reducer)
function App() {
  const { t, i18n } = useTranslation();
  return (
    <Provider store={store}>
      <Button onClick={() => i18n.changeLanguage("en")}>English</Button>
      <Button onClick={() => i18n.changeLanguage("ar")}>Arabic</Button>

      {t('test')}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginRegistrationPage />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
