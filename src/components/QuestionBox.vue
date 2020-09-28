<template>
    <b-jumbotron>
        <template v-slot:header>Question {{questionNum+1}}</template>

        <template v-slot:lead>
            {{currentQuestion.question}}
        </template>

        <hr class="my-4" />

        <b-form-group label="">
            <b-list-group>
                <b-list-group-item v-for="(item, index) in showAnswer" :key="index" @click="choseAnswer(index)" :class="{'active' : index === indexAnswer}">{{item}}</b-list-group-item>
            </b-list-group>
        </b-form-group>
        <div id="btn-group">
            <b-button pill variant="primary" href="#">Submit</b-button>
            <b-button pill :disabled="indexAnswer === -1" variant="success" @click="next(setDefault)" >Next</b-button>
        </div>
    </b-jumbotron>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import _ from 'lodash'
export default {
  name: 'questionBox',
  props: {
    currentQuestion: Object,
    questionNum: Number,
    next: Function
  },
  data: function () {
    return {
      isActive: true,
      indexAnswer: -1,
      answersQuestion: -1,
      correct: false
    }
  },
  created () {
    console.log(this.showAnswer, 'hello')
  },
  computed: {
    // eslint-disable-next-line vue/return-in-computed-property
    showAnswer: function () {
      let arr = [...this.currentQuestion.incorrect_answers, this.currentQuestion.correct_answer]
      arr = _.shuffle(arr)
      return arr
    }
  },
  methods: {
    choseAnswer (idElement) {
      this.indexAnswer = idElement
    },
    setDefault () {
      let index = this.showAnswer.indexOf(this.currentQuestion.correct_answer)
      if (index === this.indexAnswer) {
        this.correct = true
      }
      let history = {
        listAnswer: this.showAnswer,
        answer: this.indexAnswer,
        correct: this.correct
      }
      this.$emit('increaseAnswer', history)
      this.correct = false
      this.indexAnswer = -1
    }
  }
}
</script>
<style lang="">
    .custom-control{
        width: 100%;
    }
    #btn-group{
        text-align: center;
    }
</style>
