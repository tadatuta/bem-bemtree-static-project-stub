[
    {
        shouldDeps : [
            'objects',
            {
                block : 'select',
                mods : { mode : 'radio', theme : 'islands', size : 'xl' }
            },
            {
                block: 'modal',
                mods: { theme: 'islands', autoclosable : true }
            }
        ]
    },
    {
        tech : 'js',
        shouldDeps : {
            block : 'select',
            mods : { mode : 'radio', theme : 'islands', size : 'xl' },
            tech : 'bemhtml'
        }
    }
]
