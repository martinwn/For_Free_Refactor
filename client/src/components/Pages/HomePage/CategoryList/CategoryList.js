import React from "react";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import ListSubheader from "@material-ui/core/ListSubheader";

const styles = theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    border: "solid 2px rgba(0,0,0,0.2)",
    borderRadius: "5px",
    overflow: "hidden"
  },
  list: {
    maxHeight: 350,
    width: "100%",
    paddingRight: "17px",
    boxSizing: "content-box",
    overflowY: "scroll"
  },
  subHeader: {
    background: "#fff",
    borderBottom: "solid 0.5px rgba(0,0,0,0.3)"
  }
});

const CategoryList = ({ classes, handleToggle, checked, categories }) => {
  return (
    <div className={classes.root}>
      <List
        className={classes.list}
        subheader={
          <ListSubheader className={classes.subHeader}>
            Categories
          </ListSubheader>
        }
      >
        {categories.map(value => (
          <ListItem
            key={value}
            role={undefined}
            dense
            button
            onClick={() => handleToggle(value)}
            disableRipple
            className={classes.listItem}
          >
            <Checkbox
              color="primary"
              checked={checked.indexOf(value) !== -1}
              tabIndex={-1}
              disableRipple
            />
            <ListItemText
              primary={value}
              style={{ textTransform: "uppercase", letterSpacing: "0.06em" }}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default withStyles(styles)(CategoryList);
