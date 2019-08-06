module.exports = {
  "presets": [
    "@babel/env",
    "@babel/flow"
  ],
  "plugins": [
    "@babel/plugin-proposal-export-namespace-from",
    "@babel/plugin-syntax-export-namespace-from",
    ["import-graphql", { runtime: true }]
  ]
};