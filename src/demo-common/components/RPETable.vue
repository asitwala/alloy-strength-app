<template>
    <div class="as-rpe-table">
        <table class="as-rpe-actual-table">
            <thead>
                <th>Rating</th>
                <th>Description of Perceived Exertion</th>
            </thead>
            
            <tbody>
                <tr>
                    <td>10</td>
                    <td>Maximum effort</td>
                </tr>

                <tr>
                    <td>9.5</td>
                    <td>No further repetitions but could increase load</td>
                </tr>

                <tr>
                    <td>9</td>
                    <td>1 repetition remaining</td>
                </tr>

                <tr>
                    <td>8.5</td>
                    <td>1-2 repetitions remaining</td>
                </tr>

                <tr>
                    <td>8</td>
                    <td>2 repetitions remaining</td>
                </tr>

                <tr>
                    <td>7.5</td>
                    <td>2-3 repetitions remaining</td>
                </tr>

                <tr>
                    <td>7</td>
                    <td>3 repetitions</td>
                </tr>

                <tr>
                    <td>5-6</td>
                    <td>4-6 repetitions remaining</td>
                </tr>

                <tr>
                    <td>3-4</td>
                    <td>Light effort</td>
                </tr>

                <tr>
                    <td>1-2</td>
                    <td>Little to no effort</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>


<script>
    export default {

    };
</script>


<style lang="scss">

    .as-rpe-actual-table {
        width: 100%;
        border-collapse: collapse;
        table-layout: fixed;

        td, th {
            border: 1px solid #ddd;
            min-width: 100px;
            overflow: auto;
            text-align: center;
            padding: 8px;
        }
    }


</style>