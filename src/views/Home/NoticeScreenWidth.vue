<template>
    <v-layout class="d-flex justify-center bg-white h-100 align-center" >
        <v-card flat class="notic">
            <v-img src="/images/logo.jpg" :width="300"></v-img>
            <h1>Your Browser Window is Too Small</h1>
            <p style="color: #5f5f5f; font-size: 14px;">Printelly editor requires a larger screen. To start or continue editing, resize your window or, if on a tablet, 
                switch to landscape mode
            </p>
        </v-card>
    </v-layout>
</template>
<script setup>

</script>

<style scoped>
.notic{
    max-width: 500px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    text-align: center;
}
</style>