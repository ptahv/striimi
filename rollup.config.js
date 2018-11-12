import nodeResolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import replace from 'rollup-plugin-replace'
import { terser } from 'rollup-plugin-terser'

export default [
    {
        input: 'src/index.js',
        output: {
          file: 'dist/striimi.js',
          format: 'umd',
          name: 'striimi',
          indent: false
        },
        plugins: [
          nodeResolve({
            jsnext: true
          }),
          babel({
            exclude: 'node_modules/**'
          }),
          replace({
            'process.env.NODE_ENV': JSON.stringify('development')
          })
        ]
    }, {
        input: 'src/index.js',
        output: {
            file: 'dist/striimi.min.js',
            format: 'umd',
            name: 'striimi',
            indent: false
        },
        plugins: [
            nodeResolve({
                jsnext: true
            }),
            babel({
                exclude: 'node_modules/**'
            }),
            replace({
                'process.env.NODE_ENV': JSON.stringify('production')
            }),
            terser({
                compress: {
                    pure_getters: true,
                    unsafe: true,
                    unsafe_comps: true,
                    warnings: false
                }
            })
        ]
    }
]
    
