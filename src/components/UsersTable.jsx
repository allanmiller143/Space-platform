import { useState } from "react";
import {
  Box,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Button,
  Chip,
} from "@mui/material";
import { Search } from "@mui/icons-material";

const userData = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Customer", status: "Active" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Admin", status: "Active" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "Customer", status: "Inactive" },
  { id: 4, name: "Alice Brown", email: "alice@example.com", role: "Customer", status: "Active" },
  { id: 5, name: "Charlie Wilson", email: "charlie@example.com", role: "Moderator", status: "Active" },
];

const UsersTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(userData);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = userData.filter(
      (user) =>
        user.name.toLowerCase().includes(term) || user.email.toLowerCase().includes(term)
    );
    setFilteredUsers(filtered);
  };

  return (
    <Box
      sx={{
        borderRadius: 2,
        p: 3,
        boxShadow: 3,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h6" component="div">
          Usuários
        </Typography>
        <Box sx={{ position: "relative", width: "100%", maxWidth: 300 }}>
          <TextField
            variant="outlined"
            placeholder="Search users..."
            size="small"
            fullWidth
            InputProps={{
              startAdornment: <Search sx={{ mr: 1,  }} />,
            }}
            value={searchTerm}
            onChange={handleSearch}
            sx={{
              borderRadius: 1,
            }}
          />
        </Box>
      </Box>

      <TableContainer component={Paper} >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "gray" }}>Name</TableCell>
              <TableCell sx={{ color: "gray" }}>Email</TableCell>
              <TableCell sx={{ color: "gray" }}>Role</TableCell>
              <TableCell sx={{ color: "gray" }}>Status</TableCell>
              <TableCell sx={{ color: "gray" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Typography variant="body1" fontWeight="medium" color="black">
                    {user.name}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="gray">
                    {user.email}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={user.role}
                    color="primary"
                    size="small"
                    sx={{
                      backgroundColor: "rgba(33, 150, 243, 0.2)",
                      color: "#2196f3",
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={user.status}
                    size="small"
                    sx={{
                      backgroundColor:
                        user.status === "Active" ? "rgba(76, 175, 80, 0.2)" : "rgba(244, 67, 54, 0.2)",
                      color: user.status === "Active" ? "#4caf50" : "#f44336",
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Button
                    size="small"
                    sx={{
                      color: "#2196f3",
                      textTransform: "none",
                      ":hover": { textDecoration: "underline" },
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    size="small"
                    sx={{
                      color: "#f44336",
                      textTransform: "none",
                      ":hover": { textDecoration: "underline" },
                    }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default UsersTable;
