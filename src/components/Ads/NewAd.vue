<template>
	<v-container>
		<v-layout row>
			<v-flex xs12 sm6 md4 offset-sm3>
        <h1 class="text--secondary mb-3">Create New AD</h1>
        <v-form ref="form" v-model="valid" validation class="mb-3">
          <v-text-field
                        name="title"
                        label="Title"
                        type="text"
                        :rules="[v => !!v || 'Ttile is required']"
                        required
                        v-model="title">

          </v-text-field>
          <v-textarea
                        name="descriptions"
                        label="AD Descriptions"
                        type="text"
                        :rules="[v => !!v || 'Descriptions is required']"
                        v-model="descriptions">

          </v-textarea>
        </v-form>
        <v-layout class="mb-3">
          <v-flex xs12>
              <v-btn class="warning" @click="trigerUpload">Upload
                <v-icon right dark>cloud_upload</v-icon>
              </v-btn>
            <input ref='fileInput'
                   type="file"
                   style="display: none"
                   accept="image/*"
                   @change="onFileChange"
            />
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12>
          <v-switch
            color="primery"
            label="Ad to promo?"
            v-model="promo"
          ></v-switch>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12>
          <img :src="imageSrc" height="100px" v-if="imageSrc"/>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12>
          <v-spacer></v-spacer>
          <v-btn class="success" :loading="loading" @click="createAd" :disabled="(!valid || !image)|| loading" >Create AD</v-btn>
          </v-flex>
        </v-layout>
			</v-flex>
		</v-layout>
	</v-container>
</template>


<script>
	export default {
	  data () {
	    return {
	      title: '',
      descriptions: '',
      promo: false,
      valid: false,
      image: null,
      imageSrc: ''
    }
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    }
  },
  methods: {
    createAd () {
	      if (this.$refs.form.validate() && this.image) {
	        const ad = {
	          title: this.title,
          descriptions: this.descriptions,
          promo: this.promo,
          image: this.image
        }
        this.$store.dispatch('createAd', ad)
          .then(() => {
            this.$router.push('/list')
          })
          .catch(() => {})
      }
    },
    trigerUpload () {
	      this.$refs.fileInput.click()
    },
    onFileChange (event) {
	      const file = event.target.files[0]
      const reader = new FileReader()
      reader.onload = e => {
	        this.imageSrc = reader.result
      }
      reader.readAsDataURL(file)
      this.image = file
    }
  }
	}
</script>
