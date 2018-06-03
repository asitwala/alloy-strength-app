<template>
    <div class="as-homepage">
        <div class="as-homepage-auth">
            <h2 class="as-homepage-header">Driven and dedicated in our commitment to maximize your <strong>strength, power, performance, and health</strong>.</h2>
            <as-signup></as-signup>
            <as-login class="as-login-button"></as-login>
        </div>
        
        <div class="as-slider">
            <as-homepage-slider></as-homepage-slider>
             <div class="as-slider-overlay">
                <h3>WHO IS ALLOY STRENGTH?</h3>
                <p style="margin-top: 12px">
                Al·loy (/ˈaˌloi/), noun - a metal made by combining two or more metallic elements, especially to give greater strength or resistance to corrosion. 
                </p>

                <p style="margin-bottom: 0px !important">
                Alloy Strength is a virtual training platform that provides cutting-edge individualized online workout programs to athletes of any sport, at any skill or experience level, worldwide. 
                </p>
            </div>
        </div>
        
        <div class="as-panel-2"></div>
    </div>
</template>


<script>


    import HomepageSlider from '@/demo-home/HomepageSlider'; 

    import Login from '@/demo-home/Login'; 
    import Signup from '@/demo-home/Signup'; 


    export default {
        components: {
            'as-homepage-slider': HomepageSlider,
            'as-login': Login,
            'as-signup': Signup
        }
    };

</script>


<style lang="scss">

    @import '~@/demo-common/styles/colors';
    @import '~@/demo-common/styles/transitions';

    .as-homepage {
        height: 575px;
        overflow: auto;
    }

    .as-homepage-header {
        margin: 24px;
        font-weight: 300;

        strong {
            font-weight: 600;
        }
    }


    .as-slider {
        position: relative;
        max-width: 1325px !important;
        margin: 0 auto;
    }


    .as-slider-overlay {
        background-color: rgba(38, 50, 56, 0.65); //rgba(0, 0, 0, 0.6);
        color: white;
        width: 300px;
        padding: 16px;
        position: absolute;
        top: 0;
        right: 16%;
    }



    .as-homepage-auth {
        display: flex;
        justify-content: center;
        align-items: center;

        .as-login-button {
            margin-right: 24px !important;
        }
    }
  
</style>