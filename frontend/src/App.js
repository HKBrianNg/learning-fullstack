import React, { useState } from 'react';
import { Routes, Route } from "react-router-dom";
import Home from './component/home/Home';
import Login from './component/auth/Login';
import Register from './component/auth/Register';
import Logout from './component/auth/Logout';
import VideoDetails from './component/video/VideoDetails';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import About from './component/about/About';


function App() {
  const [appTheme, setAppTheme] = useState('light');

  const theme = createTheme({
    palette: {
      mode: appTheme,
    },
  });


  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/home/video/:id" element={<VideoDetails />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/auth/logout" element={<Logout />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
