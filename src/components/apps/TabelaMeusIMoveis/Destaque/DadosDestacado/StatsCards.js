import { Card, CardContent, Typography, Grid } from "@mui/material";
import { IconCalendar, IconEyeTable, IconHeart } from "@tabler/icons";
import BlankCard from "../../../../shared/BlankCard";

const StatsCards = ({ views = 1500, likes = 300, bookings = 50 }) => {
  const stats = [
    { label: "Visualizações", value: views },
    { label: "Curtidas", value: likes },
    { label: "Agendamentos", value: bookings},
  ];

  return (
    <Grid container spacing={2} justifyContent="center" px={2} pb={2}>
      {stats.map((stat, index) => (
        <Grid item xs={12} sm={4} key={index}>
          <BlankCard>
            <CardContent>
              <Grid container direction="column" alignItems="center" spacing={1}>
                <Grid item>
                  <Typography variant="h5" fontWeight="bold">
                    {stat.value}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="subtitle2" color="textSecondary">
                    {stat.label}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </BlankCard>
        </Grid>
      ))}
    </Grid>
  );
};

export default StatsCards;
