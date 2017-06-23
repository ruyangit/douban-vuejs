<template>
    <div style="padding:20px;">
        <Row :gutter="16">
            <Col span="6" v-for="item in inTheaters.subjects" :key="item.id">
            <Card shadow class="mb15">
                <p slot="title" v-text="item.title"></p>
                <img :src="item.images.small"></img>
            </Card>
            </Col>
        </Row>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

const fetchInitialData = async (store, config = { start: 0 }) => {
    const { path } = store.state.route
    const base = { ...config, city: '上海', count: 25 }
    await store.dispatch('douban/movie/getInTheaters', base)
}
export default {
    computed: {
        ...mapGetters({
            inTheaters: 'douban/movie/getInTheaters'
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
        fetchInitialData(this.$store)
    }
}
</script>

<style scoped>
.mb15{
    margin-bottom: 15px;
}
</style>
