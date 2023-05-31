import { Button, Card, CardContent, TextField, Grid, Alert } from "@mui/material";
import React from "react";
import axios from "axios"
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { validation } from "../Validation/LoginValidation";

export const Login = () => {
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");

  let a = "";
  const [error, setError] = useState({});
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    const result = await axios.post("http://localhost:2525/login", values)
    if (result.data.msg === "ok") {
      navigate("/home")
      localStorage.setItem("token", result.data.token)
    } else {
      setMsg(result.data.msg)
    }
    e.preventDefault();
    setError(validation(values));
  }
  // console.log(error, "===>");
  useEffect(() => {
    const token = localStorage.getItem("token")
    token && navigate("/home")
  }, [])
  return (
    <React.Fragment>
      <form>
        <Card style={{ width: "300px", marginLeft: "35%", marginTop: "100px" }}>
          <CardContent align="center">
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <h1>Employee Login </h1>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  type="text"
                  placeholder="Enter email"
                  name="email"
                  onChange={handleChange}
                />

                {error && <p style={{ color: "red" }}>{error.email}</p>}
                {/* {error?<p style={{color:"red"}}>{error.email}</p>:""} */}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  type="password"
                  placeholder="Enter Password"
                  name="password"
                  onChange={handleChange}
                />
                {error && <p style={{ color: "red" }}>{error.password}</p>}
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" type="submit" onClick={handleSubmit}>
                  Login
                </Button>
              </Grid>
              <Grid item xs={12}>{msg !== "" && <Alert severity="error">{msg}</Alert>}</Grid>
              <Grid item xs={12}>
                <p>
                  Don't have an account? <a href="/register">Register here</a>
                </p>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </form>
    </React.Fragment >
  );
};