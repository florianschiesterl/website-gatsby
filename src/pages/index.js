import React from "react";
import Photos from "../components/Photos";
import Layout from "../components/Layout";
import { graphql } from "gatsby";

const IndexPage = ({ data }) => {
  return (
    <Layout>
      <Photos data={data} />
    </Layout>
  );
};

export const query = graphql`
  query ImagesHome {
    images: allFile(
      filter: { relativeDirectory: { eq: "odyssey" } }
      sort: { fields: relativePath, order: ASC }
    ) {
      nodes {
        id
        childImageSharp {
          fluid(maxWidth: 1600, quality: 90) {
            ...GatsbyImageSharpFluid_noBase64
          }
        }
      }
    }
  }
`;

export default IndexPage;
