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
