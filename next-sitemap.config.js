/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://www.devinfotech.net", // your domain
  generateRobotsTxt: true, // auto-generate robots.txt
  changefreq: "daily",
  priority: 0.7,
  sitemapSize: 5000, // optional
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/" }, // allow all pages
      { userAgent: "*", disallow: ["/admin"] }, // block /admin
    ],
  },
};
