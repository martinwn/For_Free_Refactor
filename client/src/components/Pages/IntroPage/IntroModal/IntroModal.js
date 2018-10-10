import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const styles = {
  card: {
    minWidth: 275,
    textAlign: "center",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  },
  button: {
    margin: "0 auto"
  }
};

function IntroModal(props) {
  const { classes, headline, content, handleClose } = props;

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="headline" component="h2">
          {headline}
        </Typography>
        <Typography component="p">{content}</Typography>
      </CardContent>
      <CardActions>
        <Button className={classes.button} onClick={handleClose}>
          Close
        </Button>
      </CardActions>
    </Card>
  );
}

IntroModal.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(IntroModal);
