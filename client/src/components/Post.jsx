import React from 'react'
import moment from "moment";
import { Link } from "react-router-dom";
import { makeStyles } from 'tss-react/mui';
import { Card, Chip, Button, CardMedia, CardContent, CardActions, Typography } from "@mui/material";

const useStyles = makeStyles()((theme) => {
    return {
        root: {
            maxWidth: 374,
            position: "relative",
        },
        media: {
            height: 0,
            paddingTop: "56.25%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            backgroundBlendMode: "darken",
        },
        overplay: {
            position: "absolute",
            top: "20px",
            left: "20px",
            color: "#fff",
        },
        chip: {
            marginTop: theme.spacing(1),
        },
        breakword: {
            wordBreak: "break-word",
        }
    }
});

const Post = ({ _id, title, subtitle, content, tag, image, createdAt }) => {

    const convertRelativeTime = date => {
        return moment(date).fromNow();
    }
    const { classes } = useStyles();

    return (
        <Card className={classes.root}>
            <CardMedia className={classes.media} image={image} title="Resim" />
            <div className={classes.overplay}>
                <Typography variant="h6">Tayfun</Typography>
                <Typography variant="body2">
                    {convertRelativeTime(createdAt)}
                </Typography>
            </div>
            <CardContent>
                <Typography variant="h6" component="p" gutterBottom>
                    {title.substring(0, 60) + (title.length > 60 ? "..." : "")}
                </Typography>
                <Typography variant="overline" component="p" gutterBottom>
                    {subtitle.substring(0, 70) + (subtitle.length > 70 ? "..." : "")}
                </Typography>
                <Typography className={classes.breakword} variant="body2" component="p" gutterBottom>
                    {content.substring(0, 240) + (content.length > 240 ? "..." : "")}
                </Typography>
                <Chip label={` # ${tag}`} variant="outlined" className={classes.chip} />
            </CardContent>
            <CardActions>
                <Button size="small" color="primary">
                    <Link to={`/${_id}`}>DAHA FAZLA..</Link>
                </Button>
            </CardActions>
        </Card>
    )
}

export default Post