<template>
    <div style="width: 60%; margin: 0 auto"> 
    <v-alert 
            icon="error"
            dismissible 
            v-model="visible" 
            transition="as-fade" 
            style="position:fixed; width: 50%; z-index: 100; border: none; border-bottom: 1px solid #ffc107 !important; 
                border-radius: 5px !important; 
                min-height: 60px;
                background-color: #ffe082 !important; color: black !important;"> 
            <span style="margin-right: 5px;">It seems like some fields were left blank. Would you still like to submit?</span>
            <v-btn small class="notification" flat @click="warningYes">Yes</v-btn> 
        </v-alert> 












        <v-alert 
            type="warning" 
            dismissible 
            v-model="visible" 
            transition="as-fade" 
            style="position:fixed; width: 60%; z-index: 100; border-radius: 10px !important; 
                background-color: #ffe082 !important; color: black !important;"> 
            It seems like some fields were left blank. Would you still like to submit?  
            <v-btn @click="warningYes">Yes</v-btn> 
        </v-alert> 

        <v-alert 
            type="warning" 
            dismissible 
            v-model="visible2" 
            transition="as-fade" 
            style="position:fixed; width: 60%; z-index: 100; border-radius: 10px !important; 
                background-color: #ffe082 !important; color: black !important;"> 
            It seems like you've already entered some information. Are you sure you want to clear all fields? 
            <v-btn @click="warning2Yes">Yes</v-btn> 
        </v-alert> 
    </div> 

</template>

<script>

</script>

<style>

</style>