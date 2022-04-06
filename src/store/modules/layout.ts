import { ActionContext } from 'vuex'

export interface layoutState {
  elementSize: string
}

const state = (): layoutState => ({
  elementSize: 'small',
})

const mutations = {
  SET_ELEMENTSIZE(state: layoutState, elementSize: string) {
    state.elementSize = elementSize;
  }
}

const actions = {
  setElementSize({ commit }: ActionContext<layoutState, layoutState>, elementSize: string) {
    commit('SET_ELEMENTSIZE', elementSize);
  }
}

export default {
  namespace: true,
  state,
  mutations,
  actions
}