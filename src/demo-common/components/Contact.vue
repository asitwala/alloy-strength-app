<template>
    <div class="as-contact">
        <div class="as-loading" v-if="loading">
            <v-progress-circular indeterminate color="primary"/>
        </div>
        <div class="as-contact-content" v-if="!loading && !messageSent">
            <h1> Contact Us </h1>
            <p>Have questions or feedback? Our coaches are always ready to help.
            <br> 
            Use the form below to send a message to the 
            Electrum Performance team:
            </p>
            <v-form ref="contactForm" v-model="validContactForm" lazy-validation>
                <v-text-field
                    v-model="name"
                    label="Name"
                    placeholder='Enter Name'
                    type="text"
                    :rules="nameRules"
                    :class="{'input-group--focused' : name !== ''}"
                />
                <v-text-field
                    v-model="email"
                    label="Email"
                    placeholder='Enter Email'
                    type="text"
                    :rules="emailRules"
                    :class="{'input-group--focused' : email !== ''}"
                />             
                <v-text-field
                    textarea
                    label='Message Body'
                    v-model="messageBody"
                    placeholder='Enter message here'
                    :rules="messageBodyRules"
                    :class="{'input-group--focused' : messageBody !== ''}"
                /> 
                <v-select
                    auto
                    :items="messageType.options"
                    label="What is this message about?"
                    v-model="messageType.value"
                    :rules="messageTypeRules"
                    :class="{'input-group--focused' : messageType.value !== ''}"
                />         
                <!-- <div style="align-items:left; text-align:left; justify-content:left;"> -->
                    <v-btn 
                        @click="submitContactForm"
                        color="primary" 
                        style="margin-left:0px; text-align:left;"
                        class="as-contact-submit">
                        Submit
                    </v-btn>
                <!-- </div>    -->
            </v-form>            
            <p>
                Our team can also be contacted at: <a :href="`mailto:${officialEmail}`">{{ officialEmail }}</a>
            </p>
        </div>
        <div class="as-contact-content" v-if="!loading && messageSent">
            <h1>Thank You</h1>
            <p style="margin-top:10px;">
                Your message has been received! Thank you, we will be in touch with you shortly.
            </p>
            <v-btn 
                @click="closeConfirmation"
                color="primary" 
                class="as-contact-submit">
                OK
            </v-btn>
        </div>
    </div>
</template>

<script>
import emailRegex from "@/demo-common/mixins/emailRegex";
import MiscService from "@/services/MiscService";

// TODO -- we may want to move info like official email to a shared folder
export default {
  data() {
    return {
      validContactForm: true,
      loading: false,
      messageBody: "",
      name: "",
      email: "",

      emailEntered: true,
      nameEntered: true,
      messageEntered: true,
      messageTypeSelected: true,

      invalidEmail: false,

      messageSent: false,

      messageType: {
        value: "",
        options: ["Question", "Feedback", "Other"]
      },

      nameRules: [v => this.nameEntered || "Name is required."],
      messageBodyRules: [v => this.messageEntered || "Please enter a message."],
      messageTypeRules: [
        v => this.messageTypeSelected || "Please choose an option."
      ],
      emailRules: [
        v => this.emailEntered || "Email is required.",
        v => !this.invalidEmail || "Invalid email format. Please try again."
      ],

      officialEmail: "electrumperformance@gmail.com"
    };
  },
  methods: {
    closeConfirmation() {
      this.messageSent = false;
    },
    submitContactForm() {
      this.nameEntered = this.name != "";
      this.emailEntered = this.email != "";
      this.messageEntered = this.messageBody != "";
      this.messageTypeSelected = this.messageType.value != "";
      this.$refs.contactForm.validate();
      this.invalidEmail = !emailRegex.test(this.email);
      console.log("submitting contact form. invalidEmail: ", this.invalidEmail);
      if (this.$refs.contactForm.validate()) {
        console.log("FORM VALIDATED");
        console.log("MESSAGE BODY: ", this.messageBody);
        this.loading = true;
        let params = {
          name: this.name,
          email: this.email,
          messageBody: this.messageBody,
          messageType: this.messageType.value
        };
        MiscService.sendContactMessage(params).then(response => {
          console.log("route hit. Response: ", response);
          this.loading = false;
          this.messageSent = true;
          this.name = "";
          this.email = "";
          this.messageBody = "";
          this.messageType.value = "";
        });
        // UsersService.signupUser(params).then(response => {
        //     let userId = response.data.newUser.id;

        //     UsersService.sendEmailConfirmation(userId).then(response => {
        //         this.signupSuccess = true;
        //     });
        // });
      }
    }
  },
  watch: {
    name: function() {
      if (!this.nameEntered) {
        this.nameEntered = true;
        this.$refs.contactForm.validate();
      }
    },
    messageBody: function() {
      if (!this.messageEntered) {
        this.messageEntered = true;
        this.$refs.contactForm.validate();
      }
    },
    messageType: function() {
      if (!this.messageTypeSelected) {
        this.messageTypeSelected = true;
        this.$refs.contactForm.validate();
      }
    },
    email: function() {
      if (!this.emailEntered) {
        this.emailEntered = true;
        this.$refs.contactForm.validate();
      }
      if (this.invalidEmail) {
        this.invalidEmail = false;
        this.$refs.contactForm.validate();
      }
    }
  }
};
</script>

<style lang="scss">
.as-contact {
  text-align: center;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 25px 20px;
  .as-loading {
    position: absolute;
    right: 50%;
  }
  &-content {
    h1 {
      margin-bottom: 5px;
    }
  }
}
.as-contact-submit {
  margin-bottom: 36px;
  margin-top: 16px;
  margin-right: 0px;
}
</style>