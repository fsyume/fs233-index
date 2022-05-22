<template>
  <div v-infinite-scroll="load" infinite-scroll-immediate="false">
    <el-row :gutter="10">
      <el-col :xs="24" :md="8" :lg="8">
        <div class="demo-image__lazy">
          <el-image
              v-loading="loading"
              v-for="url in urls"
              :key="url"
              :src="url"
              :preview-src-list="urls"
              :initial-index="urls.indexOf(url)"
              @load="loadingfun()"
              lazy
          />
        </div>
      </el-col>

      <el-col :xs="0" :md="8" :lg="8" :xl="8">
        <div class="demo-image__lazy">
          <el-image
              v-loading="loading"
              v-for="url in urlsA"
              :key="url"
              :src="url"
              :preview-src-list="urlsA"
              :initial-index="urlsA.indexOf(url)"
              @load="loadingfun"
              lazy
          />
        </div>
      </el-col>

      <el-col :xs="0" :md="8" :lg="8" :xl="8">
        <div class="demo-image__lazy">
          <el-image
              v-loading="loading"
              v-for="url in urlsB"
              :key="url"
              :src="url"
              :preview-src-list="urlsB"
              :initial-index="urlsB.indexOf(url)"
              @load="loadingfun"
              lazy
          />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import {onMounted, ref} from "vue";
import {ElNotification} from "element-plus";
import axios from "axios"

// 生命周期函数
onMounted(() => {
  open()
  piclist(urls)
  piclist(urlsA)
  piclist(urlsB)
});

var loading = ref(true)

var urls = ref([])

var urlsA = ref([])

var urlsB = ref([])


function loadingfun() {
  loading.value = false
}

// 底部加载
function load() {
  console.log("底部加载")
  addpic(urls)
  addpic(urlsA)
  addpic(urlsB)
}

// 非R18数组
function piclist(urllist) {
  axios.get("https://i.fs233.cc/setu?type=json&num=20").then(
      (res) => {
        urllist.value = res.data.msg
      }
  )
}

// 底部加载增加图片
function addpic(urllist) {
  axios.get("https://i.fs233.cc/setu?type=json&num=20").then(
      (res) => {
        let list = res.data.msg

        for (let i in list) {
          console.log("for in 循环" + list[i])
          urllist.value.push(list[i])
        }
      }
  )
}

// 涩图链接数组生成
function fortxt() {
  // 总涩图数
  var num = 262

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
  return copy.slice(0, 1);
}

const open = () => {
  console.log("弹窗弹出");
  ElNotification({
    dangerouslyUseHTMLString: true,
    title: "Tip",
    message: "<div style='color:red'>原图，巨大流量警告！！！</div>",
    duration: 0
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
