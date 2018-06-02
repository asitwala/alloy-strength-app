<template>
    <v-card class="as-modal">
        <v-card-title class="as-modal-header">
            <slot name="card-header"></slot>
            <span>
              <img src="../../../static/graphic_header.png" class='as-modal-header-image' alt="Modal Image"
              height="auto" width="110">
              <v-btn
                icon
                ripple
                class="as-modal-remove-button"
                @click="close">
                &times
              </v-btn>
            </span>
        </v-card-title>
        <v-card-text>
            <slot name="card-body"></slot>
        </v-card-text>

        <v-card-actions class="as-modal-footer">
            <slot name="card-footer"></slot>
        </v-card-actions>
      </v-card>
</template>


<script>
    export default {
        methods: {
            close() {
                this.$emit('close');
            }
        }
    }
</script>


<style lang="scss">

  @import '~@/demo-common/styles/colors';
  
  .as-modal {
    .as-modal-header-image {
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
      ),url('../../../static/abstract-background2.svg');
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