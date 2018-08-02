<template>
  <div class="as-stripe-card-element">
    <!-- TEST: pk_test_uecJvlGuK94TACv9jW9XxmVg -->
    <!-- LIVE: pk_live_PWmtkdqxq5DvLLcRz298lZQs -->
    <v-text-field
        v-if="this.IP"
        type="text"
        placeholder="Enter Email Here"
        v-model="email"
        label="Email"
    /> 
    <card class='stripe-card'
      :class='{ complete }'
      stripe='pk_live_PWmtkdqxq5DvLLcRz298lZQs'
      :options='stripeOptions'
      @change='complete = $event.complete'
    />
    <v-btn color="primary" style="margin-left: 0px !important; margin-top: 8px;" class='as-pay-with-stripe' 
    @click='pay' 
    :disabled='!complete'>Submit Payment</v-btn>
    <p 
      style="margin-left: 0px !important;"
      v-if="this.invalidEmail"
    >
    <br><br>
    Error: You have submitted an invalid email</p>
  </div>
</template>
 
<script>
//import { stripeKey, stripeOptions } from './stripeConfig.json'
import { Card, createToken } from 'vue-stripe-elements'
import emailRegex from '@/demo-common/mixins/emailRegex'; 
 
export default {
  data () {
    return {
      complete: false,
      stripeOptions: {
        requestPayerEmail:true,
        // see https://stripe.com/docs/stripe.js#element-options for details
      },
      email: '',
      invalidEmail:false,
    }
  },
  components: { Card },
  props: {
    IP: {
        type: Boolean,
        default: false
    },
  },
  methods: {
    pay () {
      console.log('this.email: ', this.email);
      if (this.IP && !emailRegex.test(this.email)) {
        this.invalidEmail = true;
        console.log('INVALID EMAIL');
        return
      }       
      else if (this.IP) {
        console.log('VALID EMAIL');
        createToken().then(data => {
          console.log('create token 72');
          this.invalidEmail = false;
          let output = {
            email:this.email,
            stripeToken:data.token
          };
          console.log('stripe element output: ', output);
          // this.$emit('created-token', data.token);
          this.$emit('created-token', output);
        });
        return
      }
      // createToken returns a Promise which resolves in a result object with
      // either a token or an error key.
      // See https://stripe.com/docs/api#tokens for the token object.
      // See https://stripe.com/docs/api#errors for the error object.
      // More general https://stripe.com/docs/stripe.js#stripe-create-token.
      createToken().then(data => {
        console.log('create token 72');
        this.$emit('created-token', data.token);
      });
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