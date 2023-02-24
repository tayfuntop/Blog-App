import React, { useEffect, useState } from "react";
import moment from "moment";
import { connect } from "react-redux";
import { makeStyles } from 'tss-react/mui';
import { Divider, Typography, Paper, Button, Chip } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useParams, useNavigate } from "react-router-dom";
import { fetchSinglePost, deletePost } from "../redux/actions/post"
import EditPostForm from "./EditPostForm";


const useStyles = makeStyles()((theme) => {
    return {
        paper: {
            padding: theme.spacing(3),
            marginBottom: theme.spacing(8),
        },
        header: {
            display: "flex",
            justifyContent: "space-between",
        },
        content: {
            marginTop: theme.spacing(3),
        },
        image: {
            width: "100%",
            borderRadius: 5,
            marginTop: theme.spacing(3),
            marginBottom: theme.spacing(4),
        },
        chip: {
            marginTop: theme.spacing(1),
        },
        buttonAria: {
            display: "flex",
            marginLeft: theme.spacing(1),
        },
        button: {
            margin: theme.spacing(1),
            height: 40,
        }
    }
});

const mapStateToProps = states => {
    return {
        currentPost: states.postReducer.currentPost
    };
};

const mapDispatchToProps = (dispatch) => ({ dispatch });

const PostDetails = connect(
    mapStateToProps,
    mapDispatchToProps
)(
    ({ dispatch, currentPost }) => {

        const [editMode, setEditMode] = useState(false);
        const { classes } = useStyles();
        const { id } = useParams();
        const navigate = useNavigate();
        const convertRelativeTime = date => {
            return moment(date).fromNow();
        };
        useEffect(() => {
            dispatch(fetchSinglePost(id));
        }, [dispatch, id]);

        const openEditMode = () => {
            setEditMode(true);
        };

        const closeEditMode = () => {
            setEditMode(false);
        };

        const [screenSize, getDimension] = useState(window.innerWidth);

        const setDimension = () => {
            getDimension(window.innerWidth)
        };

        useEffect(() => {
            window.addEventListener('resize', setDimension);
            return (() => {
                window.removeEventListener('resize', setDimension);
            })
        }, [screenSize])

        const removePost = () => {
            dispatch(deletePost(currentPost._id));
            navigate("/");
        };

        return (
            <Paper className={classes.paper} elevation={0}>
                {
                    editMode ? (
                        <EditPostForm post={currentPost} closeEditMode={closeEditMode} />
                    ) : (
                        <div>
                            <div className={classes.header}>
                                <Typography variant="h5" gutterBottom>
                                    {currentPost?.title}
                                </Typography>
                                <div className={classes.buttonAria} style={screenSize < 500 ? { flexDirection: "column" } : {}}>
                                    <Button onClick={openEditMode} className={classes.button}
                                        color="primary" variant="outlined" startIcon={<EditIcon />}
                                    >
                                        Düzenle
                                    </Button>
                                    <Button onClick={removePost} className={classes.button}
                                        color="secondary" variant="outlined" startIcon={<DeleteIcon />}
                                    >
                                        Sil
                                    </Button>
                                </div>
                            </div>
                            <Divider />
                            <Typography variant="overline" gutterBottom>
                                {currentPost?.subtitle}
                            </Typography>
                            <Typography variant="overline" gutterBottom>
                                {currentPost?.subtitle}
                            </Typography>
                            <Typography variant="caption" component="p">
                                {convertRelativeTime(currentPost?.createdAt)} by Tayfun
                            </Typography>
                            <Chip label={` # ${currentPost?.tag}`} variant="outlined" className={classes.chip} />
                            <div className={classes.content}>
                                <img src={currentPost?.image} alt="Post" className={classes.image} />
                            </div>
                            <Typography variant="body1">
                                {currentPost?.content}
                            </Typography>
                        </div>
                    )
                }
            </Paper>
        )
    }
);

export default PostDetails;