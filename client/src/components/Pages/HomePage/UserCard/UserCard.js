import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import styled from "styled-components";

const styles = {
  card: {},
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    marginBottom: 16,
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
};

const CardTitle = styled.p`
  border-bottom: solid 0.5px rgba(0, 0, 0, 0.3);
  color: rgba(0, 0, 0, 0.5);
  padding-bottom: 5px;
  margin: 5px 0;
`;
const User = styled.p`
  margin: 0 0 15px 0;
`;

function SimpleCard(props) {
  const { classes, user } = props;
  return (
    <Card className={classes.card}>
      <CardContent>
        <CardTitle>User</CardTitle>
        <User>{user.email}</User>
        <CardTitle>Location</CardTitle>
        <User>
          {user.location.address.city},{" "}
          {user.location.address.state || user.location.address.country}
        </User>
      </CardContent>
    </Card>
  );
}

export default withStyles(styles)(SimpleCard);
