<template>
  <el-row :gutter="10">
    <el-col :xs="24" :md="8" :lg="8">
    <ul v-infinite-scroll="load">
      <div class="demo-image__lazy">
        <el-image
          v-for="url in urls"
          :key="url"
          :src="url"
          :preview-src-list="urls"
          :initial-index="urls.indexOf(url)"
          lazy
        />
      </div>
    </ul>
    </el-col>

    <el-col :xs="0" :md="8" :lg="8" :xl="8">
    <ul v-infinite-scroll="load">
      <div class="demo-image__lazy">
        <el-image
          v-for="url in urlsA"
          :key="url"
          :src="url"
          :preview-src-list="urlsA"
          :initial-index="urlsA.indexOf(url)"
          lazy
        />
      </div>
      </ul>
    </el-col>

    <el-col :xs="0" :md="8" :lg="8" :xl="8">
    <ul v-infinite-scroll="load">
      <div class="demo-image__lazy">
        <el-image
          v-for="url in urlsB"
          :key="url"
          :src="url"
          :preview-src-list="urlsB"
          :initial-index="urlsB.indexOf(url)"
          lazy
        />
      </div>
      </ul>
    </el-col>
  </el-row>
  <div>你已经到达世界尽头</div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { ElNotification } from "element-plus";

onMounted(() => {
  open();
});

var urls = ref(shuffle(fortxt(100)))

var urlsA = ref(shuffle(fortxt(100)))

var urlsB = ref(shuffle(fortxt(100)))

const load = () => {
  console.log("Yes")
  urls.value.push(shuffle(fortxt(100)))
  urlsA.value.push(shuffle(fortxt(100)))
  urlsB.value.push(shuffle(fortxt(100)))
}

function fortxt(num) {
  var t1 = "https://i.hifsyu.me/pixiv-webp/pixiv_r18_";
  var t2 = ".webp";

  var urls = [];

  for (var i = 1; i <= num; i++) {
    var t3 = t1 + String(i) + t2;

    urls.push(t3);

  }

  return urls;
}

// 洗牌卡算法
function shuffle(array) {
  let copy = [];

  let len = array.length;

  while (len) {
    //随机生成 0  到  n-1 的数字 , 作为数组下标
    let index = Math.floor(Math.random() * len--);
    //把随机到的数字放入新数组中,并从原数组中删除
    copy.push(array.splice(index, 1)[0]);
  }
  return copy.slice(0,1);
}

const open = () => {
  console.log("弹窗弹出");
  ElNotification({
    title: "Tip",
    message: "非原图，图片皆为webp格式，IOS设备无法显示",
  });
};
</script>

<style scoped>
.demo-image__lazy {
  height: 100%;
  overflow-y: auto;
}

.demo-image__lazy .el-image {
  display: block;
  min-height: 200px;
  margin-bottom: 10px;
  border-radius: 10px;
}

.demo-image__lazy .el-image:last-child {
  margin-bottom: 0;
}

ul {
  margin: 0;
  padding: 0;
}
</style>
