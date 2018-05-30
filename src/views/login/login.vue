<style lang="less">
    @import './login.less';
</style>

<template>
    <div class="login" @keydown.enter="handleSubmit">
        <div class="login-con">
            <div class="login-con-box">
                <div class="login-banner">
                    <swiper :options="swiperOption" ref="mySwiper" style="width:100%;height:235px">
                        <swiper-slide v-for="(slide, index) in swiperSlides" :key="index">
                            <div class="banner-slide">
                                <img :src="slide"></img>
                            </div>
                        </swiper-slide>
                    </swiper>
                    <div class="banner-bottom">
                        <div class="banner-pagination">
                            <a href="javascript:;" v-for="(slide, index) in swiperSlides" @click="changeSlideTo(index)" :class="{'active':index==activeIndex}"></a>
                        </div>
                        <div class="line-26"></div>
                        <div class="banner-num">
                            {{curIndex + '/' + totolLength}}
                        </div>
                    </div>
                </div>
                <div class="form-con">
                    <div class="form-con-header">
                        贪玩岛统计后台
                    </div>
                    <Form ref="loginForm" :model="form" :rules="rules">
                        <FormItem prop="userName">
                            <input type="text" class="user-name" v-model="form.userName" placeholder="用户名">
                        </FormItem>
                        <FormItem prop="password">
                            <input type="password" class="user-password" v-model="form.password" placeholder="用户密码">
                        </FormItem>
                        <FormItem style="text-align:center">
                            <Button @click="handleSubmit" type="primary" size="large" class="sub-btn">登录</Button>
                        </FormItem>
                    </Form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Cookies from 'js-cookie';
import {Login} from '@/api/api';
import { zeroize } from '@/libs/helper';
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import ban_1_png from '../../images/login/1.png'
import ban_2_png from '../../images/login/2.png'
import ban_3_png from '../../images/login/3.png'

export default {
    components: {
        swiper,
        swiperSlide
    },
    data () {
        return {
            form: {
                userName: '',
                password: ''
            },
            rules: {
                userName: [
                    { required: true, message: '账号不能为空', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '密码不能为空', trigger: 'blur' }
                ]
            },
            swiperOption: {
                loop:true,
                autoplay:{
                    delay:3000,
                    disableOnInteraction: false
                }
            },
            swiperSlides: [ban_1_png, ban_2_png, ban_3_png],
            activeIndex:0
        };
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper
      },
      curIndex(){
          return zeroize(this.activeIndex+1,2);
      },
      totolLength(){
          return zeroize(this.swiperSlides.length,2);
      }
    },
    mounted(){
        // setInterval(() => {
        //     if (this.swiperSlides.length < 3) {
        //         this.swiperSlides.push(this.swiperSlides.length + 1)
        //     }
        // }, 3000)
        
        var self = this;
        this.swiper.on('slideChange', function () {
            self.activeIndex = this.realIndex;
        });
    },
    methods: {
        changeSlideTo(index){
           this.swiper.slideToLoop(index, 400, false);
        },
        handleSubmit () {
            this.$refs.loginForm.validate((valid) => {
                if (valid) {
                    var data = {
                        userName:this.form.userName,
                        password:this.form.password
                    }
                    
                    Login(data).then(function(res){
                        console.log(res)
                        if(res.data.access_token==undefined){
                            this.$Message.error(res.data.message);
                        }else{
                            this.$Message.success("登录成功");
                            this.$store.commit('user/login', {
                                user:this.form.userName,
                                token:res.access_token
                                // userId:res.data.userId
                            });
                            localStorage.setItem('token',res.data.access_token)
                            
                            this.$store.commit('setAvator', 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3448484253,3685836170&fm=27&gp=0.jpg');
                            this.$router.push({
                                name: 'home_index'
                            });
                        }


                        /*this.$store.commit('user/login', {
                                user:this.form.userName,
                                userId:"YH0001"
                        });
                        Cookies.set('user', this.form.userName);
                        Cookies.set('password', this.form.password);
                        this.$store.commit('setAvator', 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3448484253,3685836170&fm=27&gp=0.jpg');
                        Cookies.set('access', 0);
                        this.$router.push({
                                name: 'global_switch'
                            });*/

                    }.bind(this));
                }
            });
        }
    }
};
</script>

<style>

</style>
