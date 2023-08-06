import { useEffect } from "react";
import {
  Alert,
  Autocomplete,
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { TreeView, TreeItem } from "@mui/lab";
import axios from "axios";

const DOMAIN_NAME = "http://localhost:5000";
const Player = () => {
  //for Toast
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState("");
  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  // Main State for fu functionality
  const [teamName, setTeamName] = useState("");
  const [teamList, setTeamList] = useState([]);
  const [playerList, setPlayerList] = useState([]);
  const [selectPlayer, setSelectPlayer] = useState();
  const [inputPlayer, setInputPlayer] = useState([]);

  const addInputFieldPlayer = () => {
    setInputPlayer((prevList) => [
      ...prevList,
      {
        type: "text",
        value: "",
      },
    ]);
  };
  const handleChange = (e, index) => {
    e.preventDefault();
    const newValue = e.target.value;
    setPlayerList((prevList) => {
      const newList = [...prevList];
      newList[index] = { ...newList[index], value: newValue };
      return newList;
    });
  };
  useEffect(() => {
    console.log(playerList);
  }, [playerList]);
  // Handle AutoComplete for Players
  const handlePlayersList = (event, newValue) => {
    setPlayerList([]);
    setSelectPlayer(newValue);
    setTeamName(newValue.teamName);
    if (newValue.players.length !== 0) {
      setPlayerList(newValue.players);
      setInputPlayer([]);
      // Todo : discuss the Project
      for (let i = 0; i < newValue.players.length; i++) {
        addInputFieldPlayer();
      }
    } else {
      // setPlayerList([]);
      setInputPlayer([]);
    }
  };
  const fetchTeams = async () => {
    try {
      const response = await axios.get(DOMAIN_NAME + "/api/teams");
      setTeamList(response.data);
    } catch (error) {
      console.error("Error fetching teams:", error);
    }
  };
  useEffect(() => {
    fetchTeams();
  }, []);
  // *===============================================
  //  REST END-POINT  FOR TEAM
  //  ===============================================
  // Delete Team
  const handleDeleteTeam = async (id) => {
    try {
      await axios.delete(`${DOMAIN_NAME}/api/teams/${id}`);
      setStatus("Team is Delete Successfully!");
      handleClick();
      setTeamList(teamList.filter((listTeam) => listTeam._id !== id));
    } catch (error) {
      console.error("Error deleting team:", error);
    }
  };
  // *===============================================
  //  REST END-POINT  CRUD for Players
  //  ===============================================
  // Add new Player
  const createPlayer = async () => {
    try {
      const response = await axios.post(
        `${DOMAIN_NAME}/api/teams/player-teams/${teamName}/players`,
        { playerList }
      );
       console.log(response.data)
      // Clear State
      setPlayerList([]);
      setInputPlayer([]);
      // Toast Show ---
      setStatus("New Player Added in " + teamName + " successfully");
      handleClick();
      // for get updated team with players
      fetchTeams();
    } catch (error) {
      throw error.response.data;
    }
  };
  // Delete Any Player
  // const handleDeletePlayer = async (playerId, index) => {
  //   // database store player
  //   if (playerId !== undefined && index) {
  //     try {
  //       const res = await axios.delete(
  //         `${DOMAIN_NAME}/api/teams/player-teams/${teamName}/players/${playerId}`
  //       );
  //       console.log(res.data);
  //       setStatus("Player is Deleted from "+teamName);
  //       handleClick();
  //       const updatedPlayers = playerList.filter(
  //         (player) => player._id !== playerId
  //       );
  //       setPlayerList(updatedPlayers);
  //       // remove Input field
  //       setInputPlayer((prevList) => {
  //         const updatedList = prevList.filter((_, i) => i !== index);
  //         return updatedList;
  //       });

  //       fetchTeams();
  //     } catch (error) {
  //       console.error("Error deleting player:", error);
  //     }
  //   } else if (index !== -1) {
  //     // delete player that are in memory
  //     // Delete Empty felid
  //     console.log("Player index ", index);
  //     setInputPlayer((prevList) => {
  //       const updatedList = prevList.filter((_, i) => i !== index);
  //       return updatedList;
  //     });
  //     setPlayerList((prevList) => {
  //       const updatedList = prevList.filter((_, i) => i !== index);
  //       return updatedList;
  //     });
  //   }
  // };
  const handleDeletePlayer = async (playerId, index) => {
    try {
      if (playerId !== undefined) {
        // Delete player from the database
        const res = await axios.delete(
          `${DOMAIN_NAME}/api/teams/player-teams/${teamName}/players/${playerId}`
        );
        console.log(res.data);
        setStatus("Player is Deleted from " + teamName);
        handleClick();
      }
      // Remove player from the state (whether in database or in-memory)
      setInputPlayer((prevList) => prevList.filter((_, i) => i !== index));
      const updatedPlayers = playerList.filter(
        (player) => player && player._id !== playerId
      );
      setPlayerList(updatedPlayers);
    } catch (error) {
      console.error("Error deleting player:", error);
    }
  };

  return (
    <>
      <Box>
        <Typography variant="h4" fontWeight={700}>
          Add Players in Team
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", py: 2 }} gap={2}>
          <Autocomplete
            disablePortal
            id="Teams-list"
            fullWidth
            options={teamList}
            getOptionLabel={(option) => option.teamName}
            renderInput={(params) => (
              <TextField {...params} label="Team Name" />
            )}
            onChange={handlePlayersList}
          />
          {inputPlayer.map((inputItems, index) => {
            return (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: { md: "flex-start", xs: "center" },
                  width: { md: "50vw", sm: "100%" },
                }}
                gap={2}
              >
                <TextField
                  variant="outlined"
                  label={`Player-${index + 1}`}
                  size="small"
                  value={playerList[index]?.value || ""}
                  name={`Player-${index}`}
                  type={inputItems.type}
                  onChange={(e) => handleChange(e, index)}
                />
                <IconButton
                  onClick={() =>
                    handleDeletePlayer(playerList[index]._id, index)
                  }
                >
                  <CloseIcon />
                </IconButton>
              </Box>
            );
          })}
          {/* List of Register Team in Database  */}
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              variant="contained"
              startIcon={<PersonAddIcon />}
              onClick={addInputFieldPlayer}
            >
              Add Player
            </Button>
            <Button
              variant="contained"
              startIcon={<HowToRegIcon />}
              onClick={createPlayer}
            >
              Save Players
            </Button>
          </Box>
        </Box>
      </Box>
      <Divider />
      <Box sx={{ my: 2 }}>
        <Typography variant="h4" fontWeight={700}>
          Registered Team
        </Typography>
        <Grid container spacing={1} sx={{ mt: 1 }}>
          {teamList.map((team, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Paper
                sx={{
                  p: 1,
                  width: 210,
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "column",
                  boxShadow: 1,
                  "&:hover": {
                    boxShadow: 6,
                    cursor: "pointer",
                  },
                }}
              >
                <Typography variant="h6">{team?.teamName}</Typography>
                <TreeView
                  aria-label="file system navigator"
                  defaultCollapseIcon={<ExpandMoreIcon />}
                  defaultExpandIcon={<ChevronRightIcon />}
                  sx={{
                    flexGrow: 1,
                    overflowY: "auto",
                  }}
                >
                  <TreeItem
                    nodeId="1"
                    label={team.players.length + " Players List "}
                  >
                    {team?.players?.map((item, i) => (
                      <TreeItem
                        nodeId="2"
                        label={i + 1 + " " + item.value}
                        key={i}
                      />
                    ))}
                  </TreeItem>
                </TreeView>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    m: 1,
                    p: 1,
                  }}
                >
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => handleDeleteTeam(team._id)}
                  >
                    Delete
                  </Button>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
      {/* Toast For Error or Status Update Message */}
      <Snackbar
        open={open}
        autoHideDuration={1000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          {status}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Player;
