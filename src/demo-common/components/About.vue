<template>
  <div class="as-about">
    <div class="as-coaches-header">
    
    <transition name="as-fade">
      <v-btn v-if="extendedView"
        class="as-coaches-back"
        @click="resetView" 
        fab 
        small
        color="primary">
        <v-icon>fa-angle-left</v-icon>
      </v-btn>
    </transition>

    <h1> Meet Our Coaches </h1>
    </div>
    <v-divider/>

    <transition name="as-fade">
      <!-- Place side by side photos here --> 
      <div class="as-coaches" v-if="!extendedView">
        <div class="as-coach" @click="showBryce">
          <div class="as-coach-photo as-coach-bryce">
          </div>
          <div class="as-coach-banner">
            <h2>Alex Bryce</h2>
          </div>
        </div>
        
        <div class="as-coach" @click="showSterner">
          <div class="as-coach-photo as-coach-sterner">
          </div>
          <div class="as-coach-banner">
            <h2>Alex Sterner</h2>
          </div>
        </div>
      </div>
    </transition>

    <!-- Extended Content --> 
    <div class="as-about-content" v-if="extendedView">
      <v-card height="auto" v-if="sterner">
        <v-container fluid grid-list-lg>
          <v-layout row>
            <v-flex xs7>
              <div>
                <h2>Alex Sterner</h2>
                <div>
                  <p>
                    Alex Sterner, BS, CSCS, USAW is the Co-Founder and Head Strength Coach at Alloy Strength. 
                    He is a Certified Strength and Conditioning Specialist (CSCS) through the National Strength 
                    and Conditioning Association (NSCA). His education in the field began at the University of 
                    Connecticut, where he obtained a bachelor's degree in Kinesiology in 2014. While enrolled, 
                    he interned in the varsity weight room for 7 of the school's athletic teams, and accumulated 
                    over 1000 hours under Coach Maureen Butler and Coach Travis Illian.
                  </p>

                  <p>
                    Since graduating from UConn, Coach Sterner worked in a commercial fitness setting for a year 
                    until moving to San Diego in the summer of 2015. He then worked at the Parisi Speed School, 
                    providing a sport-performance environment to athletes of various ages. In October of 2016 
                    he began working at the University of California San Diego where he teaches Recreation classes, 
                    provides post-rehab care and personal training.
                  </p>

                  <p>
                    Upon moving to San Diego, Coach Sterner continued competing in Brazilian Jiu-jitsu under Andre 
                    Galvao at Atos HQ. It was here that he first met JT Torres, who he began strength training at 
                    Parisi in the fall of 2015. Since then he and Coach Bryce have trained the majority of the Atos 
                    HQ competition team. This includes organizing group lifting sessions for the 2017 IBJJF Worlds 
                    camp, where Atos secured their first ever team title. In a 1-on-1 setting he coached Andre Galvao 
                    through the 2017 IBJJF Worlds and 2017 ADCC Superfight, resulting in a gold medal for Galvao on 
                    both occasions.
                  </p>
                </div>
              </div>
            </v-flex>
            <v-flex xs5>
              <v-card-media
                src="https://vuetifyjs.com/static/doc-images/cards/foster.jpg"
                height="200px"
                contain
              ></v-card-media>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>

      <v-card height="auto" v-if="bryce">
        <v-container fluid grid-list-lg>
          <v-layout row>
            <v-flex xs7>
              <div>
                <h2>Alex Bryce</h2>
                <div>
                  <p>
                    Alex Bryce, MSE, CSCS is the Co-Founder and Head Strength Coach at Alloy Strength. Bryce is a 
                    Certified Strength and Conditioning Specialist (CSCS) through the National Strength and Conditioning 
                    Association (NSCA). He has experience working with all ages and training levels, and an extensive 
                    background in exercise technique, program design and periodization for both individuals and teams.
                  </p>

                  <p>
                    Bryce resides in San Diego, working at the University of California San Diego as a trainer, coach, 
                    and class lecturer. He is also a Strength Coach for the Atos Brazilian Jiu-Jitsu competition team, 
                    who in June 2017 won the IBJJF World Title for the first time.
                  </p>

                  <p>
                    Bryce is a former Performance Specialist at EXOS, a top sports performance company with locations 
                    worldwide. He earned his master’s degree in Exercise Science from the University of Kansas while 
                    working as a Graduate Teaching Assistant, conducting research in KU’s Neuromechanics and Jayhawk 
                    Athletic Performance Laboratories.
                  </p>

                  <p>
                    A native of Storrs, CT, Alex received his bachelor's degree from the University of Connecticut in Strength 
                    and Conditioning with a minor in Nutrition for Exercise and Sport. He spent two years as an Intern 
                    with the Strength and Conditioning staff, and also interned at Cressey Performance, an elite training 
                    center for professional baseball players.
                  </p>
                </div>
              </div>
            </v-flex>
            <v-flex xs5>
              <v-card-media
                src="https://vuetifyjs.com/static/doc-images/cards/foster.jpg"
                height="200px"
                contain
              ></v-card-media>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        bryce: false,
        sterner: false
      }
    },
    methods: {
      showBryce() {
        this.bryce = true; 
        this.sterner = false; 
      },
      showSterner() {
        this.bryce = false; 
        this.sterner = true; 
      },
      resetView() {
        this.bryce = false; 
        this.sterner = false; 
      }
    },
    computed: {
      extendedView() {
        return this.bryce || this.sterner; 
      }
    }
  };

</script>

<style lang="scss">

// Need to import common color variables here 
@import '~@/demo-common/styles/colors'; 

  .as-about {
    width: 70%;
    margin: 0 auto; 
    margin-top: 25px;

    h1 {
      text-align: center;
      margin-bottom: 10px;
    }
  }

  .as-coaches {
    margin-top: 25px;
    display: flex; 
    flex-wrap: wrap;
    justify-content: space-around;
    width: 100%;

    .as-coach {
      position: relative;
    }

    .as-coach-photo {
      border-radius: 2px;
      width: 300px; 
      height: 415px; 
      margin-bottom: 50px;
      cursor: pointer;

      &:hover {
        opacity: 0.85;
      }
    }

    // NOTE: make sure that "background-size: cover" is placed after background-image
    .as-coach-bryce {
      background: linear-gradient(to bottom, rgba(0, 41, 77, 0.05) 33%, rgba(0, 41, 77, 0.4) 66%, rgba(0, 0, 0, 0.75) 100%), url("../../../static/bryce-about.jpg") no-repeat center;
      background-size: cover;
    }

    .as-coach-sterner {
      background: linear-gradient(to bottom, rgba(0, 41, 77, 0.05) 33%, rgba(0, 41, 77, 0.4) 66%, rgba(0, 0, 0, 0.75) 100%), url("../../../static/sterner-about.jpg") no-repeat center;
      background-size: cover;
    }

    .as-coach-banner {
      width: 342px;
      height: 80px;
      background: url("../../../static/about_banner.png") no-repeat center;
      background-size: 100%;
      position: absolute;
      top: 350px;
      left: -21px; // (342 - 300) / 2
      cursor: pointer;

      h2 {
        color: white;
        position: absolute;
        top: 24px;
        left: 130px;
      }
    }
  }

  .as-coaches-back {
    position: absolute; 
  }

</style>