const path = require('path');
module.exports = ({
  contentPath = 'content/data',
  basePath = '/',
  assetPath = 'content/assets',
  toolPath = 'content/tools',
  mdx = true,
}) => {
  return {
    siteMetadata: {
      title: `Gatsby Theme Auth App`,
      author: `Name Placeholder`,
      description: `Description placeholder`,
      copyright: `This is to insert a copyright message`,
      loginDesc: 'Login / Signup',
      isAuthApp: true,
      social: {
        facebook: 'altcampus',
        twitter: 'altcampus',
        github: 'ethriel3695',
        email: 'test@example.com',
      },
      externalLinks: [''],
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
          path: contentPath || `content/data`,
          name: contentPath || `content/data`,
        },
      },
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          path: assetPath || `content/assets`,
          name: assetPath || `content/assets`,
        },
      },
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          path: toolPath || `content/tools`,
          name: toolPath || `content/tools`,
        },
      },
      {
        resolve: `gatsby-plugin-page-creator`,
        options: {
          path: path.join(__dirname, `src`, `pages`),
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
      'gatsby-transformer-sharp',
      'gatsby-plugin-emotion',
      'gatsby-plugin-theme-ui',
      'gatsby-plugin-material-ui',
      'gatsby-plugin-react-helmet',
      'gatsby-plugin-twitter',
    ].filter(Boolean),
  };
};
