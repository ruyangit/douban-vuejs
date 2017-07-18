<template>
    <Row>
        <i-col span="4">
            <Menu width="auto" @on-select="handleSelect" active-name="in_theaters">
                <Menu-group title="电影">
                    <Menu-item name="in_theaters">
                        <Icon type="heart"></Icon>正在热映</Menu-item>
                    <Menu-item name="coming_soon">
                        <Icon type="paper-airplane"></Icon>即将上映</Menu-item>
                    <Menu-item name="top250">
                        <Icon type="ios-pulse-strong"></Icon>Top250</Menu-item>
                    <!--<Menu-item name="weekly">口碑榜</Menu-item>
                            <Menu-item name="us_box">北美票房榜</Menu-item>
                            <Menu-item name="new_movies">新片榜</Menu-item>-->
                </Menu-group>
            </Menu>
        </i-col>
        <i-col span="20">
            <div class="wrapper-content">
                <article style="min-height: 500px">
                    <Card v-for="(item, index) in topics.data" :key="item.title" style="margin-bottom: 10px;">
                        <Row>
                            <i-col span="6">
                                <div class="live-cover" :style="{'backgroundImage': 'url(' + item.images.large + ')'}"></div>
                            </i-col>
                            <i-col span="14">
                                <div class="live-info">
                                    <div class="live-title">{{ item.title }}</div>
                                    <div class="live-time" v-if="item.time !== 'finish'">年代：{{ item.year }}</div>
                                    <div class="live-cost">导演：<span style="color: #ff5500;margin-right:15px;" v-for="director in item.directors" :key="director.name">{{ director.name }}</span></div>
                                    <div class="live-cost">主演：<span style="color: #ff5500;margin-right:15px;" v-for="cast in item.casts" :key="cast.name">{{ cast.name }}</span></div>
                                    <div class="live-desc">
                                        <Row :gutter="16">
                                            <i-col span="6" v-for="cast in item.casts" :key="cast.name">
                                                <div v-if="cast.avatars" class="live-cost-avatars" :style="{'backgroundImage': 'url(' + cast.avatars.large + ')'}"></div>
                                            </i-col>
                                        </Row>
                                    </div>
                                </div>
                            </i-col>
                            <i-col span="4">
                                <div class="live-link">
                                    <i-button type="primary" @click="handleClick(item)">
                                        <div>
                                            <Icon type="android-arrow-dropright-circle" size="20"></Icon>
                                        </div>
                                        <div v-if="item.time === 'finish'">查看视频</div>
                                        <div v-else>查看视频</div>
                                    </i-button>
                                </div>
                            </i-col>
                        </Row>
                    </Card>
                    <a v-if="topics.total!=topics.data.length" @click="loadMore()" href="javascript:;">查看更多</a>
                </article>
            </div>
        </i-col>
    </Row>
</template>

<script>
import { mapGetters } from 'vuex'

const fetchInitialData = async (store, config = { start: 0 }) => {
    const { path } = store.state.route
    const base = { ...config, city: '上海', count: 15 }
    await store.dispatch('douban/movie/getMovieList', base)
}
export default {
    computed: {
        ...mapGetters({
            topics: 'douban/movie/getMovieList'
        })
    },
    metaInfo() {
        var title = '豆瓣电影'
        return {
            title,
            meta: [{ vmid: 'description', name: 'description', content: title }]
        }
    },
    async mounted() {
        fetchInitialData(this.$store, { start: 0, method: 'in_theaters' })
    },
    methods: {
        handleSelect(type) {
            fetchInitialData(this.$store, { start: 0, method: type });
        },
        loadMore(start = this.topics.data.length) {
            fetchInitialData(this.$store, { start, method: this.topics.method });
        },
        handleClick(e){
            window.open(e.alt)
        }
    },
    watch: {
        // 'topics.data': {
        //     handler: (val, oldVal) => {
        //         // console.log(val);
        //         // console.log(oldVal);
        //     },
        //     // 深度观察
        //     deep: true
        // }
    }
}
</script>

<style scoped>
.mb15 {
    margin-bottom: 15px;
}

.wrapper-content {
    padding: 20px 25px;
    position: relative
}

.wrapper-content:after {
    content: "";
    display: block;
    width: 1px;
    background: #d7dde4;
    position: absolute;
    top: 0;
    bottom: 0;
    left: -1px
}

.live-cover {
    height: 320px;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
}

.live-info {
    height: 130px;
    padding: 10px;
}

.live-title {
    font-size: 16px;
    font-weight: bold;
}

.live-time {
    margin-top: 5px;
}

.live-cost {
    margin-top: 5px;
}

.live-desc {
    margin-top: 5px;
    color: #9ea7b4;
}

.live-link {
    height: 150px;
    line-height: 150px;
    text-align: center;
    display: block;
}

.live-cost-avatars {
    margin-top: 3px; 
    height: 200px;
    background-repeat: no-repeat; 
    background-size: cover;
    background-position: center;
}
</style>
