<template>
  <div id="wrapper">
    <img id="logo" src="~@/assets/logo.png" alt="electron-vue">
    <main>
      <div class="area">
        <ul>
          <li v-for="(link, index) in links" :key="link.id">
            <div class="input-plus-comp">
              <input v-model="links[index].url" ref="links" v-on:keyup.enter="concat"/>
              <button @click="concat">+</button>
            </div>
          </li>
        </ul>
        <button class="doc" @click="download">Download</button>
      </div>
    </main>
  </div>
</template>

<script>
  import mixins from "@/mixins/common"

  export default {
    name: 'loading-page',
    mixins: [mixins],
    data () {
      return {
        isLoading: false, 
        links: [{url: "", isLoading: false}],
        regex: "^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+"
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
        let length = this.links.length
        let latest = () => this.links[length - 1].url
        if(latest() != "" && length < 5) {
          this.links = this.links.concat({url: "", isLoading: false})
        }
        length = this.links.length
        this.$nextTick(() => {
          this.$refs.links[length - 1].focus()
        })
      },
      async download() {
        this.disabled = true
        const links = this.toList
        // console.log(links)
        await this.downloadLinks(links)
        this.disabled = false
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
    background-color: #4fc08d;
    font-size: .8em;
    border-radius: 2em;
    color:white;
    padding: 0.75em 2em;
    padding-left: -10em;
    outline: none;
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
