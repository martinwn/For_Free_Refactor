import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
const moment = require("moment");

const styles = {
  card: {
    width: "80%",
    marginBottom: 40,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  media: {
    height: 300,
    margin: "0, auto"
  }
};

function MediaCard(props) {
  const {
    classes,
    title,
    description,
    image,
    date,
    address,
    id,
    handleDeletePost
  } = props;
  return (
    <Card id={id} className={classes.card}>
      <CardActionArea>
        <CardMedia className={classes.media} image={image} />
        <CardContent style={{ textAlign: "center" }}>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography component="p">{description}</Typography>
          <Typography component="p">
            {address} {moment(date).fromNow()}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions style={{ display: "flex", justifyContent: "center" }}>
        <Button
          size="small"
          onClick={() => handleDeletePost(id)}
          color="primary"
        >
          Delete
        </Button>
        {/* <Button size="small" color="primary">
          Learn More
        </Button> */}
      </CardActions>
    </Card>
  );
}

MediaCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MediaCard);
