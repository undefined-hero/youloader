<template>
  <div id="wrapper">
    <img id="logo" src="~@/assets/logo.png" alt="electron-vue">
    <main>
      <div class="area">
        <ValidationObserver v-slot="{ invalid }">
          <form @submit.prevent>
            <ul>
              <li v-for="(link, index) in links" :key="link.id">
                <ValidationProvider class="input-plus-comp" name="regex" :rules="{ required: true, regex: regex }">
                  <input v-validate="{ regex: regex }" name="regex" v-model="links[index].url" ref="links" />
                  <button @click="removeLine">X</button>
                </ValidationProvider>
              </li>
              <button class="doc" @click="concat" :disabled="invalid">Add a link</button>
            </ul>
            <button class="doc" type="submit" :disabled="invalid" @click="download">Download</button>
          </form>
        </ValidationObserver>
      </div>
    </main>
  </div>
</template>

<script>
  import mixins from "@/mixins/common"
  import { ValidationProvider, ValidationObserver } from "vee-validate"

  export default {
    name: 'loading-page',
    mixins: [mixins],
    components: {
      ValidationProvider,
      ValidationObserver
    },
    data () {
      return {
        isLoading: false, 
        links: [{url: "", hasError: false}],
        regex: /^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/,
        isAddBtnActive: false
      }
    },
    computed: {
      toList() {
        const simplified = this.links.map(a => a.url)
        return simplified.filter((a) => a != "")
      }
    },
    methods: {
      concat() {
        this.$validator.validate().then(valid => {
          if(valid) {
            let length = this.links.length
            let url = this.links[length - 1].url
            if(url != "" && length < 5) {
              this.links.push({url: "", isLoading: false})
            }
            length = this.links.length
            this.$nextTick(() => {
              this.$refs.links[length - 1].focus()
            })
          }
        })
      },
      removeLine(e) {
        const value = e.target.parentElement.firstElementChild.value
        const index = this.toList.indexOf(value)
        if (this.links.length > 1 && index > -1) {
          this.links.splice(index, 1);
        }
      },
      disable() {
        return !this.isAddLinkBtnActive
      },
      download() {
        console.log("downloading")
        this.disabled = true
        const links = this.toList
        console.log(links)
        this.downloadLinks(links)
        // this.disabled = false
      }
    }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body { font-family: 'Source Sans Pro', sans-serif; }

  #wrapper {
    background:
      radial-gradient(
        ellipse at top left,
        rgba(255, 255, 255, 1) 40%,
        rgba(229, 229, 229, .9) 100%
      );
    height: 100vh;
    padding: 60px 80px;
    width: 100vw;
  }

  #logo {
    height: auto;
    margin-bottom: 20px;
    width: 420px;
  }

  main {
    display: flex;
    justify-content: space-between;
  }

  .area {
    display: block;
    margin-left: auto;
    margin-right: auto;
  }

  button.doc  {
    font-size: .8em;
    cursor: pointer;
    outline: none;
    padding: 0.75em 2em;
    border-radius: 2em;
    display: inline-block;
    color: #fff;
    background-color: #4fc08d;
    transition: all 0.15s ease;
    box-sizing: border-box;
    border: 1px solid #4fc08d;
    margin-bottom: 0.8em;
  }

  button.doc:disabled {
    background-color: #a2b9af;
    border: 1px solid #a2b9af;
    pointer-events: none;
  }

  .input-plus-comp {
    display: flex;
    flex-direction: row;
    border: 1px solid #4fc08d;
    font-size: .8em;
    padding: 0.25em 0.25em 0.25em 2em;
    border-radius: 2em;
  }

  .input-plus-comp input {
    flex-grow: 2;
    border: none;
    outline: none;
  }

  .input-plus-comp button {
    background-color: #e65f5f;
    font-size: .8em;
    border-radius: 2em;
    color:white;
    padding: 0.75em 1.25em;
    padding-left: -10em;
    outline: none;
  }

  .invalid {
    border: 1px solid #e65f5f !important;
  }

  ul {
    list-style-type: none;
  }

  li {
    margin-bottom: 0.8em;
    display:flex;
    flex-direction:row;
  }
</style>
