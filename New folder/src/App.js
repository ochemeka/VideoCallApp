import React from 'react'
import { Typography, AppBar } from '@mui/material';
// import { styled } from '@mui/material/styles';
import VideoPlayer from './component/VideoPlayer';
import Notifications from './component/Notifications';
import Options from './component/Options';

const App = () => {
  return (
    <div>
        <AppBar position="static" color="inherit">
        <Typography variant="h2" align="center">Video Chat App jwdkgwgqw </Typography>
      </AppBar>
     <VideoPlayer />
     <Options>
        <Notifications />
      </Options> 
    </div>
  )
}

export default App