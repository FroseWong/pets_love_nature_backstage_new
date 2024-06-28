!
<template>
  <TopNavBar routeStr="customerManage" />
  <div class="customer_manage">
    <div class="top_div">
      <div v-show="showSearchData.show" class="left">
        已搜尋 {{ showSearchData.searchText }} 共{{ showSearchData.totalDocuments }}項符合搜尋
      </div>
      <div v-show="!showSearchData.show" class="hidden_div"></div>
      <div class="right">
        <div class="right_top">
          <!-- <select
            name=""
            id=""
            class="select"
            @change="searchTypeChange"
          >
            <option value="">請選擇</option>
            <option value="email">email</option>
            <option value="customerNum">訂單編號</option>
          </select> -->
          <div class="same_out">
            <input
              type="checkbox"
              name="same"
              id="same"
              class="same"
              v-model="sameRef"
              @change="sameChange"
            />
            <label for="same">完全一致</label>
          </div>
        </div>
        <div class="right_bottom">
          <input class="search_input" type="text" v-model="tempSearchTextRef" />
          <button @click="searchBtnClick">搜尋</button>
        </div>
      </div>
    </div>

    <table class="table">
      <thead class="t_head">
        <tr class="head_tr">
          <th class="head_th" @click="allSelectedClick">
            <font-awesome-icon
              class="fa-regular fa-square"
              :icon="['far', 'square']"
              v-show="!allSelected"
            />

            <font-awesome-icon
              class="fa-regular fa-square checked"
              :icon="['far', 'square-check']"
              v-show="allSelected"
            />
            全選
          </th>
          <th class="head_th">
            <div class="w100 pointer" @click="sortClick('email')">
              email
              <font-awesome-icon
                class="fa-solid fa-arrow-up"
                v-show="emailSortNum === 1"
                :icon="['fas', 'arrow-up']"
                :class="{ red_text: sortChoose === 'email' }"
              />
              <font-awesome-icon
                v-show="emailSortNum === -1"
                class="fa-solid fa-arrow-down"
                :icon="['fas', 'arrow-down']"
                :class="{ red_text: sortChoose === 'email' }"
              />
            </div>
          </th>
          <th class="head_th">
            <div class="w100 pointer" @click="sortClick('accountStatus')">
              帳號狀態

              <font-awesome-icon
                class="fa-solid fa-arrow-up"
                v-show="accountStatusSortNum === 1"
                :icon="['fas', 'arrow-up']"
                :class="{ red_text: sortChoose === 'accountStatus' }"
              />
              <font-awesome-icon
                v-show="accountStatusSortNum === -1"
                class="fa-solid fa-arrow-down"
                :icon="['fas', 'arrow-down']"
                :class="{ red_text: sortChoose === 'accountStatus' }"
              />
            </div>
          </th>
          <th class="head_th">聊聊</th>
          <th class="head_th">訂單紀錄</th>
        </tr>
      </thead>
      <tbody class="t_body">
        <tr class="body_tr" v-for="(eachCustomer, i) in customerData" :key="eachCustomer._id">
          <th class="body_th" @click="checkedCustomer(i)">
            <font-awesome-icon
              class="fa-regular fa-square"
              :icon="['far', 'square']"
              v-show="!eachCustomer.checked"
            />
            <font-awesome-icon
              class="fa-regular fa-square checked"
              :icon="['far', 'square-check']"
              v-show="eachCustomer.checked"
            />
          </th>
          <td class="body_td">{{ eachCustomer.email }}</td>
          <td class="body_td">
            <select v-model="eachCustomer.accountStatus" name="" id="">
              <option :value="1">正常</option>
              <option :value="0">封鎖</option>
            </select>
          </td>
          <td class="body_td">
            <div class="td_div">
              <font-awesome-icon
                class="fa-brands fa-facebook-messenger"
                :icon="['fab', 'facebook-messenger']"
              />
              <div class="red_circle">99+</div>
            </div>
          </td>
          <td class="body_td">
            <div class="check_btn" @click="checkBtnClick(eachCustomer)">查看</div>
          </td>
        </tr>

        <!-- <tr class="body_tr" v-for="(eachCustomer, i) in customerData" :key="eachCustomer._id">
          <th class="body_th">
            <div class="center_div">
              {{ eachCustomer._id }}
            </div>
          </th>
          <td class="body_td">{{ eachCustomer.email }}</td>
          <td class="body_td">{{ transformStatus(eachCustomer.customerStatus) }}</td>
          <td class="body_td">
            <div
              class="check_btn"
              @click="
                checkBtnClick(eachCustomer, index), getStepStrArr(eachCustomer.customerStatus)
              "
              data-bs-toggle="modal"
              data-bs-target="#checkModal"
            >
              查看
            </div>
          </td>
          <td class="body_td">
            <font-awesome-icon
              class="fa-solid fa-gear pointer"
              @click="operateBtnClick(eachCustomer, i), getStepStrArr(eachCustomer.customerStatus)"
              :icon="['fas', 'gear']"
              data-bs-toggle="modal"
              data-bs-target="#operateModal"
            />
          </td>
        </tr> -->
      </tbody>
    </table>

    <div class="bottom_div">
      <nav aria-label="..." v-show="paginationArr.length !== 0">
        <ul class="pagination">
          <li class="page-item" :class="{ disabled: pageData.nowPage == '1' }">
            <a
              @click="preNextBtnClick(-1)"
              class="page-link"
              href="#"
              tabindex="-1"
              aria-disabled="true"
              >上一頁</a
            >
          </li>
          <li
            class="page-item"
            :class="{ active: pageData.nowPage == eachPagination }"
            aria-current="page"
            v-for="eachPagination in paginationArr"
            :key="eachPagination"
            @click="paginationClick(eachPagination)"
          >
            <a class="page-link" href="#">{{ eachPagination }}</a>
          </li>
          <li class="page-item" :class="{ disabled: pageData.totalPages == pageData.nowPage }">
            <a @click="preNextBtnClick(1)" class="page-link" href="#">下一頁</a>
          </li>
        </ul>
      </nav>

      <div class="limit_div">
        <label class="limit_label" for="">一頁幾筆</label>
        <select class="limit_select" name="" id="" v-model="limitRef" @change="limitChange">
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
        </select>
      </div>
    </div>
    <div class="btn_div">
      <div class="btn_s normal" @click="multiChangeAccountStatus(1)">正常</div>
      <div class="btn_s block" @click="multiChangeAccountStatus(0)">封鎖</div>
      <div class="btn_s save" @click="saveBtnClick">儲存</div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { getCustomerList, updateCustomerAccountStatus } from '@/@core/apis/customerManage'
