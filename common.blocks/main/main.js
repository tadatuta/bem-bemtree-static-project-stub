modules.define('main', ['i-bem__dom', 'BEMHTML', 'objects', 'select'], function(provide, BEMDOM, BEMHTML, Objects, Select) {

provide(BEMDOM.decl(this.name, {
    onSetMod: {
        js: {
            inited: function() {
                var modal = this.findBlockInside('modal'),
                    cars = this.params.cars,
                    car = this.car = cars[Object.keys(cars)[0]],
                    model = this.model = this.car[Object.keys(this.car)[0]];

                Select.on(this.elem('car'), 'change', function(e) {
                    this.onSelectChange(e, 'model', 'car', cars);
                    this.onSelectChange(e, 'year', 'model', this.car);
                }, this);

                Select.on(this.elem('model'), 'change', function(e) {
                    this.onSelectChange(e, 'year', 'model', this.car);
                }, this);

                Select.on(this.elem('year'), 'change', function(e) {
                    var year = e.target.getVal(),
                        colors = this.model[year].colors;

                    modal
                        .setContent('<p>Варианты цветов</p>' +
                            (Object.keys(colors).map(function(color) {
                                return color + ': ' + colors[color];
                            }).join('<br>')))
                        .setMod('visible');
                }, this);
            }
        }
    },
    onSelectChange: function(e, name, field, data) {
        var select = e.target,
            val = select.getVal(),
            option = this[field] = data[val];

        if (Objects.isEmpty(option)) {
            return BEMDOM.update(this.elem(name), '');
        }

        BEMDOM.update(this.elem(name), BEMHTML.apply(this.buildSelect(name, option)));
    },
    buildSelect: function(name, options) {
        return {
            block : 'select',
            mods : { mode : 'radio', theme : 'islands', size : 'xl' },
            mix : { block: this.block, elem: name },
            name : name,
            val : options[0],
            options : Object.keys(options).map(function(val) {
                return { val : val, text : val };
            })
        };
    }
}));

});
