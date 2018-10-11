<template lang="pug">
  extends ../views/layouts/_calc-generic.pug
  block content
    v-card-title.pb-0(primary-title style='display: block;')
      .headline
        | Square Footage
      //- div(:class='theAppIsDark ? colorProps.text.subtitle.dark : colorProps.text.subtitle.light')
        block subtitle
    v-card-text
      v-container.pa-0(fluid)
        //- Width label
        v-layout(row justify-center)
          v-flex.text-xs-center(xs12)
            p.sirp-divider
              span Width
        //- width input
        v-layout.mb-4(row wrap justify-center)
          v-flex.text-xs-center(xs6)
            v-text-field.v-input__joined--left(
              box
              v-model='calcInput.width.ft'
              type='number'
              :color='fieldColor'
              label='Feet')
          v-flex.text-xs-center(xs6)
            v-text-field.v-input__joined--right(
              box
              v-model='calcInput.width.in'
              type='number'
              :color='fieldColor'
              label='Inches')
        //- Length label
        v-layout(row justify-center)
          v-flex.text-xs-center(xs12)
            p.sirp-divider
              span Length
        //- length input
        v-layout.mb-4(row wrap justify-center)
          v-flex(xs6)
            v-text-field.v-input__joined--left(
              box
              v-model='calcInput.length.ft'
              type='number'
              :color='fieldColor'
              label='Feet')
          v-flex(xs6)
            v-text-field.v-input__joined--right(
              box
              v-model='calcInput.length.in'
              type='number'
              :color='fieldColor'
              label='Inches')
        v-layout(row)
          v-container.pa-0(fluid)
            v-list(three-line subheader v-if='result !== 0')
              v-list-tile
                v-list-tile-content
                  v-list-tile-title Description
                  v-list-tile-sub-title {{ displayDescription }}
                v-list-tile-action
                  v-btn(icon ripple @click.native='doCopy(displayDescription)')
                    include ../views/Global/btns/_result-step-copy-icon.pug
              v-list-tile
                v-list-tile-content
                  v-list-tile-title Square Footage
                  v-list-tile-sub-title {{ resultDisplay }}
                v-list-tile-action
                  v-btn(icon ripple @click.native='doCopy(resultWithLabel)')
                    include ../views/Global/btns/_result-step-copy-icon.pug
              v-list-tile
                v-list-tile-content
                  v-list-tile-title Square Inches
                  v-list-tile-sub-title {{ resultDisplayInches }}
                v-list-tile-action
                  v-btn(icon ripple @click.native='doCopy(resultInchesWithLabel)')
                    include ../views/Global/btns/_result-step-copy-icon.pug



</template>

<script>
  import { theAppIsDark } from '@/mixins/appIsDark.js'
  import { globalCalc } from '@/mixins/globalCalc.js'

  export default {
    mixins: [
      theAppIsDark,
      globalCalc
    ],
    data () {
      return {
        defaultInputs: '',
        msg: 'SquareFootage',
        calcInput: {
          width: {
            ft: null,
            in: null
          },
          length: {
            ft: null,
            in: null
          }
        }
      }
    },
    computed: {
      displayDescription () {
        let wft = Number(this.calcInput.width.ft)
        let win = Number(this.calcInput.width.in)
        let lft = Number(this.calcInput.length.ft)
        let lin = Number(this.calcInput.length.in)

        let widthText
        let lengthText

        if (wft === 0) {
          widthText = win + '"'
        } else if (win === 0) {
          widthText = wft + '\''
        } else {
          widthText = wft + '\' ' + win + '"'
        }

        if (lft === 0) {
          lengthText = lin + '"'
        } else if (lin === 0) {
          lengthText = lft + '\''
        } else {
          lengthText = lft + '\' ' + lin + '"'
        }
        return widthText + ' x ' + lengthText
      },
      result () {
        return ((Number(this.calcInput.width.ft) + (Number(this.calcInput.width.in) / 12)) * (Number(this.calcInput.length.ft) + (Number(this.calcInput.length.in) / 12)))
      },
      resultDisplay () {
        return this.result.toFixed(this.decimalRounding)
      },
      resultWithLabel () {
        return this.resultDisplay + ' ft²'
      },
      resultInches () {
        return ((Number(this.calcInput.width.ft) * 12) + Number(this.calcInput.width.in)) * ((Number(this.calcInput.length.ft) * 12) + Number(this.calcInput.length.in))
      },
      resultDisplayInches () {
        return this.resultInches.toFixed(this.decimalRounding)
      },
      resultInchesWithLabel () {
        return this.resultDisplayInches + ' in²'
      }
    }
  }
</script>
