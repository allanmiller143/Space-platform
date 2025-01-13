import { Typography, Box } from "@mui/material";
import { People, Business, Person, Home } from "@mui/icons-material";

const VerticalStats = () => {
  const statsData = [
    { title: "Corretores", count: 500, icon: <Person fontSize="medium" /> },
    { title: "Imobiliárias", count: 10, icon: <Business fontSize="medium"  /> },
    { title: "Clientes", count: 2400, icon: <People fontSize="medium"   /> },
    { title: "Proprietários", count: 150, icon: <Home fontSize="medium" /> },
  ];

  return (
    <Box
      sx={{
        py : 1,
        px : 3, 
        border: "1px solid #ddd",
        borderRadius: 2,
        backgroundColor: "white",
        boxShadow: 1,
      }}
    >
      <Typography variant="h5" py = {2} sx={{ fontWeight: "bold",textAlign: "center", color: "primary.main" }}>
        Estatísticas da Plataforma
      </Typography>
        {statsData.map((stat, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              alignItems: "center",
              padding: "10px 0",
            }}
          >

            {stat.icon}
            <Box sx={{ flex: 1 }}>
              <Typography variant="body1" sx={{ fontWeight: "500", fontSize: "18px", marginLeft: "10px" }}>
                {stat.title}
              </Typography>
            </Box>
            <Typography variant="h4" sx={{ fontWeight: "bold", color: "primary.dark" }}>
              {stat.count}
            </Typography>
          </Box>
        ))}
    </Box>
  );
};

export default VerticalStats;
