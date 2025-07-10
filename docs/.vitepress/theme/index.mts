import DefaultTheme from "vitepress/theme";
import "./style/index.css";
import { h } from "vue";
import BackToTop from "./components/BackToTop.vue";
import ArticleMetadata from "./components/ArticleMetadata.vue";
import "virtual:group-icons.css"; //代码组样式

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // 注册全局组件
    app.component("ArticleMetadata", ArticleMetadata);
  },
  Layout() {
    return h(DefaultTheme.Layout, null, {
      // 指定组件使用doc-footer-before插槽
      "doc-footer-before": () => h(BackToTop),
    });
  },
};
