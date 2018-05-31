<template>
<div class="as-glossary">
    <v-navigation-drawer 
        permanent
        class="as-glossary-left-menu">
        <v-list>
            <div class="as-glossary-left-menu-item-container"
                v-for="menuItem in leftMenuItems" 
                :key="menuItem.tag">
                <v-list-tile 
                    :href="`#${menuItem.tag}`"
                    @click.stop="">
                    <v-list-tile-content>
                        <v-list-tile-title class="as-glossary-left-menu-item">
                            {{ menuItem.title }}
                        </v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-divider/>
            </div>
        </v-list>
    </v-navigation-drawer>
    <div class="as-glossary-content-container">
        <h1>Definitions</h1>
        <v-divider/>

        <div class="as-glossary-content">
            <a name="alloy-strength">
                <h3>WHO IS ALLOY STRENGTH?</h3>
                <v-card>
                    <v-card-title>
                        <p>
                            Al·loy (/ˈaˌloi/), noun - a metal made by combining two or more metallic elements, especially to give
                            greater strength or resistance to corrosion.
                            <br>
                            <br>
                            Alloy Strength is a virtual training platform that provides cutting-edge individualized online workout
                            programs to athletes of any sport, at any skill or experience level, worldwide. Our coaches come from
                            some of the best academic programs in the world, with experience working with elite athletes in
                            multiple sports across the country, and are NSCA Certified Strength and Conditioning Specialists (CSCS).
                            All of our members get coaching access and progressive, goal-driven programming in a supportive and
                            focused training community.
                            <br>
                            <br>
                            At Alloy Strength, no two programs are the same. We specify our programming to every individual,
                            helping you move better, perform better, and become an alloy; strong and resilient.
                        </p>
                    </v-card-title>
                </v-card>
            </a>
            
            <a name="autoregulatory-training">
                <h3>WHAT IS AUTOREGULATORY TRAINING?</h3>
                <v-card>
                    <v-card-title>
                        <p>
                            Autoregulatory training is a system based on an individual athlete’s physiological and mental state,
                            automatically configuring programming variables to the athlete’s specific needs at the time. This method
                            attempts to adjust for athlete's adaptations, allowing for increases in load and strength at an individual
                            pace by catering training stress to daily performance measures. This allows for complete personalization
                            even within a structured program.
                        </p>
                    </v-card-title>
                </v-card>
            </a>
            
            <a name="levels-progression">
                <h3>WHAT IS THE LEVELS PROGRESSION?</h3>
                <v-card>
                    <v-card-title>
                        <p>
                            The levels progression is the exercise progression used in Alloy Strength’s training system. Rather than having a “back and biceps” or “legs” or “arms and abs” training day, we are concerned with training the
                            global movement patterns our body can perform. For each compound pattern and associated
                            global movement patterns our body can perform. For each compound pattern and associated
                            accessories, there are 25 increasingly-challenging levels. Each microcycle, or 1-month block of training,
                            presents a chance to “level up” and move on to the next level.
                        </p>
                    </v-card-title>
                </v-card>
            </a>
            
            <a name="rpe">
                <h3>WHAT IS RPE AND HOW DO I USE IT?</h3>
                <v-card>
                    <v-card-title>
                        <p>A Rating of Perceived Exertion (RPE) scale is a method used in autoregulatory training to determine
                        exercise set intensity, or how hard something feels to you at the time. The scale used in our Levels
                        Progression is 1-10, with a 1 signifying “little to no effort” and a 10 signifying “maximum effort”. The
                        scale also refers to the number of repetitions short of failure for each set, or Repetitions in Reserve
                        (RIR). A 9 RPE would mean 1 repetition short of failure (1 RIR), and a 7.5 meaning 2-3 RIR.
                        <br>
                        <br>
                        RPE scales can often be more appropriate than percentage based programming (selecting weights as a
                        percentage of your 1 repetition max). There are many things that can throw off your percentages, such
                        as strength adaptations in a training block, training history, physical illness, sleep quality, diet, mental
                        stress, and a myriad of other factors. Life happens, and you can’t always be at your best; RPE can
                        account for these variables, allowing you to regulate training based on how hard a weight or exercise
                        feels that day.
                        <br>
                        <br>
                        Each exercise set has a desired RPE, listed underneath the exercise on your Strength Card. For each set,
                        you will select a weight or number of repetitions to perform to attempt to coincide with the desired
                        RPE. Ultimately, it is up to you to listen to your body and honestly determine RPE values for that
                        particular training session, regardless of past performance. Being honest with yourself is the most
                        important part of using the RPE scale, and will allow for far more effective training results.
                        <br>
                        <br>
                        As you level up, there will be further uses for RPE as well.
                        </p>
                    </v-card-title>
                </v-card>
            </a>
            
            <a name="rpe-table">
                <h3>RPE TABLE</h3>
                <v-card>
                    <v-card-title>
                        
                    </v-card-title>
                </v-card>
            </a>                
            
            <a name="strength-card">
                <h3>WHAT IS A STRENGTH CARD?</h3>
                <v-card>
                    <v-card-title>
                        <p>
                            A strength card is the template for a daily training session. On a strength card, you will see:
                            <ul>
                                <li>Movement patterns to be performed during the training session</li>
                                <li>Level for each pattern and subsequent exercise</li>
                                <li>Number of working sets and/or repetitions to be performed</li>
                                <li>Desired RPE for each set</li>
                                <li>Suggested weight or number of repetitions for each working set</li>
                                <li>Suggested rest times in between sets if applicable</li>
                                <li>Exercise tempo if applicable</li>
                            </ul>
                        </p>
                    </v-card-title>
                </v-card>
            </a>
            
            <a name="warm-up-sets">
                <h3>WHAT ABOUT WARM UP SETS?</h3>
                <v-card>
                    <v-card-title>
                        <p>
                            Often times you will need to “warm up” with lighter weights prior to your working sets. These sets are
                            not listed in your strength card, and it is up to you to determine how to best prepare yourself to train.
                            1-3 warm up sets with higher repetitions than your working sets is a good rule of thumb. 
                        </p> 
                    </v-card-title>
                </v-card>
            </a>
            
            <a name="how-do-i-warm-up-to-train">
                <h3>HOW DO I WARM UP TO TRAIN?</h3>
                <v-card>
                    <v-card-title>
                        <p>There are many ways to prepare, or “warm-up”, prior to a training session. It is important to warm-up in order to decrease the risk of injury and increase performance. A warm-up must serve three main purposes: 
                        <ol><li>Increase core body temperature</li> 
                        <li>Increase heart rate</li> <li>Prime the various systems of the body to perform certain movements.</li></ol> It is very easy to increase core body temperature and heart rate, as hopping on a stationary bike for 5 minutes will do this just fine. However, mobilizing and activating the body correctly necessitates more specific requirements, and can make a true difference in performance. While you are welcome to warm up on your own if there is a method that you strongly prefer, see the Alloy Strength Warm Up Series for our recommended training preparation.
                        </p>
                    </v-card-title>
                </v-card>
            </a>
            
            <a name="rest-between-sets">
                <h3>HOW LONG SHOULD I REST IN BETWEEN SETS?</h3>
                <v-card>
                    <v-card-title>
                        <p>
                            This depends on a number of factors, including training experience and workout intensity. In general,
                            the heavier the weight we are using, the longer we need to rest. A good rule of thumb is to rest 2-4
                            minutes in between sets for the main 2 exercises in a training session, and less than 2 minutes for
                            following exercises. It is important to autoregulate rest, and take the rest periods you need to recover
                            and perform well, as long as you aren’t spending all day in the gym. These training sessions should
                            typically take 60-90 minutes to complete
                        </p>
                    </v-card-title>
                </v-card>
            </a>
            
            <a name="alloy-set">
                <h3>WHAT IS AN ALLOY SET?</h3>
                <v-card>
                    <v-card-title>
                        <p>
                            An Alloy Set is a set where you will perform a predetermined weight for as many repetitions as possible
                            (AMRAP) with good technique. Alloy sets don’t show up often, but they are an important chance to
                            challenge yourself!
                        </p>
                    </v-card-title>
                </v-card>
                
            </a>
            
            <a name="video-library">
                <h3>WHAT IS THE VIDEO LIBRARY?</h3>
                <v-card>
                    <v-card-title>
                        <p>
                            The video library contains detailed videos and write-ups breaking down proper technique and providing
                            important cues for each exercise in our levels progression. You can always refer back to these videos to
                            make sure that you are performing the exercises correctly. New videos will unlock as you level up.
                        </p>
                    </v-card-title>
                </v-card>
            </a>

            <a name="other-important-terms">
                <h3>OTHER IMPORTANT TERMS</h3>
                <v-card>
                    <v-card-title>
                        <p>
                            BB = Barbell<br>
                            DB = Dumbbell<br>
                            KB = Kettlebell<br>
                            CC = Cable column or selectorized equipment
                            BW = Bodyweight<br>
                            1A = Single arm<br>
                            1L = Single leg<br>
                            Pronated = palms down grip<br>
                            Supinated = palms up grip<br>
                            Neutral = palms facing each other grip<br>
                            SB = Stability Ball
                        </p>
                    </v-card-title>
                </v-card>
            </a>
        </div>
    </div>
