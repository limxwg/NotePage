<template>
  <div class="title">处理过渡问题</div>
  <!-- 动画起点 -->
  <div class="tech-stack">
    <div class="scroll-container-before">动画起点</div>
    <div class="scroll-container">
      <div class="scroll-row row-animation-start">
        <div class="tags">
          <span>VITE</span>
          <span>VUE</span>
        </div>
        <div class="tags">
          <span>VITE</span>
          <span>VUE</span>
        </div>
      </div>
    </div>
    <div class="scroll-container-after"></div>
  </div>
  <!-- 动画终点 -->
  <div class="tech-stack">
    <div class="scroll-container-before">动画终点</div>
    <div class="scroll-container">
      <div class="scroll-row row-animation-end">
        <div class="tags">
          <span>VITE</span>
          <span>VUE</span>
        </div>
        <div class="tags">
          <span>VITE</span>
          <span>VUE</span>
        </div>
      </div>
    </div>
    <div class="scroll-container-after"></div>
  </div>
  <!-- 最终效果 -->
  <div class="tech-stack">
    <div class="scroll-container-before">最终效果</div>
    <div class="scroll-container">
      <div class="scroll-row row1">
        <div class="tags">
          <span>VITE</span>
          <span>VUE</span>
        </div>
        <div class="tags">
          <span>VITE</span>
          <span>VUE</span>
        </div>
      </div>
    </div>
    <div class="scroll-container-after"></div>
  </div>
</template>

<style scoped>
.title {
  margin: 1rem 0;
}
.tech-stack {
  display: flex;
  width: 100%;
  overflow: hidden;
  background: #000;
  padding: 2rem 0;
}

.scroll-container-before,
.scroll-container-after {
  display: flex;
  padding-left: 20px;
  align-items: center;
  color: #ccc;
  flex: 1;
  position: relative;
  z-index: 1;
  backdrop-filter: blur(5px);
}

.scroll-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: fit-content;
  border: 1px dashed #999;
  background: rgba(255, 255, 255, 0.1);
}

.scroll-row {
  display: flex;
  width: 157px;
}

.row-animation-start {
  transform: translateX(0);
}
.row-animation-end {
  transform: translateX(-100%);
}

.row1 {
  animation: scroll 2s linear infinite;
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
    transform: translateX(-100%);
  }
}
</style>