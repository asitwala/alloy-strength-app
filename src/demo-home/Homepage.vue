<template>
  <div class="as-homepage">
    <v-btn color="primary" @click.stop="openModal">Sign Up</v-btn
    ><v-btn color="primary" @click.stop="openloginModal">Log In</v-btn>
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
            <div v-for="field in loginData">
              <v-text-field
                v-if="field.type === 'input'"
                v-model="field.content"
                :label="field.text"
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
            <h3>{{step.title}}</h3>
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
            <div v-for="field in step.fields">
              <v-text-field
                v-if="field.type === 'input'"
                v-model="field.content"
                :label="field.text"
              />
              <v-select
                v-else-if="field.type === 'select'"
                :items="field.options.map(item => item.value)"
                v-model="field.content"
                label="Select"
                single-line
              />
              <v-checkbox
                v-else-if="field.type === 'checkbox'"
                v-model="isFormValid"
                :label="field.text"
                color="primary"
              />
              <h4 v-else-if="field.type === 'title'">
                {{ field.text }}
              </h4>
              <div v-else-if="field.type === 'section'">

              </div>
            </div>
          </v-form>
        </v-card-text>

        <v-card-actions class="as-modal-footer">
          <v-btn color="primary" v-if="navInfo.back.show" @click="goBack">{{ navInfo.back.text }}</v-btn>
          <v-btn color="primary" @click="goForward">{{ navInfo.next.text }}</v-btn>
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
      },
  ];

  export default {
    created() {
      this.resetFormInfo();
      this.$session.start();
      console.log("this.$session", this.$session.getAll());
    },
    data() {
      return {
        isFormValid: false,
        currentNavPage: 0,
        navInfo: {
          back: {
            show: false,
            text: 'Back'
          },
          next: {
            show: true,
            text: 'Next'
          }
        },
        formData: [],
        loginData: [],
        showModal: false,
        showloginModal: false,
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
              case 'textarea':
              case 'select':
                this.formData[stepIndex].fields[fieldIndex].content = '';
                break;
              case 'checkbox':
                this.formData[stepIndex].fields[fieldIndex].content = false;
                break;
              case 'section':
                this.formData[stepIndex].fields[fieldIndex].fieldsType1.forEach((fieldType1, fieldTypeIndex) => {
                  if (fieldType1.type === 'input') {
                    this.formData[stepIndex].fields[fieldIndex].fieldsType1[fieldTypeIndex].content = '';
                  }
                });
                this.formData[stepIndex].fields[fieldIndex].fieldsType2.forEach((fieldType2, fieldTypeIndex) => {
                  if (fieldType2.type === 'input') {
                    this.formData[stepIndex].fields[fieldIndex].fieldsType2[fieldTypeIndex].content = '';
                  }
                })
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
        console.log("login submit");
        console.log("this.postBody: ", postBody);
        var loginResponse = await UsersService.loginUser(postBody);
        if (loginResponse.data.Found) {
          this.$session.set("userFound", true);          
          if (loginResponse.data.Success) {
            this.$session.set("user", loginResponse.data.User);
            // this.$session.set("userId", loginResponse.data.User.id);
            this.$session.set("viewingWID", loginResponse.data.User.currentWorkoutID);
            this.closeloginModal();
            this.$router.push({ name: 'Workout'});
          }
        }
        console.log("loginResponse: ", loginResponse.data);
        // console.log("this.loginData", this.loginData);
      },
      async submitForm() {
        console.log("submitting form: ", this.formData);
        let signupBody = {
          // name: this.formData[0].fields[0].content,
          username: this.formData[0].fields[1].content,
          P1: this.formData[0].fields[2].content,
          P2: this.formData[0].fields[3].content,
        }
        console.log("signupBody:", signupBody);
        let signupPost = await UsersService.signupUser(signupBody);
        console.log("signupPost: ", signupPost);
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
        // else, show error
        // this.$router.push({ name: 'Users' });
      },
      goForward() {
        this.submitForm();
        // if (this.currentNavPage === 2) {
        //   // submit form + do form checking 
        //   this.submitForm();
        // } else {
        //   this.currentNavPage += 1;
        // }
        this.handleState();
      },
      goBack() {
        this.currentNavPage -= 1; 
        this.handleState();
      },
      closeModal() {
        this.showModal = false; 
      },
      openModal() {
        this.currentNavPage = 0; 
        this.showModal = true; 
        this.handleState();
      },
      openloginModal() {
        // this.currentNavPage = 0; 
        // this.showModal = true; 
        this.showloginModal = true;
        this.handleState();
      },
      closeloginModal() {
        this.showloginModal = false;
      },
      handleState() {
        console.log('I Get here');
        if (this.currentNavPage === 0) {
          this.navInfo.back.show = false; 
          this.navInfo.next.text = 'Next';
        }
        else if (this.currentNavPage === 1) {
          this.navInfo.back.show = true; 
          this.navInfo.next.text = 'Next';
        }
        else if (this.currentNavPage === 2) {
          this.navInfo.back.show = true; 
          this.navInfo.next.text = 'Submit';
        }
        this.navInfo.next.text = 'Submit';
      }
    },
    computed: {
      step() {
        return this.formData[this.currentNavPage];
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
      font-size: 24px;
      &.btn.btn--icon {
        color: white;
      }
    }

    &-footer {
      justify-content: flex-end; // push buttons to right 
    }
  }


</style>
