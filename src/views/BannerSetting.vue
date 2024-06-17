<template>
  <TopNavBar />

  <div class="banner_setting">
    <!-- 編輯banner div -->
    <div v-show="editBannerModalShow" class="edit_banner_div">
      <div class="edit_out">
        <h1 class="edit_title">圖片：</h1>
        <input class="edit_input" v-model="focusData.imgUrl" type="text" />

        <h1 class="edit_title">超連結：</h1>
        <input class="edit_input" v-model="focusData.hyperlink" type="text" />

        <h1 class="edit_title">大標題：</h1>
        <input class="edit_input" v-model="focusData.title" type="text" />

        <h1 class="edit_title">小標題：</h1>
        <textarea class="edit_input high" v-model="focusData.subtitle" type="text" />
      </div>
      <div class="edit_btn_space">
        <div class="btn cancel" @click="closeEditModal">取消</div>
        <div class="btn update" @click="editBannerBtnClick">更新</div>
      </div>
    </div>

    <!-- 新增banner div -->
    <div v-show="addBannerModalShow" class="edit_banner_div">
      <div class="edit_out">
        <h1 class="edit_title">圖片：</h1>
        <input class="edit_input" v-model="focusData.imgUrl" type="text" />

        <h1 class="edit_title">超連結：</h1>
        <input class="edit_input" v-model="focusData.hyperlink" type="text" />

        <h1 class="edit_title">大標題：</h1>
        <input class="edit_input" v-model="focusData.title" type="text" />

        <h1 class="edit_title">小標題：</h1>
        <textarea class="edit_input high" v-model="focusData.subtitle" type="text" />
      </div>
      <div class="edit_btn_space">
        <div class="btn cancel" @click="closeAddModal">取消</div>
        <div class="btn update" @click="addNewBannerBtnClick">新增</div>
      </div>
    </div>

    <!-- 預覽banner div -->
    <div class="add_banner_btn" @click="addNewBanner">新增Banner</div>
    <div class="banner_setting_out">
      <div class="banner_setting_title">
        <div class="each_title grow1">啟動</div>
        <div class="each_title grow2">標題</div>
        <div class="each_title grow2">功能</div>
      </div>
      <div class="banner_setting_list">
        <div class="each_banner" v-for="(eachBanner, i) in bannerData" :key="eachBanner._id">
          <div class="start_up grow1">
            <input
              class="check"
              type="checkbox"
              @click="activeBtnClick(i)"
              :checked="eachBanner.active"
            />
            <label class="label" for="">啟動</label>
          </div>
          <div class="title grow2">{{ eachBanner.title }}</div>
          <div class="btn_space grow2">
            <div class="btn preview">預覽</div>
            <div class="btn edit" @click="editBanner(i)">編輯</div>
            <div class="btn delete" @click="deleteBannerClick(i)">刪除</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import TopNavBar from '../components/TopNavBar.vue'
import { onMounted, ref } from 'vue'
import { getBanner, addBanner, updateBanner, deleteBanner } from '@/@core/apis/banner'

onMounted(async () => {
  bannerData.value = await getBanner()
})

const bannerData = ref([])
const focusBannerIndex = ref(0)
const editBannerModalShow = ref(false)
const addBannerModalShow = ref(false)
const focusData = ref({
  imgUrl: '',
  hyperlink: '',
  title: '',
  subtitle: '',
  active: true
})

const closeEditModal = () => {
  editBannerModalShow.value = false
}

const closeAddModal = () => {
  addBannerModalShow.value = false
}

const addNewBanner = () => {
  focusData.value = {
    imgUrl: '',
    hyperlink: '',
    title: '',
    subtitle: '',
    active: true
  }
  addBannerModalShow.value = true
}

