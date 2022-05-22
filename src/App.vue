<template>
  <div v-infinite-scroll="load" infinite-scroll-distance="9999">
    <el-row :gutter="10">
      <el-col :lg="8" :md="8" :xs="24">
        <div class="demo-image__lazy">
          <el-image
              v-for="url in urls"
              :key="url"
              v-loading="loading"
              :initial-index="urls.indexOf(url)"
              :preview-src-list="urls"
              :src="url"
              lazy
              @load="loadingfun()"
          />
        </div>
      </el-col>

      <el-col :lg="8" :md="8" :xl="8" :xs="0">
        <div class="demo-image__lazy">
          <el-image
              v-for="url in urlsA"
              :key="url"
              v-loading="loading"
              :initial-index="urlsA.indexOf(url)"
              :preview-src-list="urlsA"
              :src="url"
              lazy
              @load="loadingfun"
          />
        </div>
      </el-col>

      <el-col :lg="8" :md="8" :xl="8" :xs="0">
        <div class="demo-image__lazy">
          <el-image
              v-for="url in urlsB"
              :key="url"
              v-loading="loading"
              :initial-index="urlsB.indexOf(url)"
              :preview-src-list="urlsB"
              :src="url"
              lazy
              @load="loadingfun"
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
})

var loading = ref(true)

var urls = ref([])

var urlsA = ref([])

var urlsB = ref([])


function loadingfun() {
  loading.value = false
}

// 底部加载
function load() {
  addpic(urls)
  addpic(urlsA)
  addpic(urlsB)
}

function loadA() {
  addpic(urlsA)
}

function loadB() {
  addpic(urlsB)
}

// 非R18数组
function piclist(urllist) {
  axios.get("https://sakura.iw233.cn/API/list/acg/json.php").then(
      (res) => {
        urllist.value = res.data.data
      }
  )
}

// 底部加载增加图片
function addpic(urllist) {
  axios.get("https://sakura.iw233.cn/API/list/acg/json.php").then(
      (res) => {
        let list = res.data.data
        for (let i in list) {
          console.log("for in 循环" + list[i])
          urllist.value.push(list[i])
        }
      }
  )
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
