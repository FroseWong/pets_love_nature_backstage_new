<script setup>
import { onMounted, ref } from "vue";

import TopNavBar from '../components/TopNavBar.vue'

import { useAxiosDelete, useAxiosGet } from '../@core/apis/axios'

import { useRouter } from 'vue-router';
const router = useRouter();


const searchValue = ref({
  searchText: "",
//   sortOrder: "1",
  sortBy: "",
  sortOrder: -1,
  page: 1,
  limit: 10,
  filterCategory: "",
})

const onlineStatus = ref("");

const data = ref([]);
const pageInfo = ref({});


// const obj = ref({});
let obj = {};
const getToken = () => {
  const token = localStorage.getItem('token')
  obj = {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json'
    }
  }
}


const getData = async()=> {

    let params ={};

    params = {
            ...searchValue.value,
    }
    if(onlineStatus.value !== ""){
        params.onlineStatus = onlineStatus.value
    }

     
    const queryString = new URLSearchParams(params).toString()

    try{
        let res = await useAxiosGet(`/admin/product?${queryString}` )
       
        console.log('storelist ' , res);
        data.value= res.data.content
        pageInfo.value = res.data.page
    }
    catch(e){
        console.log(e);
    }

}

const updateGetData = () => {
    getData()
}

const addProduct = ()=>{
    router.push(`/product/add`);
}

const editProduct = (item)=>{
    router.push(`/product/${item._id}`);
}

const deleteProduct = async(item)=>{
    console.log('81' , item);
    try{
        let res = await useAxiosDelete(`/admin/product/${item._id}` , obj )
        console.log(res);
        alert('刪除成功');
        getData();
    }
    catch(e){
        console.log(e);
        alert(e.response.data.message);
    }
}

const changePage = (page)=>{
    searchValue.value.page = page
    getData()
}

 const formatTime = (timeString) => {
    const date = new Date(timeString);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');

    return `${year}/${month}/${day} ${hours}:${minutes}`;
};

onMounted(async()=>{
    await getToken();

    getData();
})

</script>

<template>
      <TopNavBar routeStr="products" />

    <div class="container">
        <h2 class="mr-3">商品列表</h2>
        <div class="search d-flex">
            <div class="me-2 ">
                分類 <br>
                <select  v-model="searchValue.filterCategory" class="form-select" aria-label="Default select example" @change="updateGetData">
                    <option selected value="">全部</option>
                    <option value="cat">貓</option>
                    <option value="dog">狗</option>
                    <option value="dry">鮮食</option>
                </select>
            </div>
            <div class="me-2">
                上架狀態<br>
                <select v-model="onlineStatus"  class="form-select" aria-label="Default select example" @change="updateGetData">
                    <option selected value="">全部</option>
                    <option value=true >上架中</option>
                    <option value=false >未上架</option>
                </select>
            </div>
            <div class="me-2">
                搜尋
                <div class="input-group mb-3">
                    <input type="text" v-model="searchValue.searchText" class="form-control me-2" placeholder="搜尋" aria-label="Username" aria-describedby="basic-addon1">
                    <button type="button" class="btn btn-primary" @click="updateGetData">搜尋</button>

                </div>
            </div>
            <div class="ms-auto">
                <br>
                <button type="button" class="btn btn-outline-primary me-1"  @click="addProduct">新增商品</button>
            </div>
        </div>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">商品名稱</th>
                    <th scope="col">重量規格</th>
                    <th scope="col">商品分類</th>
                    <th scope="col">庫存數量</th>
                    <th scope="col">上架狀態</th>
                    <th scope="col">上架時間</th>
                    <th scope="col">操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in data" :key="index">
                    <!-- <td >{{ item.productId.title }}</td> -->
                    <td  >{{ item.product.title }}</td>
                    <td >{{ item.weight }}g</td>
                    <td >
                        <span v-for="(item,index) in item.product.category" :key="index">
                            <span  v-if="item == 'fresh'" class="ms-1">鮮食</span>
                            <span  v-if="item == 'dog'" class="ms-1">狗食</span>
                            <span  v-if="item == 'cat'" class="ms-1">貓食</span>
                            <span  v-if="item == 'dry'" class="ms-1">凍乾</span>
                        </span>
                    </td>
                    <td >{{ item.inStock }}</td>
                    <td> 
                        <span v-if="item.onlineStatus == false">未上架</span>
                        <span v-if="item.onlineStatus == true">上架中</span>
                    </td>
                    <td >
                        {{ formatTime(item.updatedAt) }}
                    </td>
                    <td >
                        <!-- <button type="button" class="btn btn-outline-primary me-1">預覽</button> -->
                        <button type="button" class="btn btn-outline-primary me-1" @click="editProduct(item)">編輯</button>
                        <button type="button" class="btn btn-outline-danger" @click="deleteProduct(item)">刪除</button>
                    </td>
                </tr>
               
            </tbody>
        </table>
        <div class="footer d-flex justify-content-center">
            <nav aria-label="Page navigation example">
            <ul class="pagination">
                <li class="page-item" v-if="pageInfo.nowPage !== 1 && pageInfo.totalPages !== 1">
                    <a class="page-link" href="#"  @click="changePage(pageInfo.nowPage - 1 )">Previous</a>
                </li>
                <!-- pageInfo -->
                <li v-for="(item , index) in pageInfo.totalPages" :key="index" class="page-item">
                    <a class="page-link" href="#" @click="changePage(item)">
                        {{ item }}
                    </a>
                </li>
                <li class="page-item" v-if="pageInfo.nowPage !== pageInfo.totalPages && pageInfo.totalPages !== 1">
                    <a class="page-link" href="#" @click="changePage(pageInfo.nowPage +1)">
                        Next
                    </a>
                </li>
            </ul>
            </nav>
        </div>
    </div>
</template>


<style lang="scss" scoped>
.container{
    margin: 0 auto;
}
</style>