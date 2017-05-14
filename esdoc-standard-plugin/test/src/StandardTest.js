const assert = require('assert');
const path = require('path');
const ESDocCLI = require('esdoc/out/src/ESDocCLI.js').default;

function cli() {
  const cliPath = path.resolve('./node_modules/esdoc/out/ESDocCLI.js');
  const argv = ['node', cliPath, '-c', './test/fixture/esdoc.json'];
  const cli = new ESDocCLI(argv);
  cli.exec();
}

cli();

describe('test standard plugin:', ()=>{
  it('dynamically load plugins', ()=>{
    const plugins = require('../fixture/spy-plugin.js').testTargetPlugins;

    assert.deepEqual(plugins, [
      {name: './src/index.js', option: {
        brand: {
          title: 'My Library'
        },
        manual: {
          files: ['./test/fixture/manual/overview.md']
        },
        test: {
          source: "./test/fixture/test",
          includes: ["Test.js$"]
        }
      }},
      {name: './test/fixture/spy-plugin.js'},
      {name: 'esdoc-lint-plugin', option: {enable: true}},
      {name: 'esdoc-coverage-plugin', option: {enable: true}},
      {name: 'esdoc-accessor-plugin', option: {access: ['public', 'protected', 'private'], autoPrivate: true}},
      {name: 'esdoc-type-inference-plugin', option: {enable: true}},
      {name: 'esdoc-external-ecmascript-plugin'},
      {name: 'esdoc-brand-plugin', option: {title: 'My Library'}},
      {name: 'esdoc-undocumented-identifier-plugin', option: {enable: true}},
      {name: 'esdoc-unexported-identifier-plugin', option: {enable: false}},
      {name: 'esdoc-integrate-manual-plugin', option: {
        coverage: true,
        files: ['./test/fixture/manual/overview.md']
      }},
      {name: 'esdoc-integrate-test-plugin', option: {
        source: "./test/fixture/test",
        interfaces: ["describe", "it", "context", "suite", "test"],
        includes: ["Test.js$"],
        excludes: ["\\.config\\.js$"]
      }},
      {name: 'esdoc-publish-html-plugin'},
    ]);

  });
});
