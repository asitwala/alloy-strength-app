<template>
  <div class="as-stripe-card-element">
    <card class='stripe-card'
      :class='{ complete }'
      stripe='pk_test_XXOQiKnnXqjJlJG5euwKirzj'
      :options='stripeOptions'
      @change='complete = $event.complete'
    />
    <v-btn color="primary" style="margin-left: 0px !important; margin-top: 8px;" class='as-pay-with-stripe' @click='pay' :disabled='!complete'>Submit Payment</v-btn>
  </div>
</template>
 
<script>
//import { stripeKey, stripeOptions } from './stripeConfig.json'
import { Card, createToken } from 'vue-stripe-elements'
 
export default {
  data () {
    return {
      complete: false,
      stripeOptions: {
        // see https://stripe.com/docs/stripe.js#element-options for details
      }
    }
  },
 
  components: { Card },
 
  methods: {
    pay () {
      // createToken returns a Promise which resolves in a result object with
      // either a token or an error key.
      // See https://stripe.com/docs/api#tokens for the token object.
      // See https://stripe.com/docs/api#errors for the error object.
      // More general https://stripe.com/docs/stripe.js#stripe-create-token.
      createToken().then(data => console.log(data.token))
      this.$emit('created-token');
    }
  }
}
</script> 
 
<style lang="scss">

@import '~@/demo-common/styles/colors';

.as-stripe-card-element {
  display: flex;
  flex-wrap: wrap;
  flex: 1; 
}

.as-pay-with-stripe {
  
}

.stripe-card {
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.2) !important;
  margin-bottom: 8px;

  background-color: white;
  padding: 10px 12px;
  border-radius: 4px;
  box-shadow: 0 1px 3px 0 #e6ebf1;
  -webkit-transition: box-shadow 150ms ease;
  transition: box-shadow 150ms ease;
}

.stripe-card.complete {
  border-color: $blueBase;
}

.stripe-card--focus {
  box-shadow: 0 1px 3px 0 #cfd7df;
}

.stripe-card--invalid {
  border-color: #fa755a;
}

.stripe-card--webkit-autofill {
  background-color: #fefde5 !important;
}



</style>