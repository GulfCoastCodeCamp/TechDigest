import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"

class BlogIndex extends React.Component {
  badge = {
    display: "inline-block",
    padding: ".4em .7em",
    fontSize: "70%",
    fontWeight: "700",
    lineHeight: 1,
    textAlign: "center",
    whiteSpace: "nowrap",
    verticalAlign: "baseline",
    borderRadius: "25rem",
    transition:
      "color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out",
    color: "#fff",
    backgroundColor: "#007bff",
    marginRight: "5px",
    textTransform: "capitalize",
  }

  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allArticles.edges

    return (
      <Layout
        location={this.props.location}
        title={siteTitle}
        image={data.file.childImageSharp.fixed}
      >
        <SEO
          title={siteTitle}
          keywords={[`blog`, `gatsby`, `tech`, `digest`]}
        />
        {posts.map(({ node }) => {
          const title = node.Title || "default "
          const tags = node.Tags.split(",")
          return (
            <div key={node.RowKey}>
              <h3
                style={{
                  marginBottom: rhythm(1 / 4),
                }}
              >
                <a style={{ boxShadow: `none` }} href={node.Link}>
                  {title}
                </a>
              </h3>
              <small>{node.CreateTime}</small>
              <div style={{float:'right'}}>
                {tags.map(t => {
                  return <span style={{ ...this.badge }}>{t}</span>
                })}
              </div>
              <p>{node.Description}</p>
            </div>
          )
        })}
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    file(relativePath: { eq: "TechDigest.png" }) {
      childImageSharp {
        # Specify the image processing specifications right in the query.
        # Makes it trivial to update as your page's design changes.
        fixed(width: 600, height: 200) {
          ...GatsbyImageSharpFixed
        }
      }
    }
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
`