import { useRouter } from 'vue-router'
import TopNavBar from '../components/TopNavBar.vue'
const router = useRouter()
const statusMap = new Map([
  [1, '訂單成立，處理中'],
  [2, '已出貨，運送中'],
  [3, '已送達'],
  [4, '已取貨，待評價'],
  [5, '完成評價'],
  [-1, '退貨中'],
  [-2, '已退貨'],
  [-3, '訂單未成立，未付款']
])

const sortChoose = ref('') // 選擇用哪個sort // email accountStatus
const emailSortNum = ref(1) // email sort num -1:由大到小/1:由小到大
const accountStatusSortNum = ref(1) // accountStatus sort num -1:由大到小/1:由小到大

// 點擊查看要顯示的資料
const checkData = ref()
const originData = ref([]) // 記錄原本的狀態
const customerData = ref([
  // {
  //   _id: '663f12237a6dabc6203875f4',
  //   recipientName: '王大頭',
  //   phone: '0978071727',
  //   deliveryAddress: {
  //     country: '台灣',
  //     county: '台北市',
  //     district: '信義區',
  //     address: '快樂鎮1234號5樓'
  //   },
  //   email: 'd22495521@gmail.com',
  //   customerName: '王大頭3',
  //   image: '',
  //   accountStatus: 1,
  //   createdAt: '2024-05-11T06:37:23.956Z',
  //   updatedAt: '2024-06-23T15:03:21.514Z',
  //   recipientAddress: {
  //     country: '台灣',
  //     county: '台北市',
  //     district: '信義區',
  //     address: '快樂鎮1234號5樓'
  //   },
  //   recipientPhone: '0978071727'
  // }
])

