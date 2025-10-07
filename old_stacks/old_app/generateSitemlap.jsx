const { SitemapStream, streamToPromise } = require("sitemap");
const { createWriteStream } = require("fs");

const generateSitemap = async () => {
  const sitemap = new SitemapStream({ hostname: "https://cptsdesmauges.fr" });
  const writeStream = createWriteStream("./public/sitemap.xml");

  sitemap.pipe(writeStream);

  sitemap.write({ url: "/", changefreq: "daily", priority: 1.0 });
  sitemap.write({ url: "/politique-de-confidentialite", changefreq: "monthly", priority: 0.8 });

  sitemap.end();

  await streamToPromise(sitemap);
  console.log("Sitemap généré avec succès !");
};

generateSitemap();
