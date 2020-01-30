import React from 'react';
import Img from 'gatsby-image';
import { Link } from 'gatsby';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Layout from './layout';
import SEO from './seo';
import { Button } from '@material-ui/core';

export default function HomeNoAuth({
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
  sections,
}) {
  let pageDetails = null;
  const requiresAuth = false;
  if (hero) {
    pageDetails = (
      <Grid container>
        <Grid item xs={12} key={`heroContainer`}>
          <Img
            fluid={hero.childImageSharp.fluid}
            style={{
              height: '70vh',
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
      <div style={{ padding: 20 }}>
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
        {sections.map(section => (
          <div key={`session-${section.slug}`}>
            <h2>{section.title}</h2>
            {section.item.map((sec, index) => (
              <button key={`${sec.title}-${index}`}>
                <a href={sec.link} target="_blank">
                  {sec.subHeader}
                </a>
              </button>
            ))}
          </div>
        ))}
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
      isAuthenticated={false}
      loginWithRedirect={false}
      logout={false}
      requiresAuth={requiresAuth}
    >
      <SEO title="HomeNoAuth" />
      {pageDetails}
    </Layout>
  );
}
