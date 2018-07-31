import * as fb from 'firebase'

class Ad {
  constructor (title, descriptions, ownerID, imagesSrc = '', promo = false, id = null) {
    this.title = title
    this.descriptions = descriptions
    this.ownerID = ownerID
    this.imagesSrc = imagesSrc
    this.promo = promo
    this.id = id
  }
}

export default {
  state: {
    ads: []
  },
  mutations: {
    createAd (state, payload) {
      state.ads.push(payload)
    },
    loadAds (state, payload) {
      state.ads = payload
    },
    updateAd (state, {title, descriptions, id}) {
      const ad = state.ads.find(a => {
        return a.id === id
      })
      ad.title = title
      ad.descriptions = descriptions
    }
  },
  actions: {
    createAd: async function ({commit, getters}, payload) {
      commit('clearError')
      commit('setLoading', true)

      const image = payload.image

      try {
        const newAd = new Ad(
          payload.title,
          payload.descriptions,
          getters.user.id,
          '',
          payload.promo
        )

        const ad = await fb.database().ref('ads').push(newAd)

        const imageExt = image.name.slice(image.name.lastIndexOf('.'))

        const fileData = await fb.storage().ref(`ads/${ad.key}.${imageExt}`).put(image)

        const imageSrc = fileData.metadata.fullPath.toString()

        await fb.database().ref('ads').child(ad.key).update({imageSrc})

        commit('setLoading', false)
        commit('createAd', {
          ...newAd,
          id: ad.key,
          imageSrc
        })
      } catch (error) {
        commit('setError', error.message)
        commit('setLoading', false)
        throw error
      }
    },
    async fetchAds ({commit}) {
      commit('clearError')
      commit('setLoading', true)

      const resultAds = []

      try {
        const fbVal = await fb.database().ref('ads').once('value')
        const ads = fbVal.val()

        Object.keys(ads).forEach(key => {
          const ad = ads[key]
          resultAds.push(
            new Ad(
              ad.title,
              ad.descriptions,
              ad.ownerID,
              ad.imageSrc,
              ad.promo,
              key
            )
          )
        })
        commit('loadAds', resultAds)
        commit('setLoading', false)
      } catch (error) {
        commit('setError', error.message)
        commit('setLoading', false)
        throw error
      }
    },
    async updateAd ({commit}, {title, descriptions, id}) {
      commit('clearError')
      commit('setLoading', true)

      try {
        await fb.database().ref('ads').child(id).update({
          title, descriptions
        })
        commit('updateAd', {
          title, descriptions, id
        })
        commit('setLoading', false)
      } catch (error) {
        commit('setError', error.message)
        commit('setLoading', false)
        throw error
      }
    }
  },
  getters: {
    ads (state) {
      return state.ads
    },
    promoAds (state) {
      return state.ads.filter(ad => {
        return ad.promo
      })
    },
    myAds (state, getters) {
      return state.ads.filter(ad => {
        return ad.ownerID === getters.user.id
      })
    },
    adById (state) {
      return adId => {
        return state.ads.find(ad => ad.id === adId)
      }
    }
  }
}
