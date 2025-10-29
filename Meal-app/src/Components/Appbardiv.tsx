import React, { Component } from 'react';
import {
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  colors,
} from '@mui/material';
import AppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import CategoryIcon from '@mui/icons-material/Category';
import CreateIcon from '@mui/icons-material/Create';
import SettingsIcon from '@mui/icons-material/Settings';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { withRouter } from './withRouter';

class Appbardiv extends Component {
  state = {
    drawerOpen: false,
    searchQuery: '',
    meals: [],
    isLoading: false,
  };

  toggleDrawer = (open) => () => {
    this.setState({ drawerOpen: open });
  };

  navigateTo = (path) => {
    this.props.navigate(path);
    this.setState({ drawerOpen: false });
  };

  searchTimer = null;

  handleSearchChange = (event) => {
    const query = event.target.value;
    this.setState({ searchQuery: query });

    clearTimeout(this.searchTimer);

    if (query.trim()) {
      this.searchTimer = setTimeout(() => {
        this.fetchMeals(query);
      }, 500); 
    } else {
      this.setState({ meals: [] });
    }
  };

  fetchMeals = async (query) => {
    this.setState({ isLoading: true });

    let apiUrl = query.length === 1
      ? `https://www.themealdb.com/api/json/v1/1/search.php?f=${query}`
      : `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      this.setState({ meals: data.meals || [] });
    } catch (error) {
      console.error(error);
      this.setState({ meals: [] });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleMealClick = (id) => {
    this.props.navigate(`/recipe/${id}`);
    this.setState({ meals: [], searchQuery: '' });
  };

  render() {
    const { meals, isLoading, searchQuery } = this.state;

    const menuItems = [
      { text: 'Home', icon: <HomeIcon />, path: '/' },
      { text: 'Login', icon: <LoginIcon />, path: '/login' },
      { text: 'Categories', icon: <CategoryIcon />, path: '/categories' },
      { text: 'Add Recipe', icon: <CreateIcon />, path: '/addrecipe' },
      { text: 'Filter', icon: <FilterAltIcon />, path: '/filter' },
      { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
    ];

    return (
      <Box>
        
        <AppBar sx={{ position: 'fixed', bgcolor: '#3D4127' }}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              py: { xs: 2, sm: 1.5 },
              gap: { xs: 1, sm: 2 },
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 1 }}
              onClick={this.toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>

            <Box sx={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
              <img
                src="/logo.jpg"
                alt="logo"
                style={{ height: '55px', width: '55px', borderRadius: '50%' }}
              />
              <Typography
                variant="h6"
                sx={{
                  marginLeft: '10px',
                  fontWeight: 500,
                  fontSize: { xs: '1rem', sm: '1.25rem' },
                }}
              >
                Meal Mate
              </Typography>
            </Box>

            <Box sx={{ position: 'relative', flex: '1 1 auto', minWidth: { xs: '100%', sm: 200 }, maxWidth: 600, mr: { xs: 0, sm: 2 } }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: '#BAC095',
                  borderRadius: '4px',
                  padding: '0 8px',
                }}
              >
                <input
                  type="text"
                  placeholder="Search meals..."
                  value={searchQuery}
                  onChange={this.handleSearchChange}
                  style={{
                    outline: 'none',
                    border: 'none',
                    backgroundColor: '#BAC095',
                    flexGrow: 1,
                    padding: '8px',
                  }}
                />
                <IconButton sx={{ p: '5px' }} aria-label="search">
                  <SearchIcon />
                </IconButton>
              </Box>

             
              {meals.length > 0 && (
                <Paper
                  sx={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    maxHeight: 300,
                    overflowY: 'auto',
                    zIndex: 10,
                  }}
                >
                  {meals.map((meal) => (
                    <ListItemButton
                      key={meal.idMeal}
                      onClick={() => this.handleMealClick(meal.idMeal)}
                    >
                      <ListItemText primary={meal.strMeal} />
                    </ListItemButton>
                  ))}
                </Paper>
              )}
            </Box>

            <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 1 }}>
              <Button color="inherit" onClick={() => this.navigateTo('/')}>
                Home
              </Button>
              <Button color="inherit" onClick={() => this.navigateTo('/login')}>
                Login
              </Button>
              <Button color="inherit" onClick={() => this.navigateTo('/filter')}>
                <IconButton>
                  <FilterAltIcon sx={{color:'white'}}/>
                </IconButton>
              </Button>
            </Box>
          </Toolbar>
        </AppBar>

      
        <Drawer open={this.state.drawerOpen} onClose={this.toggleDrawer(false)}>
          <Box sx={{ width: { xs: 200, sm: 250 } }}>
            <List>
              {menuItems.map((item) => (
                <ListItemButton key={item.text} onClick={() => this.navigateTo(item.path)}>
                  <ListItemIcon sx={{ color: '#3D4127' }}>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              ))}
            </List>
          </Box>
        </Drawer>
      </Box>
    );
  }
}

export default withRouter(Appbardiv);
