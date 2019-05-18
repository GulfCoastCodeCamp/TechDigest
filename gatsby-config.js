module.exports = {
  siteMetadata: {
    title: `Tech Digest`,
    author: `Xiangdong Zhang`,
    description: `The collection of useful articles.`,
    siteUrl: `https://gctechdigest.netlify.com/`,
    headerImg:`techdigest.png`,
    social: {
      twitter: `@zhangxd6`,
    },
  },
  plugins: [
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        // replace "UA-XXXXXXXXX-X" with your own Tracking ID
        trackingId: "UA-140407374-1",
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allArticles } }) => {
              return allArticles.edges.map(edge => {
                return Object.assign({}, {}, {
                  description: edge.node.Description,
                  date: edge.node.CreateTime,
                  url: edge.node.Link,
                  guid: edge.node.RowKey,
                  custom_elements: [{ "tags": edge.node.Tags }],
                  title:edge.node.Title
                })
              })
            },
            query: `
              {
                allArticles(sort: { fields: [CreateTime], order: DESC }) {
                  edges {
                    node {
                      Title
                      Description
                      CreateTime(formatString: "MMMM DD, YYYY")
                      Link
                      Tags
                      PartitionKey
                      RowKey
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "Tech Digiest's RSS Feed",
          },
        ],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/imgs`,
      },
    },
    {
      resolve: "gatsby-source-azure-storage",
      options:{
        tables:[
          {
            name:"articles"
          }
        ]
        
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        //trackingId: `ADD YOUR TRACKING ID HERE`,
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
  ],
}
