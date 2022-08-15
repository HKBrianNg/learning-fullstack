import { useState, createContext } from 'react'
import { Routes, Route } from "react-router-dom"
import Login from './page/auth/Login'
import Signup from './page/auth/Signup'
import Logout from './page/auth/Logout'
import VideoDetails from './page/video/VideoDetails'
import Home from './page/home/Home'
import Topic from './page/config/Topic'
import User from './page/config/User'
import { ThemeProvider, createTheme } from '@mui/material/styles';


export const AppContext = createContext(null)
export const TopicContext = createContext(null)
export const VideoContext = createContext(null)

function App() {
  const [app, setApp] = useState({ email: '', token: '', theme: 'light', currentTab: 0 })
  const [topicData, setTopicData] = useState([])
  const [videoData, setVideoData] = useState([])


  const theme = createTheme({
    palette: {
      mode: app.theme,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <AppContext.Provider value={{ app, setApp }}>
          <VideoContext.Provider value={{ videoData, setVideoData }}>
            <TopicContext.Provider value={{ topicData, setTopicData }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/video/:id" element={<VideoDetails />} />
                <Route path="/auth/login" element={<Login />} />
                <Route path="/auth/signup" element={<Signup />} />
                <Route path="/auth/logout" element={<Logout />} />
                <Route path="/config/user" element={<User />} />
                <Route path="/config/topic" element={<Topic />} />
              </Routes>
            </TopicContext.Provider>
          </VideoContext.Provider>
        </AppContext.Provider>
      </div>
    </ThemeProvider>
  );
}

export default App
