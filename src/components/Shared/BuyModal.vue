<template>
  <v-dialog width="400px" v-model="modal">
    <v-btn class="primary" flat slot="activator">Buy</v-btn>

    <v-card>
      <v-container>
        <v-layout row>
          <v-flex xs12>
            <v-card-title>
              <h1 class="text--primary">Do you want`t to buy it?</h1>
            </v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row>
          <v-flex xs12>
            <v-card-text>
              <v-text-field
                name="name"
                label="Your Name"
                type="text"
                v-model="name">
              </v-text-field>
              <v-text-field
                name="phone"
                label="Your Phone"
                type="text"
                milti-line
                v-model="phone">
              </v-text-field>
            </v-card-text>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row>
          <v-flex xs12>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                flat
                @click="onCancel"
                :disabled="localloading"
              >Cancel</v-btn>
              <v-btn
                class="success"
                flat
                @click="onSave"
                :disabled="localloading"
                :loading="localloading"
              >Buy it!</v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    props: ['ad'],
    data () {
      return {
        name: '',
        phone: '',
        modal: false,
        localloading: false
      }
    },
    methods: {
      onCancel () {
        this.name = ''
        this.phone = ''
        this.modal = false
      },
      onSave () {
        if (this.name !== '' && this.phone !== '') {
          this.localloading = true
          this.$store.dispatch('createOrder', {
            name: this.name,
            phone: this.phone,
            adId: this.ad.id,
            ownerId: this.ad.ownerID
          })
            .finally(() => {
              this.name = ''
              this.phone = ''
              this.localloading = false
              this.modal = false
            })
        }
      }
    }
  }
</script>

<style scoped>

</style>
