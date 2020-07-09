<style lang="less" scoped>
.question-item {
  width: 100%;
  height: auto;
  float: left;
  padding: 15px;
  border: 1px dashed #dddddd;

  .title {
    width: 100%;
    height: auto;
    float: left;
    line-height: 36px;
    font-weight: 600;
  }

  .content {
    width: 100%;
    height: auto;
    float: left;
    font-size: 12px;

    .option {
      width: 100%;
      height: auto;
      float: left;

      div {
        width: 100%;
        height: auto;
        float: left;
        line-height: 20px;
        padding-left: 10px;
        margin-bottom: 2px;

        &.active {
          background-color: green;
          color: white;
        }
      }
    }
  }

  .answer {
    width: 100%;
    height: auto;
    float: left;
    color: white;
    line-height: 30px;
    background-color: #333;
    padding-left: 8px;
  }

  .result {
    width: 100%;
    height: auto;
    float: left;
    line-height: 30px;
  }

  .remark {
    width: 100%;
    height: auto;
    float: left;
    font-size: 12px;
    line-height: 18px;
    margin-top: 5px;
    margin-bottom: 5px;
  }

  .score {
    width: 100%;
    height: auto;
    float: left;
  }
}

.green {
  color: green;
}
.red {
  color: red;
}

p {
  margin-top: 0;
  margin-bottom: 0;
}

.operator {
  width: 100%;
  height: auto;
  float: left;
  margin-top: 15px;
  text-align: right;
}
</style>
<template>
  <div class="table-basic-vue frame-page h-panel" style="width: 800px">
    <div class="h-panel-bar">
      <span class="h-panel-title">阅卷</span>
    </div>
    <div class="h-panel-body">
      <div class="question-item" v-for="item in questions" :key="item.id">
        <div class="title">
          <span>{{item.question.type_text}}</span>
          <span>({{item.question.score}}分)</span>
          <span>{{item.question.level_text}}</span>
        </div>
        <div class="content">
          <div v-html="item.question.content"></div>
          <div class="option" v-if="item.question.type === 1 || item.question.type === 2">
            <div
              :class="selectIsActive(item.question.option1, item.question) ? 'active': ''"
              v-if="item.question.option1"
            >{{item.question.option1}}</div>
            <div
              :class="selectIsActive(item.question.option2, item.question) ? 'active': ''"
              v-if="item.question.option2"
            >{{item.question.option2}}</div>
            <div
              :class="selectIsActive(item.question.option3, item.question) ? 'active': ''"
              v-if="item.question.option3"
            >{{item.question.option3}}</div>
            <div
              :class="selectIsActive(item.question.option4, item.question) ? 'active': ''"
              v-if="item.question.option4"
            >{{item.question.option4}}</div>
            <div
              :class="selectIsActive(item.question.option5, item.question) ? 'active': ''"
              v-if="item.question.option5"
            >{{item.question.option5}}</div>
            <div
              :class="selectIsActive(item.question.option6, item.question) ? 'active': ''"
              v-if="item.question.option6"
            >{{item.question.option6}}</div>
            <div
              :class="selectIsActive(item.question.option7, item.question) ? 'active': ''"
              v-if="item.question.option7"
            >{{item.question.option7}}</div>
            <div
              :class="selectIsActive(item.question.option8, item.question) ? 'active': ''"
              v-if="item.question.option8"
            >{{item.question.option8}}</div>
            <div
              :class="selectIsActive(item.question.option9, item.question) ? 'active': ''"
              v-if="item.question.option9"
            >{{item.question.option9}}</div>
            <div
              :class="selectIsActive(item.question.option10, item.question) ? 'active': ''"
              v-if="item.question.option10"
            >{{item.question.option10}}</div>
          </div>
        </div>
        <div class="answer">
          <p>回答：{{item.answer_content}}</p>
          <template v-if="item.thumbs_rows.length > 0">
            <img
              v-for="(img, index) in item.thumbs_rows"
              :key="index"
              :src="img"
              width="70"
              height="70"
              @click="imagePreview(index, item.thumbs_rows)"
            />
          </template>
        </div>
        <div class="result" v-if="item.question.type !== 4">
          <p
            :class="item.is_correct ? 'green' : 'red'"
          >{{item.is_correct ? '正确' : '错误'}} | 本题得分：{{item.score}}分</p>
        </div>
        <div class="remark" v-if="item.question.remark">
          <p>解析：</p>
          <p v-html="item.question.remark"></p>
        </div>
        <div class="score" v-if="item.question.type === 4">
          <p>请打分：</p>
          <Select
            v-model="item.score"
            :datas="scoreList(item.question.score)"
            keyName="id"
            titleName="text"
          ></Select>
        </div>
      </div>
      <div class="operator">
        <p-button
          v-if="userPaper.status === 3"
          glass="h-btn h-btn-primary"
          permission="addons.Paper.paper.userPaper.submit"
          text="提交阅卷结果"
          @click="submitPaper()"
        ></p-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['paper_id', 'user_paper_id'],
  data() {
    return {
      userPaper: {},
      questions: []
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    scoreList(max) {
      var rows = [];
      for (var i = 1; i <= max; i++) {
        rows.push({
          id: i,
          text: i + '分'
        });
      }
      return rows;
    },
    selectIsActive(val, item) {
      var answers = item.answer.split(',');
      return answers.indexOf(val) !== -1;
    },
    init() {
      R.Extentions.paper.Paper.UserPaperInfo({
        id: this.paper_id,
        user_paper_id: this.user_paper_id
      }).then(res => {
        this.userPaper = res.data.userPaper;
        this.questions = res.data.questions;
      });
    },
    submitPaper() {
      var data = {};
      for (var i = 0; i < this.questions.length; i++) {
        var item = this.questions[i];
        if (item.question.type !== 4) {
          // 过滤非问答题
          continue;
        }

        data[item.id] = {
          score: item.score
        };
      }

      R.Extentions.paper.Paper.SubmitScore({
        id: this.paper_id,
        user_paper_id: this.user_paper_id,
        data: data
      }).then(res => {
        HeyUI.$Message.success('评卷成功，' + res.data.nickname + '得分：' + res.data.total_score + '分');
        this.$emit('success');
      });
    },
    imagePreview(index, items) {
      this.$ImagePreview(items, index);
    }
  }
};
</script>
