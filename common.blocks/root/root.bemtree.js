block('root').replace()(function() {
    var data = this.data = this.ctx.data;

    return {
        block: 'page',
        title: data.title,
        head: [
            { elem: 'css', url: '../index.min.css' }
        ],
        scripts: [
            { elem: 'js', url: '../index.min.js' }
        ],
        mods: { theme: 'islands' }
    };
});
