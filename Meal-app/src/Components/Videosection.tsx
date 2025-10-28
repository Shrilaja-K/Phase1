import React, { Component } from 'react';
import { Box, Typography } from '@mui/material';

export default class VideoSection extends Component {
  render() {
    return (
      <Box
        sx={{
          mt: 5,
          position: 'relative',
          width: '100%',
          height: '60vh', 
          overflow: 'hidden',
          mb:5
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
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
              borderRadius: '12px', 
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
