<template>
    <div class="as-update-billing">
        <div class="as-update-billing-container">
            <div v-if="loading">
                <v-progress-circular indeterminate color="primary"/>
            </div>
            <div class="as-update-billing-content" v-if="!loading">
               <h1 v-if="state=='default'">Update Payment Card</h1>
                <transition name="as-name">
                    <div v-if="state=='default'">
                        <p style="margin-top: 20px; margin-bottom: 20px;">
                        Please use the button below to update the credit or debit card associated with your Electrum Performance account.
                        </p>
                        <v-btn color="primary" @click="checkout">Update Card</v-btn>
                    </div>
                    <div v-if="state=='success'">
                        <p style="margin-top: 20px; margin-bottom: 20px;">
                        Your payment card has been successfully updated!
                        </p>
                        <v-btn color="primary" @click="reset">OK</v-btn>
                    </div>
                    <div v-if="state=='failure'">
                        <p style="margin-top: 20px; margin-bottom: 20px;">
                        Your payment card has failed to update.<br>If you believe that this is in error, please contact us at 
                        <a href="mailto:electrumperformance@gmail.com">electrumperformance@gmail.com</a>
                        </p>
                        <v-btn color="primary" @click="reset">Try Again</v-btn>
                    </div>
                </transition>
            </div>
        </div>
    </div>
</template>


<script>
import Login from "@/demo-home/Login";

import UsersService from "@/services/UsersService";

export default {
  components: {
    "as-login": Login
  },
  data() {
    return {
      activated: false,
      updated: false,
      loading: false,
      stripeId: '',
      userEmail: '',
      state: 'default'
    };
  },
  mounted() {
   this.loadUser();
  },
  methods: {
    loadUser() {
      let user = this.$session.get("user");
      let userId = user.id;
      let userStripeId = user.stripeId;
      this.userEmail = user.username;
      this.stripeId = userStripeId;
      console.log("userStripeId: ", userStripeId);
      console.log('this.stripeId: ', this.stripeId);
      this.state = 'default'
      return
    },
    reset() {
     this.state = 'default'
    },
    checkout() {
      this.$checkout.open({
        name: "Update Payment Card",
        panelLabel: 'Submit',
        currency: "USD",
        amount: 0,
        allowRememberMe: false,
        email: this.userEmail,
        token: token => {
          console.log('stripe token: ', token, ' this.stripeId: ', this.stripeId);
          let params = { stripeId: this.stripeId, stripeToken: token.id, userEmail: this.userEmail };
          this.loading = true;
          UsersService.updatePaymentCard(params).then(response => {
           let body = response.data;
           console.log('update payment card response.data: ', body);
           this.loading = false;
           if (body.success) {
            this.state = 'success'
           }
           else {//body.fail
            this.state = 'failure'
           }
          })
        }
      });
    }
  }
};
</script>


<style lang="scss">
@import "~@/demo-common/styles/colors";
@import "~@/demo-common/styles/transitions";

.as-update-billing {
  text-align: center;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>