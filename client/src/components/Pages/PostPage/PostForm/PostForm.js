import React from "react";
import styled from "styled-components";
import { withStyles } from "@material-ui/core/styles";
import "./PostForm.css";
import SwipeableViews from "react-swipeable-views";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Textarea from "react-textarea-autosize";
import DropZone from "./DropZone/DropZone";
import DropDown from "./DropDown/DropDown";

const TitleInput = styled.input`
  font-family: Ubuntu, sans-serif;
  width: 100%;
  font-size: 1.1rem;
  padding: 7px;
  border: solid 2px #e2281b;
  border-top-color: transparent;
  border-bottom-color: transparent;
  border-radius: 5px;
  margin: 10px 0;
  box-sizing: border-box;
  transition: border-top-color ease-in-out 150ms,
    border-bottom-color ease-in-out 150ms;
  background: #fff !important;

  :focus {
    border-top-color: #e2281b;
    border-bottom-color: #e2281b;
  }
`;

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: "100%"
  }
});

class FullWidthTabs extends React.Component {
  state = {
    value: 0
  };

  handleChangeOfTabs = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  render() {
    const {
      classes,
      theme,
      handleChange,
      handleDrop,
      uploadedImage,
      handleRemoveImage,
      handlePostReset,
      handlePostSubmit,
      description,
      title,
      categories,
      category
    } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={this.state.value}
            onChange={this.handleChangeOfTabs}
            indicatorColor="primary"
            textColor="primary"
            fullWidth
          >
            <Tab label="Details" disableRipple />
            <Tab label="Image" disableRipple />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          <TabContainer dir={theme.direction}>
            <DropDown
              category={category}
              handleChange={handleChange}
              categories={categories}
            />

            <TitleInput
              placeholder="Enter Title"
              name="title"
              onChange={handleChange}
              value={title}
            />
            <Textarea
              className="styled-text-area"
              name="description"
              placeholder="Description (optional)"
              onChange={handleChange}
              value={description}
            />
          </TabContainer>
          <TabContainer dir={theme.direction}>
            <DropZone handleDrop={handleDrop} uploadedImage={uploadedImage} />
          </TabContainer>
        </SwipeableViews>
        <CardActions>
          <Button
            variant="outlined"
            color="primary"
            className={classes.button}
            disabled={!uploadedImage || !title || !category}
            onClick={handlePostSubmit}
          >
            Submit
          </Button>
          <Button
            variant="outlined"
            color="primary"
            className={classes.button}
            disabled={!uploadedImage && !title && !description && !category}
            onClick={handlePostReset}
          >
            Reset
          </Button>
          <Button
            variant="outlined"
            color="primary"
            className={classes.button}
            disabled={!uploadedImage}
            onClick={handleRemoveImage}
          >
            Remove Image
          </Button>
        </CardActions>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(FullWidthTabs);
