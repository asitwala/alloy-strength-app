<template>
    <div class="as-initialize-step-1">
        <v-form v-model="valid">
            <v-text-field
                v-model="email"
                :rules="emailRules"
                label="Email"
            />

            <v-text-field
                v-model="birthDate.value"
                :rules="birthDateRules"
                label="Date of Birth"
            />

            <v-text-field
                v-model="password"
                :rules="passwordRules"
                label="Password"
            />

            <v-text-field
                v-model="confirmPassword"
                :rules="confirmPasswordRules"
                label="Confirm Password"
            />
        </v-form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                valid: false,
                email: '', // get from session
                emailRules: [

                ],
                birthDate: {
                    value: '',
                    placeholder: 'MM/DD/YYYY'
                },
                password: '',
                confirmPassword: ''
            }
        }
    };
</script>

<style lang="scss">

</style>