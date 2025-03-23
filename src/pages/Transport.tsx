import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Paper,
  Tabs,
  Tab,
  List,
  ListItem,
} from "@mui/material";
import { VehiclesAPI, StarshipsAPI } from "../services/api";
import { Vehicle, Starship } from "../types";
import EntityCard from "../components/EntityCard";
import EntityDetail from "../components/EntityDetail";
import Pagination from "../components/Pagination";
import LoadingIndicator from "../components/LoadingIndicator";

type TransportType = "vehicles" | "starships";

const Transport: React.FC = () => {
  const [transportType, setTransportType] = useState<TransportType>("vehicles");
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [starships, setStarships] = useState<Starship[]>([]);
  const [selectedTransport, setSelectedTransport] = useState<
    Vehicle | Starship | null
  >(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [vehiclesPage, setVehiclesPage] = useState(1);
  const [starshipsPage, setStarshipsPage] = useState(1);
  const [vehiclesTotalPages, setVehiclesTotalPages] = useState(0);
  const [starshipsTotalPages, setStarshipsTotalPages] = useState(0);

  useEffect(() => {
    const fetchTransport = async () => {
      try {
        setLoading(true);
        setError(null);

        if (transportType === "vehicles") {
          const data = await VehiclesAPI.getAll(vehiclesPage);
          setVehicles(data.results);
          setVehiclesTotalPages(Math.ceil(data.count / 10));
        } else {
          const data = await StarshipsAPI.getAll(starshipsPage);
          setStarships(data.results);
          setStarshipsTotalPages(Math.ceil(data.count / 10));
        }
      } catch (err) {
        setError(`Failed to fetch ${transportType}`);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTransport();
  }, [transportType, vehiclesPage, starshipsPage]);

  const handleTransportClick = (transport: Vehicle | Starship) => {
    setSelectedTransport(transport);
  };

  const handleDialogClose = () => {
    setSelectedTransport(null);
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    if (transportType === "vehicles") {
      setVehiclesPage(value);
    } else {
      setStarshipsPage(value);
    }
    window.scrollTo(0, 0);
  };

  const handleTabChange = (
    event: React.SyntheticEvent,
    newValue: TransportType
  ) => {
    setTransportType(newValue);
  };

  const currentTransport = transportType === "vehicles" ? vehicles : starships;
  const currentPage =
    transportType === "vehicles" ? vehiclesPage : starshipsPage;
  const currentTotalPages =
    transportType === "vehicles" ? vehiclesTotalPages : starshipsTotalPages;

  if (loading && currentTransport.length === 0) return <LoadingIndicator />;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Star Wars Transport
      </Typography>

      <Paper sx={{ mb: 3 }}>
        <Tabs
          value={transportType}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab value="vehicles" label="Vehicles" />
          <Tab value="starships" label="Starships" />
        </Tabs>
      </Paper>

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
        {currentTransport.map((transport) => (
          <ListItem
            key={transport.url}
            sx={{
              padding: 0,
              display: "block",
              width: { xs: "100%", sm: "45%", md: "30%", lg: "22%" },
              flexGrow: 0,
              flexShrink: 0,
            }}
          >
            <EntityCard
              name={transport.name}
              onClick={() => handleTransportClick(transport)}
            />
          </ListItem>
        ))}
      </List>

      {currentTotalPages > 1 && (
        <Pagination
          count={currentTotalPages}
          page={currentPage}
          onChange={handlePageChange}
        />
      )}

      <EntityDetail
        open={!!selectedTransport}
        onClose={handleDialogClose}
        entity={selectedTransport}
        title={`${
          transportType === "vehicles" ? "Vehicle" : "Starship"
        } Details`}
      />
    </Container>
  );
};

export default Transport;
