import React, { useEffect } from 'react'
import { Button, Grid } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export const Home = () => {
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/")
    }

    useEffect(() => {
        const token = localStorage.getItem("token")
        !token && navigate("/")
    }, [])
    return (
        <React.Fragment>
            <h1>Home</h1>
            <Grid container spacing={3}>
                <Grid item xs={2}>
                    <Button variant='contained' onClick={() => navigate("/")}>Login</Button>
                </Grid>
                <Grid item xs={8}> </Grid>
                <Grid item xs={2}>
                    <Button variant='contained' onClick={handleLogout}>Logout</Button>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}
