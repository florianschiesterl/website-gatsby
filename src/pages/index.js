import React from "react";
import { Helmet } from "react-helmet";
import Photos from "../components/Photos";
import Layout from "../components/Layout";
import { graphql } from "gatsby";

const IndexPage = ({ data }) => {
  return (
    <Layout>
      <Helmet
        htmlAttributes={{ lang: "en" }}
      >
        <title>Florian Schiesterl — Photographer & UX designer in Vienna</title>
        <meta
          name="description"
          content="Street photography by Florian Schiesterl, a photographer and UX designer based in Vienna."
        />
        <link rel="canonical" href="https://floschie.com/" />
      </Helmet>
      <Photos data={data} />
    </Layout>
  );
};

export const query = graphql`
  query ImagesHome {
    images: allFile(
      filter: { relativeDirectory: { eq: "odyssey" } }
      sort: { relativePath: ASC }
    ) {
      nodes {
        id
        name
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
