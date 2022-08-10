import { useState, createContext } from 'react'
import { Routes, Route } from "react-router-dom"
// import Home from './component/home/Home'
import Login from './page/auth/Login'
import Signup from './page/auth/Signup'
import Logout from './page/auth/Logout'
import VideoDetails from './component/video/VideoDetails'
// import { ThemeProvider, createTheme } from '@mui/material/styles';
import Home from './page/home/Home'
import SetupVideo from './page/setup/SetupVideo'
import SetupTab from './page/setup/SetupTab'


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
          <Route path="/setup/video" element={<SetupVideo />} />
          <Route path="/setup/tab" element={<SetupTab />} />
        </Routes>
      </AppContext.Provider>
    </div>
    // </ThemeProvider>
  );
}

export default App
