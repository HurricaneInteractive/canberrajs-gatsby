import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { graphql, Link } from "gatsby"

const IndexPage = (props) => {
  const { data } = props
  const { edges: posts } = data.allMarkdownRemark
  return (
    <Layout>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
      <ul>
        {
          posts.filter(post => post.node.frontmatter.title.length > 0).map(({ node: post }, key) => (
            <li key={key}>
              <Link to={post.frontmatter.path}>
                <h3>{post.frontmatter.title} | <em>{post.timeToRead} min read</em></h3>
                <p dangerouslySetInnerHTML={{ __html: post.excerpt }} />
              </Link>
            </li>
          ))
        }
      </ul>
    </Layout>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          excerpt(pruneLength: 150)
          id
          timeToRead
          frontmatter {
            title
            path
          }
        }
      }
    }
  }
`
