import React from "react";
import { Pagination as MuiPagination, Box } from "@mui/material";

interface PaginationProps {
  count: number;
  page: number;
  onChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ count, page, onChange }) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 3, mb: 3 }}>
      <MuiPagination
        count={count}
        page={page}
        onChange={onChange}
        color="primary"
        showFirstButton
        showLastButton
      />
    </Box>
  );
};

export default Pagination;
