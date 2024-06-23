<template>
  <div class="top_nav_bar">
    <div class="nav_bar_block">
      <div class="each_nav_bar" 
      :class="{ active: navBarStatus === 'productManage' }"
      @click="navBtnClick('/products')"
      >
      商品管理
    </div>
      <div
        class="each_nav_bar"
        :class="{ active: navBarStatus === 'orderManage' }"
        @click="navBtnClick('/order-manage')"
      >
        訂單管理
      </div>
      <div class="each_nav_bar">消費者管理</div>
      <div class="each_nav_bar">庫存管理</div>
      <div class="each_nav_bar">
        網站管理
        <div class="hover_drop_list">
          <div class="each_item" @click="navBtnClick('/banner-setting')">Banner設定</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUpdated, ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const props = defineProps({
  routeStr: String
})

const navBarStatus = ref('')

onUpdated(() => {
  navBarStatus.value = props.routeStr
})

onMounted(() => {
  navBarStatus.value = props.routeStr
})

// 點擊nav bar
const navBtnClick = (path) => {
  router.push({ path: path })
}
</script>

<style lang="scss" scoped>
.top_nav_bar {
  width: 100%;
  background-color: rgb(209, 204, 204);
  height: 130px;
  .nav_bar_block {
    display: flex;
    align-items: center;
    height: 100%;
    width: 70%;
    margin: 0 auto;
    justify-content: space-between;
    font-size: 20px;
    .each_nav_bar {
      cursor: pointer;
      font-weight: bold;
      position: relative;
      color: black;
      &:hover {
        color: rgb(221, 148, 11);
      }

      &.active {
        color: rgb(221, 148, 11);
      }

      &:last-child:hover {
        color: black;
        cursor: default;
      }

      &:last-child:hover > .hover_drop_list .each_item {
        display: flex;
      }
      .hover_drop_list {
        position: absolute;
        background-color: rgb(116, 116, 116);
        display: flex;
        justify-content: center;
        top: 100%;
        left: 50%;
        transform: translate(-50%, 0%);
        .each_item {
          width: 150px;
          height: 50px;
          background-color: rgb(72, 110, 233);
          align-items: center;
          justify-content: center;
          display: none;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
