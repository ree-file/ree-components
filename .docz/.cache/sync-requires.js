const { hot } = require("react-hot-loader/root")

// prefer default export if available
const preferDefault = m => (m && m.default) || m


exports.components = {
  "component---cache-dev-404-page-js": hot(preferDefault(require("/Users/xuxinjun/Desktop/yuseiWork/happy-ui/.docz/.cache/dev-404-page.js"))),
  "component---components-alert-index-mdx": hot(preferDefault(require("/Users/xuxinjun/Desktop/yuseiWork/happy-ui/components/alert/index.mdx"))),
  "component---src-pages-404-js": hot(preferDefault(require("/Users/xuxinjun/Desktop/yuseiWork/happy-ui/.docz/src/pages/404.js")))
}

