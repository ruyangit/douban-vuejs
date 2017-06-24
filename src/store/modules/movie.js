import api from '@api'

const state = {
    lists: {
        data: [],
        count: 0,
        start: 0,
        total: 0,
        title: '',
        method: '',
        path: ''
    }
}

const actions = {
    async['getMovieList']({ commit, state, rootState: { global, route: { fullPath } } }, config) {
        const path = fullPath
        // console.log(config.method);
        // console.log(state.lists.method);
        // console.log(config.start );
        // console.log(state.lists.data.length );

        if (state.lists.data.length > 0 && config.method === state.lists.method && config.start === 0) {
            global.progress = 100
            return
        }

        const { data } = await api.get('/v2/movie/' + config.method, { ...config })
        if (data){
            if(data.code)return
            commit('receiveMovieList', {
                ...config,
                ...data,
                path
            })
        }
    }

}

const mutations = {
    ['receiveMovieList'](state, { subjects, count, start, total, title, path, method }) {
        subjects.map(e => {
            // console.log(data);
            if (e.rating) {
                let average = e.rating.average
                e.rating.full = average / 2
                // data.half = average % 2 === 0 ? 0 : 1
                // console.log(data.half);
                //this.gray = 5 - this.full - this.half
            }
        })

        if (start === 0) {
            subjects = [].concat(subjects)
        } else {
            subjects = state.lists.data.concat(subjects)
        }


        state.lists = {
            data: subjects, count, start, total, title, path, method
        }
    }
}

const getters = {
    ['getMovieList'](state) {
        return state.lists
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}
