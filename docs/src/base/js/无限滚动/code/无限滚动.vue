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
