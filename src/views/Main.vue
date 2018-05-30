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
            <div>
                <div slot="top" class="logo-con">
                    云更新
                </div>
                <div class="main_lbox">
                    <div class="box_top">
                        <span class="lspan">今天</span>
                        <span class="rspan">{{dateDA}}</span>
                    </div>
                    <p class="two_p">本月交易数据</p>
                    <ul>
                        <li>
                            <p class="left_p">成交件数</p>
                            <p class="right_p">{{alldata.itemTotalCount}}件</p>
                        </li>
                        <li>
                            <p class="left_p">交易人数</p>
                            <p class="right_p">{{alldata.userTotalCount}}人</p>
                        </li>
                        <li>
                            <p class="left_p">交易额</p>
                            <p class="right_p">￥{{alldata.totalAmount}}</p>
                        </li>
                        <li>
                            <p class="left_p">市场价</p>
                            <p class="right_p">￥{{alldata.totalCost}}</p>
                        </li>
                        <li>
                            <p class="left_p">交易利润</p>
                            <p class="right_p">￥{{alldata.totalProfit}}</p>
                        </li>
                        <div class="bottom_l">
                            <p class="left_p">分成金额</p>
                            <p class="right_p">￥{{alldata.totalSharing}}</p>
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
                        贪玩岛商场
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

                    <div class="floatL">
                        <Button class="detali_a" :style="theone?'background-color: #1a71a8;':''" @click="changetheone(true)">交易明细</Button>
                        <Button class="month_a" :style="!theone?'background-color: #1a71a8;':''" @click="changetheone(false)">月度统计</Button>
                    </div>
                    <Form :label-width="80">
                        <div v-if="theone">
                            <div class="floatL" style="margin-top:10px">
                                <FormItem label="起始时间">
                                    <DatePicker v-model="adate" format="yyyy.MM.dd" @on-change="onechanges" type="date" placeholder="选择日期" style="width: 220px"></DatePicker>
                                </FormItem>
                            </div>
                            <div class="floatL" style="margin-top:10px">
                                <FormItem label="终止时间">
                                    <DatePicker v-model="bdate" format="yyyy.MM.dd" @on-change="onechangee" type="date" placeholder="选择日期" style="width: 220px"></DatePicker>
                                </FormItem>
                            </div>
                            <Button type="error" @click="changedatelist" style="border-radius:0;margin-top:10px;background-color: #de4747;">确定</Button>

                        </div>
                    </Form>
                    <Form :label-width="80">
                        <div v-if="!theone">
                            <div class="floatL" style="margin-top:10px">
                                <FormItem label="起始月份">
                                    <DatePicker type="month" placeholder="选择月份" style="width: 220px"></DatePicker>
                                </FormItem>
                            </div>
                            <div class="floatL" style="margin-top:10px">
                                <FormItem label="终止月份">
                                    <DatePicker type="month" placeholder="选择月份" style="width: 220px"></DatePicker>
                                </FormItem>
                            </div>
                            <Button type="error" style="border-radius:0;margin-top:10px;background-color: #de4747;">确定</Button>

                        </div>
                    </Form>
                </div>
                <div style="clear:both"></div>
                <div class="right_bottom">

                    <Table border stripe :columns="theone?columnst:columnstd" :data="theone?tableDatat:tableDatatd"></Table>
                </div>
                <div class="next_box" v-if="theone">
                    <Page transfer :total="totaldata" :current="currentdata" @on-change="changePage" @on-page-size-change="changePagesize" :page-size="pagesizedata"
                        show-elevator show-total show-sizer></Page>
                </div>
                <div class="next_box" v-if="!theone">
                    <Page transfer :total="total1data" :current="currentdata" @on-change="changePage" @on-page-size-change="changePagesize" :page-size="pagesizedata"
                        show-elevator show-total show-sizer></Page>
                </div>
                <div class="footer">
                    <span>{{date_se}}</span>
                    <span>数据合计：成交件数{{alldata.itemTotalCount}}件</span>
                    <span>交易人数{{alldata.userTotalCount}}人</span>
                    <span>交易额￥{{alldata.totalAmount}}</span>

                    <span>采购市场价￥{{alldata.totalCost}}</span>

                    <span>交易利润￥{{alldata.totalProfit}}</span>
                    <span style="color: #ff0000;">分成金额￥{{alldata.totalSharing}}</span>
                    <Button style="border-radius:0;" @click="exportfeil">导出为excel</Button>
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
    import store from '../store';

    import {
        GetTradeInfo
    } from '@/api/api';
    import axios from '@/libs/axios';
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
        data() {
            return {
                // gurl: "http://localhost:5001",
                gurl: "http://netbarapi.tanwandao.com",
                adate: '',
                bdate: '',
                date_se: '',
                onchans: '',
                onchane: '',
                alldata: {

                    itemTotalCount: 4,
                    userTotalCount: 4,
                    totalAmount: 28758,
                    totalCost: 0,
                    totalProfit: 28758,
                    totalSharing: 0,
                    orders: {
                        data: [{
                            ipAddress: "",
                            phoneNumber: "",
                            imgUrl: "",
                            marketName: "",
                            completedAt: "",
                            bidPrice: '',
                            marketPrice: '',
                            profit: 0,
                            sharing: 0
                        }],
                        totalItems: 4,
                        pageNumber: 1,
                        pageSize: 20
                    }
                },
                totaldata: 50,
                currentdata: 1,
                pagesizedata: 20,
                ldata: '100',
                shrink: false,
                userName: '',
                isFullScreen: false,
                openedSubmenuArr: this.$store.state.app.openedSubmenuArr,
                theone: true,
                columnst: [{
                    title: "用户手机号",
                    key: 'phoneNumber'
                }, {
                    title: "饰品",
                    key: 'imgUrl',
                    render: (h, params) => {
                        const text = params.row.marketName
                        const url = params.row.imgUrl
                        return h("div", [
                            h(
                                "span", {
                                    style: {
                                        textAlign: "center"
                                    }
                                },
                                text
                            ),
                            h(
                                "img", {
                                    style: {
                                        float: "right",
                                        width: "50px"
                                    },
                                    attrs: {
                                        'src': url
                                    }
                                }
                            )
                        ]);
                    }
                }, {
                    title: "成交时间",
                    key: 'completedAt'
                }, {
                    title: "成交金额",
                    key: 'bidPrice'
                }, {
                    title: "采购市场价",
                    key: 'marketPrice'
                }, {
                    title: "交易利润",
                    key: 'profit'
                }, {
                    title: "分成金额",
                    key: 'sharing'
                }, {
                    title: "用户Ip",
                    key: 'ipAddress'
                }],
                tableDatat: [],
                tableDatatd: [{
                    phone: 2
                }],
                columnstd: [{
                    title: "月份",
                    key: 'phone'
                }, {
                    title: "成交件数",
                    key: 'phone'
                }, {
                    title: "交易人数",
                    key: 'phone'
                }, {
                    title: "交易额",
                    key: 'phone'
                }, {
                    title: "交易利润",
                    key: 'phone'
                }, {
                    title: "分成金额",
                    key: 'phone',
                    style: {
                        "color": "red"
                    }
                }],
                dateDA: '',

            };
        },
        computed: {
            menuList() {
                return this.$store.state.app.menuList;
            },
            pageTagsList() {
                return this.$store.state.app.pageOpenedList; // 打开的页面的页面对象
            },
            currentPath() {
                return this.$store.state.app.currentPath; // 当前面包屑数组
            },
            avatorPath() {
                return localStorage.avatorImgPath;
            },
            cachePage() {
                return this.$store.state.app.cachePage;
            },
            lang() {
                return this.$store.state.app.lang;
            },
            menuTheme() {
                return this.$store.state.app.menuTheme;
            },
            mesCount() {
                return this.$store.state.app.messageCount;
            }
        },
        methods: {
            changePage(e) {
                this.currentdata = e
                this.getlist()
            },
            changePagesize(e) {
                this.pagesizedata = e
                this.getlist()
            },
            init() {
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
            toggleClick() {
                this.shrink = !this.shrink;
            },
            handleClickUserDropdown(name) {
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
            checkTag(name) {
                let openpageHasTag = this.pageTagsList.some(item => {
                    if (item.name === name) {
                        return true;
                    }
                });
                if (!openpageHasTag) { //  解决关闭当前标签后再点击回退按钮会退到当前页时没有标签的问题
                    util.openNewPage(this, name, this.$route.params || {}, this.$route.query || {});
                }
            },
            handleSubmenuChange(val) {
            },
            beforePush(name) {
                // if (name === 'accesstest_index') {
                //     return false;
                // } else {
                //     return true;
                // }
                return true;
            },
            fullscreenChange(isFullScreen) {
            },
            changetheone(e) {
                this.theone = e
            },

            getdate() {
                let obj = new Date()
                let aa = obj.getFullYear() + "." + (obj.getMonth() + 1) + "." + obj.getDate()
                let dd = new Date()
                dd.setDate(obj.getDate() + 1)
                this.dateDA = aa
                this.adate = aa
                this.bdate = dd.getFullYear() + "." + (dd.getMonth() + 1) + "." + dd.getDate()
                this.startDate = aa
                this.endDate = dd.getFullYear() + "." + (dd.getMonth() + 1) + "." + dd.getDate()
                this.onchans = aa
                this.onchane = dd.getFullYear() + "." + (dd.getMonth() + 1) + "." + dd.getDate()
            },
            getlist() {
                let aa = {
                    pageSize: this.pagesizedata,
                    pageIndex: this.currentdata,
                    startDate: this.startDate,
                    endDate: this.endDate
                }

                axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
                axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
                axios.get(this.gurl + "/api/Statistics/GetTradeInfo", {
                    params: aa
                }).then((res) => {
                    if (res.data.success) {
                        this.alldata = res.data.data
                        this.tableDatat = res.data.data.orders.data
                        this.pagesizedata = res.data.data.orders.pageSize
                        this.totaldata = res.data.data.orders.totalItems
                        this.currentdata = res.data.data.orders.pageNumber
                        this.date_se = this.startDate + "-" + this.endDate
                    } else {
                        this.$Message.error(res.data.message)
                    }
                })
                // GetTradeInfo(aa).then(res => res.json())
                // .then((res) => {
                // })
            },
            onechanges(e) {
                this.onchans = e
            },
            onechangee(e) {
                this.onchane = e
            },
            changedatelist() {
                this.startDate = this.onchans
                this.endDate = this.onchane
                this.getlist()
            },
            exportfeil() {
                let aa = {
                    startDate: this.startDate,
                    endDate: this.endDate
                }
                // axios.defaults.headers.post['Content-Type'] = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
                axios.get(this.gurl + "/api/Statistics/ExportTradeInfo", {
                    params: aa,
                    responseType: 'blob'
                },
                {
                }).then((res) => {
                    this.download(res.data)
                })


            },
            // 下载文件
            download(data) {
                if (!data) {
                    return
                }
                let url = window.URL.createObjectURL(new Blob([data]))
                let link = document.createElement('a')
                link.style.display = 'none'
                link.href = url
                link.setAttribute('download', this.startDate+"-"+this.endDate+".xlsx")
                document.body.appendChild(link)
                link.click()
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
            lang() {
                util.setCurrentPath(this, this.$route.name); // 在切换语言时用于刷新面包屑
            }
        },
        beforeCreate() {
            if (Cookies.get('user')) {
                this.$store.commit('user/login', {
                    user: Cookies.get('user'),
                    userId: Cookies.get('userId')
                });
            }
        },
        mounted() {
            this.init();

        },
        created() {
            // 显示打开的页面的列表
            this.$store.commit('setOpenedList');
            this.getdate()
            this.getlist()
        }
    };
</script>