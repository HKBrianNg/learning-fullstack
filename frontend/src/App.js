import { useState, createContext } from 'react'
import { Routes, Route } from "react-router-dom"
// import Home from './component/home/Home'
import Login from './page/auth/Login'
import Signup from './page/auth/Signup'
import Logout from './page/auth/Logout'
import VideoDetails from './page/video/VideoDetails'
// import { ThemeProvider, createTheme } from '@mui/material/styles';
import Home from './page/home/Home'

export const AppContext = createContext(null)
export const VideoContext = createContext(null)

function App() {
  const [app, setApp] = useState({ email: '', token: '', currentTab: 0 })
  const [videoData, setVideoData] = useState([])

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
        <VideoContext.Provider value={{ videoData, setVideoData }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/video/:id" element={<VideoDetails />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/signup" element={<Signup />} />
            <Route path="/auth/logout" element={<Logout />} />
          </Routes>
        </VideoContext.Provider>
      </AppContext.Provider>
    </div>
    // </ThemeProvider>
  );
}

export default App
