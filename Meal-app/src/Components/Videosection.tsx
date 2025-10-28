import React, { Component } from 'react';
import { Box, Typography } from '@mui/material';
import { Block } from '@mui/icons-material';

export default class VideoSection extends Component {
  render() {
    return (
      <Box
        // sx={{
        //   mt:5,
        //   position: 'relative',
        //   width:'100%',
        //   height: '10%',
        //     maxHeight: '50%'
         
        // }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            // alignItems:'center',
            width: '100%',
            // height: '50%',
            objectFit: 'cover',
            
          }}
        >
          <source src="/Foodvideo.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '50%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            textAlign: 'center',
           
          }}
        >
          <Typography variant="h3" sx={{ fontWeight: 600 }}>
            Discover Delicious Meals Worldwide
          </Typography>
          <Typography variant="h6" sx={{ mt: 2 }}>
            Explore thousands of recipes and find your next favorite dish!
          </Typography> 
        </Box>
      </Box>
    );
  }
}
