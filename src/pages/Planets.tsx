import React, { useState, useEffect } from "react";
import { Container, Typography, Paper, List, ListItem } from "@mui/material";
import { PlanetsAPI } from "../services/api";
import { Planet } from "../types";
import EntityCard from "../components/EntityCard";
import EntityDetail from "../components/EntityDetail";
import Pagination from "../components/Pagination";
import LoadingIndicator from "../components/LoadingIndicator";

const Planets: React.FC = () => {
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [selectedPlanet, setSelectedPlanet] = useState<Planet | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchPlanets = async () => {
      try {
        setLoading(true);
        const data = await PlanetsAPI.getAll(page);
        setPlanets(data.results);
        setTotalPages(Math.ceil(data.count / 10));
        setError(null);
      } catch (err) {
        setError("Failed to fetch planets");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlanets();
  }, [page]);

  const handlePlanetClick = (planet: Planet) => {
    setSelectedPlanet(planet);
  };

  const handleDialogClose = () => {
    setSelectedPlanet(null);
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
    window.scrollTo(0, 0);
  };

  if (loading && planets.length === 0) return <LoadingIndicator />;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Star Wars Planets
      </Typography>

      {error && (
        <Paper sx={{ p: 2, mb: 2, bgcolor: "error.light" }}>
          <Typography color="error">{error}</Typography>
        </Paper>
      )}

      <List
        sx={{
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "row",
          gap: 3,
          padding: 0,
          justifyContent: "center",
        }}
      >
        {planets.map((planet) => (
          <ListItem
            key={planet.url}
            sx={{
              padding: 0,
              display: "block",
              width: { xs: "100%", sm: "45%", md: "30%", lg: "22%" },
              flexGrow: 0,
              flexShrink: 0,
            }}
          >
            <EntityCard
              name={planet.name}
              onClick={() => handlePlanetClick(planet)}
            />
          </ListItem>
        ))}
      </List>

      {totalPages > 1 && (
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
        />
      )}

      <EntityDetail
        open={!!selectedPlanet}
        onClose={handleDialogClose}
        entity={selectedPlanet}
        title="Planet Details"
      />
    </Container>
  );
};

export default Planets;
