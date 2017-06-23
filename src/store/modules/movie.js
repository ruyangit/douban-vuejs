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
        // if (state.lists.data.length > 0 && path === state.lists.path && config.start === 0) {
        //     global.progress = 100
        //     return
        // }
        const { data } = await api.get('/v2/movie/' + config.method, { ...config })
        if (data) {
            commit('receiveMovieList', {
                ...config,
                ...data,
                path
            })
        }
    }

}

const mutations = {
    ['receiveMovieList'](state, { subjects, count, start, total, title, path, method}) {
        subjects.map(data => {
            // console.log(data);
            if (data.rating) {
                let average = data.rating.average
                data.rating.full = average / 2
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
