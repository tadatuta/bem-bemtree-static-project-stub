block('main').mod('type', 'info').content()(function() {
    return [
        {
            content: 'Это инфо-страница'
        },
        this.data.content
    ]
});
