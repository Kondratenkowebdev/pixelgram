<template>
    <div class='b-wrapper'>
        <div class='b-pixelgram-canvas'
             :style='getCanvasStyles'>
            <div v-for='(pixelData, index) in dataForRender'
                 :key='index'
                 @click='drawPixel(index, pixelData.number)'
                 @mousedown='changeMouseState(true)'
                 @mouseup='changeMouseState(false)'
                 @mouseover='drawPixel(index, pixelData.number, true)'
                 :style='[
                     getBgColor(pixelData),
                     setPosition(pixelData.left, pixelData.top),
                     getPointer(pixelData.number)
                 ]'
                 class='b-square' v-html='getSquareText(pixelData)'>
            </div>
        </div>
        <div class='b-pixelgram-buttons'>
            <div v-for='colorData in colorsDuplicateCount'
                 @click='setActiveColor(colorData.number)'
                 :style='getPixelGramButtonStyle(colorData.color)'
                 :class='activeButtonsColor(colorData.number)'
                 class='b-pixelgram-button'>
                {{ colorData.number }}
            </div>
        </div>
    </div>
</template>

<script>
import initialData from '../data.js'
import prepareMixin from '../utils/prepareDataMixin.js'

export default {
    name: 'PixelGramCanvas',
    data() {
        return {
            initialData: initialData,
            canvasNumberByWidth: 38,
            canvasNumberByHeight: 42,
            squareSize: 20,
            dataForRender: [],
            colorsDuplicateCount: [],
            activeColorNumber: null,
            mouseIsDown: false
        }
    },
    mixins: [prepareMixin],
    methods: {
        getBgColor(data) {
            return {
                'background-color': this.getColor(data),
            }
        },
        getColor(data) {
            if (data.fill === true) {
                return data.color
            }

            if (this.isActiveColorNumber(data.number)) {
                return 'rgba(0,0,0,0.1)'
            }
        },
        getPointer(number) {
            if (this.isActiveColorNumber(number)) {
                return {
                    'cursor': 'pointer'
                }
            }
        },
        isPixelForDrawing(color) {
            return color !== '#fff'
        },
        setPosition(left, top) {
            return {
                'left': `${left}px`,
                'top': `${top}px`,
            }
        },
        getPixelGramButtonStyle(color) {
            return {
                'backgroundColor': color
            }
        },
        setActiveColor(number) {
            this.activeColorNumber = number
        },
        drawPixel(index, number, isDrag) {
            if (isDrag && !this.mouseIsDown) {
                return
            }

            if (this.isActiveColorNumber(number)) {
                this.dataForRender[index].fill = true
            }
        },
        isActiveColorNumber(number) {
            return number === this.activeColorNumber
        },
        activeButtonsColor(number) {
            if (this.isActiveColorNumber(number)) {
                return 'active'
            }
        },
        getSquareText(pixelData) {
            return !pixelData.fill ? pixelData.number : null
        },
        changeMouseState(value) {
            this.mouseIsDown = value
        }
    },
    computed: {
        getSize() {
            return {
                'width': `${this.squareSize}px`,
                'height': `${this.squareSize}px`,
            }
        },
        getCanvasStyles() {
            return {
                'width': `${this.squareSize * this.canvasNumberByWidth}px`,
                'height': `${this.squareSize * this.canvasNumberByHeight}px`,
            }
        },
    },
    created() {
        this.colorsDuplicateCount = this.getDuplicateColorObject();
        this.dataForRender = this.prepareDataForRender();
    }
}
</script>

<style scoped lang="sass">
    .b-pixelgram-canvas
        position: relative
        margin: 20px auto

    .b-square
        border: 1px solid rgba(0,0,0,0.8)
        width: 19px
        height: 19px
        position: absolute
        box-sizing: content-box
        color: black
        font-size: 12px
        display: flex
        align-items: center
        justify-content: center
        user-select: none

    .b-pixelgram-buttons
        margin: 40px auto
        display: flex
        align-items: center
        justify-content: center
        width: 100%

    .b-pixelgram-button
        width: 40px
        height: 40px
        border: 1px solid black
        margin: 0 10px
        align-items: center
        justify-content: center
        color: #fff
        display: flex
        cursor: pointer
        flex: 0 0 40px
        float: left

        &.active
            border-width: 3px
            border-color: green

    .b-wrapper
        width: 100%
        display: flex
        flex-direction: column
        align-items: center
        justify-content: center
        margin: 0 auto
</style>
