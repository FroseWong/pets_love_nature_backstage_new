<script setup>
import { onMounted, ref } from "vue";

import TopNavBar from '../components/TopNavBar.vue'
import {useLoading} from 'vue-loading-overlay'

const $loading = useLoading({});

import { useAxiosGet , useAxiosPost , useAxiosPatch } from '../@core/apis/axios'

import { useRoute , useRouter } from 'vue-router';
import { useAxiosDelete } from "../@core/apis/axios";
const router = useRouter();
const route = useRoute();
const isLoading = ref(false);
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
    const loader = $loading.show({}); //loading
    if(routeId.value === 'add'){
        loader.hide();
        return
    }
    try{
        let res = await useAxiosGet(`/admin/product/${routeId.value}` )
        loader.hide();
        data.value= res.data
    }
    catch(e){
        loader.hide();
        console.log(e);
        alert("系統錯誤");
    }

}

// const updateGetData = () => {
//     getData()
// }

const updateData = async()=> {
    let body= data.value;
    body.productSpecList.forEach((item)=>{
        item.id=item._id
    })
    // console.log('82', body);

    await useAxiosPatch(`/admin/product/updateProductById` ,body, obj)
    alert("編輯成功")
    getData();
}
const addData = async()=> {
    // console.log('83' , data.value.productSpecList.length);

    if(data?.value?.otherInfo[0].infoName =="" || data?.value?.otherInfo[0].infoValue ==""){
        alert("請輸入其他規格描述")
        return
    }
    data.value.productSpecList = [...data.value.productSpecList, ...newProductSpecList.value]
    newProductSpecList.value=[]

    if(data.value.productSpecList.length == 0){
        alert("請輸入產品規格")
        return
    }
    let body= data.value;
    try{
        await useAxiosPost(`/admin/product` ,body, obj)
        alert("新增成功")
        goBack();
    }   
    catch(e){
        console.log(e);
        alert(e.response.data.message);
    }
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
    const body = {
        "productId": data.value.productId,
        "productSpecList": newProductSpecList.value
    }
    await useAxiosPost(`/admin/product/createProductSpec` ,body, obj)
    newProductSpecList.value=[];
    getData();
}

const deleteProductSpec = async(item) => {
    try{
        await useAxiosDelete(`/admin/product/${item._id}` , obj)
        alert("刪除成功");
        getData();
    }
    catch(e){
        alert("刪除失敗");

    }
}

const deleteNewProductSpecList = (index) => {
    newProductSpecList.value.splice(index, 1)
}

// productSpect 結束

// imageGallery

const newImageGallery = ref([])
const ImageGalleryUploadImageStatus = ref(false)


const addNewImageGallery = () => {
    if(newImageGallery.value.length > 0 && ImageGalleryUploadImageStatus.value == false){
        alert("一次只能新增一筆");
        return
    }
    newImageGallery.value.push({
        id: Math.random(),
        imgUrl: '',
        // altText: '',
        loading: false
    })
    ImageGalleryUploadImageStatus.value = false;
}

const deleteImageGallery = (index) =>{
    data.value.imageGallery.splice(index,1);
    alert('刪除');
}

const uploadImage = async(e,id)=>{

    newImageGallery.value.forEach(item => {
        if (item.id === id) {
            item.loading = true;
        }
    });

    ImageGalleryUploadImageStatus.value = true;
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
    
    const res = await useAxiosPost(`/admin/upload/image` ,formData, obj2)
    // newImageGallery.value[index].imgUrl = res.data.imgUrl
    newImageGallery.value.forEach(item => {
        if (item.id === id) {
            item.loading = false;
        }
    });

    ImageGalleryUploadImageStatus.value = false;
    data.value.imageGallery.push({
        imgUrl: res.data.imgUrl,
        // altText: newImageGallery.value.altText,
    })
    e.target.value = '';
    newImageGallery.value = newImageGallery.value.filter(item => item.id !== id);

    
    // newImageGallery.value = [];

}

//

const goBack = () => {
    router.push(`/products`);
}

// AI 產生
const createAIWord = async() =>{
    isLoading.value = true;
    try{
        const res = await useAxiosGet(`/admin/openAi?text=${AIInputWord.value}` , obj)
        AIResultWord.value = res.data
        isLoading.value = false;
    }
    catch(e){
        isLoading.value = false;
        if(e?.message){
            alert(e.message)
        }
        alert("系統錯誤")
    }
}

// AI結束


onMounted(()=>{

    routeId.value = route.params.id
    getToken();

    getData();
})

</script>

