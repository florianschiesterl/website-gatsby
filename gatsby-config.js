module.exports = {
  siteMetadata: {
   title: `Floschie`,
   siteUrl: `https://florianschiesterl.com`,
   description: `Blazing fast modern site generator for React`,
 },
  plugins: [
    "gatsby-plugin-image",
    "gatsby-plugin-sitemap",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
  ],
};
