import { useState, createContext } from 'react'
import { Routes, Route } from "react-router-dom"
import Login from './page/auth/Login'
import Signup from './page/auth/Signup'
import Logout from './page/auth/Logout'
import VideoDetails from './page/video/VideoDetails'
import Home from './page/home/Home'
import ConfigTopic from './page/config/ConfigTopic'
import User from './page/config/User'
import { ThemeProvider, createTheme } from '@mui/material/styles';


export const AppContext = createContext(null)
export const TopicContext = createContext(null)
export const VideoContext = createContext(null)

const initialApp = {
  email: '', token: '', theme: 'light', category: 'IT', subCategory: 'ALL'
}

function App() {
  const [app, setApp] = useState(initialApp)
  const [topicData, setTopicData] = useState([])
  const [videoData, setVideoData] = useState([])


  const theme = createTheme({
    palette: {
      mode: app.theme,
    },
    overrides: {
      MuiFilledInput: {
        root: {
          backgroundColor: 'rgba(255,255,255,0.8)',
          '&:hover': {
            backgroundColor: 'rgba(255,255,255,1)'
          },
          '&.Mui-focused': {
            backgroundColor: 'rgba(255,255,255,1)'
          }
        }
      }
    },
    components: {
      MuiInputBase: {
        styleOverrides: {
          root: {
            "&:before": {
              borderBottom: "1px solid yellow !imporatnt",
            }
          },
        },
      },
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
                <Route path="/config/topic" element={<ConfigTopic />} />
              </Routes>
            </TopicContext.Provider>
          </VideoContext.Provider>
        </AppContext.Provider>
      </div>
    </ThemeProvider>
  );
}

export default App
