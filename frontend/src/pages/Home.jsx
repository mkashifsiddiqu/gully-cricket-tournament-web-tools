import { Box, Grid, Paper, Stack, Typography } from "@mui/material";
import { titleCard, paper, paperBox, bodyCard } from "../styles";

const Home = () => {
  return (
    <div>
      <Box>
        <Typography variant="h4" fontWeight={700} sx={{ mb: 2 }}>
          History of Previous Matches
        </Typography>
        <Grid container spacing={2} justify="center" alignItems={"center"}>
          <Grid item lg={4} md={6} sm={12}>
          <Paper sx={paper}>
          <Box sx={paperBox}>
            <Typography sx={titleCard}>Gujrat Cup</Typography>
            <Typography sx={titleCard}>Location</Typography>
            <Typography sx={titleCard}>12/05/2024</Typography>
          </Box>
          <Stack spacing={2} m={2}>
            <Stack direction={"row"} spacing={6} justifyContent={"center"}>
              <Typography sx={bodyCard}>Team - 1</Typography>
              <Typography sx={bodyCard}>lahore Team</Typography>
            </Stack>
            <Stack direction={"row"} spacing={6} justifyContent={"center"}>
              <Typography sx={bodyCard}>Team - 2</Typography>
              <Typography sx={bodyCard}>Gujrat Team</Typography>
            </Stack>
            <Stack direction={"row"} spacing={6} justifyContent={"center"}>
              <Typography sx={bodyCard}>Winner</Typography>
              <Typography sx={bodyCard}>Team -2 </Typography>
            </Stack>
          </Stack>
          <Box></Box>
        </Paper>
          </Grid>

          <Grid item lg={4} md={6} sm={12}>
          <Paper sx={paper}>
          <Box sx={paperBox}>
            <Typography sx={titleCard}>Gujrat Cup</Typography>
            <Typography sx={titleCard}>Location</Typography>
            <Typography sx={titleCard}>12/05/2024</Typography>
          </Box>
          <Stack spacing={2} m={2}>
            <Stack direction={"row"} spacing={6} justifyContent={"center"}>
              <Typography sx={bodyCard}>Team - 1</Typography>
              <Typography sx={bodyCard}>lahore Team</Typography>
            </Stack>
            <Stack direction={"row"} spacing={6} justifyContent={"center"}>
              <Typography sx={bodyCard}>Team - 2</Typography>
              <Typography sx={bodyCard}>Gujrat Team</Typography>
            </Stack>
            <Stack direction={"row"} spacing={6} justifyContent={"center"}>
              <Typography sx={bodyCard}>Winner</Typography>
              <Typography sx={bodyCard}>Team -2 </Typography>
            </Stack>
          </Stack>
          <Box></Box>
        </Paper>
          </Grid>
          
          <Grid item lg={4} md={6} sm={12}>
          <Paper sx={paper}>
          <Box sx={paperBox}>
            <Typography sx={titleCard}>Gujrat Cup</Typography>
            <Typography sx={titleCard}>Location</Typography>
            <Typography sx={titleCard}>12/05/2024</Typography>
          </Box>
          <Stack spacing={2} m={2}>
            <Stack direction={"row"} spacing={6} justifyContent={"center"}>
              <Typography sx={bodyCard}>Team - 1</Typography>
              <Typography sx={bodyCard}>lahore Team</Typography>
            </Stack>
            <Stack direction={"row"} spacing={6} justifyContent={"center"}>
              <Typography sx={bodyCard}>Team - 2</Typography>
              <Typography sx={bodyCard}>Gujrat Team</Typography>
            </Stack>
            <Stack direction={"row"} spacing={6} justifyContent={"center"}>
              <Typography sx={bodyCard}>Winner</Typography>
              <Typography sx={bodyCard}>Team -2 </Typography>
            </Stack>
          </Stack>
          <Box></Box>
        </Paper>
          </Grid>
        </Grid>
       
      </Box>
    </div>
  );
};

export default Home;
