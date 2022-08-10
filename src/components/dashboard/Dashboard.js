import { Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Grid, Modal, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './Dashboard.css'
function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState({})
  const [movies, setMovies] = useState([])
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const fetchData = async () => {
    const body = {
      category: "movies",
      language: "kannada",
      genre: "all",
      sort: "voting"
    }
    const { data } = await axios.post('https://hoblist.com/api/movieList', body);
    console.log(data.result);
    setMovies(data.result)
  }

  useEffect(() => {
    fetchData();
    const token = localStorage.getItem("usertoken")
    const userData = localStorage.getItem("userData")
    const parsedData = JSON.parse(userData)
    if (!token) {
      navigate('/')
    } else {
      setUser(parsedData)
    }
  }, [navigate])

  return (
    <Box width="100%" className="Dashboard" >
      <Button
                variant="contained"
                color="secondary"
                size="small"
                onClick={handleOpen}
                sx={{
                  ml: 2,
                  mb:2,
                  color: "text.primary",
                  display: "block",
                  fontSize: {
                    xs: "1rem",
                    md: "1rem",
                  },
                }}
              >
                Company Info
              </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Company Info
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <h2 className="modal-desrkey">Company: </h2>
            <h2 className="modal-desrval">Geeksynergy Technologies Pvt Ltd</h2>
            <br /> <br />
            <h2 className="modal-desrkey">Address: </h2>
            <h2 className="modal-desrval">Sanjayanagar, Bengaluru-56</h2>
            <br /> <br />
            <h2 className="modal-desrkey">Phone: </h2>
            <h2 className="modal-desrval">XXXXXXXXX09</h2>
            <br /> <br />
            <h2 className="modal-desrkey">Email:</h2>
            <h2 className="modal-desrval"> XXXXXX@gmail.com</h2>
          </Typography>
        </Box>
      </Modal>
      {movies && movies.map((movie) => (
        <Card sx={{ width: 650, paddingBottom: 2, marginBottom: 2 }}>
          <Grid container >
            <Grid xs={2}>
              <Box className="voting-box">
              <ArrowDropUpIcon sx={{fontSize:60}} />
              <h2 className="movie-votes">{movie.voting}</h2>
              <ArrowDropDownIcon sx={{fontSize:60}} />
              <p style={{marginBottom:''}}>Votes</p>
              </Box>
            </Grid>
            <Grid xs={3}>
              <CardMedia
                component="img"
                height="250"
                className="movie-image"

                image={movie.poster}
                alt="Paella dish"
              />
            </Grid>
            <Grid xs={6}>
              <>


                <CardHeader
                  title={movie.title}
                />

                <CardContent>
                  <h3 className="movie-key">Genre: </h3>
                  <h3 className="movie-value">{movie.genre}</h3>
                  <br />
                  <br />
                  <h3 className="movie-key">Director: </h3>
                  <h3 className="movie-value">{movie.director[0]}</h3>
                  <br />
                  <br />
                  <h3 className="movie-key">Starring: </h3>
                  <h3 className="movie-value">{movie.stars}</h3>
                  <br />
                  <br />
                  <h3 className="movie-value">Mins</h3>
                  <h3 className="movie-value"> | </h3>
                  <h3 className="movie-value">{movie.language}</h3>
                  <br />
                  <br />
                  <h3 className="movie-views">{movie.pageViews} </h3>
                  <h3 className="movie-views">Views | Voted by </h3>
                  <h3 className="movie-views">{movie.totalVoted} </h3>
                  <h3 className="movie-views">People </h3>

                </CardContent>
                <CardActions disableSpacing>

                </CardActions>
              </>
            </Grid>
          </Grid>
          <Box m={2} >
            <Button className="Watchtrailer-button" variant="contained">Watch Trailer</Button>
          </Box>
        </Card>
      ))}
    </Box>
  );
}

export default Dashboard;

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};