// 儲存api回傳頁數資料
const pageData = ref({
  nowPage: '1',
  totalPages: 170
})
const showSearchData = ref({
  show: false,
  searchText: '',
  totalDocuments: ''
})
// 分頁資料
const paginationArr = ref([])
const pageRef = ref('1') // 頁數
const filterStatusRef = ref(1) // 物流排序 1:小到大 / 0:大到小
const searchTextRef = ref('') // 搜尋關鍵字
const requestSameRef = ref('') // 完全一致 0:false/1:true
const limitRef = ref('10') // 一頁幾筆
// 暫時紀錄
const sameRef = ref(false)

const tempSearchTextRef = ref('') // 搜尋關鍵字
const tempRequestSameRef = computed(() => {
  return sameRef.value ? '1' : '0'
}) // 完全一致 0:false/1:true

onMounted(async () => {
  const obj = {
    page: '1', // 頁數
    limit: '10',
    search: '', // 搜尋關鍵字
    requestSame: '', // 完全一致 0:false/1:true
    sortBy: '', //大小排序, -1:由大到小/1:由小到大
    sortOrder: '' // 排序種類 accountStatus:帳號狀態, email:電子郵件
  }
  const res = await getCustomerList(obj)
  if (res) {
    console.log('res.data', res.data)
    customerData.value = res.data
    originData.value = res.data.map((eachCustomer) => {
      const obj = {
        accountStatus: eachCustomer.accountStatus,
        _id: eachCustomer._id
      }

      return obj
    })
    pageData.value = res.page
    generatePaginationArr(pageData.value)
  }
})

const allSelected = computed(
  () =>
    customerData.value.filter((eachCustomer) => eachCustomer.checked).length ===
    customerData.value.length
)

// 點擊全選按鈕
const allSelectedClick = () => {
  if (allSelected.value)
    customerData.value.forEach((eachCustomer) => (eachCustomer.checked = false))
  else customerData.value.forEach((eachCustomer) => (eachCustomer.checked = true))
}

const checkedCustomer = (i) => {
  customerData.value[i].checked = !customerData.value[i].checked
}

// 轉換customerStatus
const transformStatus = (num) => {
  return statusMap.get(num)
}

// 產生分頁數字
const generatePaginationArr = () => {
  const { nowPage, totalPages } = pageData.value

  paginationArr.value.length = 0

  // 如果大於5頁
  if (totalPages > 5) {
    let x = Math.trunc(nowPage / 5)
    const remainder = nowPage % 5
    if (remainder === 0) x -= 1
    for (let i = 1; i <= 5; i++) {
      const focusPagination = x * 5 + i
      if (focusPagination <= totalPages) {
        paginationArr.value.push(focusPagination)
      }
    }
  } else {
    // 小於5頁
    for (let i = 1; i <= totalPages; i++) {
      paginationArr.value.push(i)
    }
  }
}

