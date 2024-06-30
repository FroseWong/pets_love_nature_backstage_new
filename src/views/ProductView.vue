<script setup>
import { onMounted, ref } from "vue";

import TopNavBar from '../components/TopNavBar.vue'

import { useAxiosGet , useAxiosPost , useAxiosPatch } from '../@core/apis/axios'

import { useRoute , useRouter } from 'vue-router';
import { useAxiosDelete } from "../@core/apis/axios";
const router = useRouter();
const route = useRoute();

let obj;
const routeId = ref("");

const data = ref( {
        "title": "",
        "subtitle": "",
        "category": [
           
        ],
        "otherInfo": [
            {
                "infoName": "",
                "infoValue": ""
            }
        ],
        "imageGallery": [
            // {
            //     "imgUrl": "",
            //     "altText": ""
            // }
        ],
        "productSpecList": [
          
        ],
    },
);


const newProductSpecList = ref([])

// ai 參數 
const AIInputWord = ref("")
const AIResultWord = ref("")
// ai 參數

const getToken = () => {
  const token = localStorage.getItem('token')
  obj = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

}


const getData = async()=> {
    if(routeId.value === 'add'){
        return
    }
    try{
        let res = await useAxiosGet(`/admin/product/${routeId.value}` )
        data.value= res.data
    }
    catch(e){
        console.log(e);
    }

}

const updateGetData = () => {
    getData()
}

const updateData = async()=> {
    let body= data.value;
    const res = await useAxiosPatch(`/admin/product/updateProductById` ,body, obj)
}
const addData = async()=> {
    data.value.productSpecList = newProductSpecList.value
    let body= data.value;
    console.log(body);
    const res = await useAxiosPost(`/admin/product` ,body, obj)
    console.log('86' , res);
    alert("新增成功")
    goBack();
}


// productSpect 新增編輯區
const addNewProductSpec = () => {
    newProductSpecList.value.push({
        weight: '',
        price: '',
        inStock: '',
        onlineStatus: false
    })
}
const addNewProductSpecBtn = async() =>{
    const id = data.value.productId;
    console.log('123' , id , newProductSpecList.value);
    const body = {
        "productId": data.value.productId,
        "productSpecList": newProductSpecList.value
    }
    const res = await useAxiosPost(`/admin/product/createProductSpec` ,body, obj)
    newProductSpecList.value=[];
    getData();
}

const deleteProductSpec = async(item) => {
    const res = await useAxiosDelete(`/admin/product/${item._id}` , obj)
    getData();
}

const deleteNewProductSpecList = (index) => {
    newProductSpecList.value.splice(index, 1)
}

// productSpect 結束

// imageGallery

const newImageGallery = ref([])

const addNewImageGallery = () => {
    if(newImageGallery.value.length > 0){
        alert("一次只能新增一筆");
        return
    }
    newImageGallery.value.push({
        imgUrl: '',
        altText: '',
    })
}

const uploadImage = async(e,index)=>{
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);


    let token2 = localStorage.getItem('token')
    let obj2 = {
        headers: {
            Authorization: `Bearer ${token2}`,
            "Content-Type": 'multipart/form-data'
        }
    }
    
    console.log('174' , obj2);
    const res = await useAxiosPost(`/admin/upload/image` ,formData, obj2)
    console.log('166' , res.data.imgUrl);
    // newImageGallery.value[index].imgUrl = res.data.imgUrl


    data.value.imageGallery.push({
        imgUrl: res.data.imgUrl,
        altText: newImageGallery.value.altText,
    })
    e.target.value = '';
    newImageGallery.value = [];

}

//

const goBack = () => {
    router.push(`/products`);
}

// AI 產生
const createAIWord = async() =>{
 
    try{
        const res = await useAxiosGet(`/admin/openAi?text=${AIInputWord.value}` , obj)
        AIResultWord.value = res.data
    }
    catch(e){
        if(e?.message){
            alert(e.message)
        }
        alert("系統錯誤")
    }
}

