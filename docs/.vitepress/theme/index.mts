import DefaultTheme from "vitepress/theme";
import "./style/index.css";
import { h } from "vue";
import BackToTop from "./components/BackToTop.vue";

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      // 指定组件使用doc-footer-before插槽
      "doc-footer-before": () => h(BackToTop),
    });
  },
};
