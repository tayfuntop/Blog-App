import React, { useState, useEffect } from "react";
import { makeStyles } from 'tss-react/mui';
import { CssBaseline, Container, Grid, AppBar, Toolbar, Typography, Button, IconButton } from "@mui/material";
import PenIcon from '@mui/icons-material/Create';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import PostsList from "./components/PostsList";
import AddPostForm from "./components/AddPostForm";
import PostDetails from "./components/PostDetails";
import { fetchPosts } from "./redux/actions/post";

const useStyles = makeStyles()((theme) => {
    return {
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
        container: {
            marginTop: theme.spacing(3),
        },
        body: {
            backgroundColor:"#f4f4f4",
        },
        header: {
            backgroundColor: "#f9f9f9",
        }
    };
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

const App = connect(
    mapDispatchToProps
)(
    ({ dispatch }) => {

        useEffect(() => {
            dispatch(fetchPosts());
        }, [dispatch])

        const [open, setOpen] = useState(false);
        const { classes } = useStyles();

        const handleOpen = () => {
            setOpen(true);
        };
        const handleClose = () => {
            setOpen(false);
        };

        return (
            <div className={classes.body}>
                <CssBaseline />
                <Container maxWidth="lg">
                    <AppBar position="sticky" color="inherit" className={classes.header} elevation={0}>
                        <Toolbar>
                            <IconButton edge="start" className={classes.container} color="inherit" />
                            <Typography variant="h6" color="secondary" className={classes.title}>
                                <a href="http://localhost:3000">Blogify</a>
                            </Typography>
                            <Button color="primary" variant="outlined"
                                startIcon={<PenIcon />}
                                onClick={handleOpen}
                            >
                                Yeni Yazı
                            </Button>
                        </Toolbar>
                    </ AppBar>
                    <Grid container className={classes.container}>
                        <Grid item xs={12}>
                            <Router>
                                <Routes>
                                    <Route path="/" element={<PostsList />} />
                                    <Route path="/:id" element={<PostDetails />} />
                                </Routes>
                            </Router>
                        </Grid>
                    </Grid>
                </Container>
                <AddPostForm open={open} handleClose={handleClose} />
            </div>
        );
    });

export default App;
