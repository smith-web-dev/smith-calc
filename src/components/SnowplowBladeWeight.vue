<template lang="pug">
  div
    include ./SnowplowBladeWeight/_fab.pug
    include ./SnowplowBladeWeight/_shipmentDialog.pug
    include ./SnowplowBladeWeight/_shipmentInfoDialog.pug
    include ./SnowplowBladeWeight/_confirmDialog.pug
    v-container.pa-0(fluid)
      include ./Global/_snackbar.pug
      v-stepper.transparent.elevation-0(v-model='currentStep')
        //- Steps
        include ./SnowplowBladeWeight/_step0.pug

        v-stepper-items
          //- Select snowplow material size
          v-stepper-content.px-1.pt-1(step='1')
            include ./SnowplowBladeWeight/_step1.pug

          //- Enter snowplow blade length
          v-stepper-content.px-1.pt-1(step='2')
            include ./SnowplowBladeWeight/_step2.pug

          //- Enter quantity
          v-stepper-content.px-1.pt-1(step='3')
            include ./SnowplowBladeWeight/_step3.pug

          //- Results
          v-stepper-content.px-1.pt-1(step='4')
            include ./SnowplowBladeWeight/_step4.pug
</template>

<script>
  import SnowplowData from '@/data/Snowplow.json'

  /* eslint-disable no-extend-native */
  Array.prototype.sum = function (prop) {
    var total = 0
    for (var i = 0, _len = this.length; i < _len; i++) {
      var newNum = Number(this[i][prop])
      total += newNum
    }
    return total.toFixed(3)
  }

  export default {
    data () {
      return {
        delSelect: null,
        currentStep: 0,
        calcInput: {
          size: null,
          length: {
            feet: null,
            inches: null
          },
          quantity: null
        },
        bladeSizes: SnowplowData.bladeSizes,
        shipment: {
          dialog: false,
          info: false,
          btn: false,
          headers: SnowplowData.shipmentHeaders,
          items: []
        },
        snackbar: {
          text: null,
          display: false
        },
        alert: {
          display: false,
          type: 'error',
          text: 'Are you sure?'
        }
      }
    },
    methods: {
      resetAll () {
        this.currentStep = 1
        this.calcInput = SnowplowData.defaultInputs
      },
      doCopy (theText) {
        var compo = this
        this.$copyText(theText).then(function (e) {
          compo.snackbar.text = 'Copied <em>[ ' + theText + ' ]</em> to the clipboard'
          compo.snackbar.display = true
        }, function (e) {
          alert('Can not copy')
          console.log(e)
        })
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
      addToShipment () {
        var sze = (this.displaySize + ' x ' + this.displayLength)
        var qty = this.calcInput.quantity
        var wgt = this.extWeight
        if (qty === null) {
          qty = 1
        }
        var newItem = {
          size: sze,
          quantity: qty,
          weight: wgt
        }
        this.shipment.items.push(newItem)
        this.snackbar.text = 'Added (' + qty + ') - ' + sze + ' to shipment'
        this.snackbar.display = true
        this.calcInput = SnowplowData.defaultInputs
        this.currentStep = 1
      },
      deleteConfirmShow (item) {
        this.alert.text = 'Remove this item from the shipment? This action cannot be undone.'
        this.alert.display = true
        this.delSelect = item
      },
      deleteItemFromShipment (item) {
        var theArray = this.shipment.items
        const index = theArray.indexOf(item)
        theArray.splice(index, 1)
        this.shipment.items = theArray
        this.delSelect = null
        this.alert.display = false
      },
      confirmClearShipment () {
        this.alert.text = 'Are you sure you want to clear the shipment? This will remove all items and this action cannot be undone.'
        this.alert.display = true
      },
      clearShipment () {
        this.shipment.dialog = false
        this.alert.display = false
        this.shipment.items = []
        this.resetAll()
      }
    },
    computed: {
      bladeLengthToInches () {
        var foot = this.calcInput.length.feet
        var inch = this.calcInput.length.inches
        var totalInch = (Number(foot * 12) + Number(inch))
        return totalInch
      },
      displayLength () {
        var foot = Number(this.calcInput.length.feet)
        var inch = Number(this.calcInput.length.inches)
        var footDisp
        var inchDisp
        var display
        if (foot !== 0) {
          footDisp = foot + '\''
        } else {
          footDisp = ''
        }
        if (inch !== 0) {
          inchDisp = inch + '"'
        } else {
          inchDisp = ''
        }
        if (footDisp !== '') {
          display = footDisp + ' ' + inchDisp
        } else {
          display = footDisp + inchDisp
        }
        return display
      },
      displaySize () {
        var result, sizeDisp
        var sizes = this.bladeSizes
        var selectedSize = this.calcInput.size
        if (selectedSize !== null) {
          result = sizes.filter(obj => {
            return obj.value === selectedSize
          })
          sizeDisp = result[0].text
        } else {
          sizeDisp = null
        }
        return sizeDisp
      },
      descDisp () {
        var qty = this.calcInput.quantity
        var sze = this.displaySize
        var lng = this.displayLength
        var theQty
        if (qty === null) {
          qty = 1
        }
        if (qty > 1) {
          theQty = qty + ' pcs'
        } else {
          theQty = qty + ' pcs'
        }
        return '(' + theQty + ')' + ' ' + sze + ' x ' + lng
        // ({{ calcInput.quantity }} {{ calcInput.quantity > 1 ? `pcs` : `pc` }}) {{ displaySize }} x {{ displayLength }}
      },
      pcWeight () {
        var len = this.bladeLengthToInches
        var sze = this.calcInput.size
        return ((len * sze).toFixed(3))
      },
      extWeight () {
        var len = this.bladeLengthToInches
        var sze = this.calcInput.size
        var qty = this.calcInput.quantity
        if (qty === null) {
          qty = 1
        }

        return ((len * sze * qty).toFixed(3))
      },
      shipmentWeight () {
        var shpmnt = this.shipment.items
        return shpmnt.sum('weight')
      }
    }
  }
</script>


