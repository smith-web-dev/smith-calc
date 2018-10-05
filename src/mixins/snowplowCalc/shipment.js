export const snowShipment = {
  methods: {
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
      this.calcInput = {
        size: null,
        length: {
          feet: null,
          inches: null
        },
        quantity: null
      }
      this.currentStep = 1
    },
    clearShipment () {
      this.alert.display = false
      this.shipment.items = []
      this.resetAll(this.defaultInputs)
    },
    confirmClearShipment () {
      this.alert.text = 'Are you sure you want to clear the shipment? This will remove all items and this action cannot be undone.'
      this.alert.display = true
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
    deleteShipment (index) {
      var array = this.shipment.history
      var len = (this.shipment.history.length - 1)
      var delPos = (len - index)
      console.log('len: ' + len)
      console.log('index: ' + index)
      console.log('delete at: ' + delPos)
      console.log('array: ' + JSON.stringify(array))
      if (delPos > -1) {
        array.splice(delPos, 1)
      }
      this.shipment.history = array
      this.$ls.set('shipments', JSON.stringify(array))
    },
    openShipmentDialog () {
      //
      this.shipment.dialog = true
    },
    restoreShipment (itmArr) {
      //
      this.shipment.items = itmArr
    },
    restoreShipmentLine (item) {
      var currentLines = this.shipment.items
      currentLines.push(item)
      this.shipment.items = currentLines
    },
    saveShipment () {
      this.saveShipmentNote.dialog = false
      var shipmentItems = this.shipment.items
      var toAdd = {
        items: shipmentItems,
        date: this.$moment().format(),
        note: this.saveShipmentNote.text
      }
      var shipmentArray = this.shipment.history
      shipmentArray.push(toAdd)
      this.shipment.history = shipmentArray
      this.$ls.set('shipments', JSON.stringify(shipmentArray))
      this.saveShipmentNote.text = null
    },
    saveShipmentMemoPopup () {
      //
      this.saveShipmentNote.dialog = true
    }
  }
}
