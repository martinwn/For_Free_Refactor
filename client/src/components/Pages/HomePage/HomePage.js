import React from "react";
import styled from "styled-components";
import Grid from "@material-ui/core/Grid";
import CategoryList from "./CategoryList/CategoryList";
import UserCard from "./UserCard/UserCard";
import AppBar from "../../AppBar/AppBar";

const PageWrapper = styled.div`
  background: rgba(230, 230, 230, 1);
  max-width: 100%;
  min-height: 100%;
`;

const ContentWrapper = styled.div`
  padding: 20px;
`;

const FakeDiv = styled.div`
  background: pink;
  height: 400px;
  width: 300px;
`;

const HomePage = ({
  user,
  checked,
  categories,
  handleToggle,
  spacing,
  handleLogout
}) => {
  return (
    <PageWrapper>
      <AppBar handleLogout={handleLogout} currentPage="Home" />
      <ContentWrapper>
        <Grid
          container
          alignItems="flex-start"
          spacing={spacing}
          style={{ position: "sticky", top: 55 }}
        >
          <Grid item xs={12} md={3} style={{ position: "sticky", top: 55 }}>
            <CategoryList
              checked={checked}
              handleToggle={handleToggle}
              categories={categories}
            />
          </Grid>
          <Grid item md={6}>
            <h1>Posts</h1>
            <FakeDiv>
              <img
                style={{
                  maxHeight: 512
                  //   width: 400,
                  //   // crop: "pad",
                  //   // background: "black"
                }}
                src="http://res.cloudinary.com/daa3lqmub/image/upload/c_scale,w_400/v1539194972/h9okskdpxsqkgyv46lvn.jpg"
              />
            </FakeDiv>
            <FakeDiv />
            <FakeDiv />
          </Grid>
          <Grid style={{ position: "sticky", top: 55 }} item md={3}>
            <UserCard user={user} />
          </Grid>
        </Grid>
      </ContentWrapper>
    </PageWrapper>
  );
};

export default HomePage;
