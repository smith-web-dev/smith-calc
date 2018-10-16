<template lang="pug">
  form(@submit.prevent='onSignin')
    v-layout(row)
      v-flex(xs12)
        v-text-field#email(name='email' label='Email' v-model='form.email' type='email' required)
    v-layout(row)
      v-flex(xs12)
        v-text-field#password(name='password' label='Password' v-model='form.pass' type='password' required)
    v-layout(row)
      v-flex(xs12)
        //- Email
        .text-xs-center
          v-btn(round type='submit' :disabled='loading' :loading='loading')
            | Sign in
            v-icon(right) lock_open
            span.custom-loader(slot='loader')
              v-icon(light) cached
        //- Google
        .text-xs-center
          v-btn(round color='red' dark :disabled='loading' :loading='loading' @click.prevent='onSigninGoogle')
            | Login with Google
            v-icon(right dark) lock_open
            span.custom-loader(slot='loader')
              v-icon(light) cached
        //- Facebook
        .text-xs-center
          v-btn(round color='primary' dark :disabled='loading' :loading='loading' @click.prevent='onSigninFacebook')
            | Login with Facebook
            v-icon(right dark) lock_open
            span.custom-loader(slot='loader')
              v-icon(light) cached
        //- GitHub
        .text-xs-center
          v-btn(round dark :disabled='loading' :loading='loading' @click.prevent='onSigninGithub')
            | Login with Github
            v-icon(right dark) lock_open
            span.custom-loader(slot='loader')
              v-icon(light) cached
        br
        //- Reset Password
        .text-xs-center
          v-btn(round color='warning' dark :disabled='loading' :loading='loading' @click.prevent='onResetPassword')
            | Reset Password By Email
            v-icon(right dark) email
            span.custom-loader(slot='loader')
              v-icon(light) cached
  //- v-container(
  //-   fluid
  //-   fill-height)
  //-   v-layout(
  //-     align-center
  //-     justify-center)
  //-     v-flex(
  //-       xs12
  //-       sm9
  //-       md6)
  //-       v-card.elevation-20
  //-         //- v-toolbar.elevation-0
  //-           v-toolbar-title Login form
  //-           v-spacer
  //-         v-card-text
  //-           p user: {{ user }}
  //-           v-form
  //-             v-text-field(
  //-               box
  //-               prepend-inner-icon='person'
  //-               autocomplete='off'
  //-               label='Email'
  //-               type='text'
  //-               v-model='form.email')
  //-             v-text-field(
  //-               box
  //-               prepend-inner-icon='lock'
  //-               autocomplete='off'
  //-               label='Password'
  //-               type='password'
  //-               v-model='form.pass')
  //-             v-layout(row justify-center)
  //-               v-flex(xs10)
  //-                 v-btn(
  //-                   v-show='loggingIn'
  //-                   round
  //-                   block
  //-                   :color='btnColor'
  //-                   @click='login()')
  //-                     | Login
  //-                 v-btn(
  //-                   v-show='!loggingIn'
  //-                   round
  //-                   block
  //-                   :color='btnColor'
  //-                   @click='signup()')
  //-                     | Signup
  //-         v-card-actions
  //-           v-spacer
  //-           v-btn(flat @click='loggingIn = !loggingIn') or {{ loggingIn ? `Signup` : `Login` }}
</template>

<script>
  import firebase from 'firebase'
  import { theAppIsDark } from 'MXN/appIsDark.js'
  import { globalCalc } from 'MXN/globalCalc.js'

  export default {
    mixins: [
      theAppIsDark,
      globalCalc
    ],
    data: () => ({
      loggingIn: true,
      form: {
        email: '',
        pass: ''
      }
    }),
    methods: {
      login () {
        firebase.auth().signInWithEmailAndPassword(this.form.email, this.form.pass)
          .then(
            (user) => {
              alert('signed in!')
              // this.$ls.set('signedIn', true)
            },
            (err) => {
              alert('Oops! ' + err.message)
            }
          )
        // this.$router.replace('/')
      },
      signup () {
        firebase.auth().createUserWithEmailAndPassword(this.form.email, this.form.pass)
          .then(
            function (user) {
              alert('you made an account!')
            },
            function (err) {
              alert('Oops! ' + err.message)
            }
          )
      }
    }
  }
</script>
