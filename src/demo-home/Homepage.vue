<template>
  <div class="as-homepage">

    <v-tooltip bottom>
      <v-btn color="primary" 
        slot="activator"
        @click.stop="">Sign Up</v-btn
      >
        <span>The ability to sign up is not available in the beta version.</span>
    </v-tooltip><v-btn color="primary" @click.stop="openloginModal">Log In</v-btn>
    <v-dialog
      v-model="showloginModal"
      max-width="750px"
      transition="as-fade"
      :persistent="true"
      scrollable
      >
      <v-card class="as-modal">
        <v-card-title class="as-modal-header">
            <h3>LOG IN</h3>
            <span>
              <img src="../../static/graphic_header.png" class='as-signup-header-image' alt="Sign up image"
              height="auto" width="110">
              <v-btn
                icon
                ripple
                class="as-modal-remove-button"
                @click="closeloginModal">
                &times
              </v-btn>
            </span>
        </v-card-title>
        <v-card-text>
          <v-form>
            <div v-for="(field, index) in loginData">
              <v-text-field
                v-model="field.content"
                :label="field.text"
                :append-icon="(index === 1) ? (loginVisibility ? 'visibility' : 'visibility_off') : ''"
                :append-icon-cb="() => (loginVisibility = !loginVisibility)"
                :type="loginVisibility && index === 1 ? 'password' : 'text'"
              />
            </div>

          </v-form>
        </v-card-text>

        <v-card-actions class="as-modal-footer">
          <v-btn color="primary" @click="loginSubmit">Log In</v-btn>
        </v-card-actions>
      </v-card>
      
    </v-dialog>

    <v-dialog
      v-model="showModal"
      max-width="750px"
      transition="as-fade"
      :persistent="true"
      scrollable
      >
      <v-card class="as-modal">
        <v-card-title class="as-modal-header">
            <h3>SIGN UP</h3>
            <span>
              <img src="../../static/graphic_header.png" class='as-signup-header-image' alt="Sign up image"
              height="auto" width="110">
              <v-btn
                icon
                ripple
                class="as-modal-remove-button"
                @click="closeModal">
                &times
              </v-btn>
            </span>
        </v-card-title>
        <v-card-text>
          <v-form>
            <div v-for="(field, index) in formData[0].fields">
              <v-text-field
                v-if="field.type === 'input' && (index !== 2 && index !== 3)"
                v-model="field.content"
                :label="field.text"
              />

              <v-text-field
                v-else-if="field.type === 'input' && index === 2"
                v-model="field.content"
                :label="field.text"
                :append-icon="signUpVisibility1 ? 'visibility' : 'visibility_off'"
                :append-icon-cb="() => (signUpVisibility1 = !signUpVisibility1)"
                :type="signUpVisibility1? 'password' : 'text'"
              />

              <v-text-field
                v-else-if="field.type === 'input' && index === 3"
                v-model="field.content"
                :label="field.text"
                :append-icon="signUpVisibility2 ? 'visibility' : 'visibility_off'"
                :append-icon-cb="() => (signUpVisibility2 = !signUpVisibility2)"
                :type="signUpVisibility2? 'password' : 'text'"
              />
   
            </div>
          </v-form>
        </v-card-text>

        <v-card-actions class="as-modal-footer">
          <v-btn color="primary" @click="">Submit</v-btn>
        </v-card-actions>
      </v-card>

    </v-dialog>
  </div>
</template>

<script>
  import LoginFormInfo from './LoginFormInfo';
  import UsersService from '@/services/UsersService';
  const LoginFields = [
      {
        text: 'Username',
        type: 'input'
      },
      {
        text: 'Password',
        type: 'input'
      }
  ];

  export default {
    created() {
      this.resetFormInfo();
      this.$session.start();
      //console.log("this.$session", this.$session.getAll());
    },
    data() {
      return {
        isFormValid: false,
        currentNavPage: 0,
        formData: [],
        loginData: [],
        showModal: false,
        showloginModal: false,
        loginVisibility: true,
        signUpVisibility1: false,
        signUpVisibility2: false
      };
    },
    methods: {
      resetFormInfo() {

        LoginFields.forEach((field, fieldIndex) => {
          this.loginData.push(LoginFields[fieldIndex]);
        });

        LoginFormInfo.forEach((step, stepIndex) => {
          this.formData[stepIndex] = LoginFormInfo[stepIndex];
          LoginFormInfo[stepIndex].fields.forEach((field, fieldIndex) => {
            switch (field.type) {
              case 'input':
                this.formData[stepIndex].fields[fieldIndex].content = '';
                break;
              default:
                break;
            }
          })
        })
      },
      async loginSubmit() {
        var postBody = {};
        postBody.username = this.loginData[0].content;
        postBody.password = this.loginData[1].content;

        var loginResponse = await UsersService.loginUser(postBody);
        if (loginResponse.data.Found) {

          this.$session.set("userFound", true);

          if (loginResponse.data.Success) {
            this.$session.set("user", loginResponse.data.User);

            this.$session.set("viewingWID", loginResponse.data.User.currentWorkoutID);
            this.closeloginModal();

            // Handle routing based on type of user 
            let isAdmin = loginResponse.data.User.isAdmin; 
            let hasWorkouts = loginResponse.data.hasWorkouts; 

            if (isAdmin && !hasWorkouts) {
              this.$router.push({ name: 'AdminSetLevels' }); // admin to set level 
            } else if (!isAdmin && !hasWorkouts) {
              this.$router.push({ name: 'SetLevels' }); // beta user to set level 
            } else {
              this.$router.push({ name: 'Workout' }); // otherwise, take to workouts page 
            }
          }
        }
      },
      async submitForm() {
        let signupBody = {
          // name: this.formData[0].fields[0].content,
          username: this.formData[0].fields[1].content,
          P1: this.formData[0].fields[2].content,
          P2: this.formData[0].fields[3].content,
        }
        let signupPost = await UsersService.signupUser(signupBody);
        // If success
        if (!signupPost.data.LoginFormInfoerror) {
          this.showModal = false;
          this.$router.push({ name: 'Initialize'});
          this.$session.set("user", signupPost.data.session.User);
          this.$session.set("viewingWID", 1);
          this.closeModal();
        }
        else {

        }
      },
      submit() {
        this.submitForm();
      },
      closeModal() {
        this.showModal = false; 
      },
      openModal() {
        this.currentNavPage = 0; 
        this.showModal = true; 
      },
      openloginModal() {
        this.showloginModal = true;
      },
      closeloginModal() {
        this.showloginModal = false;
      }
    }
  };

</script>

<style lang="scss">
  @import '~@/demo-common/styles/colors';

  .as-homepage {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
  
  .as-modal {
    .as-signup-header-image {
      image-rendering: crisp-edges;
      right: 70px;
      top: 8px;
      position: absolute;
      z-index: 1; 
    }

    h3 {
      z-index: 100; 
    }

    .card__text {
      padding: 8px 32px; // Revisit 
    }

    &-header {
      background-color: $blueDarken2;
      background-image: linear-gradient(
      rgba(25, 118, 210, 0.5), 
      rgba(13, 71, 161, 0.5)
      ),url('../../static/abstract-background2.svg');
      background-size: 110% auto;
      color: white;
      width: 100%;
      display: flex;
      justify-content: space-between; // add space between title and remove button 
    }

    &-remove-button {
      font-size: 24px !important;
      &.btn.btn--icon {
        color: white;
      }
    }

    &-footer {
      justify-content: flex-end; // push buttons to right 
    }
  }


</style>
