<template>
  <b-container class="bv-example-row">
    <b-row>
      <b-col style="paddingTop:15px">
        <b-alert show><h1>Fancy Quiz App</h1></b-alert>
        <b-alert show variant="danger">Please, chose a category after start quiz (^-^)</b-alert>
      </b-col>
    </b-row>
    <b-row>
      <b-col md='3' v-for="(category, index) in categorys" :key="index">
        <div>
          <b-button size="lg" style="width:100%;marginBottom: 10px" variant="success" @click="choseCategory(category.id)">{{category.name}}-- {{category.id}}</b-button>
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-button size="lg" style="width:100%;marginTop:15px" variant="primary" :disabled="!start" @click="nextPage">START</b-button>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  data () {
    return {
      categorys: [
        {
          id: 27,
          name: 'Animal'
        },
        {
          id: 17,
          name: 'Science & Nature'
        },
        {
          id: 19,
          name: 'Science: Mathematics'
        },
        {
          id: 18,
          name: 'Science: Computers'
        },
        {
          id: 20,
          name: 'Mythology'
        },
        {
          id: 21,
          name: 'Sports'
        },
        {
          id: 22,
          name: 'Geography'
        },
        {
          id: 23,
          name: 'History'
        }
      ],
      start: false,
      idCategory: -1
    }
  },
  methods: {
    choseCategory (id) {
      this.start = true
      this.idCategory = id
    },
    nextPage () {
      // eslint-disable-next-line standard/object-curly-even-spacing
      this.$router.push({ name: 'start', params: { idCate: this.idCategory, name: this.category} })
    }
  },
  computed: {
    category () {
      return this.categorys.find(element => element.id === this.idCategory)
    }
  }
}
</script>
