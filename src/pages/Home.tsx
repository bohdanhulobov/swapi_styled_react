import React from "react";
import { Link } from "react-router-dom";
import { Container, Typography, Button, Box, Paper } from "@mui/material";
import Grid from "@mui/material/Grid2";
import PersonIcon from "@mui/icons-material/Person";
import PublicIcon from "@mui/icons-material/Public";
import DirectionsTransitIcon from "@mui/icons-material/DirectionsTransit";

const Home: React.FC = () => {
  const sections = [
    {
      title: "Characters",
      path: "/characters",
      icon: <PersonIcon fontSize="large" />,
      description:
        "Explore famous Star Wars characters from all movies and series",
    },
    {
      title: "Planets",
      path: "/planets",
      icon: <PublicIcon fontSize="large" />,
      description: "Discover diverse planets from the Star Wars galaxy",
    },
    {
      title: "Transport",
      path: "/transport",
      icon: <DirectionsTransitIcon fontSize="large" />,
      description: "Learn about vehicles and starships used for transportation",
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Box sx={{ textAlign: "center", mb: 6 }}>
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: "bold",
            textShadow: "2px 2px 4px rgba(0,0,0,0.2)",
          }}
        >
          STAR WARS UNIVERSE
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          Explore the characters, planets, and transport from a galaxy far, far
          away...
        </Typography>
      </Box>

      <Grid container spacing={2}>
        {sections.map((section) => (
          <Grid size={4} key={section.title}>
            <Paper
              elevation={3}
              sx={{
                p: 4,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                textAlign: "center",
                transition: "0.3s",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: 6,
                },
              }}
            >
              <Box sx={{ mb: 2 }}>{section.icon}</Box>
              <Typography variant="h5" component="h2" gutterBottom>
                {section.title}
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ mb: 3, flexGrow: 1 }}
              >
                {section.description}
              </Typography>
              <Button
                component={Link}
                to={section.path}
                variant="contained"
                color="primary"
                fullWidth
              >
                Explore {section.title}
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
