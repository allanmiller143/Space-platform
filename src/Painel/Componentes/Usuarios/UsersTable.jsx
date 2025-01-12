import React, { useContext, useEffect, useState } from "react";
import { Box,TextField,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Typography,Paper,Chip,IconButton,Avatar,Button,} from "@mui/material";
import { Edit, Message, Search, Settings } from "@mui/icons-material";
import ChatContext from "../../../components/apps/chats/ChatContext/ChatContext";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import FloatingMiniPlayer from "../../../components/apps/FloatingMiniPlayer/FloatingMiniPlayer";
import Spinner from "../../../views/spinner/Spinner";
import ChatContent from "../../../components/apps/chats/ChatContent";
import MandarAviso from "./MandarAviso";
import { openNewChat } from "../../../components/apps/chats/ChatService/Api";

const mockApiCall = (page) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newUsers = Array.from({ length: 10 }, (_, index) => ({
        email: `user${page * 10 + index}@gmail.com`,
        name: `User ${page * 10 + index}`,
        type: "client",
        info: { phone: "123-456-7890" },
      }));
      resolve(newUsers);
    }, 1000);
  });
};

const UsersTable = ({ socket }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [userTypeFilter, setUserTypeFilter] = useState("all");
  const [isPlayerOpen, setPlayerOpen] = useState(false);
  const [loadPlayer, setLoadPlayer] = useState(false);
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const { activeChat, setFilteredChats, setUserChats, setActiveChat, setChats, selectedUser, setSelectedUser, messages, setMessages } = useContext(ChatContext);
  const [dialogOpen, setDialogOpen] = useState(false);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      const newUsers = await mockApiCall(page);
      setUsers((prevUsers) => [...prevUsers, ...newUsers]);
      setLoading(false);
    };
    fetchUsers();
  }, [page]);

  const handleSearch = (e) => setSearchTerm(e.target.value.toLowerCase());
  const handleFilterByType = (type) => setUserTypeFilter(type === userTypeFilter ? "all" : type);

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm) || user.email.toLowerCase().includes(searchTerm);
    const matchesType = userTypeFilter === "all" || user.type === userTypeFilter;
    return matchesSearch && matchesType;
  });

  const userTypeLabel = (type) => {
    const types = {
      realtor: "Corretor",
      client: "Cliente",
      realstate: "Imobiliária",
      owner: "Vendedor",
      all: "Todos",
    };
    return types[type] || "Não especificado";
  };

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    if (scrollHeight - scrollTop === clientHeight && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const setActiveChatFunction = async (email) => {
    if (!currentUser) {
      navigate("/auth/login");
      toast.success("Faça um cadastro para enviar uma mensagem");
      return;
    }

    setLoadPlayer(true);
    setPlayerOpen(true);
    setSelectedUser(null);
    setMessages([]);

    try {
      const response = await openNewChat(socket, email);
      // Simula a consulta à API de chats
      if (response.status === 200 || response.status === 201) {
        setUserChats(response.userInfo);
        setFilteredChats(response.userInfo);
        const selectedChat = response.userInfo.find((chat) => chat.user1.email === email || chat.user2.email === email);
        if (selectedChat) {
          const user = selectedChat.user1.email === currentUser.email ? selectedChat.user2 : selectedChat.user1;
          setActiveChat(selectedChat.id);
          setSelectedUser(user);
        }
      }
    } catch {
      navigate("/error");
    } finally {
      setLoadPlayer(false);
    }
  };

  return (
    <Box
      sx={{
        padding: 2,
        border: "1px solid #ddd",
        borderRadius: 2,
        backgroundColor: "white",
        boxShadow: 1,
      }}
    >
      {isPlayerOpen && (
        <FloatingMiniPlayer
          content={loadPlayer ? <Spinner height="100%" /> : <ChatContent socket={socket} />}
          onClose={() => setPlayerOpen(false)}
        />
      )}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
        <Typography variant="h5" fontWeight="bold" color="primary">
          Gerenciamento de Usuários
        </Typography>
        <Box sx={{ position: "relative", width: "100%", maxWidth: 300 }}>
          <TextField
            variant="outlined"
            placeholder="Buscar usuários..."
            size="small"
            fullWidth
            InputProps={{ startAdornment: <Search sx={{ mr: 1 }} /> }}
            value={searchTerm}
            onChange={handleSearch}
            sx={{ backgroundColor: "white", borderRadius: 2 }}
          />
        </Box>
      </Box>

      <Box sx={{ display: "flex", gap: 1, mb: 2, justifyContent: "flex-end" }}>
        {["all", "owner", "realtor", "realstate", "client"].map((typeKey) => (
          <Button
            key={typeKey}
            variant={userTypeFilter === typeKey ? "contained" : "outlined"}
            color="primary"
            onClick={() => handleFilterByType(typeKey)}
            sx={{ textTransform: "capitalize" }}
          >
            {userTypeLabel(typeKey)}
          </Button>
        ))}
      </Box>

      <TableContainer
        component={Paper}
        sx={{ borderRadius: 3, maxHeight: 400, overflowY: "auto" }}
        onScroll={handleScroll}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Foto</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Nome</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Endereço</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Tipo</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>E-mail</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Telefone</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.email} sx={{ "&:hover": { backgroundColor: "#e3f2fd" } }}>
                <TableCell>
                  <Avatar alt={user.name} src={user.profile?.url} sx={{ width: 50, height: 50 }} />
                </TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>
                  {user.address?.street
                    ? `${user.address.street}, ${user.address.number} - ${user.address.neighborhood}, ${user.address.city} - ${user.address.state}`
                    : "Não cadastrado"}
                </TableCell>
                <TableCell>
                  <Chip label={userTypeLabel(user.type)} color="primary" size="small" />
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.info.phone || "Não cadastrado"}</TableCell>
                <TableCell>
                  <IconButton onClick={() => { setUser(user); setDialogOpen(true); }}>
                    <Settings />
                  </IconButton>
                  <IconButton onClick={() => setActiveChatFunction(user.email)}>
                    <Message />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {filteredUsers.length === 0 && !loading && (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <Typography variant="body1" color="textSecondary">
                    Nenhum usuário encontrado.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
            {loading && (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <Spinner />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <MandarAviso open={dialogOpen} onClose={() => setDialogOpen(false)} user={user} />
    </Box>
  );
};

export default UsersTable;
