import { uglify } from 'rollup-plugin-uglify'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from 'rollup-plugin-typescript2'
import json from '@rollup/plugin-json'

// ENV
const isProd = process.env.NODE_ENV === 'prod'

// plugin
const basePlugins = [
    resolve({ browser: true }),
    commonjs(),
    typescript(),
    json(),
]

const devPlugins = [...basePlugins]

const prodPlugins = [...basePlugins, uglify()]

// output
const outputMode = ['es', 'cjs', 'umd']

const output = outputMode.map((mode) => {
    let baseOutput = {
        file: `dist/bundle.${mode}.js`,
        format: mode,
        sourcemap: true,
    }

    if (mode === 'umd') {
        baseOutput = {
            ...baseOutput,
            file: `dist/bundle.js`,
            name: 'thisBundle',
        }
    }

    return baseOutput
})

// final
export default {
    input: 'src/index.ts',
    output,
    plugins: isProd ? prodPlugins : devPlugins,
}
