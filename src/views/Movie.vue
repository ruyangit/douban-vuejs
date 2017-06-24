<template>
    <Row>
        <i-col span="4">
            <Menu width="auto" @on-select="handleSelect" active-name="in_theaters">
                <Menu-group title="电影">
                    <Menu-item name="in_theaters">正在热映</Menu-item>
                    <Menu-item name="coming_soon">即将上映</Menu-item>
                    <Menu-item name="top250">Top250</Menu-item>
                    <!--<Menu-item name="weekly">口碑榜</Menu-item>
                        <Menu-item name="us_box">北美票房榜</Menu-item>
                        <Menu-item name="new_movies">新片榜</Menu-item>-->
                </Menu-group>
            </Menu>
        </i-col>
        <i-col span="20">
            <div class="wrapper-content">
                <article>
                    <Row :gutter="16">
                        <i-col span="6" v-for="(item,index) in topics.data" :key="item.id">
                            <Card class="mb15">
                                <p slot="title" v-text="item.title"></p>
                                <p slot="title">
                                    <Rate v-if="item.rating" show-text v-model="item.rating.full" disabled>
                                        <span style="color: #f5a623">{{ item.rating.average }}</span>
                                    </Rate>
                                </p>
                                <!--<p slot="title" v-text="item.original_title"></p>-->
                                <Row>
                                    <i-col span="12" align="middle" justify="center">
                                        <img v-if="item.images" :src="item.images.small" alt=""></img>
                                    </i-col>
                                    <i-col span="12">
                                        <p v-if="item.directors">导演：{{item.directors[0].name}}</p>
                                        <p v-if="item.year">年代：{{item.year}}</p>
                                    </i-col>
                                </Row>
    
                            </Card>
                        </i-col>
                    </Row>
                    <a v-if="topics.total!=topics.data.length" @click="loadMore()" href="javascript:;">查看更多</a>
                    <!--<a v-else href="javascript:;">没有更多了</a>-->
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
</style>
