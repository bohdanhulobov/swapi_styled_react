import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemText,
  Button,
  Typography,
} from "@mui/material";
import { Planet, Starship, Person, Vehicle } from "../types";

interface EntityDetailProps {
  open: boolean;
  onClose: () => void;
  entity: Vehicle | Starship | Planet | Person | null;
  title: string;
  excludeFields?: string[];
}

const EntityDetail: React.FC<EntityDetailProps> = ({
  open,
  onClose,
  entity,
  title,
  excludeFields = [],
}) => {
  if (!entity) return null;

  const defaultExcludeFields = [
    "url",
    "created",
    "edited",
    "films",
    "residents",
    "pilots",
    "people",
    "starships",
    "vehicles",
    "species",
  ];
  const fieldsToExclude = [...defaultExcludeFields, ...excludeFields];

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" component="div">
          {entity.name || title}
        </Typography>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogTitle>
      <DialogContent dividers>
        <List>
          {Object.entries(entity).map(([key, value]) => {
            if (fieldsToExclude.includes(key)) return null;

            const formattedKey = key
              .replace(/_/g, " ")
              .replace(/\b\w/g, (char) => char.toUpperCase());

            let displayValue = value;
            if (Array.isArray(value)) {
              displayValue =
                value.length > 0 ? `${value.length} item(s)` : "None";
            }

            return (
              <ListItem key={key} divider>
                <ListItemText primary={formattedKey} secondary={displayValue} />
              </ListItem>
            );
          })}
        </List>
      </DialogContent>
    </Dialog>
  );
};

export default EntityDetail;
