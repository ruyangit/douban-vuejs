<template>
    <Row>
        <i-col span="4">
            <Menu width="auto">
                <Menu-group title="电影">
                    <Menu-item name="1-1" @click="movieCategory('in_theaters')">正在热映</Menu-item>
                    <Menu-item name="1-2" @click="movieCategory('coming_soon')">即将上映</Menu-item>
                    <Menu-item name="1-3">Top250</Menu-item>
                    <Menu-item name="1-4">口碑榜</Menu-item>
                    <Menu-item name="1-5">北美票房榜</Menu-item>
                    <Menu-item name="1-6">新片榜</Menu-item>
                </Menu-group>
            </Menu>
        </i-col>
        <i-col span="20">
            <div class="wrapper-content">
                <article>
                    <Row :gutter="16">
                        <i-col span="6" v-for="item in topics.data" :key="item.id">
                            <Card class="mb15">
                                <p slot="title" v-text="item.title"></p>
                                <img :src="item.images.small"></img>
                            </Card>
                        </i-col>
                    </Row>
                </article>
            </div>
        </i-col>
    </Row>
</template>

<script>
import { mapGetters } from 'vuex'

const fetchInitialData = async (store, config = { start: 0 }) => {
    const { path } = store.state.route
    const base = { ...config, city: '上海', count: 10 }
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
        //正在上映
        fetchInitialData(this.$store)

        
        // this.$store.dispatch('global/type', 'info')
        // this.$store.dispatch('global/gMessage', {type:'loading',content:'正在加载中...',duration: 0})
        //  this.$store.dispatch('global/gMessage',"随便发个消息")

        // 
    },
    // watch: {
    //     '$route'() {
    //         fetchInitialData(this.$store)
    //     }
    // },
    methods: {
        movieCategory(category) {
            // console.log(this.$store.method);
            console.log(category);
            // fetchInitialData(this.$store,{start: 0 ,method: category})
            // fetchInitialData(this.$store, {page})
        }
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
