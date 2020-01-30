const path = require('path');
module.exports = ({
  contentPath = 'content/post',
  basePath = '/',
  assetPath = 'content/assets',
  mdx = true,
}) => {
  return {
    siteMetadata: {
      title: `Gatsby Theme Auth App`,
      author: `Name Placeholder`,
      description: `Description placeholder`,
      greeting: `test`,
      copyright: `This is to insert a copyright message`,
      loginDesc: 'Login / Signup',
      isAuthApp: true,
      newsletterTitle: '',
      newsletterURL: '',
      social: {
        facebook: 'altcampus',
        twitter: 'altcampus',
        github: 'ethriel3695',
        email: 'test@example.com',
      },
      externalLinks: [{ label: '', link: '' }],
    },
    plugins: [
      mdx && {
        resolve: `gatsby-plugin-mdx`,
        options: {
          extensions: [`.mdx`, `.md`],
          defaultLayouts: {
            default: require.resolve('./src/components/layout.js'),
          },
          gatsbyRemarkPlugins: [
            {
              resolve: `gatsby-remark-images`,
              options: {
                // should this be configurable by the end-user?
                maxWidth: 1380,
                linkImagesToOriginal: false,
              },
            },
            { resolve: `gatsby-remark-copy-linked-files` },
            { resolve: `gatsby-remark-numbered-footnotes` },
            { resolve: `gatsby-remark-smartypants` },
          ],
          remarkPlugins: [require(`remark-slug`)],
        },
      },
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          path: contentPath,
          name: contentPath,
        },
      },
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          path: assetPath,
          name: assetPath,
        },
      },
      {
        resolve: 'gatsby-transformer-json',
        options: {
          typeName: 'Navigation',
        },
      },
      {
        resolve: 'gatsby-plugin-sharp',
        options: {
          useMozJpeg: false,
          stripMetadata: false,
          defaultQuality: 75,
        },
      },
      {
        resolve: 'gatsby-source-contentful',
        options: {
          spaceId: 'i3pdc6ly2fb3',
          accessToken: 'jl0avUAUNWSm5oecBUdrQ5LiORLau_gzfs6LFnbgVyc',
        },
      },
      'gatsby-transformer-sharp',
      'gatsby-plugin-emotion',
      'gatsby-plugin-theme-ui',
      'gatsby-plugin-material-ui',
      'gatsby-plugin-react-helmet',
    ].filter(Boolean),
  };
};
