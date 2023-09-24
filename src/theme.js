import { createTheme, responsiveFontSizes } from "@mui/material/styles";

let theme = createTheme({
    breakpoints: {
      values: {
        s:0,
        xs: 320,
        sm: 600,
        md: 900,
        lg: 1200,
        max_height:1300,
        xl: 1536,
      },
    },
    components: {
      MuiSvgIcon: {
        styleOverrides: {
          root: {
            fontSize: "20px",
            fill: "#000",
          },
        },
      },
      MuiTypography:{
        defaultProps:{
          variantMapping:{
            poster_title:'h5'
          }
        }
      }
    },
    typography: {
      fontFamily: "Source Sans 3",
      fontSize: "1rem",
      
       h1:{
        color:'#fff',
        fontSize:'4rem',
        fontWeight:700,
        lineHeight:1,
      },
      h2:{
        color:'#fff',
        fontSize:'3rem',
        fontWeight:700,
        lineHeight:1,
      },
      h3:{
        fontSize:'2rem',
        fontWeight:600,
        lineHeight: 1,
      }, 
       h6:{
        fontSize:'1rem',
        color:'#fff',
        lineHeight:1,
        fontWeight:600,
      },
  /*     h2:{
        fontSize:'2.2rem',
        color:'#fff',
        fontWeight:700,
        lineHeight: 1,
      }, */
     date:{
      fontSize:'1rem',
      color: 'rgba(0,0,0,.6)',
      /* fontWeight:700, */
      lineHeight: 1,
     }
    },
  });
  theme.typography.font700={
    fontSize:'1rem',
    fontWeight:700,
    lineHeight: 1,
    color:'#fff',
    [theme.breakpoints.down('md')]:{
        fontSize:'0.9rem',
      }, 
      [theme.breakpoints.down('sm')]:{
        fontSize:'0.8rem',
      }, 
      [theme.breakpoints.down('xs')]:{
        fontSize:'0.7rem',
      }, 
  }
  theme.typography.info_media={
    fontSize:'1rem',
    color:'#fff',
    fontWeight:400,
    lineHeight: 1,
     [theme.breakpoints.down('md')]:{
      fontSize:'0.9rem',
    }, 
    [theme.breakpoints.down('sm')]:{
      fontSize:'0.8rem',
    }, 
    [theme.breakpoints.down('xs')]:{
      fontSize:'0.7rem',
    }, 
  }
  theme.typography.poster_title={
    fontSize:'2.3rem',
    color:'#fff',
    fontWeight:700,
    lineHeight: 1,
    [theme.breakpoints.down('lg')]:{
      fontSize:'2.1rem',
    },
    [theme.breakpoints.down('md')]:{
      fontSize:'1.9rem',
    },
     [theme.breakpoints.down('sm')]:{
      fontSize:'1.7rem',
    }, 
    [theme.breakpoints.down('xs')]:{
      fontSize:'1.4rem',
    }, 
    
  }
  theme=responsiveFontSizes(theme)
  console.log(theme)
export default theme