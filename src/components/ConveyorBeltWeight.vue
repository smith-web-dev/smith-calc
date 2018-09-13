<template lang="pug">
  div
    v-toolbar.primary(style='margin-top: -55px;')
    //- include ../views/SnowplowBladeWeight/shipment/_shipmentControlFAB.pug
    //- include ../views/SnowplowBladeWeight/shipment/_shipmentAddNotesDialog.pug
    //- include ../views/SnowplowBladeWeight/shipment/_shipmentBottomSheet.pug
    //- include ../views/SnowplowBladeWeight/shipment/_shipmentInfoBottomSheet.pug
    //- include ../views/SnowplowBladeWeight/shipment/_confirmClearDeleteDialog.pug
    v-container.pa-0(fluid)
      p {{ calcInput.beltSel.val === null ? `nullz` : calcInput.beltSel.val.value }}
      include ../views/Global/_snackbar.pug
      v-stepper.transparent.elevation-0(v-model='currentStep')
        //- Steps
        include ../views/ConveyorBeltWeight/_step0.pug

        v-stepper-items
          //- Select snowplow material size
          v-stepper-content.px-1.pt-1(step='1')
            include ../views/ConveyorBeltWeight/_step1.pug

          //- Enter snowplow blade length
          v-stepper-content.px-1.pt-1(step='2')
            include ../views/ConveyorBeltWeight/_step2.pug

          //- Enter quantity
          v-stepper-content.px-1.pt-1(step='3')
            include ../views/ConveyorBeltWeight/_step3.pug

          //- Results
          v-stepper-content.px-1.pt-1(step='4')
            include ../views/ConveyorBeltWeight/_step4.pug
</template>

<script>
  import ConveyorBeltData from '../data/ConveyorBeltWeight.json'

  export default {
    data () {
      return {
        currentStep: 0,
        snackbar: { text: null, display: false },
        beltTypes: ConveyorBeltData.beltTypes,
        beltData: {
          materials: [
            { text: 'Rubber', value: 'rubber' },
            { text: 'PVC', value: 'pvc' }
          ],
          plies: [
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10
          ],
          piw: [
            120, 150, 200, 220, 250, 275, 300, 330
          ]
        },
        calcInput: {
          currentInput: null,
          belt: null,
          beltSel: {
            mat: null,
            ply: null,
            piw: null,
            val: null,
            topCover: null,
            botCover: null
          }
        }
      }
    },
    methods: {
      resetAll () {
        this.currentStep = 1
      },
      moveStep (direction) {
        var thisStep = parseInt(this.currentStep)
        var moveToStep
        if (direction === 'f') {
          moveToStep = thisStep + 1
          this.currentStep = moveToStep
        } else if (direction === 'b') {
          moveToStep = thisStep - 1
          this.currentStep = moveToStep
        }
      },
      wasSelected () {
        var selMat = this.calcInput.beltSel.mat
        var newSet = this.currentInput
        if (selMat === null) {
          this.calcInput.beltSel.mat = newSet
        }
        this.currentInput = null
      }
    },
    computed: {
      selectedMaterialItems () {
        var selMat = this.calcInput.beltSel.mat
        if (selMat !== null) {
          return selMat.items
        } else {
          return []
        }
      },
      selectedPiwItems () {
        var selPiw = this.calcInput.beltSel.piw
        if (selPiw !== null) {
          return selPiw.items
        } else {
          return []
        }
      },
      selectedPlyItems () {
        var selPly = this.calcInput.beltSel.ply
        if (selPly !== null) {
          return selPly.items
        } else {
          return []
        }
      }
    }
  }
</script>
