import React, { useState, useEffect } from "react";
import { makeStyles } from 'tss-react/mui';
import { connect } from "react-redux";
import { Grid, Button } from "@mui/material"
import Post from "./Post";
import ViewCompactIcon from '@mui/icons-material/ViewCompact';
import AppsIcon from '@mui/icons-material/Apps';

const mapStateToProps = states => {
  return {
    posts: states.postReducer.posts
  }
}

const useStyles = makeStyles()((theme) => {
  return {
    layoutShifter: {
      float: "right",
      margin: theme.spacing(2),
    },
    body: {
      paddingBottom: theme.spacing(5),
    }
  }
})

const PostsList = connect(
  mapStateToProps
)(
  ({ posts }) => {

    const [layout, setLayout] = useState("gridThree")

    const calculeteMd = () => {
      return (layout === "gridFour" && screenSize > 1200) ? 3 : 4;
    }

    const { classes } = useStyles();

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

    return (
      <div className={classes.body}>
        <div className={classes.layoutShifter} hidden={screenSize < 1200 ? true : false}>
          <Button variant="text" size="small" onClick={() => setLayout("gridFour")}>
            <ViewCompactIcon style={{ color: "black", fontSize: 30 }} />
          </Button>
          <Button variant="text" size="small" onClick={() => setLayout("gridThree")}>
            <AppsIcon style={{ color: "black" }} />
          </Button>
        </div>
        <Grid container spacing={2} alignContent="stretch" style={screenSize < 600 ? { display: "flex", alignItems: "center", flexDirection: "column" } : {}}>
          {
            posts.length > 0 &&
            posts.map((post) => (
              <Grid item key={post?._id} xs={12} sm={6} md={calculeteMd()}>
                <Post {...post} />
              </Grid>
            ))
          }
        </Grid>
      </div>
    )
  });

export default PostsList