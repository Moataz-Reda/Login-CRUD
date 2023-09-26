import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginRegistrationPage from './pages/LoginRegistrationPage/LoginRegistrationPage';
import { Provider } from 'react-redux';
import reducer from './reducer'
import { legacy_createStore as createStore } from 'redux';
import Home from './pages/Home/Home';

const store = createStore(reducer)
function App() {
  return (
    <Provider store={store}>
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
