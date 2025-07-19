# 无限滚动

实现类似于弹幕的无限滚动效果，在鼠标悬停的时候停止滚动。

## 效果

<script setup>
import InfiniteScroll from './code/无限滚动.vue'
import InfiniteScrollA from './code/滚动.vue'
import BlankAreaDemo from './code/处理空白区域.vue'
import TransitionDemo from './code/处理过渡问题.vue'

</script>

<InfiniteScroll />

## 思路

使用 CSS 的 `animation` 属性来实现无限滚动效果。

```css
.row1 {
  animation: scroll 12s linear infinite;
}

@keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
}
```

但是这样会存在几个问题

- 开始滚动后，页面会出现大量的空白区域。
- 滚动动画结束后，滚动元素直接回到了起点，这样会导致用户体验不佳。

<InfiniteScrollA />

这时，我们可以复制一份滚动的元素，将滚动距离设置为 `0%` ~ `-50%` ，这样就可以避免出现空白区域。

<BlankAreaDemo />

同时，因为滚动的元素在滚动 `-50%` 的距离后，重新循环动画，此时动画的起点和终点相同（滚动元素复制了一份，`0%` 的位置和 `-50%` 的位置渲染效果相同），动画就可以无缝滚动起来了。

<TransitionDemo />

## 代码

```vue
<template>
  <div class="tech-stack">
    <div class="scroll-container">
      <div class="scroll-row row1">
        <div class="tags">
          <span>VITE</span>
          <span>WEBPACK</span>
          <span>VUE</span>
          <span>THREEJS</span>
          <span>HTML</span>
          <span>CSS</span>
          <span>REACT</span>
          <span>TYPESCRIPT</span>
          <span>NEXTJS</span>
          <span>NODEJS</span>
        </div>
        <div class="tags" aria-hidden="true">
          <span>VITE</span>
          <span>WEBPACK</span>
          <span>VUE</span>
          <span>THREEJS</span>
          <span>HTML</span>
          <span>CSS</span>
          <span>REACT</span>
          <span>TYPESCRIPT</span>
          <span>NEXTJS</span>
          <span>NODEJS</span>
        </div>
      </div>

      <div class="scroll-row row2">
        <div class="tags">
          <span>VITE</span>
          <span>WEBPACK</span>
          <span>VUE</span>
          <span>THREEJS</span>
          <span>HTML</span>
          <span>CSS</span>
          <span>REACT</span>
          <span>TYPESCRIPT</span>
          <span>NEXTJS</span>
          <span>NODEJS</span>
        </div>
        <div class="tags" aria-hidden="true">
          <span>VITE</span>
          <span>WEBPACK</span>
          <span>VUE</span>
          <span>THREEJS</span>
          <span>HTML</span>
          <span>CSS</span>
          <span>REACT</span>
          <span>TYPESCRIPT</span>
          <span>NEXTJS</span>
          <span>NODEJS</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 无需额外的JavaScript逻辑
</script>

<style scoped>
.tech-stack {
  width: 100%;
  overflow: hidden;
  background: #000;
  padding: 2rem 0;
}

.scroll-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.scroll-row {
  display: flex;
  width: fit-content;
}

.row1 {
  animation: scroll 12s linear infinite;
}

.row1:hover {
  animation-play-state: paused;
}

.row2 {
  animation: scroll-reverse 18s linear infinite;
}

.row2:hover {
  animation-play-state: paused;
}

.tags {
  display: flex;
}

.tags span {
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  color: #fff;
  font-size: 0.9rem;
  white-space: nowrap;
  transition: all 0.3s ease;
  margin: 0 0.5rem;
}

.tags span:hover {
  background: linear-gradient(
    45deg,
    rgba(255, 82, 82, 0.4),
    rgba(82, 82, 255, 0.4)
  );
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.1);
  cursor: pointer;
}

@keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

@keyframes scroll-reverse {
  0% {
    transform: translateX(-50%);
  }
  100% {
    transform: translateX(0);
  }
}
</style>
```
