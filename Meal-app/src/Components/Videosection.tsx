import React, { Component } from 'react';
import { Box, Typography } from '@mui/material';

export default class VideoSection extends Component {
  render() {
    return (
      <Box
        sx={{
          mt: 15,
          position: 'relative',
          width: '100%',
          height: { xs: '40vh', sm: '50vh', md: '60vh' },
          overflowX: 'hidden',
          overflow:'hidden',
          overflowY: 'hidden',
          mb:5
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            width:'100%',
            maxWidth:'100%',
            overflow:'hidden'
          }}
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            style={{
              width: '100%',
              height: 'auto',
              objectFit: 'cover', 
              maxWidth:'100%',
              display:'block'
            }}
          >
            <source src="/Foodvideo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </Box>

        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            textAlign: 'center',
            
          }}
        >
          <Typography variant="h3" sx={{ fontWeight: 600 ,fontSize: { xs: '1.5rem', sm: '2rem', md: '3rem' }}}>
            Discover Delicious Meals Worldwide
          </Typography>
          <Typography variant="h6" sx={{ mt: 2 ,fontSize: { xs: '0.9rem', sm: '1.2rem', md: '1.5rem' },}}>
            Explore thousands of recipes and find your next favorite dish!
          </Typography>
        </Box>
      </Box>
    );
  }
}
