!
<template>
  <TopNavBar routeStr="orderManage" />
  <div class="order_manage">
    <!-- operateModal -->
    <div
      class="modal fade operate"
      id="operateModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <!-- <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1> -->
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="operate_div">
              <div class="each_data">
                <div class="each_title">訂單編號</div>
                <div class="each_content">{{ operateData._id }}</div>
              </div>
              <div class="each_data">
                <div class="each_title">email</div>
                <div class="each_content">{{ operateData.email }}</div>
              </div>

              <div class="each_data">
                <div class="each_title">商品狀態</div>
                <div class="each_content">
                  <div class="text">{{ transformStatus(operateData.orderStatus) }}</div>
                </div>
              </div>
              <div class="each_data">
                <div class="each_title">操作按鈕</div>
                <div class="each_content">
                  <div class="btn_space">
                    <div class="btn normal" @click="changeStep('normal')">正常next step</div>
                    <div
                      class="btn return"
                      v-show="operateData.orderStatus <= -1"
                      @click="changeStep('return')"
                    >
                      退貨next step
                    </div>
                  </div>
                </div>
              </div>

              <div class="each_data">
                <div class="each_title">商品狀態流程</div>
                <div class="each_content">
                  <div class="step_div">
                    <div class="each_step" v-for="eachStepStr in stepStringArr" :key="eachStepStr">
                      -- {{ eachStepStr }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div> -->
        </div>
      </div>
    </div>

    <!-- check modal -->
    <div
      class="modal fade"
      id="checkModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <!-- loading -->
      <div v-show="checkData.orderProductList.length === 0" class="page_loading"></div>
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="operate_div">
              <div class="each_data">
                <div class="each_title">訂單編號</div>
                <div class="each_content">{{ checkData.orderData._id }}</div>
              </div>
              <div class="each_data">
                <div class="each_title">email</div>
                <div class="each_content">{{ checkData.orderData.email }}</div>
              </div>

              <div class="each_data">
                <div class="each_title">商品狀態</div>
                <div class="each_content">
                  <div class="text">{{ transformStatus(checkData.orderData.orderStatus) }}</div>
                </div>
              </div>

              <div class="each_data">
                <div class="each_title">商品狀態流程</div>
                <div class="each_content">
                  <div class="step_div">
                    <div class="each_step" v-for="eachStepStr in stepStringArr" :key="eachStepStr">
                      -- {{ eachStepStr }}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="list_div">
              <h2>購買清單</h2>
              <div class="list_table_out">
                <table class="list_table">
                  <thead class="t_head">
                    <tr class="head_tr">
                      <th class="head_th">商品</th>
                      <th class="head_th">單價</th>
                      <th class="head_th">數量</th>
                      <th class="head_th">總計</th>
                    </tr>
                  </thead>
                  <tbody class="t_body">
                    <tr
                      class="each_list"
                      v-for="eachList in checkData.orderProductList"
                      :key="eachList.productId + eachList.weight"
                      v-show="checkData.orderProductList.length > 0"
                    >
                      <th class="body_th">{{ eachList.productTitle }}</th>
                      <td class="body_td">${{ eachList.price }}</td>
                      <td class="body_td">{{ eachList.quantity }}</td>
                      <td class="body_td">${{ eachList.price * eachList.quantity }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div class="total_price">
                <span class="text">總金額</span>
                <span class="num">${{ orderProductListTotalPrice }}</span>
              </div>
            </div>
          </div>
          <!-- <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div> -->
        </div>
      </div>
    </div>

    <div class="top_div">
      <div v-show="showSearchData.show" class="left">
        已搜尋 {{ showSearchData.searchText }} 共{{ showSearchData.totalDocuments }}項符合搜尋
      </div>
      <div v-show="!showSearchData.show" class="hidden_div"></div>
      <div class="right">
        <div class="right_top">
          <select
            name=""
            id=""
            class="select"
            @change="searchTypeChange"
            v-model="tempSearchTypeRef"
          >
            <option value="">請選擇</option>
            <option value="email">email</option>
            <option value="orderNum">訂單編號</option>
          </select>
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
          <input class="search_input" type="text" v-model.trim="tempSearchTextRef" />
          <button @click="searchBtnClick">搜尋</button>
        </div>
      </div>
    </div>

    <table class="table">
      <thead class="t_head">
        <tr class="head_tr">
          <th class="head_th">訂單編號</th>
          <th class="head_th">email</th>
          <th class="head_th">
            <div class="pointer_div pointer" @click="sortClick('createdAt')">
              <span class="text">建單時間</span>
              <font-awesome-icon
                class="fa-solid fa-arrow-up"
                v-show="createdAtSortNum === 1"
                :icon="['fas', 'arrow-up']"
                :class="{ red_text: sortChoose === 'createdAt' }"
              />
              <font-awesome-icon
                v-show="createdAtSortNum === 0"
                class="fa-solid fa-arrow-down"
                :icon="['fas', 'arrow-down']"
                :class="{ red_text: sortChoose === 'createdAt' }"
              />
            </div>
          </th>
          <th class="head_th">
            <div class="pointer_div pointer" @click="sortClick('orderStatus')">
              <span class="text">商品狀態</span>
              <font-awesome-icon
                class="fa-solid fa-arrow-up"
                v-show="orderStatusSortNum === 1"
                :icon="['fas', 'arrow-up']"
                :class="{ red_text: sortChoose === 'orderStatus' }"
              />
              <font-awesome-icon
                v-show="orderStatusSortNum === 0"
                class="fa-solid fa-arrow-down"
                :icon="['fas', 'arrow-down']"
                :class="{ red_text: sortChoose === 'orderStatus' }"
              />
            </div>
          </th>
          <th class="head_th">訂單詳細</th>
          <th class="head_th">操作</th>
        </tr>
      </thead>
      <tbody class="t_body">
        <tr class="body_tr" v-for="(eachOrder, i) in orderData" :key="eachOrder._id">
          <th class="body_th">
            <div class="center_div">
              {{ eachOrder._id }}
            </div>
          </th>
          <td class="body_td">{{ eachOrder.email }}</td>
          <td class="body_td">{{ dayjs(eachOrder.createdAt).format('YYYY-MM-DD HH:mm:ss') }}</td>

          <td class="body_td">{{ transformStatus(eachOrder.orderStatus) }}</td>
          <td class="body_td">
            <div
              class="check_btn"
              @click="checkBtnClick(eachOrder, index), getStepStrArr(eachOrder.orderStatus)"
              data-bs-toggle="modal"
              data-bs-target="#checkModal"
            >
              查看
            </div>
          </td>
          <td class="body_td">
            <font-awesome-icon
              class="fa-solid fa-gear pointer"
              @click="operateBtnClick(eachOrder, i), getStepStrArr(eachOrder.orderStatus)"
              :icon="['fas', 'gear']"
              data-bs-toggle="modal"
              data-bs-target="#operateModal"
            />
          </td>
        </tr>
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
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import TopNavBar from '../components/TopNavBar.vue'
import { getOrder, updateOrder, getOrderList } from '@/@core/apis/orderManage'
import dayjs from 'dayjs'

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

const operateData = ref({
  email: '',
  orderStatus: -3,
  userId: '',
  _id: ''
})

// 點擊查看要顯示的資料
const checkData = ref({
  orderData: {
    email: '',
    orderStatus: -3,
    userId: '',
    _id: ''
  },
  orderIndex: 0,
  orderProductList: [
    {
      productId: '664c984699eb1ab9b3c4f679',
      price: 180,
      quantity: 2,
      productTitle: '鮮嫩雞胸肉凍乾66',
      coverImg:
        'https://images.unsplash.com/photo-1597843786411-a7fa8ad44a95?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      weight: 220
    },
    {
      productId: '664c984699eb1ab9b3c4f679',
      price: 180,
      quantity: 2,
      productTitle: '鮮嫩雞胸肉凍乾66',
      coverImg:
        'https://images.unsplash.com/photo-1597843786411-a7fa8ad44a95?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      weight: 220
    },
    {
      productId: '664c984699eb1ab9b3c4f679',
      price: 180,
      quantity: 2,
      productTitle: '鮮嫩雞胸肉凍乾66',
      coverImg:
        'https://images.unsplash.com/photo-1597843786411-a7fa8ad44a95?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      weight: 220
    },
    {
      productId: '664c984699eb1ab9b3c4f679',
      price: 180,
      quantity: 2,
      productTitle: '鮮嫩雞胸肉凍乾66',
      coverImg:
        'https://images.unsplash.com/photo-1597843786411-a7fa8ad44a95?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      weight: 220
    }
  ]
})

const orderProductListTotalPrice = computed(() => {
  const totalPrice = checkData.value.orderProductList.reduce((acc, cur) => {
    return acc + cur.price * cur.quantity
  }, 0)
  return totalPrice
})

const operateIndex = ref(0) // 紀錄點擊的是哪一個index
const normalStepArr = ref([-3, 1, 2, 3, 4]) //正常流程arr
const returnStepArr = ref([-1, -2]) // 退貨流程arr
const stepStringArr = ref([]) //存放每個step的文字

const orderData = ref([])

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
const searchTypeRef = ref('') // 文字搜尋種類 email,orderNum
const limitRef = ref('10') // 一頁幾筆
const orderStatusSortNum = ref(1) // 物流排序箭頭
const createdAtSortNum = ref(1) // 物流排序箭頭
const sortChoose = ref('') // 選擇用哪個sort // orderStatus createdAt

// 暫時紀錄
const sameRef = ref(false)

const tempSearchTypeRef = ref('') // 文字搜尋種類 email,orderNum
const tempSearchTextRef = ref('') // 搜尋關鍵字
const tempRequestSameRef = computed(() => {
  return sameRef.value ? '1' : '0'
}) // 完全一致 0:false/1:true

onMounted(async () => {
  const email = sessionStorage.getItem('orderManageEmail')
  if (email) {
    tempSearchTypeRef.value = 'email'
    tempSearchTextRef.value = email
    sameRef.value = true
    const obj = {
      page: '1', // 頁數
      limit: '10',
      filterStatus: 0, // 物流排序 1:小到大 / 0:大到小
      searchText: email, // 搜尋關鍵字
      requestSame: 1, // 完全一致 0:false/1:true
      searchType: 'email', // 文字搜尋種類 email,orderNum
      sortOrder: 'createdAt'
    }
    const res = await getOrder(obj)
    if (res) {
      orderData.value = res.OrderData
      pageData.value = res.page
      generatePaginationArr(pageData.value)
      sessionStorage.removeItem('orderManageEmail')
      showSearchData.value.show = true
      showSearchData.value.searchText = email
      if (res?.page) showSearchData.value.totalDocuments = res?.page.totalDocuments
    }
  } else {
    const obj = {
      page: '1', // 頁數
      limit: '10',
      filterStatus: 0, // 物流排序 1:小到大 / 0:大到小
      searchText: '', // 搜尋關鍵字
      requestSame: '', // 完全一致 0:false/1:true
      searchType: '', // 文字搜尋種類 email,orderNum
      sortOrder: 'createdAt'
    }
    const res = await getOrder(obj)
    if (res) {
      orderData.value = res.OrderData
      pageData.value = res.page
      generatePaginationArr(pageData.value)
    }
  }
})

// 轉換orderStatus
const transformStatus = (num) => {
  return statusMap.get(num)
}

// 產生分頁數字
const generatePaginationArr = () => {
  const { nowPage, totalPages } = pageData.value

  //   if()
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
  if (!searchTextRef.value || !searchTypeRef.value) requestSameRef.value = ''
  let filterStatusNum
  if (sortChoose.value === 'orderStatus') filterStatusNum = orderStatusSortNum.value
  else if (sortChoose.value === 'createdAt') filterStatusNum = createdAtSortNum.value
  const obj = {
    page: pageRef.value, // 頁數
    filterStatus: filterStatusNum, // 物流排序 1:小到大 / 0:大到小
    limit: limitRef.value,
    searchText: searchTextRef.value, // 搜尋關鍵字
    requestSame: requestSameRef.value, // 完全一致 0:false/1:true
    searchType: searchTypeRef.value, // 文字搜尋種類 email,orderNum
    sortOrder: sortChoose.value //篩選選項
  }

  const res = await getOrder(obj)
  if (res) {
    orderData.value = res.OrderData
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
  if (tempSearchTextRef.value || tempSearchTypeRef.value || tempRequestSameRef.value == 1) {
    if (!tempSearchTextRef.value) {
      if (!str) str += '搜尋框未輸入內容'
      else str += ', 搜尋框未輸入內容'
    }

    if (!tempSearchTypeRef.value) {
      if (!str) str += '搜尋種類未選擇'
      else str += ', 搜尋種類未選擇'
    }
  }

  if (str) {
    // 有錯誤
    alert(str)
  } else {
    // 沒錯誤
    searchTextRef.value = tempSearchTextRef.value
    searchTypeRef.value = tempSearchTypeRef.value
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

// 更改文字搜尋種類
const searchTypeChange = () => {
  if (tempSearchTypeRef.value === 'orderNum') sameRef.value = true
}

// 更改完全一致
const sameChange = () => {
  if (tempSearchTypeRef.value === 'orderNum') sameRef.value = true
}

// 更改一頁幾筆
const limitChange = async () => {
  pageRef.value = 1
  await search()
}

// 更改物流排序
const filterStatusChange = async () => {
  pageRef.value = 1
  filterStatusRef.value = filterStatusRef.value ? 0 : 1
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
      if (str === 'orderStatus') {
        orderStatusSortNum.value = orderStatusSortNum.value === 1 ? 0 : 1
      } else if (str === 'createdAt') {
        createdAtSortNum.value = createdAtSortNum.value === 1 ? 0 : 1
      }
    } else {
      // 點擊不是原本選擇的
      orderStatusSortNum.value = 1
      createdAtSortNum.value = 1
      sortChoose.value = str
    }
  }
  await search()
}

// 點擊齒輪
const operateBtnClick = (orderData, index) => {
  operateData.value = orderData
  operateIndex.value = index
}

const checkBtnClick = async (orderData, index) => {
  if (orderData?._id) {
    checkData.value.orderProductList.length = 0
    const orderListData = await getOrderList(orderData?._id)
    checkData.value.orderData = orderData
    checkData.value.orderIndex = index
    checkData.value.orderProductList = orderListData[0].orderProductList
  }
}

// 取得step arr 文字
const getStepStrArr = (num) => {
  stepStringArr.value.length = 0

  let focusIndex
  if (num === -3 || num > 0) {
    // 正常流程
    focusIndex = normalStepArr.value.findIndex((eachNum) => eachNum === num)
    for (let i = 0; i <= focusIndex; i++) {
      stepStringArr.value.push(transformStatus(normalStepArr.value[i]))
    }
  } else {
    // 退貨流程
    focusIndex = returnStepArr.value.findIndex((eachNum) => eachNum === num)
    for (let i = 0; i <= focusIndex; i++) {
      stepStringArr.value.push(transformStatus(returnStepArr.value[i]))
    }
  }
}

// 更改step
const changeStep = async (str) => {
  if (str === 'normal') {
    // 正常流程

    const returnIndex = returnStepArr.value.findIndex(
      (eachNum) => eachNum === operateData.value.orderStatus
    )

    if (returnIndex !== -1) {
      alert('已走退貨流程，不能回到正常流程')
      return
    } else {
      const normalIndex = normalStepArr.value.findIndex(
        (eachNum) => eachNum === operateData.value.orderStatus
      )

      if (normalIndex >= normalStepArr.value.length - 1) {
        alert('已是正常流程的最後一步')
      } else {
        const nextStatus = normalStepArr.value[normalIndex + 1]
        const orderId = operateData.value._id
        const obj = {
          orderId: orderId,
          orderStatus: nextStatus
        }
        await updateOrder(obj)
        getStepStrArr(nextStatus) // 更新流程文字
        orderData.value[operateIndex.value].orderStatus = nextStatus // 更新列表內的資料
      }
    }
  } else if (str === 'return') {
    // 退貨流程
    const returnIndex = returnStepArr.value.findIndex(
      (eachNum) => eachNum === operateData.value.orderStatus
    )

    if (returnIndex === -1) {
      // 剛走退貨流程
      const nextStatus = returnStepArr.value[0]
      const orderId = operateData.value._id
      const obj = {
        orderId: orderId,
        orderStatus: nextStatus
      }

      await updateOrder(obj)
      getStepStrArr(nextStatus) // 更新流程文字
      orderData.value[operateIndex.value].orderStatus = nextStatus // 更新列表內的資料
    } else {
      // 原本就已經走退貨
      if (returnIndex >= returnStepArr.value.length - 1) {
        alert('已是退貨流程的最後一步')
        return
      } else {
        const nextStatus = returnStepArr.value[returnIndex + 1]
        const orderId = operateData.value._id
        const obj = {
          orderId: orderId,
          orderStatus: nextStatus
        }

        await updateOrder(obj)
        getStepStrArr(nextStatus) // 更新流程文字
        orderData.value[operateIndex.value].orderStatus = nextStatus // 更新列表內的資料
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.order_manage {
  .pointer {
    cursor: pointer;
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
        justify-content: space-between;
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
          .check_btn {
            background-color: red;
            width: 50px;
            text-align: center;
            background-color: rgb(156, 154, 154);
            cursor: pointer;
            color: BLACK;

            &:hover {
              background-color: rgb(199, 199, 199);
            }
          }

          .fa-gear {
            padding: 10px;
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
    border: 0;
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
    border-radius: 0.5em;
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
