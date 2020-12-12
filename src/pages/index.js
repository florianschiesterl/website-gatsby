import React from "react";
import Photos from "../components/Photos";
import classNames from "classnames";
import Layout from "../components/Layout";

const IndexPage = () => {
  const classesText = classNames(
    "block text-black dark:text-white text-base spring transition-colors duration-1000 leading-normal"
  );

  return (
    <Layout showSpinner classesText={classesText}>
      <Photos />
    </Layout>
  );
};

export default IndexPage;
