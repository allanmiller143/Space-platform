import { Grid, Card, CardContent, Typography, Box } from "@mui/material";
import { SupportAgent } from "@mui/icons-material"; // Exemplo de ícone

const Cards = () => {
  const cardsData = [
    {
      title: "Total de Usuários",
      value: "2,400",
      change: "+12%",
      icon: <SupportAgent fontSize="large" />,
    },
    {
      title: "Novos Este Mês",
      value: "150",
      change: "+5%",
      icon: <SupportAgent fontSize="large" />,
    },
    {
      title: "Imobiliárias Ativas",
      value: "10",
      change: "+3%",
      icon: <SupportAgent fontSize="large" />,
    },
    {
      title: "Corretores Ativos",
      value: "500",
      change: "+8%",
      icon: <SupportAgent fontSize="large" />,
    },
  ];

  return (
    <Grid container spacing={2}>
      {cardsData.map((card, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <Card
            sx={{
              padding: 2,
              border: '1px solid #ddd',
              borderRadius: 2,
              backgroundColor: 'white',
              boxShadow: 1,
              position: "relative", // Para posicionar ícones
            }}
          >
            <CardContent>
              <Box
                sx={{
                  position: "absolute",
                  top: "16px",
                  right: "16px",
                  color: "primary.main",
                }}
              >
                {card.icon}
              </Box>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ fontSize: "1rem", opacity: 0.8}}
              >
                {card.title}
              </Typography>
              <Typography
                variant="h4"
                sx={{ fontWeight: "bold", fontSize: "2rem", color: "primary.main" }}
              >
                {card.value}
              </Typography>
              <Typography
                sx={{ fontSize: "1rem", color: "#32CD32", marginTop: "8px" }}
              >
                {card.change} vs LY
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Cards;
