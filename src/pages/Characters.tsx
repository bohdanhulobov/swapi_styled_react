import React, { useState, useEffect } from "react";
import { Container, Typography, Paper, List, ListItem } from "@mui/material";
import { PeopleAPI } from "../services/api";
import { Person } from "../types";
import EntityCard from "../components/EntityCard";
import EntityDetail from "../components/EntityDetail";
import Pagination from "../components/Pagination";
import LoadingIndicator from "../components/LoadingIndicator";

const Characters: React.FC = () => {
  const [characters, setCharacters] = useState<Person[]>([]);
  const [selectedCharacter, setSelectedCharacter] = useState<Person | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        setLoading(true);
        const data = await PeopleAPI.getAll(page);
        setCharacters(data.results);
        setTotalPages(Math.ceil(data.count / 10));
        setError(null);
      } catch (err) {
        setError("Failed to fetch characters");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, [page]);

  const handleCharacterClick = (character: Person) => {
    setSelectedCharacter(character);
  };

  const handleDialogClose = () => {
    setSelectedCharacter(null);
  };

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
    window.scrollTo(0, 0);
  };

  if (loading && characters.length === 0) return <LoadingIndicator />;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Star Wars Characters
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
        {characters.map((character) => (
          <ListItem
            key={character.url}
            sx={{
              padding: 0,
              display: "block",
              width: { xs: "100%", sm: "45%", md: "30%", lg: "22%" },
              flexGrow: 0,
              flexShrink: 0,
            }}
          >
            <EntityCard
              name={character.name}
              onClick={() => handleCharacterClick(character)}
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
        open={!!selectedCharacter}
        onClose={handleDialogClose}
        entity={selectedCharacter}
        title="Character Details"
      />
    </Container>
  );
};

export default Characters;
