import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allArticles.edges

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title={siteTitle}
          keywords={[`blog`, `gatsby`, `tech`, `digest`]}
        />
        {posts.map(({ node }) => {
          const title = node.Title || "default "
          const tags = node.Tags.split(',')
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
              <p>{node.Description}</p>
              <div>
                {tags.map( t=>{
                  return (<span style={{marginRight:'5px'}}>{t}</span> )
                })}
              </div>

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
