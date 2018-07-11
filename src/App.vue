<template>
    <div id="app">
        <PixelGram></PixelGram>
    </div>
</template>

<script>
import PixelGram from './components/PixelGram.vue'

export default {
  name: 'PixelGramApp',
  components: {
      PixelGram
  }
}
</script>

<style lang="sass">
#app
    font-family: 'Avenir', Helvetica, Arial, sans-serif
    -webkit-font-smoothing: antialiased
    -moz-osx-font-smoothing: grayscale
    text-align: center
    color: #2c3e50
    width: 100%

*
    box-sizing: border-box
    margin: 0

body, html
    width: 100%
    height: 100%

</style>
