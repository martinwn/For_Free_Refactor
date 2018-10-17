import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
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
  }
};

function MediaCard(props) {
  const { classes, id, email, date, title, handleDeleteNotification } = props;

  return (
    <Card id={id} className={classes.card}>
      <CardActionArea>
        <CardContent style={{ textAlign: "center" }}>
          <Typography gutterBottom variant="h5" component="h2">
            Someone's interested in {title}!
          </Typography>
          <Typography component="p">{moment(date).fromNow()}</Typography>
          {/* <Typography component="p">{address}</Typography> */}
        </CardContent>
      </CardActionArea>
      <CardActions style={{ display: "flex", justifyContent: "center" }}>
        <a href={`mailto:${email}`}>
          <Button size="small" color="primary">
            Reply To User
          </Button>
        </a>
        <Button
          size="small"
          onClick={() => handleDeleteNotification(id)}
          color="primary"
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}

MediaCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MediaCard);
