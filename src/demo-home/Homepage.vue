<template>
    <div class="as-homepage" style="height:100%;">
        <div class="as-homepage-spacer"></div>
        <div class="as-homepage-auth">
            <h2 class="as-homepage-header">Driven and dedicated in our commitment to maximize your <strong>strength, power, performance, and health</strong>.</h2>
            <as-signup class="as-signup-button"></as-signup>
            <as-login class="as-login-button"></as-login>
        </div>
        
        <div class="as-slider">
            <as-homepage-slider style="width:100%;"></as-homepage-slider>
             <div class="as-slider-overlay">
                <h3>WHO IS ELECTRUM PERFORMANCE?</h3>
                <p style="margin-top: 12px"> 
                   E·lec·trum (/əˈlektrəm/), noun - an alloy of gold with at least 20% silver. An alloy is a metal made by combining two or more metallic elements, especially to give greater strength or resistance to corrosion. 
                </p>

                <p style="margin-bottom: 0px !important">
                Electrum Performance is a virtual training platform that provides cutting-edge individualized online workout programs to athletes of any sport, at any skill or experience level, worldwide. 
                </p>
            </div>
        </div>
        

        <div class="as-panel-2">
            <div class="as-panel-2-text">
                 <h2 class="as-homepage-header" 
                    style="color:white;">
                    Our comprehensive online training system includes 
                </h2>
                <div class="as-panel-2-text-list">
                    <p><v-icon color="white" small class="as-panel-2-list-icon">fa-dot-circle-o</v-icon> <strong>96</strong> different workout templates</p>
                    <p><v-icon color="white" small class="as-panel-2-list-icon">fa-dot-circle-o</v-icon> An extensive video library</p>
                    <p><v-icon color="white" small class="as-panel-2-list-icon">fa-dot-circle-o</v-icon> <strong>25</strong> performance levels to track your progress</p>
                </div>
            </div>
            
            <as-look-inside></as-look-inside>
        </div>

    </div>
</template>


<script>


    import HomepageSlider from '@/demo-home/HomepageSlider'; 
    import LookInside from '@/demo-home/LookInside';

    import Login from '@/demo-home/Login'; 
    import Signup from '@/demo-home/Signup'; 


    export default {
        components: {
            'as-homepage-slider': HomepageSlider,
            'as-look-inside': LookInside,
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

        &-spacer {
            height: 20px;
            width: 100%;
        }
    }

    .as-homepage-header {
        text-align: center;
        font-weight: 300;

        strong {
            font-weight: 600;
        }
    }

    .as-slider {
        position: relative;
        max-width: 1325px !important;
        margin: 0 auto;
        margin-top: 24px;
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
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        margin: 0 12px;

        .as-signup-button {
            margin-left: 4px;
            
            .btn {
                margin-right: 0px !important;
            }
        }
    }

    .as-panel-2 {
        width: 100%; 
        background-color: rgba(38, 50, 56, 0.9); 
        margin-top: 48px; 
        padding-top: 24px;
    }

    .as-panel-2-text {
        color: white;
        margin: 0 auto;

        h2 {
            font-size: 24px;
        }

        &-list {
            margin: 0 auto;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: center;
            margin-top: 12px;

            .as-panel-2-list-icon {
                margin-right: 4px;
            }

            p {
                font-size: 18px;
                padding: 4px 20px;
            }

        }
    }
  
</style>