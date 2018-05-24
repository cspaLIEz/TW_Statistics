<style lang="less">
    @import "./main.less";
</style>
<template>
    <div class="main" :class="{'main-hide-text': shrink}">
        <div class="sidebar-menu-con" style="width:320px;background:rgb(73, 80, 96)">
            <!-- <shrinkable-menu 
                :shrink="shrink"
                @on-change="handleSubmenuChange"
                :theme="menuTheme" 
                :before-push="beforePush"
                :open-names="openedSubmenuArr"
                :menu-list="menuList">
                
            </shrinkable-menu> -->
            <div >
                <div slot="top" class="logo-con">
                        贪玩岛
                </div>
                <div class="main_lbox">
                    <div class="box_top">
                        <span class="lspan">今天</span><span class="rspan">{{dateDA}}</span>
                    </div>
                    <p class="two_p">本月交易数据</p>
                    <ul>
                        <li>
                            <p class="left_p">成交件数</p>
                            <p class="right_p">{{ldata}}件</p>
                        </li>
                        <li>
                            <p class="left_p">交易人数</p>
                            <p class="right_p">{{ldata}}人</p>
                        </li>
                        <li>
                            <p class="left_p">交易额</p>
                            <p class="right_p">￥{{ldata}}</p>
                        </li>
                        <li>
                            <p class="left_p">市场价</p>
                            <p class="right_p">￥{{ldata}}</p>
                        </li>
                        <li>
                            <p class="left_p">交易利润</p>
                            <p class="right_p">￥{{ldata}}</p>
                        </li>
                        <div class="bottom_l">
                            <p class="left_p">分成金额</p>
                            <p class="right_p">￥{{ldata}}</p>
                        </div>   
                    </ul>
                    
                </div>
            </div>
            

        </div>
        <div class="main-header-con" style="paddingLeft:320px">
            <div class="main-header">
                <!--<div class="navicon-con">
                     <Button :style="{transform: 'rotateZ(' + (this.shrink ? '-90' : '0') + 'deg)'}" type="text" @click="toggleClick">
                        <Icon type="navicon" size="32"></Icon>
                    </Button> 
                </div>-->
                <div class="header-middle-con">
                    <div class="main-breadcrumb">
                        <!-- <breadcrumb-nav :currentPath="currentPath"></breadcrumb-nav> -->
                        统计后台
                    </div>
                </div>
                <div class="header-avator-con">
                    <full-screen v-model="isFullScreen" @on-change="fullscreenChange"></full-screen>
                    <lock-screen></lock-screen>
                    <!-- <message-tip v-model="mesCount"></message-tip> -->
                    <theme-switch></theme-switch>
                    
                    <div class="user-dropdown-menu-con">
                        <Row type="flex" justify="end" align="middle" class="user-dropdown-innercon">
                            <Dropdown transfer trigger="click" @on-click="handleClickUserDropdown">
                                <a href="javascript:void(0)">
                                    <span class="main-user-name">{{ userName }}</span>
                                    <Icon type="arrow-down-b"></Icon>
                                </a>
                                <DropdownMenu slot="list">
                                    <DropdownItem name="loginout" divided>退出登录</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                            <Avatar :src="avatorPath" style="background: #619fe7;margin-left: 10px;"></Avatar>
                        </Row>
                    </div>
                </div>
            </div>
            <!-- <div class="tags-con">
                <tags-page-opened :pageTagsList="pageTagsList"></tags-page-opened>
            </div> -->
        </div>
        <div class="single-page-con" style="left:320px">
            <div class="right_box">
                <div class="right_top">
                        <Form :label-width="80">
                        <div class="floatL">  
                            <Button class="detali_a" :style="theone?'background-color: #1a71a8;':''" @click="changetheone(true)">交易明细</Button>
                            <Button class="month_a"  :style="!theone?'background-color: #1a71a8;':''" @click="changetheone(false)">月度统计</Button>
                        </div>
                        <div v-if="theone">
                            <div class="floatL"  style="margin-top:10px">
                                <FormItem label="起始时间">
                                    <DatePicker type="date" placeholder="选择日期" style="width: 220px"></DatePicker>
                                </FormItem>
                            </div>
                            <div class="floatL"  style="margin-top:10px">
                                <FormItem label="终止时间">
                                    <DatePicker type="date" placeholder="选择日期" style="width: 220px"></DatePicker>
                                </FormItem>
                            </div>
                        </div>
                        <div v-if="!theone">
                            <div class="floatL"  style="margin-top:10px">
                                <FormItem label="起始月份">
                                    <DatePicker type="month" placeholder="选择月份" style="width: 220px"></DatePicker>
                                </FormItem>
                            </div>
                            <div class="floatL"  style="margin-top:10px">
                                <FormItem label="终止月份">
                                    <DatePicker type="month" placeholder="选择月份" style="width: 220px"></DatePicker>
                                </FormItem>
                            </div>
                            
                        </div>
                    </Form>    
                    <Button type="error" style="border-radius:0;margin-top:10px;background-color: #de4747;">确定</Button>
                </div>
                <div style="clear:both"></div>
                <div class="right_bottom">
                    <Table stripe :columns="theone?columnst:columnstd" :data="theone?tableDatat:tableDatatd"></Table>
                </div>
                <div class="next_box">
                    <Page :total="totaldata" :current="currentdata" @on-change="changePage" :page-size="pagesizedata" show-elevator show-total show-sizer></Page>
                </div>
                <div class="footer">
                    <span>2018.5.3-2018.6.3</span>
                    <span>数据合计：成交件数{{ldata}}件</span>
                    <span>交易人数{{ldata}}人</span>
                    <span>交易额￥{{ldata}}</span>

                    <span>采购市场价￥{{ldata}}</span>

                    <span>交易利润￥{{ldata}}</span>
                    <span style="color: #ff0000;">分成金额￥{{ldata}}</span>
                    <Button style="border-radius:0;">导出为excel</Button>
                </div>
                
            </div>
            <!-- <div class="single-page">
                <keep-alive :include="cachePage">
                    <router-view></router-view>
                </keep-alive>
            </div> -->
        </div>
    </div>
