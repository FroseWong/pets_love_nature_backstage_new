<script setup>
import { onMounted, ref } from "vue";

import TopNavBar from '../components/TopNavBar.vue'

import { useAxiosGet , useAxiosPost } from '../@core/apis/axios'

import { useRoute } from 'vue-router';
const route = useRoute();
let obj;
const routeId = ref("");

const data = ref( {
        "title": "鮮嫩雞胸肉凍乾666",
        "subtitle": "新鮮雞胸肉，符合人食等級，富含高品質蛋白質，提供毛孩維持健康體愛所需的重要營養素",
        "star": 3.8,
        "category": [
            "dry",
            "fresh",
            "cat",
            "dog"
        ],
        "otherInfo": [
            {
                "infoName": "產地",
                "infoValue": "台灣"
            }
        ],
        "imageGallery": [
            {
                "imgUrl": "https://images.unsplash.com/photo-1597843786411-a7fa8ad44a95?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                "altText": "狗鮮食"
            }
        ],
        "productSpecList": [
            {
                "isValid": true,
                "_id": "664c90d099eb1ab9b3c4f645",
                "productId": "664c90d099eb1ab9b3c4f643",
                "weight": 200,
                "price": 180,
                "inStock": 900,
                "onlineStatus": true,
                "createdAt": "2024-05-21T12:17:20.832Z",
                "updatedAt": "2024-06-17T15:32:13.032Z",
                "onlineDate": "2024-06-17T15:32:13.031Z"
            }
        ],
        "productId": "664c90d099eb1ab9b3c4f643"
    },
);

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


    try{
        let res = await useAxiosGet(`/admin/product/${routeId.value}` )

       
        console.log('60' , res);
        // data.value= res.data

        // data.value= res.data
    }
    catch(e){
        console.log(e);
    }

}

const updateGetData = () => {
    getData()
}

const saveData = async()=> {
    console.log(obj);
    console.log('data' , data.value);
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
    console.log('81' , route.params.id);

    routeId.value = route.params.id
    getToken();

    getData();
})

</script>

<template>
      <TopNavBar />

    <div class="container">
        <h2 class="mr-3"> 編輯商品 </h2>
        <form class="row g-3">
            <div class="col-md-6">
                <label for="inputEmail4" class="form-label">大標題</label>
                <input type="text" v-model="data.title" class="form-control" id="inputEmail4">
            </div>
            <div class="col-md-6">
                <label for="inputPassword4" class="form-label">小標題</label>
                <input type="text" v-model="data.subtitle" class="form-control" id="inputPassword4">
            </div>
            <div class="col-12">
                <div for="" class="form-label mb-2">分類</div> 
                <div class="form-check form-check-inline">
                    <input class="form-check-input" v-model="data.category" type="checkbox" id="dry" value="dry">
                    <label class="form-check-label" for="inlineCheckbox1">凍乾</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" v-model="data.category" type="checkbox" id="fresh" value="fresh">
                    <label class="form-check-label" for="inlineCheckbox2">鮮食</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" v-model="data.category" type="checkbox" id="dog" value="dog">
                    <label class="form-check-label" for="inlineCheckbox3">狗狗專區</label>
                </div>
                <div class="form-check form-check-inline">
                    
                    <input class="form-check-input"  v-model="data.category" type="checkbox" id="cat" value="cat">
                    <label class="form-check-label" for="inlineCheckbox4">貓貓專區</label>
                </div>
            </div>
            <div class="col-12">
                <div for="" class="form-label mb-2">主要規格</div> 
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">重量規格</th>
                            <th scope="col">定價</th>
                            <th scope="col">庫存</th>
                            <th scope="col">上架狀態</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- <tr>
                            <th scope="row">100g</th>
                            <td>NT $300</td>
                            <td>1</td>
                            <td>上架中</td>
                        </tr> -->
                        <tr v-for="(item,index) in data.productSpecList" :key="index">
                            <td>
                                <!-- {{ item.weight }} -->
                                <input type="text" class="form-control d-inline" style="width:50%" v-model="data.productSpecList[index].weight" name="" id="" >
                                g</td>
                            <td>NT$
                                <!-- {{ item.price }} -->
                                <input type="text" class="form-control d-inline" style="width:50%"  v-model="data.productSpecList[index].price" name="" id="" >

                            </td>
                            <td> 
                                <!-- {{ item.inStock }} -->
                                <input type="text" class="form-control d-inline" style="width:50%"  v-model="data.productSpecList[index].inStock" name="" id="" >
                                件
                            </td>
                            <td> 
                                <select  v-model="data.productSpecList[index].onlineStatus" class="form-select" aria-label="Default select example" @change="updateGetData">
                                    <option value="true">上架中</option>
                                    <option value="false">未上架</option>
                                </select>
                                <!-- <span v-if="item.onlineStatus == true">上架中</span>
                                <span v-if="item.onlineStatus == false">未上架</span> -->
                            </td>
                        </tr>
                    </tbody>
                    
                </table>
            </div>

            <div class="col-12">
                <div class="form-label mb-2">其他規格描述</div> 
                <table class="table ">
                    <tbody>
                     
                        <tr  v-for="(item,index) in  data.otherInfo" :key="index">
                            <td>
                                <input type="text" class="form-control" v-model="item.infoName" name="" id="" placeholder="產地">
                            </td>
                            <td>
                                <input type="text" class="form-control" v-model="item.infoValue" name="" id="" placeholder="台灣">
                            </td>
                        </tr>
                      
                    </tbody>
                </table>
                <!-- <div v-for="(item,index) in  data.otherInfo" :key="index">
                    <input type="text" v-model="item.infoName" name="" id="" placeholder="產地">
                </div> -->
                <!-- <div>
                    <input type="text" name="" id="" placeholder="年齡層">
                    <input type="text" name="" id="" placeholder="成年">
                </div> -->
            </div>
            <div class="col-12">
                <div class="form-label mb-2">商品詳細內容</div> 
                <textarea v-model="data.description" class="form-control" aria-label="With textarea"></textarea>
            </div>
            <!-- <div class="col-12">
                <div class="form-label mb-2">商品輪播圖</div> 
                <img src="" alt="">
            </div> -->
            <div class="col-12">
                <button type="button " class="btn btn-primary me-2" @click.prevent="saveData">儲存</button>
                <button type="button" class="btn btn-outline-primary">返回列表頁</button>

            </div>
        </form>
    </div>
</template>


<style lang="scss" scoped>
.container{
    margin: 0 auto;
}
</style>