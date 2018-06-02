<template>
  <div id="app">
    <v-app id="inspire">
      <v-toolbar class="as-main-toolbar">
        <v-btn icon class="as-logo-btn" @click="goToHomePage">
          <img class="as-logo" src="../static/logo.svg">
        </v-btn>
        <v-toolbar-title class="white--text as-toolbar-title" 
        @click="goToHomePage">ALLOY STRENGTH</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-side-icon v-if="$session.has('user')"@click="toggleNavigation"></v-toolbar-side-icon>
      </v-toolbar>

      <as-navigation
        :visible="showNavigation"
        @update-visibility="setNavigation"/>

      <div class="as-main-body" style="height: 100%">
        <router-view/>
      </div>
      
     
      <v-footer class="as-footer">
        <div class="as-footer-extra-formatting">
          <div class="as-footer-info">
              <v-btn disabled class="as-footer-copyright" flat >
                <span>© {{ currentYear }} &mdash; Alloy Strength Training Systems. </span> 
                <span>All Rights Reserved</span>
              </v-btn>
          </div>

          <!-- Footer Links ('About', Social Media, etc.) --> 
          <div class="as-footer-links">
            <v-btn
              color="white"
              flat
              v-for="link in footerLinks"
              :key="link.name"
              :to="link.pathName"
            >{{ link.name }}</v-btn>

            <div v-for="footerIcon in footerIcons"
              :key="footerIcon.name">
              <!-- With tooltip --> 
              <v-tooltip v-if="footerIcon.tooltipText" top>
                <v-btn 
                slot="activator"
                :href="footerIcon.src"
                icon
                class="mx-3 white--text"
                >
                  <v-icon>
                    {{ footerIcon.name }}
                  </v-icon>
                </v-btn>
                <span>{{ footerIcon.tooltipText }}</span>
              </v-tooltip>
              
              <!-- No tooltip --> 
              <v-btn v-else
              :href="footerIcon.src"
              icon
              class="mx-3 white--text"
              >
                <v-icon>
                  {{ footerIcon.name }}
                </v-icon>
              </v-btn>
            </div>
          </div>
        </div>
      </v-footer>
    </v-app>
  </div>
</template>

<script>
  import Navigation from '@/demo-home/Navigation'; 
  export default {
    name: 'App',
    components: {
      'as-navigation': Navigation
    },
    created() {
      this.$session.start();
    },
    data: () => ({
      showNavigation: false,
      currentYear: (new Date()).getFullYear(),
      footerLinks: [
        {
          pathName:'About',
          name: 'About'
        },
        {
          pathName: 'Terms',
          name: 'Terms & Conditions'
        },
        {
          pathName: 'Contact',
          name: 'Contact Us'
        }
      ],
      footerIcons: [
        {
          name: 'fa-facebook-f',
          src: '/',
          tooltipText: 'Coming Soon'
        },
        {
          name: 'fa-instagram',
          src: 'https://www.instagram.com/alloy_strength',
          tooltipText: ''
        },
        {
          name: 'fa-youtube-play', 
          src: 'https://www.youtube.com/channel/UCqBk43R9J45fYjy21JIZpjg',
          tooltipText: ''
        }
      ]
    }),
    methods: {
      goToHomePage() {
        this.$router.push({name: 'Homepage'});
      },
      toggleNavigation() {
        this.showNavigation = !this.showNavigation;
      },
      setNavigation(val) {
        this.showNavigation = val;
      }
    }
  }
</script>

<style lang="scss">
  @import '~@/demo-common/styles/transitions';
  @import '~@/demo-common/styles/colors';


  .as-main-toolbar {
    .toolbar__content > .btn:first-child {
      margin-left: 30px;
    }
  }

  .as-logo {
    background-color: $shadesWhite;
    border-radius: 30px;
    height: 100%;
    width: 100%;

  }

  .application .theme--light.toolbar, .theme--light .toolbar {
    background-color: $blueGreyDarken4 !important; 
  }

  .as-main-toolbar {
    .btn__content {
      color: white;
    }
  }

  .as-toolbar-title {
    cursor: pointer;
    font-family: 'Russo One'; 
    letter-spacing: 0.5px;
    font-size: 24px;
  }

  .application .theme--light.footer, .theme--light .footer {
    background-color: $blueGreyDarken4 !important;
  }

  .as-footer-info button.as-footer-copyright.btn.btn--disabled.btn--flat {
    color: white !important;
  }

  .as-footer {
    display: block !important;
    width: 100%;
    height: auto !important;
    min-height: unset !important;

    &-extra-formatting {
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      justify-content: space-between;
      height: auto !important;
    }

    &-copyright {
      color: $shadesWhite !important;
      text-transform: none !important;
      font-size: 12px !important;
      
      span:nth-of-type(1) {
        font-weight: bold; 
      }
      span:nth-of-type(2) {
        font-weight: 100;
        margin-left: 3px;
      }

      &:hover {
        background-color: transparent !important;
      }
    }

    &-links {
      display: flex;
      flex-wrap: wrap;
    }
  }

</style>
