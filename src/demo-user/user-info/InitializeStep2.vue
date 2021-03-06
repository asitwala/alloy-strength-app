<template>
    <div class="as-initialize-step-2" style="height: 100%"> 
        <!-- Loading icon -->
        <div class="as-loading" v-if="loading">
            <v-progress-circular indeterminate color="primary"/>
        </div>

        <transition name="as-fade">
            <div class="as-initialize-step-2-actual-content" v-if="!loading">
                <div class="as-initialize-step-2-info">
                    <div class="as-initialize-step-2-left">
                        <v-card class="as-initialize-step-2-experience">
                            <v-card-title>
                                <h2>Physical Stats</h2>
                            </v-card-title>
                            <v-card-text>
                                <div class="as-initialize-step-2-experience-div">
                                    <h3>Height</h3>
                                    <div class="as-initialize-step-2-experience-height">
                                        <v-text-field
                                            v-model="height1"
                                            :suffix="units.height1"
                                            type="number"
                                        /> 
                                        <v-text-field
                                            v-model="height2"
                                            :suffix="units.height2"
                                            type="number"
                                        /> 
                                    </div>
                                    
                                    <h3>Weight</h3>
                                    <v-text-field
                                        v-model="weight"
                                        :suffix="units.weight"
                                        type="number"
                                    /> 
                                </div>
                            </v-card-text>
                        </v-card>

                        <v-card class="as-initialize-step-2-experience">
                            <v-card-title>
                                <h2>Training Experience</h2>
                            </v-card-title>

                            <v-card-text>
                                <div class="as-initialize-step-2-experience-div">
                                    <h3>Time</h3>
                                    <div class="as-initialize-step-2-experience-height">
                                        <v-text-field
                                            v-model="years"
                                            suffix="years"
                                            type="number"
                                        /> 
                                        <v-text-field
                                            v-model="months"
                                            suffix="months"
                                            type="number"
                                        /> 
                                    </div>
                                    

                                    <h3>Primary Sports</h3>
                                    <v-text-field
                                        textarea
                                        v-model="sports"
                                        placeholder="Please enter any major sports you play on a regular basis."
                                    /> 

                                    <v-select
                                        auto
                                        :items="priorExperience.options"
                                        label="Do you have prior RPE Experience?"
                                        v-model="priorExperience.value"
                                        :class="{'input-group--focused' : priorExperience.value !== ''}"
                                        />

                                </div>
                            </v-card-text>
                        </v-card>

                    </div>

                    <v-card class="as-initialize-step-2-exercises">
                        <v-card-title>
                            <h2>Known Max Lifts</h2>
                        </v-card-title>

                        <v-card-text>
                            <div class="as-initialize-step-2-exercises-div">
                                <h3>Leave field blank if unknown</h3>
                                <v-text-field
                                    v-model="squat"
                                    label="Squat"
                                    :suffix="units.weight"
                                    type="number"
                                /> 
                                <v-text-field
                                    v-model="benchPress"
                                    label="Bench Press"
                                    :suffix="units.weight"
                                    type="number"
                                /> 
                                <v-text-field
                                    v-model="deadlift"
                                    label="Deadlift"
                                    :suffix="units.weight"
                                    type="number"
                                /> 
                                <h3>Other</h3>
                                <v-text-field
                                    textarea
                                    v-model="otherExercises"
                                    :placeholder="`Please enter other known max lifts. For example, 'Overhead Press: 100 ${units.weight}'`"
                                /> 
                            </div>
                        </v-card-text>
                    </v-card>
                </div>

                <v-btn 
                    @click="submitStep2"
                    color="primary" 
                    class="as-initialize-step-2-submit">Submit</v-btn>
            </div>
        </transition>
    </div>

</template>

<script>
import UsersService from "@/services/UsersService";

export default {
  data() {
    return {
      // physical stats
      units: {
        weight: "pounds",
        height1: "feet",
        height2: "inches"
      },
      squat: "",
      benchPress: "",
      deadlift: "",
      otherExercises: "",

      // experience
      years: "",
      months: "",
      sports: "",
      priorExperience: {
        value: "",
        options: ["No", "Yes"]
      },

      height1: "",
      height2: "",
      weight: "",

      loading: false
    };
  },
  methods: {
    postInfoAndGetLevel() {
      this.loading = true;

      let params = {
        squatWeight: this.squat,
        benchWeight: this.benchPress,
        RPEExp: this.priorExperience.value === "Yes",
        bodyWeight: this.weight
      };

      return UsersService.getLevelInitially(
        this.$session.get("user").id,
        params
      ).then(response => {
        this.$session.set("user", response.data.user);
        this.$session.set("viewingWID", response.data.viewingWID);

        let levelInfo = {
          level: response.data.user.level,
          blockNum: response.data.user.blockNum
        };

        this.$emit("submit", levelInfo);
      });
    },
    submitStep2() {
      this.postInfoAndGetLevel().finally(() => {
        this.loading = false;
      });
    }
  }
};
</script>

<style lang="scss">
@import "~@/demo-common/styles/transitions";
@import "~@/demo-common/styles/colors";

.as-initialize-step-2 {
  min-height: 400px;
  position: relative;

  .as-loading {
    position: absolute;
    right: 50%;
  }
}

.as-initialize-step-2-info {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.as-initialize-step-2-experience {
  &:nth-of-type(1) {
    margin-bottom: 20px;
  }

  flex: 2;
  margin-right: 20px;
  min-width: 400px;

  &-div {
    flex: 1;
  }

  &-height {
    display: flex;
    flex-wrap: wrap;

    .input-group:nth-of-type(1) {
      margin-right: 30px;
    }
  }
}

.as-initialize-step-2-exercises {
  flex: 1;
  min-width: 400px;

  &-div {
    flex: 1;
  }
}

.as-initialize-step-2-left {
  flex: 2;
}

.as-initialize-step-2-info {
  .card__title {
    background-color: $blueDarken4;
    color: white;
    padding-top: 8px;
    padding-bottom: 8px;
  }
}

.as-initialize-step-2-submit {
  float: right;
  margin-top: 16px !important;
  margin-right: 0px !important;
}
</style>