// 搜尋功能
const search = async (btnclick = false) => {
  let sorNum
  if (sortChoose.value) {
    if (sortChoose.value === 'email') {
      sorNum = emailSortNum.value
    } else if (sortChoose.value === 'accountStatus') {
      sorNum = accountStatusSortNum.value
    }
  }

  const obj = {
    page: pageRef.value, // 頁數
    limit: limitRef.value,
    search: searchTextRef.value, // 搜尋關鍵字
    requestSame: requestSameRef.value, // 完全一致 0:false/1:true
    sortBy: sorNum, //大小排序, -1:由大到小/1:由小到大
    sortOrder: sortChoose.value // 排序種類 accountStatus:帳號狀態, email:電子郵件
  }

  const res = await getCustomerList(obj)
  if (res) {
    customerData.value = res.data
    originData.value = res.data.map((eachCustomer) => {
      const obj = {
        accountStatus: eachCustomer.accountStatus,
        _id: eachCustomer._id
      }

      return obj
    })

    if (res?.page) {
      pageData.value = res.page
      generatePaginationArr(pageData.value)
      showSearchData.value.searchText = searchTextRef.value
      showSearchData.value.totalDocuments = res?.page.totalDocuments

      if (btnclick) showSearchData.value.show = true
    } else {
      // 沒有page資訊
      pageData.value.length = 0
      paginationArr.value.length = 0
    }
  }
}

// 透過點擊按鈕【搜尋】進行搜尋
const searchBtnClick = async () => {
  let str = ''
  if (tempSearchTextRef.value || tempRequestSameRef.value == 1) {
    if (!tempSearchTextRef.value) {
      if (!str) str += '搜尋框未輸入內容'
      else str += ', 搜尋框未輸入內容'
    }
  }

  if (str) {
    // 有錯誤
    alert(str)
  } else {
    // 沒錯誤
    searchTextRef.value = tempSearchTextRef.value
    requestSameRef.value = tempRequestSameRef.value
    pageRef.value = 1
    await search(true)
  }
}

// 上一頁下一頁按鈕點擊
const preNextBtnClick = async (num) => {
  if (num > 0 && pageData.value.nowPage == pageData.value.totalPages) return
  if (num < 0 && pageData.value.nowPage <= 1) return
  pageRef.value = Number(pageRef.value) + num

  await search()
}

// 頁碼點擊
const paginationClick = async (pagination) => {
  pageRef.value = pagination
  await search()
}

// 更改一頁幾筆
const limitChange = async () => {
  pageRef.value = 1
  await search()
}

const sortClick = async (str) => {
  if (!sortChoose.value) {
    // 如果原本甚麼都沒選
    sortChoose.value = str
  } else {
    // 如果原本已經有選擇

    // 如果是點擊原本已經選擇的
    if (sortChoose.value === str) {
      if (str === 'email') {
        emailSortNum.value = emailSortNum.value === 1 ? -1 : 1
      } else if (str === 'accountStatus') {
        accountStatusSortNum.value = accountStatusSortNum.value === 1 ? -1 : 1
      }
    } else {
      // 點擊不是原本選擇的
      emailSortNum.value = 1
      accountStatusSortNum.value = 1
      sortChoose.value = str
    }
  }
  await search()
}

// 一次改多個帳號狀態
const multiChangeAccountStatus = (num) => {
  // 1正常
  // 0封鎖
  customerData.value.forEach((eachCustomer, i) => {
    if (eachCustomer.checked) {
      eachCustomer.accountStatus = num
    }
  })
}

const saveBtnClick = async () => {
  const userData = []
  for (let i = 0; i < customerData.value.length; i++) {
    // for (let j = 0; j < originData.value; j++) {
    //   if(customerData)
    // }
    if (customerData.value[i].accountStatus != originData.value[i].accountStatus) {
      const obj = {
        id: customerData.value[i]._id,
        AccountStatus: customerData.value[i].accountStatus
      }
      userData.push(obj)
    }
  }
  if (userData.length > 0) {
    await updateCustomerAccountStatus({ userData })
  }
}

// 查看

const checkBtnClick = (data) => {
  const email = data?.email
  sessionStorage.setItem('orderManageEmail', email)
  router.push({ path: '/order-manage' })
}
</script>

