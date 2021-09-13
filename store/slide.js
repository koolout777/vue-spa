export const state = () => ({
  sliderWidth: 0,
  sliderPosts: [],
  sliderLimit: 3
})

export const getters = {
  getSliderWidth: (state) => state.sliderWidth,
  getSliderPosts: (state) => state.sliderPosts,
  getSliderLimit: (state) => state.sliderLimit
}

export const mutations = {
  setSliderWidth: (state, getSliderWidth) => (state.sliderWidth = getSliderWidth),
  setSliderPosts: (state, getSliderPosts) => (state.sliderPosts = getSliderPosts),
  setSliderLimit: (state, getSliderLimit) => (state.sliderLimit = getSliderLimit)
}