<template>
    <TopNavBar />

    <div class="container">
        <h2 class="mr-3 my-5"  v-if="routeId !== 'add'"> 編輯商品 </h2>
        <h2 class="mr-3 my-5" v-else> 新增商品 </h2>

        <form class="row g-3">
            <div class="col-md-6 mb-2">
                <label for="inputEmail4" class="form-label">大標題</label>
                <input type="text" v-model="data.title" class="form-control" id="inputEmail4" @keydown.enter.prevent>
            </div>
            <div class="col-md-6 mb-2">
                <label for="inputPassword4" class="form-label">小標題</label>
                <input type="text" v-model="data.subtitle" class="form-control" id="inputPassword4" @keydown.enter.prevent>
            </div>
            <div class="col-12 mb-2">
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
            <div class="col-12 mb-2">
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
                                <input type="text" class="form-control d-inline" style="width:50%" v-model="item.weight" name="" id="" @keydown.enter.prevent>
                                g</td>
                            <td>NT$
                                <!-- {{ item.price }} -->

                                <input type="text" class="form-control d-inline" style="width:50%"  v-model="item.price" name="" id="" @keydown.enter.prevent>

                            </td>
                            <td> 
                                <!-- {{ item.inStock }} -->
                                <input type="text" class="form-control d-inline" style="width:50%"  v-model="item.inStock" name="" id="" @keydown.enter.prevent>
                                件
                            </td>
                            <td> 
                                <select  v-model="item.onlineStatus" class="form-select" aria-label="Default select example" >
                                    <option :value=true >上架中</option>
                                    <option :value=false >未上架</option>
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
                                <input type="text" class="form-control d-inline" style="width:50%" v-model="item.weight" name="" id="" @keydown.enter.prevent>
                                g</td>
                            <td>NT$
                                <input type="text" class="form-control d-inline" style="width:50%"  v-model="item.price" name="" id="" @keydown.enter.prevent>

                            </td>
                            <td> 
                                <input type="text" class="form-control d-inline" style="width:50%"  v-model="item.inStock" name="" id="" @keydown.enter.prevent>
                                件
                            </td>
                            <td class="text-center">
                                
                                <select  v-model="item.onlineStatus" class="form-select" aria-label="Default select example" >
                                    <option :value=true >上架中</option>
                                    <option :value=false >未上架</option>
                                </select>
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

            <div class="col-12 mb-2">
                <div class="form-label mb-2">其他規格描述</div> 
                <table class="table ">
                    <tbody>
                        <tr  v-for="(item,index) in  data.otherInfo" :key="index">
                            <td>
                                <input type="text" class="form-control" v-model="item.infoName" name="" id="" placeholder="產地" @keydown.enter.prevent>
                            </td>
                            <td>
                                <input type="text" class="form-control" v-model="item.infoValue" name="" id="" placeholder="台灣" @keydown.enter.prevent>
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
            <div class="col-12 mb-2">
                <div class="form-label mb-2">商品詳細內容</div> 
                <textarea v-model="data.description" placeholder="htmlText" class="form-control" style="height: 200px" aria-label="With  textarea"></textarea>
            </div>
            <div class="col-12 mb-2">
                <div class="form-label mb-2">AI 自動生成文案</div> 
                <div class="row mb-2">
                    <div class="col-6">
                        <input type="text" v-model="AIInputWord" class="form-control " placeholder="AI關鍵字" aria-label="Username" aria-describedby="basic-addon1" @keydown.enter.prevent>
                    </div>
                    <div class="col-3">
                        <button type="button " class="btn btn-primary me-2"  @click.prevent="createAIWord">
                            <span  v-if="isLoading"  class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            產生文案
                        </button>
                    </div>
                </div>

                <textarea v-model="AIResultWord" class="form-control" style="height: 100px" aria-label="With textarea" readonly></textarea>

            </div>
            <div class="col-12 mb-4">
                <div class="form-label ">商品輪播圖</div> 
             
                <div class="row row-cols-1 row-cols-md-3 g-4">
                    <div class="col" v-for="(item,index) in data.imageGallery" :key="index">
                        <div class="card">
                            <div class="position-relative">
                                <img :src="item.imgUrl" class="card-img-top" alt="...">
                                <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-x position-absolute top-0 end-0 hover-scale" viewBox="0 0 16 16" @click="deleteImageGallery(index)">
                                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                                </svg>
                            </div>
                            <div class="card-body">
                                <div class="mb-3 row">
                                    <label for="imgAlt" class="col-sm-3 col-form-label">圖片名稱</label>
                                    <div class="col-sm-9">
                                    <input type="text"  class="form-control" id="imgAlt"  v-model="item.altText" >
                                    </div>
                                  
                                </div>
                            </div>

                        </div>
                    </div>
                    <div class="col" v-for="(item,index) in newImageGallery" :key="index">
                        <div class="card ">
                            <img v-if="item.imgUrl!=''" :src="item.imgUrl" class="card-img-top" alt="...">

                            <input type="file"  v-if="item.imgUrl==''" @change="event => uploadImage(event,item.id)" class="form-control mb-2">
                            <!-- <div class="row mb-2">
                                <div class="col-sm-10">
                                    <input type="text" v-model="item.altText" class="form-control" placeholder="請輸入圖片文字" @keydown.enter.prevent>
                                </div>
                            </div> -->
                            <div class="row mb-2">
                                <div class="loadingShow" v-if="item.loading==true">
                                    <span  class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                    <span>圖片上傳中</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col d-flex align-items-center" @click="addNewImageGallery">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-plus-circle hover-scale" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                        </svg>
                    </div>

                </div>
                
                
            </div>
            <div class="d-flex justify-content-end col-12 mb-3">
                <button type="button " v-if="routeId !== 'add'" class="btn btn btn-outline-success me-2" @click.prevent="updateData">儲存</button>
                <button type="button " v-else class="btn btn btn-outline-success me-2" @click.prevent="addData">新增商品</button>

                <button type="button" class="btn btn btn-outline-secondary" @click="goBack">返回列表頁</button>

            </div>
        </form>
    </div>
</template>


<style lang="scss" scoped>
.container{
    margin: 0 auto;
}
.hover-scale {
  transition: transform 0.3s ease;
}

.hover-scale:hover {
  transform: scale(1.2);
}
</style>