<style lang="scss" scoped>
.customer_manage {
  padding-bottom: 3rem;
  .pointer {
    cursor: pointer;
  }

  .w100 {
    width: 100px;
  }

  .red_text {
    color: red;
  }

  .top_div {
    width: 90%;
    margin: 0 auto;
    margin-top: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 10px;
    padding-right: 10px;
    .left {
    }
    .right {
      .right_top {
        display: flex;
        align-items: center;
        justify-content: flex-end;

        margin-bottom: 10px;
        .select {
        }
        .same_out {
          display: flex;
          align-items: center;
          .same {
            width: 20px;
            height: 20px;
            margin-right: 5px;
          }
        }
      }

      .right_bottom {
        margin-bottom: 10px;
        .search_input {
          margin-right: 10px;
          padding-left: 10px;
          &:focus {
            outline: none;
          }
        }
      }
    }
  }

  .table {
    width: 90%;
    margin: 10px auto 30px;

    .fa-square {
      font-size: 20px;
      cursor: pointer;
      // padding: 3px;
      &.checked {
      }
    }

    .t_head {
      .head_tr {
        .head_th {
          .pointer_div {
            display: inline-block;
            .text {
              user-select: none;
              margin-right: 10px;
            }
          }
        }
      }
    }
    .t_body {
      .body_tr {
        .center_div {
          display: flex;
          align-items: center;
          height: 100%;
        }
        .body_th {
        }

        .body_td {
          .td_div {
            width: 80px;
            position: relative;
            .fa-facebook-messenger {
              cursor: pointer;
              font-size: 30px;
            }
            .red_circle {
              position: absolute;
              width: 30px;
              height: 23px;
              background-color: red;
              border-radius: 50%;
              font-size: 13px;
              color: white;
              display: flex;
              align-items: center;
              justify-content: center;
              left: 44%;
              top: 21%;
              transform: translate(-50%, -50%);
              cursor: pointer;
            }
          }

          .check_btn {
            width: 50px;
            text-align: center;
            background-color: rgb(156, 154, 154);
            cursor: pointer;
            color: BLACK;

            &:hover {
              background-color: rgb(199, 199, 199);
            }
          }
        }
      }
    }
  }

  .bottom_div {
    display: flex;
    align-items: center;
    margin-left: 30px;
    .limit_div {
      margin-left: 10px;
      margin-bottom: 15px;
      .limit_label {
        margin-right: 10px;
      }

      .limit_select {
      }
    }
  }

  .btn_div {
    position: fixed;
    z-index: 99;
    bottom: 0%;
    width: 100%;
    height: 3rem;
    display: flex;
    border-top: 1px solid rgb(160, 158, 158);
    border-bottom: 1px solid rgb(160, 158, 158);
    background-color: white;
    align-items: center;
    .btn_s {
      width: 50px;
      height: 24px;
      text-align: center;
      background-color: rgb(156, 154, 154);
      cursor: pointer;
      color: BLACK;
      margin: 0 30px;
      &:hover {
        background-color: rgb(199, 199, 199);
      }
      &.normal {
      }
      &.block {
      }
      &.save {
        margin-left: auto;
      }
    }
  }

  // bootstrap
  .modal {
    .operate_div {
      display: flex;
      flex-direction: column;
      .each_data {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        .each_title {
          width: 130px;
        }
        .each_content {
          display: flex;
          align-items: center;
          .text {
          }
          .btn_space {
            .btn {
              background-color: red;
              // margin: 0 5px;
              margin-right: 10px;
              &.normal {
                background-color: rgb(1, 169, 1);
                &:hover {
                  background-color: rgb(0, 195, 0);
                }
              }
              &.return {
                background-color: rgb(172, 172, 172);
                &:hover {
                  background-color: rgb(198, 197, 197);
                }
              }
            }
          }
          .step_div {
            display: flex;
            flex-direction: column;
            .each_step {
            }
          }
        }
      }
    }

    .list_div {
      .list_table_out {
        max-height: 300px;
        overflow-y: auto;
        .list_table {
          width: 100%;
          .t_head {
            .head_tr {
            }
            .head_th {
            }
          }
          .t_body {
            .each_list {
              margin-bottom: 30px;
              height: 50px;
              .body_th {
              }
              .body_td {
              }
            }
          }
        }
      }
      .total_price {
        display: flex;
        justify-content: flex-end;
        margin-right: 50px;
        .text {
        }
        .num {
          margin-left: 10px;
        }
      }
    }
  }

  /* Absolute Center Spinner */
  .page_loading {
    position: fixed;
    z-index: 999;
    height: 1em;
    width: 2em;
    overflow: show;
    margin: auto;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }

  /* Transparent Overlay */
  .page_loading:before {
    content: '';
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(3px);
  }

  /* :not(:required) hides these rules from IE9 and below */
  .page_loading:not(:required) {
    /* hide "loading..." text */
    font: 0/0 a;
    color: transparent;
    text-shadow: none;
    background-color: transparent;
    bcustomer: 0;
  }

  .page_loading:not(:required):after {
    content: '';
    display: block;
    font-size: 20px;
    width: 1em;
    height: 1em;
    margin-top: -0.5em;
    -webkit-animation: spinner 1500ms infinite linear;
    -moz-animation: spinner 1500ms infinite linear;
    -ms-animation: spinner 1500ms infinite linear;
    -o-animation: spinner 1500ms infinite linear;
    animation: spinner 1500ms infinite linear;
    bcustomer-radius: 0.5em;
    -webkit-box-shadow:
      rgba(54, 167, 199, 0.7) 1.5em 0 0 0,
      rgba(54, 167, 199, 0.7) 1.1em 1.1em 0 0,
      rgba(54, 167, 199, 0.7) 0 1.5em 0 0,
      rgba(54, 167, 199, 0.7) -1.1em 1.1em 0 0,
      rgba(54, 167, 199, 0.7) -1.5em 0 0 0,
      rgba(54, 167, 199, 0.7) -1.1em -1.1em 0 0,
      rgba(54, 167, 199, 0.7) 0 -1.5em 0 0,
      rgba(54, 167, 199, 0.7) 1.1em -1.1em 0 0;
    box-shadow:
      rgba(54, 167, 199, 0.7) 1.5em 0 0 0,
      rgba(54, 167, 199, 0.7) 1.1em 1.1em 0 0,
      rgba(54, 167, 199, 0.7) 0 1.5em 0 0,
      rgba(54, 167, 199, 0.7) -1.1em 1.1em 0 0,
      rgba(54, 167, 199, 0.7) -1.5em 0 0 0,
      rgba(54, 167, 199, 0.7) -1.1em -1.1em 0 0,
      rgba(54, 167, 199, 0.7) 0 -1.5em 0 0,
      rgba(54, 167, 199, 0.7) 1.1em -1.1em 0 0;
  }

  /* Animation */

  @-webkit-keyframes spinner {
    0% {
      -webkit-transform: rotate(0deg);
      -moz-transform: rotate(0deg);
      -ms-transform: rotate(0deg);
      -o-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      -moz-transform: rotate(360deg);
      -ms-transform: rotate(360deg);
      -o-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @-moz-keyframes spinner {
    0% {
      -webkit-transform: rotate(0deg);
      -moz-transform: rotate(0deg);
      -ms-transform: rotate(0deg);
      -o-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      -moz-transform: rotate(360deg);
      -ms-transform: rotate(360deg);
      -o-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @-o-keyframes spinner {
    0% {
      -webkit-transform: rotate(0deg);
      -moz-transform: rotate(0deg);
      -ms-transform: rotate(0deg);
      -o-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      -moz-transform: rotate(360deg);
      -ms-transform: rotate(360deg);
      -o-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @keyframes spinner {
    0% {
      -webkit-transform: rotate(0deg);
      -moz-transform: rotate(0deg);
      -ms-transform: rotate(0deg);
      -o-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      -moz-transform: rotate(360deg);
      -ms-transform: rotate(360deg);
      -o-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
}
</style>
