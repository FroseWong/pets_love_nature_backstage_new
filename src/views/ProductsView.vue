<template>
      <TopNavBar />

    <div class="container">
        <h2 class="mr-3">商品列表</h2>
        <div class="search d-flex">
            <div class="me-2 ">
                分類 <br>
                <select class="form-select" aria-label="Default select example">
                    <option selected>全部</option>
                    <option value="1">貓</option>
                    <option value="2">狗</option>
                    <option value="3">鮮食</option>
                </select>
            </div>
            <div class="me-2">
                上架狀態<br>
                <select class="form-select" aria-label="Default select example">
                    <option selected>全部</option>
                    <option value="1">上架中</option>
                    <option value="2">未上架</option>
                </select>
            </div>
            <div class="me-2">
                搜尋
                <div class="input-group mb-3">
                    <input type="text" class="form-control me-2" placeholder="搜尋" aria-label="Username" aria-describedby="basic-addon1">
                    <button type="button" class="btn btn-primary">搜尋</button>

                </div>
            </div>
            <div class="ms-auto">
                <br>
                <button type="button" class="btn btn-outline-secondary me-1">新增商品</button>
            </div>
        </div>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">商品編號</th>
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
                <tr>
                    <th scope="row">D-001</th>
                    <td>鮮嫩雞胸肉凍乾 (前端測試資料)</td>
                    <td>100g</td>
                    <td>狗狗 鮮食</td>
                    <td>3</td>
                    <td>上架中</td>
                    <td>2024/01/01 08:00</td>
                    <td>
                        <button type="button" class="btn btn-outline-primary me-1">預覽</button>
                        <button type="button" class="btn btn-outline-secondary me-1">編輯</button>
                        <button type="button" class="btn btn-outline-danger">刪除</button>
                    </td>
                </tr>
                <tr v-for="(item, index) in data" :key="index">
                    <th scope="row">{{ item.productNumber }}</th>
                    <td >{{ item.productId.title }}</td>
                    <td >{{ item.weight }}g</td>
                    <td >
                        <span v-for="(item,index) in item.productId.category" :key="index">
                            <span  v-if="item == 'fresh'" class="ms-1">鮮食</span>
                            <span  v-if="item == 'dog'" class="ms-1">狗食</span>
                            <span  v-if="item == 'cat'" class="ms-1">貓食</span>
                            <span  v-if="item == 'dry'" class="ms-1">凍乾</span>
                        </span>
                    </td>
                    <td >{{ item.inStock }}</td>
                    <td> 
                        <span v-if="item.onlineStatus == false">否</span>
                        <span v-if="item.onlineStatus == true">上架中</span>
                    </td>
                    <td >
                        {{ formatTime(item.updatedAt) }}
                    </td>
                    <td >
                        <button type="button" class="btn btn-outline-primary me-1">預覽</button>
                        <button type="button" class="btn btn-outline-secondary me-1">編輯</button>
                        <button type="button" class="btn btn-outline-danger">刪除</button>
                    </td>
                </tr>
               
            </tbody>
            </table>
    </div>
</template>
<script setup>
import { onMounted, ref } from "vue";

import TopNavBar from '../components/TopNavBar.vue'

import { useAxiosGet } from '../@core/apis/axios'


const data = ref([]);

const getData = async()=> {
    let res = await useAxiosGet('/admin/product')
    data.value= res.data
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

onMounted(()=>{
    getData();
})

</script>

<style lang="scss" scoped>
.container{
    margin: 0 auto;
}
</style>