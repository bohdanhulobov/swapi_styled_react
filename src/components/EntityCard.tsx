import React from "react";
import { Card, CardContent, CardActionArea, Typography } from "@mui/material";

interface EntityCardProps {
  name: string;
  onClick: () => void;
}

const EntityCard: React.FC<EntityCardProps> = ({ name, onClick }) => {
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "0.3s",
        "&:hover": {
          transform: "scale(1.03)",
          boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
        },
      }}
    >
      <CardActionArea
        onClick={onClick}
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <CardContent sx={{ width: "100%" }}>
          <Typography variant="h6" component="div" noWrap>
            {name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default EntityCard;
