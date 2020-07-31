<template>
  <b-container>
    <div class="row">
      <div class="col-md-6">
        <b-form-file
          class="mb-3"
          size="sm"
          v-model="file"
          :state="Boolean(file)"
          placeholder="Choose a file or drop it here..."
          drop-placeholder="Drop file here..."
        ></b-form-file>
      </div>
      <div class="col-md-2">
        <b-button
          @click="getexcelfiledetails"
          block
          class="mb-3"
          size="sm"
          variant="success"
        >Parse CSV</b-button>
      </div>
    </div>
    <div class="row">
      <div class="col-md-8">
        <b-form-textarea
          id="textarea"
          v-model="smstext"
          placeholder="Compose your message..."
          rows="7"
          max-rows="6"
        ></b-form-textarea>
        <b-button
          @click="getsmstext"
          class="mt-2 float-left"
          size="sm"
          variant="success"
          :disabled="csvdetails.length > 0 ? false : true"
        >SEND MESSAGE</b-button>
      </div>
      <div class="col-md-2">
        <div id="buttons">
          <div v-for="(item, key,index) in csvheader" :key="index">
            <b-button draggable="true" class="mb-2" :id="index">{{ '{ ' + item + ' }'}}</b-button>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-8">
        <b-alert
          class="mt-3"
          v-for="(item, key,index) in newstring"
          :key="index"
          show
          variant="info"
        >
          Result Messages {{key + 1}}:
          <span>{{item}}</span>
        </b-alert>
      </div>
    </div>
  </b-container>
</template>

<script>
export default {
  name: "Helloworld",
  data() {
    return {
      file: null,
      smstext: "",
      newstring: [],
      variblestxt: "",
      csvdetails: [],
      csvheader: []
    };
  },
  methods: {
    newtext() {
      this.newstring = [];
      let s = this.smstext;
      let r = /\{.*?\}/g;
      for (let i = 0; i < this.csvdetails.length; i++) {
        const add = this.csvdetails[i];
        let newstring = s.replace(r, function(match) {
          return add[match.split(" ")[1]];
        });

        this.newstring.push(newstring);
      }
    },
    getsmstext() {
      this.newtext();
    },
    getexcelfileheader() {
      let vm = this;
      this.$papa.parse(this.file, {
        header: false,
        skipEmptyLines: true,
        truncated: false,
        complete: function(results, file) {
          vm.csvheader = results.data[0];
        }
      });
    },
    getexcelfiledetails() {
      let vm = this;
      this.$papa.parse(this.file, {
        header: true,
        escapeChar: '"',
        newline: "\r\n",
        delimiter: ",",
        linebreak: "↵",
        escapeFormulae: false,
        aborted: false,
        truncated: false,
        skipEmptyLines: true,
        transformHeader: true,
        complete: function(results, file) {
          vm.csvdetails = results.data;
        }
      });
      vm.getexcelfileheader();
    }
  }
};
document.addEventListener("dragstart", function(event) {
  event.dataTransfer.setData("Text", event.target.innerHTML);
});
</script>
