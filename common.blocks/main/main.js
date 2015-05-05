modules.define('main', ['i-bem__dom', 'BEMHTML', 'objects', 'select'], function(provide, BEMDOM, BEMHTML, Objects, Select) {

provide(BEMDOM.decl(this.name, {
    onSetMod: {
        js: {
            inited: function() {
                var cars = this.params.cars,
                    modal = this.findBlockInside('modal'),
                    car = cars[Object.keys(cars)[0]];

                Select.on(this.elem('car'), 'change', function(e) {
                    var select = e.target,
                        val = select.getVal();

                    car = cars[val];

                    if (Objects.isEmpty(car)) {
                        return BEMDOM.update(this.elem('model'), '');
                    }

                    BEMDOM.update(this.elem('model'), BEMHTML.apply({
                        block : 'select',
                        mods : { mode : 'radio', theme : 'islands', size : 'xl' },
                        mix : { block: this.block, elem: 'model' },
                        name : 'model',
                        val : car[0],
                        options : Object.keys(car).map(function(model) {
                            return { val : model, text : model };
                        })
                    }));
                }, this);

                Select.on(this.elem('model'), 'change', function(e) {
                    var model = e.target.getVal(),
                        colors = car[model].colors;

                    modal
                        .setContent('<p>Варианты цветов</p>' +
                            (Object.keys(colors).map(function(color) {
                                return color + ': ' + colors[color];
                            }).join('<br>')))
                        .setMod('visible');
                }, this);
            }
        }
    }
}));

});
