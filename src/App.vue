<template>
  <div class="demo-image__lazy">
    <el-image
      v-for="url in urls"
      :key="url"
      :src="url"
      :preview-src-list="urls"
      :initial-index="urls.indexOf(url)"
      lazy
    />
    你已到达世界尽头
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import { ElNotification, ElMessageBox } from "element-plus";

onMounted(() => {
  open();
});

var urls = fortxt(189);

function fortxt(num) {
  var t1 = "https://i.hifsyu.me/pixiv-webp/pixiv_r18_";
  var t2 = ".webp";

  var urls = [];

  for (var i = 1; i <= num; i++) {
    var t3 = t1 + String(i) + t2;

    urls.push(t3);

    console.log(t3);
  }

  return urls;
}

const open = () => {
  console.log("弹窗弹出");
  ElNotification({
    title: "Tip",
    message: "非原图，图片皆为webp格式",
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
}

.demo-image__lazy .el-image:last-child {
  margin-bottom: 0;
}
</style>
