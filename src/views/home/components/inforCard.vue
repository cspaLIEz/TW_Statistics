<style lang="less">
    @import './styles/infor-card.less';
</style>

<template>
    <Card :padding="0">
        <div class="infor-card-con">
            <Col class="infor-card-icon-con" :style="{backgroundColor: color, color: 'white'}" span="8">
                <Row class="height-100" type="flex" align="middle" justify="center">
                    <Icon :type="iconType" :size="iconSize"></Icon>
                </Row>
            </Col>
            <Col span="16" class="height-100">
                <Row type="flex" align="middle" justify="space-between" class="height-100 padding-lr-16">
                    <div class="infor-intro-text">{{ introText }}</div>
                    <count-up 
                        class="infor-card-count user-created-count" 
                        :id-name="idName" 
                        :end-val="endVal" 
                        :color="color"
                        :countSize="countSize"
                        :countWeight="countWeight"
                    >
                    </count-up>
                    <div class="infor-intro-img">
                        <img src="../../../images/index/fill.png">
                    </div>
                </Row>
            </Col>
        </div>
    </Card>
</template>

<script>
import countUp from './countUp.vue';

export default {
    name: 'inforCard',
    components: {
        countUp
    },
    props: {
        idName: String,
        endVal: Number,
        color: String,
        iconType: String,
        introText: String,
        countSize: {
            type: String,
            default: '30px'
        },
        countWeight: {
            type: Number,
            default: 700
        },
        iconSize: {
            type: Number,
            default: 40
        }
    }
};
</script>

