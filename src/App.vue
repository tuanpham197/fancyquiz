<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-12">
          <b-alert show>Fancy Quiz App</b-alert>
          <b-alert show variant="info">Counter: {{index+1}}/10 -- {{getCategoryName}}</b-alert>
        </div>
        <div class="col-12">
            <question-box
              v-if="questions.length"
              :currentQuestion="questions[index]"
              :questionNum="index"
              :next="next"
              :totalSuccess="totalSuccess"
              @increaseAnswer="handleAnswer"
            >
            </question-box>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import QuestionBox from './components/QuestionBox.vue'
export default {
  data () {
    return {
      dismissSecs: 10,
      dismissCountDown: 0,
      showDismissibleAlert: false,
      questions: [],
      index: 0,
      totalSuccess: 0,
      history: []
    }
  },
  components: {
    'question-box': QuestionBox
  },
  created () {

  },
  computed: {
    getCategoryName () {
      return this.$route.params.name ? JSON.parse(JSON.stringify(this.$route.params.name)).name : 'Animal'
    }
  },
  methods: {
    countDownChanged (dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    showAlert () {
      this.dismissCountDown = this.dismissSecs
    },
    next (cb) {
      cb()
      if (this.index < 9) { this.index = this.index + 1 } else {
        // eslint-disable-next-line standard/object-curly-even-spacing
        this.$router.push({ name: 'history', params: { history: this.history} })
        // this.$swal.fire({
        //   title: 'Do you want to go History?',
        //   showDenyButton: true,
        //   showCancelButton: true,
        //   confirmButtonText: `History`,
        //   denyButtonText: `Home Page`
        // }).then((result) => {
        //   /* Read more about isConfirmed, isDenied below */
        //   if (result.isConfirmed) {
        //     this.$router.push({ name: 'history' })
        //   } else if (result.isDenied) {
        //     this.$router.push({ name: 'home' })
        //   }
        // })
      }
    },
    handleAnswer (event) {
      // eslint-disable-next-line no-unused-vars
      let {listAnswer, answer, correct} = event
      if (correct) {
        this.totalSuccess++
      }
      this.history.push(event)
    }
  },
  mounted: function () {
    fetch(`https://opentdb.com/api.php?amount=10&category=${this.$route.params.idCate ? this.$route.params.idCate : 27}&type=multiple`, {
      method: 'get'
    }).then((response) => {
      return response.json()
    }).then(jsonData => {
      this.questions = jsonData.results
    })
  }
}
</script>
<style lang="" scope="this api replaced by slot-scope in 2.5.0+">
  .col-12 {
    padding-top: 15px;
  }
  .display-3{
    font-size: 2.5rem;
  }
</style>
