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
  CircularProgress,
  Badge,
} from '@mui/material';
import AppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { withRouter } from './withRouter';

interface Props {
  loggedIn: boolean;
  username: string;
  onLogout: () => void;
  navigate: (path: string | number) => void;
  location: any;
  params: any;
  favorites: any[]; // Pass the full favorites array
}

interface State {
  drawerOpen: boolean;
  searchQuery: string;
  meals: any[];
  isMobile: boolean;
  isLoading: boolean;
}

class Appbardiv extends Component<Props, State> {
  searchTimer: any = null;

  state: State = {
    drawerOpen: false,
    searchQuery: '',
    meals: [],
    isMobile: window.innerWidth < 600,
    isLoading: false,
  };

  toggleDrawer = (open: boolean) => () => {
    this.setState({ drawerOpen: open });
  };

  navigateTo = (path: string | number) => {
    this.props.navigate(path);
    this.setState({ drawerOpen: false, searchQuery: '', meals: [] });
  };

  showBackButton = () => {
    const path = this.props.location?.pathname || '/';
    return path !== '/';
  };

  handleBack = () => {
    this.props.navigate(-1);
  };

  updateMobileState = () => {
    this.setState({ isMobile: window.innerWidth < 600 });
  };

  componentDidMount() {
    window.addEventListener('resize', this.updateMobileState);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateMobileState);
  }

  handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    this.setState({ searchQuery: query });

    clearTimeout(this.searchTimer);
    if (query.trim().length >= 3) {
      this.searchTimer = setTimeout(() => {
        this.fetchMeals(query.trim());
      }, 500);
    } else {
      this.setState({ meals: [] });
    }
  };

  fetchMeals = async (query: string) => {
    this.setState({ isLoading: true });

    const apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(
      query
    )}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      this.setState({ meals: data.meals || [], isLoading: false });
    } catch (error) {
      console.error(error);
      this.setState({ meals: [], isLoading: false });
    }
  };

  handleMealClick = (id: string) => {
    this.navigateTo(`/recipe/${id}`);
    this.setState({ meals: [], searchQuery: '' });
  };

  handleLogout = () => {
    this.props.onLogout();
    this.setState({ drawerOpen: false });
  };

  render() {
    const { drawerOpen, searchQuery, meals, isMobile, isLoading } = this.state;
    const { loggedIn, favorites } = this.props;

    const menuItems = [
      { text: 'Home', icon: <HomeIcon />, path: '/' },
      { text: 'Favorites', icon: <FavoriteIcon />, path: '/favorites' },
      { text: 'Filter', icon: <FilterAltIcon />, path: '/filter' },
    ];

    if (!loggedIn) {
      menuItems.splice(1, 0, { text: 'Login', icon: <LoginIcon />, path: '/login' });
    } else {
      menuItems.splice(1, 0, { text: 'Logout', icon: <LogoutIcon />, path: '/' });
    }

    return (
      <Box>
        <AppBar sx={{ position: 'fixed', bgcolor: '#3D4127' }}>
          <Toolbar
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              py: { xs: 1.5, sm: 1 },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
              {this.showBackButton() ? (
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="back"
                  onClick={this.handleBack}
                  sx={{ mr: 1 }}
                >
                  <ArrowBackIcon />
                </IconButton>
              ) : (
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ mr: 1 }}
                  onClick={this.toggleDrawer(true)}
                >
                  <MenuIcon />
                </IconButton>
              )}

              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <img
                  src="/logo.jpg"
                  alt="logo"
                  style={{ height: '50px', width: '50px', borderRadius: '50%' }}
                />
                <Typography variant="h6" sx={{ marginLeft: '8px', fontWeight: 500 }}>
                  Meal Mate
                </Typography>
              </Box>
            </Box>

            <Box
              sx={{
                flex: isMobile ? '1 1 100%' : '0 1 400px',
                display: 'flex',
                justifyContent: 'center',
                mt: isMobile ? 1 : 0,
                position: 'relative',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: '#BAC095',
                  borderRadius: '4px',
                  padding: '0 8px',
                  width: '100%',
                }}
              >
                <input
                  type="text"
                  placeholder="Search "
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
                {isLoading ? (
                  <CircularProgress size={24} />
                ) : (
                  <IconButton
                    sx={{ p: '5px' }}
                    aria-label="search"
                    onClick={() =>
                      searchQuery.trim().length >= 3 && this.fetchMeals(searchQuery.trim())
                    }
                  >
                    <SearchIcon />
                  </IconButton>
                )}
              </Box>

              {searchQuery && (
                <Paper
                  sx={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    maxHeight: 300,
                    overflowY: 'auto',
                    zIndex: 1200,
                    boxShadow: '0px 4px 6px rgba(0,0,0,0.1)',
                  }}
                >
                  {isLoading ? (
                    <ListItemButton>
                      <ListItemText primary="Loading..." />
                    </ListItemButton>
                  ) : meals.length > 0 ? (
                    meals.map((meal) => (
                      <ListItemButton
                        key={meal.idMeal}
                        onClick={() => this.handleMealClick(meal.idMeal)}
                      >
                        <ListItemText primary={meal.strMeal} />
                      </ListItemButton>
                    ))
                  ) : (
                    <ListItemButton>
                      <ListItemText primary="No results found" />
                    </ListItemButton>
                  )}
                </Paper>
              )}
            </Box>

            {!isMobile && (
              <Box sx={{ display: 'flex', gap: 1 }}>
                <IconButton color="inherit" onClick={() => this.navigateTo('/favorites')}>
                  <Badge badgeContent={this.props.favorites.length} color="error">
                    <FavoriteIcon sx={{ color: 'white' }} />
                  </Badge>
                </IconButton>

                <Button color="inherit" onClick={() => this.navigateTo('/filter')}>
                  <FilterAltIcon sx={{ color: 'white' }} />
                </Button>
                <Button color="inherit" onClick={() => this.navigateTo('/')}>
                  Home
                </Button>
                {loggedIn ? (
                  <Button color="inherit" onClick={this.handleLogout}>
                    Logout
                  </Button>
                ) : (
                  <Button color="inherit" onClick={() => this.navigateTo('/login')}>
                    Login
                  </Button>
                )}
              </Box>
            )}
          </Toolbar>
        </AppBar>

        <Drawer
          open={drawerOpen}
          onClose={this.toggleDrawer(false)}
          PaperProps={{
            sx: {
              width: { xs: 200, sm: 250 },
              backgroundColor: 'rgba(61, 65, 39, 0.51)',
              backdropFilter: 'blur(5px)',
              color: '#fff',
            },
          }}
        >
          <Box sx={{ width: { xs: 200, sm: 250 } }}>
            <List>
              {menuItems.map((item) => (
                <ListItemButton
                  key={item.text}
                  onClick={() => {
                    if (item.text === 'Logout') {
                      this.handleLogout();
                    } else {
                      this.navigateTo(item.path);
                    }
                  }}
                >
                  <ListItemIcon sx={{ color: '#ebece3ff' }}>{item.icon}</ListItemIcon>
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
