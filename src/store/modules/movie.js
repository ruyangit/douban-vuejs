import api from '@api'

const state = {
    lists: {
        data: [],
        count: 0,
        start: 0,
        total: 0,
        title: '',
        method: 'in_theaters',
        path: ''
    }
}

const actions = {
    async['getMovieList']({ commit, state, rootState: { global, route: { fullPath } } }, config) {
        const path = fullPath
        // console.log(state.inTheaters.subjects.length);
        // console.log(state.inTheaters.path);
        // console.log(path);
        // console.log(config.start);
        // if (state.inTheaters.subjects.length > 0 && path === state.inTheaters.path && config.start === 0) {
        //     global.progress = 100
        //     return
        // }
        const { data } = await api.get('/v2/movie/'+ state.lists.method, { ...config})
        console.log(data);
        // console.log(path);
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
    ['receiveMovieList'](state, { subjects, count, start, total, title, path }) {
        if (start === 0) {
            subjects = [].concat(subjects)
        } else {
            subjects = state.lists.data.concat(subjects)
        }
        state.lists = {
            data: subjects, count, start, total, title, path
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
