<script lang="ts" setup>
import { useData } from "vitepress";
import { computed, ref, onMounted } from "vue";

const { page } = useData();
const date = computed(() => new Date(page.value.lastUpdated!));
console.log(page.value);

const wordCount = ref(0);
const imageCount = ref(0);

const wordTime = computed(() => {
  // 中文阅读速度约为每分钟300字，调整为每分钟250字更合理
  // 返回秒数
  return (wordCount.value / 250) * 60;
});

const imageTime = computed(() => {
  const n = imageCount.value;
  if (n <= 10) {
    // 每张图片12秒基础时间，随着图片数量增加，每张图片额外增加1秒
    return n * 12 + (n * (n - 1)) / 2;
  }
  // 10张以上的图片，前10张按照上面公式，后面的每张增加4秒
  return 10 * 12 + (10 * 9) / 2 + (n - 10) * 4;
});

// 阅读时间，考虑到阅读中的停顿和思考，增加15%的缓冲时间
const readTime = computed(() => {
  const baseTime = wordTime.value + imageTime.value;
  const bufferedTime = baseTime * 1.15; // 增加15%的缓冲时间
  return Math.ceil(bufferedTime / 60); // 转换为分钟并向上取整
});

function analyze() {
  document.querySelectorAll(".meta-des").forEach((v) => v.remove());
  const docDomContainer = window.document.querySelector("#VPContent");
  const imgs = docDomContainer?.querySelectorAll<HTMLImageElement>(
    ".content-container .main img"
  );
  imageCount.value = imgs?.length || 0;
  const words =
    docDomContainer?.querySelector(".content-container .main")?.textContent ||
    "";
  wordCount.value = countWord(words);
}

const pattern =
  /[a-zA-Z0-9_\u0392-\u03C9\u00C0-\u00FF\u0600-\u06FF\u0400-\u04FF]+|[\u4E00-\u9FFF\u3400-\u4DBF\uF900-\uFAFF\u3040-\u309F\uAC00-\uD7AF]+/g;

function countWord(data: string) {
  const m = data.match(pattern);
  let count = 0;
  if (!m) {
    return 0;
  }
  for (let i = 0; i < m.length; i += 1) {
    if (m[i].charCodeAt(0) >= 0x4e00) {
      count += m[i].length;
    } else {
      count += 1;
    }
  }
  return count;
}

onMounted(() => {
  // 初始化时执行一次
  analyze();
});
</script>

<template>
  <div class="word">
    <!-- <div>
      <svg t="1724572866572" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
        p-id="18131" width="16" height="16">
        <path
          d="M168.021333 504.192A343.253333 343.253333 0 0 1 268.629333 268.8a342.229333 342.229333 0 0 1 243.285334-100.778667A341.504 341.504 0 0 1 755.029333 268.8c9.856 9.898667 19.2 20.394667 27.733334 31.402667l-60.16 46.976a8.021333 8.021333 0 0 0 2.986666 14.122666l175.701334 43.008a8.021333 8.021333 0 0 0 9.898666-7.68l0.810667-180.906666a7.936 7.936 0 0 0-12.885333-6.314667L842.666667 253.44a418.858667 418.858667 0 0 0-330.922667-161.493333c-229.12 0-415.488 183.594667-419.797333 411.818666a8.021333 8.021333 0 0 0 8.021333 8.192H160a7.978667 7.978667 0 0 0 8.021333-7.808zM923.946667 512H864a7.978667 7.978667 0 0 0-8.021333 7.808 341.632 341.632 0 0 1-26.88 125.994667 342.186667 342.186667 0 0 1-73.685334 109.397333 342.442667 342.442667 0 0 1-243.328 100.821333 342.229333 342.229333 0 0 1-270.976-132.224l60.16-46.976a8.021333 8.021333 0 0 0-2.986666-14.122666l-175.701334-43.008a8.021333 8.021333 0 0 0-9.898666 7.68l-0.682667 181.034666c0 6.698667 7.68 10.496 12.885333 6.314667L181.333333 770.56a419.072 419.072 0 0 0 330.922667 161.408c229.205333 0 415.488-183.722667 419.797333-411.818667a8.021333 8.021333 0 0 0-8.021333-8.192z"
          fill="#8a8a8a" p-id="18132"></path>
      </svg>
      更新: {{ date.toLocaleDateString() }}
    </div> -->
    <div>
      <svg
        t="1724571760788"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="6125"
        width="16"
        height="16"
      >
        <path
          d="M204.8 0h477.866667l273.066666 273.066667v614.4c0 75.093333-61.44 136.533333-136.533333 136.533333H204.8c-75.093333 0-136.533333-61.44-136.533333-136.533333V136.533333C68.266667 61.44 129.706667 0 204.8 0z m307.2 607.573333l68.266667 191.146667c13.653333 27.306667 54.613333 27.306667 61.44 0l102.4-273.066667c6.826667-20.48 0-34.133333-20.48-40.96s-34.133333 0-40.96 13.653334l-68.266667 191.146666-68.266667-191.146666c-13.653333-27.306667-54.613333-27.306667-68.266666 0l-68.266667 191.146666-68.266667-191.146666c-6.826667-13.653333-27.306667-27.306667-47.786666-20.48s-27.306667 27.306667-20.48 47.786666l102.4 273.066667c13.653333 27.306667 54.613333 27.306667 61.44 0l75.093333-191.146667z"
          fill="#777777"
          p-id="6126"
        ></path>
        <path
          d="M682.666667 0l273.066666 273.066667h-204.8c-40.96 0-68.266667-27.306667-68.266666-68.266667V0z"
          fill="#E0E0E0"
          opacity=".619"
          p-id="6127"
        ></path>
      </svg>
      共 {{ wordCount }} 字
    </div>
    <div>
      <svg
        t="1724572797268"
        class="icon"
        viewBox="0 0 1060 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="15031"
        width="16"
        height="16"
      >
        <path
          d="M556.726857 0.256A493.933714 493.933714 0 0 0 121.929143 258.998857L0 135.021714v350.390857h344.649143L196.205714 334.482286a406.820571 406.820571 0 1 1-15.908571 312.649143H68.937143A505.819429 505.819429 0 1 0 556.726857 0.256z m-79.542857 269.531429v274.907428l249.197714 150.966857 42.422857-70.070857-212.114285-129.389714V269.787429h-79.542857z"
          fill="#8a8a8a"
          p-id="15032"
        ></path>
      </svg>
      阅读 {{ readTime }} 分钟
    </div>
  </div>
</template>

<style>
.word {
  color: var(--vp-c-text-2);
  font-size: 15px;
  display: flex;
  gap: 20px;
  margin: 10px 0;
}

.icon {
  display: inline-block;
  transform: translate(0px, 2px);
}
</style>
