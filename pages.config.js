module.exports = {
  data: {
    menus: [
      {
        name: 'Home',
        icon: 'aperture',
        link: 'index.html',
      },
      {
        name: 'Features',
        link: 'features.html',
      },
      {
        name: 'About',
        link: 'about.html',
      },
      {
        name: 'Contact',
        link: '#',
        children: [
          {
            name: 'Twitter',
            link: 'https://twitter.com/thxl2010',
          },
          {
            name: 'About',
            link: 'https://weibo.com/thxl2010',
          },
          {
            name: 'divider',
          },
          {
            name: 'About',
            link: 'https://github.com/thxl2010',
          },
        ],
      },
    ],
    pkg: require('./package.json'),
    date: new Date(),
  },
};
