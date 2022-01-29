import React, { useState } from "react";
import { Helmet } from "react-helmet";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import Password from "../../components/Input/Password";
import FireBaseAPI from "../../api/FireBaseAPI";
import CopyRight from "../../components/CopyRigth/CopyRight";

const theme = createTheme();

export default function SignUp() {
  let navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [isPwInvalid, setPwInvalid] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [pwMatches, setMachesPassword] = useState(password === confirmPw);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!pwMatches) return;

    const data = new FormData(event.currentTarget);

    const user = {
      name: data.get("firstName"),
      lastName: data.get("lastName"),
      email: data.get("email"),
      password: data.get("password"),
      tel: data.get("tel"),
    };

    FireBaseAPI.saveUser(
      user,
      (response) => {
        navigate("/");
      },
      (error) => {
        let isEmailError = error.message.toString().includes("email");
        let isPwError = error.message.toString().includes("password");

        setEmailError(isEmailError);
        setPwInvalid(isPwError);
      }
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <Helmet title="Shop UI5 - Sign Up" />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: "25px",
            marginTop: 5,
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  type="email"
                  error={emailError}
                  helperText={
                    emailError
                      ? "Email already in use"
                      : "We will never share your email with anyone else"
                  }
                  onChange={() => {
                    setEmailError(false);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="tel"
                  label="Phone Number"
                  type="tel"
                  name="tel"
                  autoComplete="telephone"
                />
              </Grid>
              <Grid item xs={12}>
                <Password
                  value={password}
                  error={isPwInvalid}
                  helper={"Password too weak"}
                  onChange={(e) => {
                    setPassword(e?.target?.value);
                    if (isPwInvalid) setPwInvalid(false);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Password
                  label="Confirm Password"
                  id="confirm-password"
                  value={confirmPw}
                  onChange={(e) => {
                    setConfirmPw(e?.target?.value);
                    setMachesPassword(e?.target?.value === password);
                  }}
                  error={!pwMatches}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <CopyRight sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
