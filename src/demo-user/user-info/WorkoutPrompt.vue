<template>
    <div class="as-workout-prompt" v-if="showPrompt">
        <h2 class="as-header">{{ copy.headerText }}</h2>
        <div>
            <p>
                Click <router-link 
                    class="as-link" :to="{ name: copy.pathName }">here</router-link> {{ copy.descriptionText }}.
            </p>
        </div> 
        <v-divider/>
    </div>

</template>


<script>
export default {
  props: {
    showPrompt: {
      type: Boolean,
      default: false
    },
    copy: {
      type: Object,
      default: () => {}
    }
  }
};
</script>


<style lang="scss">
@import "~@/demo-common/styles/colors";

.as-workout-prompt {
  .as-header {
    color: $redBase;
  }

  margin: 0 20px;

  margin-top: 12px;

  .as-link {
    color: $redBase;
  }
}
</style>