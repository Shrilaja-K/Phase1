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
  favorites: any[];
}

interface State {
  drawerOpen: boolean;
  searchQuery: string;
  meals: any[];
  isMobile: boolean;
  isLoading: boolean;
}

class Appbardiv extends Component<Props, State> {
  debouncedSearch: any = null;

  state: State = {
    drawerOpen: false,
    searchQuery: '',
    meals: [],
    isMobile: window.innerWidth < 600,
    isLoading: false,
  };

  debounce(fn: any, delay: number) {
    let timer: any;
    return (...args: any[]) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), delay);
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateMobileState);
    this.debouncedSearch = this.debounce((query: string) => {
      this.fetchMeals(query);
    }, 500);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateMobileState);
  }

  toggleDrawer = (open: boolean) => () => {
    this.setState({ drawerOpen: open });
  };

  navigateTo = (path: string | number) => {
    this.props.navigate(path);
    window.scrollTo(0, 0);
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


  handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      searchQuery: event.target.value,
      meals: [],
    });
  };

  fetchMeals = async (query: string) => {
    if (!query || query.length < 1) return; 

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
    const { loggedIn } = this.props;

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
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {this.showBackButton() ? (
                <IconButton color="inherit" onClick={this.handleBack}>
                  <ArrowBackIcon />
                </IconButton>
              ) : (
                <IconButton color="inherit" onClick={this.toggleDrawer(true)}>
                  <MenuIcon />
                </IconButton>
              )}

              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <img
                  src="/logo.jpg"
                  alt="logo"
                  style={{ height: '50px', width: '50px', borderRadius: '50%' }}
                />
                <Typography variant="h6" sx={{ ml: 1 }}>
                  Meal Mate
                </Typography>
              </Box>
            </Box>

         
            <Box sx={{ flex: isMobile ? '1 1 100%' : '0 1 400px', position: 'relative' }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: '#BAC095',
                  borderRadius: '4px',
                  px: 1,
                }}
              >
                <input
                  type="text"
                  placeholder="Search"
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

            
                <IconButton onClick={() => this.debouncedSearch(searchQuery.trim())}>
                  {isLoading ? <CircularProgress size={20} /> : <SearchIcon />}
                </IconButton>
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
                  }}
                >
                  {meals.length > 0 ? (
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
              <Box sx={{ display: 'flex', gap: 2 }}>
                <IconButton color="inherit" onClick={() => this.navigateTo('/favorites')}>
                  <Badge badgeContent={this.props.favorites.length} color="error">
                    <FavoriteIcon />
                  </Badge>
                </IconButton>

                <Button color="inherit" onClick={() => this.navigateTo('/filter')}>
                  <FilterAltIcon />
                </Button>

                <Button color="inherit" onClick={() => this.navigateTo('/')}>Home</Button>

                {loggedIn ? (
                  <Button color="inherit" onClick={this.handleLogout}>Logout</Button>
                ) : (
                  <Button color="inherit" onClick={() => this.navigateTo('/login')}>Login</Button>
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
          <List>
            {menuItems.map((item) => (
              <ListItemButton
                key={item.text}
                onClick={() => {
                  if (item.text === 'Logout') this.handleLogout();
                  else this.navigateTo(item.path);
                }}
              >
                <ListItemIcon sx={{ color: '#fff' }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            ))}
          </List>
        </Drawer>
      </Box>
    );
  }
}

export default withRouter(Appbardiv);
