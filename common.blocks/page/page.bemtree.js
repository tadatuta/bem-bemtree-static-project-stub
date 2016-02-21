block('page').content()(function() {
    return [
        {
            block: 'header'
        },
        {
            block: 'main',
            mods: { type: this.data.type }
        },
        {
            block: 'footer'
        }
    ];
});