const dataCheck = (data) => {
  const { imgUrl, hyperlink, title, subtitle } = data
  let str = ''

  if (!imgUrl) {
    if (!str) str += '圖片未填寫'
    else str += ', 圖片未填寫'
  }

  if (!hyperlink) {
    if (!str) str += '超連結未填寫'
    else str += ', 超連結未填寫'
  }

  if (!title) {
    if (!str) str += '大標題未填寫'
    else str += ', 大標題未填寫'
  }

  if (!subtitle) {
    if (!str) str += '小標題未填寫'
    else str += ', 小標題未填寫'
  }

  if (str) {
    alert(str)
    return false
  } else return true
}

const addNewBannerBtnClick = async () => {
  const checkStatus = dataCheck(focusData.value)
  if (checkStatus) {
    bannerData.value = await addBanner(focusData.value)
    addBannerModalShow.value = false
  }
}

const activeBtnClick = async (i) => {
  focusBannerIndex.value = i
  bannerData.value[focusBannerIndex.value].active = !bannerData.value[focusBannerIndex.value].active
  focusData.value = bannerData.value[focusBannerIndex.value]
  const checkStatus = dataCheck(focusData.value)
  if (checkStatus) bannerData.value[focusBannerIndex.value] = await updateBanner(focusData.value)
}

const editBannerBtnClick = async () => {
  const checkStatus = dataCheck(focusData.value)
  console.log('focusData.value', focusData.value)
  if (checkStatus) {
    bannerData.value[focusBannerIndex.value] = await updateBanner(focusData.value)
    editBannerModalShow.value = false
  }
}

const editBanner = (i) => {
  focusData.value = bannerData.value[i]
  focusBannerIndex.value = i
  console.log('focusData.value', focusData.value)
  editBannerModalShow.value = true
}

const deleteBannerClick = async (i) => {
  const id = bannerData.value[i]._id
  console.log('id', id)

  const check = confirm('確定要刪除嗎')

  if (check) {
    await deleteBanner(id)
    bannerData.value.splice(i, 1)
  }
}
</script>

<style lang="scss" scoped>
.banner_setting {
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  position: relative;

  .edit_banner_div {
    width: 500px;
    height: 500px;
    padding-bottom: 20px;
    background-color: white;
    border: 1px solid black;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .edit_out {
      width: 80%;
      margin: 0 auto;
      margin-top: 50px;
      .edit_title {
        font-size: 20px;
      }

      .edit_input {
        margin-bottom: 20px;
        width: 100%;
        padding-left: 10px;
        outline: 1px solid black;
        border: none;
        &:focus {
          outline: 1px solid black;
        }
        &.high {
          resize: none;
        }
      }
    }

    .edit_btn_space {
      display: flex;
      justify-content: flex-end;
      .btn {
        width: 170px;
        height: 50px;
        background-color: rgb(1, 1, 133);
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 5px;
        cursor: pointer;
        margin-right: 25px;
        transition: 0.3s;
        &:hover {
          background-color: rgb(78, 78, 206);
        }

        &.cancel {
        }

        &.update {
        }
      }
    }
  }

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
    &:hover {
      background-color: rgb(78, 78, 206);
    }
  }

  .banner_setting_out {
    display: flex;
    flex-direction: column;
    padding-bottom: 50px;
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
      max-height: 500px;
      overflow-y: auto;
      .each_banner {
        display: flex;
        padding-top: 10px;
        padding-bottom: 10px;
        border-bottom: 1px solid black;
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
          // justify-content: space-around;
          .btn {
            font-size: 20px;
            width: 120px;
            height: 50px;
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 0 30px 10px;
            &.preview {
              color: purple;
              border: 1px solid purple;
              &:hover {
                color: white;
                background-color: purple;
              }
            }

            &.edit {
              color: lightgreen;
              border: 1px solid lightgreen;

              &:hover {
                color: white;
                background-color: lightgreen;
              }
            }

            &.delete {
              color: orange;
              border: 1px solid orange;

              &:hover {
                color: white;
                background-color: orange;
              }
            }
          }
        }
      }
    }
  }
}
</style>
