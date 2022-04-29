<template>
  <el-row :gutter="10">
    <el-col :xs="24" :md="8" :lg="8">
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
    </el-col>

    <el-col :xs="0" :md="8" :lg="8" :xl="8">
      <div class="demo-image__lazy">
        <el-image
          v-for="url in urlsA"
          :key="url"
          :src="url"
          :preview-src-list="urls"
          :initial-index="urls.indexOf(url)"
          lazy
        />
      </div>
    </el-col>

    <el-col :xs="0" :md="8" :lg="8" :xl="8">
      <div class="demo-image__lazy">
        <el-image
          v-for="url in urlsB"
          :key="url"
          :src="url"
          :preview-src-list="urls"
          :initial-index="urls.indexOf(url)"
          lazy
        />
      </div>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import { ElNotification } from "element-plus";

onMounted(() => {
  open();
});

var urls = shuffle(fortxt(189));

var urlsA = shuffle(fortxt(189));

var urlsB = shuffle(fortxt(189));

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
  return copy;
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
  border-radius: 10px;
}

.demo-image__lazy .el-image:last-child {
  margin-bottom: 0;
}
</style>
