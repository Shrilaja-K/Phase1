import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Appbardiv from './Components/Appbardiv';
import Imagemovement from './Components/Imagemovement';
import VideoSection from './Components/Videosection';
import { Box } from '@mui/material';
import TrendingMeals from './Components/Trendingmeals';

function App() {
  return (
    // <Router>
    //   <Appbardiv />
    //   <Routes>
    //     <Route path="/" element={
    //       <>
    //       <Box sx={{width:'100%'}}> <Imagemovement />
    //       </Box>
    //     <VideoSection />
    //     </>
    //     }  
    //     />
    //   </Routes>
      
    // </Router>
    <>
    <Appbardiv />
    <Box sx={{ mt:0 ,p:0 ,display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
     
      <VideoSection />
       <Imagemovement />
      <TrendingMeals />
    </Box>
  
    </>
  );
}

export default App;