// AI結束


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
        <h2 class="mr-3" v-if="routeId !== 'add'"> 編輯商品 </h2>
        <h2 class="mr-3" v-else> 新增商品 </h2>

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
                            <th scope="col">功能</th>
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
                            <!-- <td>
                                {{item}}
                            </td> -->
                            <td>
                                <!-- {{ item.weight }} -->
                                <input type="text" class="form-control d-inline" style="width:50%" v-model="item.weight" name="" id="" >
                                g</td>
                            <td>NT$
                                <!-- {{ item.price }} -->

                                <input type="text" class="form-control d-inline" style="width:50%"  v-model="item.price" name="" id="" >

                            </td>
                            <td> 
                                <!-- {{ item.inStock }} -->
                                <input type="text" class="form-control d-inline" style="width:50%"  v-model="item.inStock" name="" id="" >
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
                            <td>
                                <button type="button" class="btn btn-outline-danger" @click="deleteProductSpec(item)">刪除</button>
                            </td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                            <td colspan="5" class="text-center" @click="addNewProductSpec">+</td>
                        </tr>
                    </tbody>
                    <tbody >
                        <tr v-for="(item,index) in newProductSpecList" :key="index" >
                            <td>
                                <input type="text" class="form-control d-inline" style="width:50%" v-model="item.weight" name="" id="" >
                                g</td>
                            <td>NT$
                                <input type="text" class="form-control d-inline" style="width:50%"  v-model="item.price" name="" id="" >

                            </td>
                            <td> 
                                <input type="text" class="form-control d-inline" style="width:50%"  v-model="item.inStock" name="" id="" >
                                件
                            </td>
                            <td class="text-center">
                                
                                <label class="col-form-label" >未上架</label>
                            </td>
                            <td  > 
                                <button type="button" class="btn btn-outline-danger" @click="deleteNewProductSpecList(index)">刪除</button>
                            </td>
                        </tr>
                        <tr v-if="newProductSpecList.length>0">
                            <td colspan="5" class="text-center">
                                <button  v-if="routeId !== 'add'" type="button" class="btn btn-outline-primary me-2" @click="addNewProductSpecBtn">儲存</button>

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
                <textarea v-model="data.description" placeholder="htmlText" class="form-control" style="height: 200px" aria-label="With  textarea"></textarea>
            </div>
            <div class="col-12">
                <div class="form-label mb-2">AI 自動生成文案</div> 
                <div class="row mb-2">
                    <div class="col-6">
                        <input type="text" v-model="AIInputWord" class="form-control " placeholder="AI關鍵字" aria-label="Username" aria-describedby="basic-addon1">
                    </div>
                    <div class="col-3">
                        <button type="button " class="btn btn-primary me-2"  @click.prevent="createAIWord">產生文案</button>
                    </div>
                </div>

                <textarea v-model="AIResultWord" class="form-control" style="height: 100px" aria-label="With textarea" readonly></textarea>

            </div>
            <div class="col-12">
                <div class="form-label mb-2">商品輪播圖</div> 
             
                <div class="row row-cols-1 row-cols-md-3 g-4">
                    <div class="col" v-for="(item,index) in data.imageGallery" :key="index">
                        <div class="card">
                            <img :src="item.imgUrl" class="card-img-top" alt="...">
                            <input type="text" v-model="item.altText" class="form-control">
                        </div>
                    </div>
                    <div class="col" v-for="(item,index) in newImageGallery" :key="index">
                        <div class="card">
                            <img v-if="item.imgUrl!=''" :src="item.imgUrl" class="card-img-top" alt="...">
                            <input type="file"  v-if="item.imgUrl==''" @change="event => uploadImage(event,index)" class="form-control">
                            <input type="text" v-model="item.altText" class="form-control" placeholder="請輸入圖片文字">
                        </div>
                    </div>

                    <div class="col d-flex align-items-center" @click="addNewImageGallery">
                        +
                    </div>

                </div>
                
                
            </div>
            <div class="col-12">
                <button type="button " v-if="routeId !== 'add'" class="btn btn-primary me-2" @click.prevent="updateData">儲存</button>
                <button type="button " v-else class="btn btn-primary me-2" @click.prevent="addData">新增商品</button>

                <button type="button" class="btn btn-outline-primary" @click="goBack">返回列表頁</button>

            </div>
        </form>
    </div>
</template>


<style lang="scss" scoped>
.container{
    margin: 0 auto;
}
</style>