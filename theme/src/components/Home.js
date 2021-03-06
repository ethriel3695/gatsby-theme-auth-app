import React, { useState, useEffect } from 'react';
import Img from 'gatsby-image';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import PostGrid from './Grid/PostGrid';
import { isAuthenticated } from '../utils/Auth';
import Layout from './layout';
import SEO from './seo';

export default function Home({
  siteTitle,
  siteDescription,
  siteGreeting,
  copyright,
  brand,
  hero,
  loginOption,
  isAuthApp,
  posts,
  slugs,
}) {
  let pageDetails = null;
  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    setIsAuth(isAuthenticated());
  });
  if (hero) {
    pageDetails = (
      <Grid container>
        <Grid item xs={12} key={`heroContainer`}>
          <Img
            fluid={hero.childImageSharp.fluid}
            style={{
              height: '60vh',
              width: '100vw',
              textAlign: 'center',
            }}
          />
        </Grid>
        <Grid item xs={12} key={`textContainer`}>
          <Typography variant="h5" align="center" color="inherit" paragraph>
            {siteDescription}
          </Typography>
          <Typography
            style={{ textAlign: 'center', padding: 10 }}
            variant="body2"
            align="center"
            color="inherit"
            paragraph
          >
            {siteGreeting}
          </Typography>
        </Grid>
      </Grid>
    );
  } else {
    pageDetails = (
      <div>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="inherit"
          gutterBottom
          style={{ padding: 20 }}
        >
          {siteTitle}
        </Typography>
        <Typography variant="h5" align="center" color="inherit" paragraph>
          {siteDescription}
        </Typography>
        <Typography variant="h5" align="center" color="inherit" paragraph>
          {siteGreeting}
        </Typography>
      </div>
    );
  }
  return (
    <Layout
      siteTitle={siteTitle}
      brand={brand}
      hero={hero}
      copyright={copyright}
      loginOption={loginOption}
      isAuthApp={isAuthApp}
      slugs={slugs}
    >
      <SEO title="Home" />
      {isAuth ? (
        <div
          style={{
            overflowX: 'hidden',
            overflowY: 'hidden',
            padding: 15,
          }}
        >
          <Grid container spacing={4}>
            {posts.map((post, index) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={4}
                key={`toolsContainer-${index}`}
              >
                <PostGrid key={post.id} {...post} />
              </Grid>
            ))}
          </Grid>
        </div>
      ) : (
        <div>{pageDetails}</div>
      )}
    </Layout>
  );
}
