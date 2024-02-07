import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Grid,
  Typography,
  Link,
  AppBar,
  Toolbar,
} from "@mui/material";
import icon from "../../images/appicon.png";
import axios from "axios";
import { BASE_URL } from "../../variables";
import { useStore } from "../../store/store";

function LoginScreen({ handleMessage }) {
  const userId = useStore((state) => state.userId);
  const updateUserId = useStore((state) => state.updateUserId);

  const isAdmin = useStore((state) => state.isAdmin);
  const updateIsAdmin = useStore((state) => state.updateIsAdmin);

  const [credentials, setCredentials] = useState({
    username: "",
    password: null,
    password2: null,
  });

  const handleLogin = () => {
    // Logic to handle login
    console.log("Login with:", credentials);
    const payload = {
      user_id: credentials.username,
      password: credentials.password,
    };
    axios
      .get(
        `${BASE_URL}/login?user_id=${credentials.username}&password=${credentials.password}`
      )
      .then((res) => {
        console.log("------login successful------");

        updateIsAdmin(res.data.isAdmin);
        updateUserId(credentials.username);
        handleMessage("Login Successful");
      })
      .catch((err) => {
        console.log("----login error---", err);
        handleMessage("Login Successful!");
        updateIsAdmin(false);
        updateUserId(credentials.username);
      });
  };

  const handleCreateAccount = () => {
    // Create account
    console.log("Create account with:", credentials);
    axios
      .post(`${BASE_URL}/user/register`, {
        user_id: credentials.username,
        password: credentials.password,
        name: credentials.username,
      })
      .then((res) => {
        console.log("------account created successful------");
        setIsCreateAccount(!isCreateAccount);
        updateUserId(credentials.username);
        setCredentials({ username: "", password: null, password2: null });
        handleMessage("Account created and login successful");
      })
      .catch((err) => {
        console.log("----create account error---", err);
        handleMessage("Account creation failed");
      });
  };

  const [isCreateAccount, setIsCreateAccount] = useState(false);

  return (
    <>
      <AppBar position="static" style={{ backgroundColor: "#54989C" }}>
        <Toolbar>
          <img
            src={icon}
            alt="Icon"
            width="40"
            height="40"
            style={{ marginRight: "10px" }}
          />
          <Typography variant="h5" noWrap component="div">
            Ultimate Library
          </Typography>
        </Toolbar>
      </AppBar>
      <div style={{ marginTop: "100px" }}>
        {!isCreateAccount ? (
          <Container component="main" maxWidth="xs">
            <div
              style={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <form style={{ width: "100%", marginTop: 1 }}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  autoFocus
                  value={credentials.username}
                  onChange={(e) => {
                    setCredentials({
                      ...credentials,
                      username: e.target.value,
                    });
                  }}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={credentials.password}
                  onChange={(e) => {
                    setCredentials({
                      ...credentials,
                      password: e.target.value,
                    });
                  }}
                />
                <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  color="primary"
                  style={{
                    margin: "24px 0px 16px",
                    backgroundColor: "#54989C",
                  }}
                  onClick={handleLogin}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item>
                    <Link
                      href="#"
                      variant="body2"
                      onClick={() => {
                        setIsCreateAccount(!isCreateAccount);
                        setCredentials({
                          username: "",
                          password: null,
                          password2: null,
                        });
                      }}
                    >
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </div>
          </Container>
        ) : (
          <Container component="main" maxWidth="xs">
            <div
              style={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography component="h1" variant="h5">
                Create An Account
              </Typography>
              <form style={{ width: "100%", marginTop: 1 }}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  autoFocus
                  value={credentials.username}
                  onChange={(e) => {
                    setCredentials({
                      ...credentials,
                      username: e.target.value,
                    });
                  }}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={credentials.password}
                  onChange={(e) => {
                    setCredentials({
                      ...credentials,
                      password: e.target.value,
                    });
                  }}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password2"
                  label="Re-enter Password"
                  type="password"
                  id="password2"
                  value={credentials.password2}
                  onChange={(e) => {
                    setCredentials({
                      ...credentials,
                      password2: e.target.value,
                    });
                  }}
                  helperText={
                    credentials.password === credentials.password2
                      ? null
                      : "Password doesn't match"
                  }
                  error={
                    credentials.password === credentials.password2
                      ? false
                      : true
                  }
                />
                <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  color="primary"
                  style={{
                    margin: "24px 0px 16px",
                    backgroundColor: "#54989C",
                  }}
                  onClick={handleCreateAccount}
                >
                  Create
                </Button>
                <Grid container>
                  <Grid item>
                    <Link
                      href="#"
                      variant="body2"
                      onClick={() => {
                        setIsCreateAccount(!isCreateAccount);
                        setCredentials({
                          username: "",
                          password: null,
                          password2: null,
                        });
                      }}
                    >
                      {"Already have an account? Sign in"}
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </div>
          </Container>
        )}
      </div>
    </>
  );
}

export default LoginScreen;