</div>

</template>


<script>
    export default {
        data() {
            return {
                leftMenuItems: [
                    {
                        tag: "alloy-strength",
                        title: "Alloy Strength"
                    },
                    {
                        tag: "autoregulatory-training",
                        title: "Autoregulatory Training"
                    },
                    {
                        tag: "levels-progression",
                        title: "Levels Progression"
                    },
                    {
                        tag: "rpe",
                        title: "RPE"
                    },
                    {
                        tag: "rpe-table",
                        title: "RPE Table"
                    },
                    {
                        tag: "strength-card",
                        title: "Strength Card"
                    },
                    {
                        tag: "warm-up-sets",
                        title: "Warm Up Sets"
                    },
                    {
                        tag: "how-do-i-warm-up-to-train",
                        title: "How Do I Warm Up To Train?"
                    },
                    {
                        tag: "rest-between-sets",
                        title: "Rest Between Sets"
                    },
                    {
                        tag: "alloy-set",
                        title: "Alloy Set"
                    },
                    {
                        tag: "video-library",
                        title: "Video Library"
                    },
                    {
                        tag: 'other-important-terms',
                        title: "Other Important Terms"
                    }
                ]
            };
        }
    };

</script>


<style lang="scss">

@import '~@/demo-common/styles/colors';

.as-glossary {

    ol, ul {
        list-style-position: inside; 
    }

    display: flex; 

    &-left-menu {
        margin-top: 3px !important;
        padding-bottom: 50px !important;
        height: 700px !important;

        &-item {
            color: $blueDarken2;
        }
    }

    &-content-container {
        margin-top: 12px;
        flex: 1;

        h1 {
            margin-bottom: 5px;
            margin-left: 20px;
        }

    }

    &-content {
        height: 650px;
        overflow-y: auto;
        margin-left: 20px;
        margin-right: 15px;
        padding-right: 5px;

        a {
            color: black;
            cursor: default !important;
        }

        h3 {
            margin-top: 15px;
            margin-bottom: 5px;
            color: $indigoBase;
        }
    }


}

</style>