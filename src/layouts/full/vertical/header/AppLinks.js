import { Avatar, Box, Typography, Grid, Stack } from '@mui/material';
import * as dropdownData from './data';
import { Link, useNavigate } from 'react-router-dom';

const AppLinks = ({ close }) => {
  const navigate = useNavigate();

  const handleLinkClick = (href) => {
    close(); // Executa a função close
    navigate(href); // Navega para o link
  };

  return (
    <Grid container spacing={2}>
      {dropdownData.appsLink.map((links, index) => (
        <Grid item lg={12} key={index} mb={2}>
          <Box
            onClick={() => handleLinkClick(links.href)}
            className="hover-text-primary"
            sx={{ cursor: 'pointer' }}
          >
            <Stack direction="row" spacing={2}>
              <Box
                minWidth="45px"
                height="45px"
                bgcolor="grey.100"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Avatar
                  src={links.avatar}
                  alt={links.avatar}
                  sx={{
                    width: 24,
                    height: 24,
                    borderRadius: 0,
                  }}
                />
              </Box>
              <Box>
                <Typography
                  variant="subtitle2"
                  fontWeight={600}
                  color="textPrimary"
                  noWrap
                  className="text-hover"
                  sx={{
                    width: '240px',
                  }}
                >
                  {links.title}
                </Typography>
                <Typography
                  color="textSecondary"
                  variant="subtitle2"
                  fontSize="12px"
                  sx={{
                    width: '240px',
                  }}
                  noWrap
                >
                  {links.subtext}
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default AppLinks;
