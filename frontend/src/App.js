import { useState, createContext } from 'react'
import { Routes, Route } from "react-router-dom"
import Home from './component/home/Home'
import Login from './component/auth/Login'
import Signup from './component/auth/Signup'
import Logout from './component/auth/Logout'
import VideoDetails from './component/video/VideoDetails'
// import { ThemeProvider, createTheme } from '@mui/material/styles';
import About from './component/about/About'

export const AppContext = createContext(null)

function App() {
  const [app, setApp] = useState({ email: '', token: '' })
  // const [appTheme, setAppTheme] = useState('light');

  // const theme = createTheme({
  //   palette: {
  //     mode: appTheme,
  //   },
  // });


  return (
    // <ThemeProvider theme={theme}>
    <div className="App">
      <AppContext.Provider value={{ app, setApp }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/home/video/:id" element={<VideoDetails />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/signup" element={<Signup />} />
          <Route path="/auth/logout" element={<Logout />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </AppContext.Provider>
    </div>
    // </ThemeProvider>
  );
}

export default App
