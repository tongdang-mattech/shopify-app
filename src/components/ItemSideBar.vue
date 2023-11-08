<!-- eslint-disable vue/no-unused-vars -->
<template>
    <v-expansion-panels v-for="(data,index) in allData" :key="index">
    <v-expansion-panel class="rounded-xl">
        <v-expansion-panel-title v-slot="{ open }">
        <div class="d-flex align-center py-2">
            <v-btn flat class="icon_title bg-secondary rounded-lg mr-2">
            <v-icon icon="fa-solid fa-ruler-horizontal"></v-icon>
            </v-btn>
            <div>
            <p class="mb-2" style="font-weight: 700;">
                Fomart
            </p>
            <p class="desc">
                Portrait
            </p>
            </div>
        </div>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
        <div class="main_ingre">
            <h5 class="mb-4">Orientation</h5>
            <v-row>
            <v-col v-for="item in data" :key="item.title" cols="3" class="d-flex flex-column align-center">
                <v-btn @click="selectMainIngre = item" class="icon_select rounded-lg " >
                <v-img cover :src ="item.img" ></v-img>
                </v-btn>
                <h5 class="text-center mt1">{{ item.title }}</h5>
            </v-col>
            </v-row>
        </div>
        <div class="sub_ingre mt-4 ">
            <h5 class="mb-4">Size</h5>
            <v-row>
            <v-col v-for="item in selectMainIngre.children" :key="item.title" cols="3" class="d-flex flex-column align-center">
                <v-btn @click="trip.orientation = item.title" class="icon_select rounded-lg " >
                <v-img cover :src ="item.img" ></v-img>
                </v-btn>
                <h5 class="text-center mt-1">{{ item.title }}</h5>
            </v-col>
            </v-row>
        </div>
        </v-expansion-panel-text>
    </v-expansion-panel>
    </v-expansion-panels>
</template>
<script setup>
import { ref } from 'vue';

const props = defineProps({
    allData: Array
})
const selectMainIngre = ref({})
</script>