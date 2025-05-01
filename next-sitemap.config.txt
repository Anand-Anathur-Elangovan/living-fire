module.exports = {
    siteUrl: 'https://www.livingfires.com.au',
    generateRobotsTxt: true,
    sitemapSize: 5000,
    exclude: ['/server-sitemap.xml'],
    robotsTxtOptions: {
      policies: [
        {
          userAgent: '*',
          allow: '/',
        },
      ],
    },
  };