import {
  Box,
  Button,
  Grid,
  Link,
  Paper,
  TextField,
  Typography,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Toast from "../sweetalert/SweetAlert";

const getDataFromLS = () => {
  const data = localStorage.getItem("userList");
  if (data) {
    return JSON.parse(data);
  } else {
    return [];
  }
};

function SignUp() {
  const navigate = useNavigate();
  const [status, setStatus] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [users, setUsers] = useState(getDataFromLS());

  useEffect(() => {
    localStorage.setItem("userList", JSON.stringify(users));
  }, [users]);

  const regOnSubmit = (data) => {
    const { name, phone, email, proffession, password, confirmPassword } = data;
    if (name && phone && email && password && password === confirmPassword) {
      const user = users?.filter(
        (data) => data.email === email || data.phone === phone
      );
      if (user.length !== 0) {
        Toast.fire({
          icon: "error",
          title: "User already exists",
        });
      } else {
        const id = Math.random().toString(36).slice(2);
        const newUser = {
          id,
          name,
          phone,
          email,
          proffession,
          password,
        };
        setUsers([...users, newUser]);
        Toast.fire({
          icon: "success",
          title: "User registered successfully",
        });
        setStatus(true);
      }
    } else {
      Toast.fire({
        icon: "error",
        title: "Invalid Credentials",
      });
    }
  };

  useEffect(() => {
    if (status === true) {
      navigate('/')
    }
  }, [status])

  const handleSignIn = () => {
    navigate("/");
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Box>
          <Paper
            sx={{
              elevation: 5,
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              padding: 3,
              height: "auto",
              width: { xs: 280, sm: 320 },
              margin: { xs: "25% auto", sm: "8% auto" },
              borderRadius: "10px",
            }}
          >
            <h2
              style={{
                marginBottom: 15,
                fontFamily: "Poppins,sans-serif",
                textAlign: "center",
                marginTop: 15,
              }}
            >
              JOIN NOW
            </h2>
            <form onSubmit={handleSubmit(regOnSubmit)} autoComplete="off">
              <TextField
                name="name"
                type="string"
                {...register("name", {
                  required: "This field is required",
                  minLength: {
                    value: 4,
                    message: "Please enter atleast 4 characters",
                  },
                  pattern: {
                    value: /^[a-zA-Z][a-zA-Z][a-zA-Z ]*$/,
                    message: "Please enter a valid name",
                  },
                })}
                error={!!errors?.name}
                helperText={errors?.name ? errors.name.message : null}
                variant="outlined"
                sx={{ color: "", mb: 1.2 }}
                size="small"
                label="Fullname"
                fullWidth
                placeholder="Enter Fullname"
              />
              <TextField
                name="email"
                type="email"
                {...register("email", {
                  required: "This field is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Please enter a valid email",
                  },
                })}
                error={!!errors?.email}
                helperText={errors?.email ? errors.email.message : null}
                variant="outlined"
                sx={{ color: "", mb: 1.2 }}
                size="small"
                label="Email"
                fullWidth
                placeholder="Enter Email"
              />
              <TextField
                name="phone"
                type="string"
                {...register("phone", {
                  required: "This field is required",
                  pattern: {
                    value: /^\d{10}$/,
                    message: "Please enter a valid phone number",
                  },
                })}
                error={!!errors?.phone}
                helperText={errors?.phone ? errors.phone.message : null}
                variant="outlined"
                sx={{ color: "", mb: 1.2 }}
                size="small"
                label="Phone"
                fullWidth
                placeholder="Enter Phone"
              />
              <TextField
                name="password"
                type="password"
                {...register("password", {
                  required: "This field is required",
                  minLength: {
                    value: 4,
                    message: "Password must be more than 4 characters",
                  },
                })}
                error={!!errors?.password}
                helperText={errors?.password ? errors.password.message : null}
                variant="outlined"
                sx={{ color: "", mb: 1.2 }}
                size="small"
                label="Password"
                fullWidth
                placeholder="Enter Password"
              />
              <TextField
                name="confirmPassword"
                type="password"
                {...register("confirmPassword", {
                  required: "This field is required",
                  minLength: {
                    value: 4,
                    message: "Password must be more than 4 characters",
                  },
                })}
                error={!!errors?.confirmPassword}
                helperText={
                  errors?.confirmPassword
                    ? errors.confirmPassword.message
                    : null
                }
                variant="outlined"
                sx={{ color: "", mb: 1.2 }}
                size="small"
                label="Confirm Password"
                fullWidth
                placeholder="Confirm Password"
              />
              <InputLabel id="demo-simple-select-label">Proffesion</InputLabel>
              <Select
                sx={{ mb: 1.2 }}
                fullWidth
                {...register("Proffesion", {
                  required: "This field is required",
                })}
                error={!!errors?.password}
                helperText={errors?.password ? errors.password.message : null}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Proffesion"
                name='Proffesion'
              >
                <MenuItem value={'Software Engineer'}>Software Engineer</MenuItem>
                <MenuItem value={'Accountant'}>Accountant</MenuItem>
                <MenuItem value={'Agriculture'}>Agriculture</MenuItem>
              </Select>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="small"
                sx={{
                  margin: "0 auto",
                  fontSize: { xs: "0.8rem", sm: "1rem" },
                  mb: 2,
                }}
              >
                Submit
              </Button>
            </form>
            <Typography textAlign="center" fontFamily="Poppins,san-serif">
              already have an account?{" "}
              <Link
                onClick={handleSignIn}
                sx={{ color: "blue", cursor: "pointer" }}
              >
                Sign IN
              </Link>
            </Typography>
          </Paper>
        </Box>
      </Grid>
    </Grid>
  );
}

export default SignUp;
