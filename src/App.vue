<template>
  <div id="app">
    <v-app id="inspire">
      <v-toolbar class="as-main-toolbar">
        <div class="as-main-toolbar-left">
          <v-btn icon class="as-logo-btn" @click="goToHomePage">
            <img class="as-logo" src="../static/logo.svg">
          </v-btn>
          <v-toolbar-title class="white--text as-toolbar-title" 
            @click="goToHomePage">ELECTRUM PERFORMANCE
          </v-toolbar-title>
        </div>
    
        <!-- Header Links --> 
        <div class="as-main-toolbar-right">
          <div class="as-main-menu-links">
            <v-btn
              color="white"
              flat
              v-for="link in headerLinks"
              :key="link.name"
              :to="link.pathName">
              {{ link.name }}
            </v-btn>
            <v-btn flat class="as-main-toolbar-link" slot="activator"
            @click="openBlog"
            >Blog</v-btn>
            <v-btn flat class="as-main-toolbar-link" @click="goToFAQ">FAQ</v-btn>
          </div>

          <div class="as-main-menu-links-small" style="display:inline-block;">
            <v-menu
              :bottom="true"
              offset-y>
              <v-btn flat slot="activator"
                class="ds-menu-item-title" style="position: relative;">
                Menu
              </v-btn>

              <v-list dense>
                <v-list-tile
                  v-for="link in headerLinks"
                  :key="link.name"
                  @click="routeTo(link.pathName)">
                  <v-list-tile-title>{{ link.name.toUpperCase() }}</v-list-tile-title>
                </v-list-tile>
                <v-list-tile @click="openBlog">
                  BLOG
                </v-list-tile>
                <v-list-tile @click="goToFAQ">
                  FAQ
                </v-list-tile>
              </v-list>
            </v-menu>
          </div>
 

          <div v-for="headerIcon in headerIcons" :key="headerIcon.name">
            <v-tooltip v-if="headerIcon.tooltipText" top>
              <v-btn 
                slot="activator"
                @click="openHeaderLinkNewTab(headerIcon.src)"
                icon
                class="mx-3 white--text"
                >
                  <v-icon>
                    {{ headerIcon.name }}
                  </v-icon>
                </v-btn>
                <span>{{ headerIcon.tooltipText }}</span>
            </v-tooltip>              
            <!-- No tooltip --> 
            <v-btn v-else
            @click="openHeaderLinkNewTab(headerIcon.src)"
            icon
            class="mx-3 white--text"
            >
              <v-icon>
                {{ headerIcon.name }}
              </v-icon>
            </v-btn>
          </div>

          <v-toolbar-side-icon v-if="$session.exists() && $session.has('user')" @click="toggleNavigation"></v-toolbar-side-icon>
        </div>
      </v-toolbar>

      <as-navigation
        :visible="showNavigation"
        @update-visibility="setNavigation"/>

      <!-- Main Body --> 
      <div class="as-main-body" style="height: 100%; min-height: 450px;">
        <router-view/>
      </div>
     
      <!-- Footer --> 
      <v-footer class="as-footer">
        <div class="as-footer-extra-formatting">
          <div class="as-footer-info">
              <v-btn disabled class="as-footer-copyright" flat>
                <span>© {{ currentYear }} &mdash; Electrum Performance Systems. </span> 
                <span>All Rights Reserved</span>
              </v-btn>
          </div>

            <div style="">
              <p style="margin-bottom: 0px !important; font-size: 12px; color: white; padding: 8px; margin-right: 22px;  margin-left: 16px;">Built by 
                <span style="color: #1e88e5 !important; cursor: pointer" @click="open1StopDev">
                  <strong>1-Stop Development</strong>
                </span>
              </p>
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
      headerLinks: [
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
        },
      ],
      headerIcons: [
        {
          name: 'fa-facebook-f',
          src: '',
          tooltipText: 'Coming Soon'
        },
        {
          name: 'fa-instagram',
          src: 'https://www.instagram.com/electrum_performance',
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
      goToFAQ() {
        this.$router.push({name: 'FAQ'});
      },
      toggleNavigation() {
        this.showNavigation = !this.showNavigation;
      },
      setNavigation(val) {
        this.showNavigation = val;
      },
      openHeaderLinkNewTab(src) {
        if (src) {
          window.open(src, '_blank');
        }
      },
      openBlog() {
        window.open('http://blog.electrumperformance.com/', '_blank');
      },
      open1StopDev() {
        window.open(`https://www.1stopdev.com/`, '_blank');
      },
      routeTo(pathName) {
        this.$router.push({name: pathName});
      }
    }
  }
</script>

<style lang="scss">
  @import '~@/demo-common/styles/transitions';
  @import '~@/demo-common/styles/colors';

  .as-loading {
    height: 100%; 
    display: flex; 
    align-items: center;
    justify-content: center; 
  }

  .as-main-toolbar {
    padding-top: 8px;
    padding-bottom: 8px;
    height: unset !important;
    max-height: 150px !important;

    &-left {
      display: flex;
      align-items: center;
      flex-wrap: no-wrap;
    }

    &-right {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      margin-right: 12px;
    }

    .toolbar__items .btn {

      &:first-child {
        margin-left: 8px;
      }

      .btn__content {
        padding: 8px;
      }
    }

    .toolbar__content > .btn:first-child {
      margin-left: 30px;
    }

    .toolbar__content {
      height: unset !important;
      flex-wrap: wrap;
      justify-content: space-between; 
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
    font-size: 20px;
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
    max-height: 250px !important;

    &-extra-formatting {
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      justify-content: space-between;
      align-items: center;
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
  }

  /* Responsiveness */

  @mixin for-phone-only {
    @media (max-width: 599px) { @content; }
  }

  .as-main-menu-links {
    display: flex;
    flex-wrap: wrap;
  }
  .as-main-menu-links-small {
    display: none !important;
  }

  @include for-phone-only {
    .as-main-menu-links {
      display: none !important;
    }
    .as-main-menu-links-small {
      display: inline-block !important;
    }
  }

</style>
