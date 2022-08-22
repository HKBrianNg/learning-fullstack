import { useState, createContext } from 'react'
import { Routes, Route } from "react-router-dom"
import Login from './component/auth/Login'
import Signup from './component/auth/Signup'
import Logout from './component/auth/Logout'
import VideoDetails from './page/video/VideoDetails'
import Home from './page/home/Home'
import TopicList from './page/config/TopicList'
import UserList from './page/config/UserList'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { AuthContextProvider } from './context/AuthContext'
import ProtectedRoute from './component/auth/ProtectedRoute'
import Forgetpw from './component/auth/Forgetpw'


export const AppContext = createContext(null)
export const TopicContext = createContext(null)
export const VideoContext = createContext(null)
export const UserContext = createContext(null)

const initialApp = {
  email: '', token: '', theme: 'light', category: 'IT', subCategory: 'ALL'
}

function App() {
  const [app, setApp] = useState(initialApp)
  const [topicData, setTopicData] = useState([])
  const [videoData, setVideoData] = useState([])
  const [userData, setUserData] = useState([])


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
              <UserContext.Provider value={{ userData, setUserData }} >
                <AuthContextProvider>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/video/:id" element={<VideoDetails />} />
                    <Route path="/auth/login" element={<Login />} />
                    <Route path="/auth/signup" element={<Signup />} />
                    <Route path="/auth/logout" element={<Logout />} />
                    <Route path="/auth/forgetpw" element={<Forgetpw />} />
                    <Route path="/config/user" element={
                      <ProtectedRoute>
                        <UserList />
                      </ProtectedRoute>
                    } />
                    <Route path="/config/topic" element={
                      <ProtectedRoute>
                        <TopicList />
                      </ProtectedRoute>
                    } />
                  </Routes>
                </AuthContextProvider>
              </UserContext.Provider>
            </TopicContext.Provider>
          </VideoContext.Provider>
        </AppContext.Provider>
      </div>
    </ThemeProvider>
  );
}

export default App
