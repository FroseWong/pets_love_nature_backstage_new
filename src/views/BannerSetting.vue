<template>
  <TopNavBar />

  <div class="banner_setting">
    <div class="add_banner_btn">新增Banner</div>
    <div class="banner_setting_out">
      <div class="banner_setting_title">
        <div class="each_title grow1">啟動</div>
        <div class="each_title grow2">標題</div>
        <div class="each_title grow2">功能</div>
      </div>
      <div class="banner_setting_list">
        <div class="each_banner">
          <div class="start_up grow1">
            <input class="check" type="checkbox" />
            <label class="label" for="">啟動</label>
          </div>
          <div class="title grow2">原型鮮食 頂級饗宴</div>
          <div class="btn_space grow2">
            <div class="btn preview">預覽</div>
            <div class="btn edit">編輯</div>
            <div class="btn delete">刪除</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import TopNavBar from '../components/TopNavBar.vue'
</script>

<style lang="scss" scoped>
.banner_setting {
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  .add_banner_btn {
    margin-top: 100px;
    width: 170px;
    height: 50px;
    background-color: rgb(1, 1, 133);
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    margin-left: auto;
    margin-bottom: 30px;
    cursor: pointer;
  }

  .banner_setting_out {
    display: flex;
    flex-direction: column;
    .grow1 {
      flex-grow: 1;
    }
    .grow2 {
      flex-grow: 2;
    }
    .banner_setting_title {
      display: flex;
      .each_title {
        flex-basis: 0;
        font-size: 50px;
        text-align: center;
      }
    }

    .banner_setting_list {
      display: flex;
      flex-direction: column;
      font-size: 20px;
      .each_banner {
        display: flex;
        padding-top: 10px;
        padding-bottom: 10px;
        .start_up {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-basis: 0;

          .check {
            width: 20px;
            height: 20px;
            margin-right: 5px;
          }
          .label {
          }
        }
        .title {
          flex-basis: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          line-height: 1.6;
        }

        .btn_space {
          flex-basis: 0;
          display: flex;
          flex-wrap: wrap;
          .btn {
            font-size: 20px;
            width: 150px;
            height: 50px;
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 0 10px 10px;
            &.preview {
              color: purple;
              border: 1px solid purple;
            }

            &.edit {
              color: lightgreen;
              border: 1px solid lightgreen;
            }

            &.delete {
              color: orange;
              border: 1px solid orange;
            }
          }
        }
      }
    }
  }
}
</style>
