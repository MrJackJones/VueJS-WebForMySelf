<template>
  <v-dialog width="400px" v-model="modal">
    <v-btn class="warning" flat slot="activator">Edit</v-btn>

    <v-card>
      <v-container>
        <v-layout row>
          <v-flex xs12>
            <v-card-title>
              <h1 class="text--primary">Edit Ad</h1>
            </v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row>
          <v-flex xs12>
            <v-card-text>
              <v-text-field
                            name="title"
                            label="Title"
                            type="text"
                            v-model="editedTitle">
              </v-text-field>
              <v-text-field
                name="discriptions"
                label="Discriptions"
                type="text"
                milti-line
                v-model="editedDescription">
              </v-text-field>
            </v-card-text>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row>
          <v-flex xs12>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn flat @click="onCancel">Cancel</v-btn>
              <v-btn class="success" flat @click="onSave">Success</v-btn>
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
        name: 'EditAdModul',
        modal: false,
        editedTitle: this.ad.title,
        editedDescription: this.ad.descriptions
      }
    },
    methods: {
      onCancel () {
        this.editedDescription = this.ad.descriptions
        this.editedTitle = this.ad.title
        this.modal = false
      },
      onSave () {
        if (this.editedDescription !== '' && this.editedTitle !== '') {
          this.$store.dispatch('updateAd', {
            title: this.title,
            descriptions: this.descriptions,
            id: this.ad.id
          })
          this.modal = false
        }
      }
    }
  }
</script>

<style scoped>

</style>