</template>
<script>
    import shrinkableMenu from './main-components/shrinkable-menu/shrinkable-menu.vue';
    import tagsPageOpened from './main-components/tags-page-opened.vue';
    import breadcrumbNav from './main-components/breadcrumb-nav.vue';
    import fullScreen from './main-components/fullscreen.vue';
    import lockScreen from './main-components/lockscreen/lockscreen.vue';
    import messageTip from './main-components/message-tip.vue';
    import themeSwitch from './main-components/theme-switch/theme-switch.vue';
    import Cookies from 'js-cookie';
    import util from '@/libs/util.js';
    
    export default {
        components: {
            shrinkableMenu,
            tagsPageOpened,
            breadcrumbNav,
            fullScreen,
            lockScreen,
            messageTip,
            themeSwitch
        },
        data () {
            return {
                totaldata:50,
                currentdata:1,
                pagesizedata:20,
                ldata:'100',
                shrink: false,
                userName: '',
                isFullScreen: false,
                openedSubmenuArr: this.$store.state.app.openedSubmenuArr,
                theone:true,
                columnst:[{
                    title:"用户手机号",
                    key:'phone'
                },{
                    title:"饰品",
                    key:'phone'
                },{
                    title:"成交时间",
                    key:'phone'
                },{
                    title:"成交金额",
                    key:'phone'
                },{
                    title:"市场价",
                    key:'phone'
                },{
                    title:"交易利润",
                    key:'phone'
                },{
                    title:"分成金额",
                    key:'phone'
                },{
                    title:"用户ID",
                    key:'phone'
                }],
                tableDatat:[{
                    phone:1
                },{
                    phone:2
                },{
                    phone:3
                },{
                    phone:1
                },{
                    phone:1
                },{
                    phone:2
                },{
                    phone:3
                },{
                    phone:1
                }],
                tableDatatd:[{
                    phone:28
                },{
                    phone:27
                },{
                    phone:36
                },{
                    phone:21
                },{
                    phone:22
                },{
                    phone:24
                },{
                    phone:25
                },],
                columnstd:[{
                    title:"月份",
                    key:'phone'
                },{
                    title:"成交件数",
                    key:'phone'
                },{
                    title:"交易人数",
                    key:'phone'
                },{
                    title:"交易额",
                    key:'phone'
                },{
                    title:"交易利润",
                    key:'phone'
                },{
                    title:"分成金额",
                    key:'phone',
                    style:{"color":"red"}
                }],
                dateDA:''
            };
        },
        computed: {
            menuList () {
                return this.$store.state.app.menuList;
            },
            pageTagsList () {
                return this.$store.state.app.pageOpenedList; // 打开的页面的页面对象
            },
            currentPath () {
                return this.$store.state.app.currentPath; // 当前面包屑数组
            },
            avatorPath () {
                return localStorage.avatorImgPath;
            },
            cachePage () {
                return this.$store.state.app.cachePage;
            },
            lang () {
                return this.$store.state.app.lang;
            },
            menuTheme () {
                return this.$store.state.app.menuTheme;
            },
            mesCount () {
                return this.$store.state.app.messageCount;
            }
        },
        methods: {
            changePage(){

            },
            init () {
                let pathArr = util.setCurrentPath(this, this.$route.name);
                this.$store.commit('updateMenulist');
                if (pathArr.length >= 2) {
                    this.$store.commit('addOpenSubmenu', pathArr[1].name);
                }
                this.userName = Cookies.get('user');

                let messageCount = 3;
                this.messageCount = messageCount.toString();
                this.checkTag(this.$route.name);
                this.$store.commit('setMessageCount', 3);
            },
            toggleClick () {
                this.shrink = !this.shrink;
            },
            handleClickUserDropdown (name) {
                if (name === 'ownSpace') {
                    util.openNewPage(this, 'ownspace_index');
                    this.$router.push({
                        name: 'ownspace_index'
                    });
                } else if (name === 'loginout') {
                    // 退出登录
                    this.$store.commit('user/logout', this);
                    this.$store.commit('clearOpenedSubmenu');
                    this.$router.push({
                        name: 'login'
                    });
                }
            },
            checkTag (name) {
                let openpageHasTag = this.pageTagsList.some(item => {
                    if (item.name === name) {
                        return true;
                    }
                });
                if (!openpageHasTag) { //  解决关闭当前标签后再点击回退按钮会退到当前页时没有标签的问题
                    util.openNewPage(this, name, this.$route.params || {}, this.$route.query || {});
                }
            },
            handleSubmenuChange (val) {
                // console.log(val)
            },
            beforePush (name) {
                // if (name === 'accesstest_index') {
                //     return false;
                // } else {
                //     return true;
                // }
                return true;
            },
            fullscreenChange (isFullScreen) {
                // console.log(isFullScreen);
            },
            changetheone(e){
                this.theone=e
            },
            getdate(){
                let obj=new Date()
            this.dateDA=obj.getFullYear()+"."+(obj.getMonth()+1)+"."+obj.getDate()
                
            }
        },
        watch: {
            '$route' (to) {
                this.$store.commit('setCurrentPageName', to.name);
                let pathArr = util.setCurrentPath(this, to.name);
                if (pathArr.length > 2) {
                    this.$store.commit('addOpenSubmenu', pathArr[1].name);
                }
                this.checkTag(to.name);
                localStorage.currentPageName = to.name;
            },
            lang () {
                util.setCurrentPath(this, this.$route.name); // 在切换语言时用于刷新面包屑
            }
        },
        beforeCreate(){
            if(Cookies.get('user')){
                this.$store.commit('user/login', {
                    user:Cookies.get('user'),
                    userId:Cookies.get('userId')
                });
            }
        },
        mounted () {
            this.init();
            
        },
        created () {
            // 显示打开的页面的列表
            this.$store.commit('setOpenedList');
            this.getdate()
        }
    };
</script>
