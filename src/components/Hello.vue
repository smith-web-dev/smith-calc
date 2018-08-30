<template lang="pug">
  v-container(fill-height)
    v-layout(justify-center align-center)
      v-flex(shrink)
        v-tooltip(right)
          v-btn(slot='activator' :href='source' icon large target='_blank')
            v-icon(large) code
          span Source
        v-tooltip(right)
          v-btn(slot='activator' icon large href='https://codepen.io/johnjleider/pen/YeRKwQ' target='_blank')
            v-icon(large) mdi-codepen
          span Codepen
</template>
