hexo.extend.filter.register('theme_inject', function (injects) {
    injects.head.file('aplayer', 'source/_data/APlayer.njk', {aplayer: hexo.theme.config.aplayer});
});