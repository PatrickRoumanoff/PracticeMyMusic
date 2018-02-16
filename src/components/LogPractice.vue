<template>
<div>
  <h2>Log a practice</h2>
  Date: <input type="date" v-model="date"><br>
  Instrument: <select v-model="instrument">
  <option v-for="option in instruments" v-bind:value="option.value" v-bind:key="option.key">
    {{ option.text }}
  </option>
</select><br>
  Duration: <br>
    <input type="radio" name="duration" value="10"  v-model="duration"> 10min <br>
    <input type="radio" name="duration" value="15" v-model="duration"> 15min <br>
    <input type="radio" name="duration" value="30" v-model="duration"> 30min <br>
    <input type="radio" name="duration" value="45" v-model="duration"> 45min <br>
    <input type="radio" name="duration" value="60" v-model="duration"> 60min <br>
    {{saved}}
    <button  v-on:click="save()">Save</button>

{{date}}, {{duration}}, {{instrument}}

</div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "log-practice",
  data() {
    return {
      date: new Date().toISOString().substring(0, 10),
      instrument: "piano",
      duration: 10,
      saved: "",
      instruments: [
        { value: "bassoon", key: "bassoon", text: "bassoon" },
        { value: "cello", key: "cello", text: "cello" },
        { value: "horn", key: "horn", text: "horn" },
        { value: "piano", key: "piano", text: "piano" },
        { value: "voice", key: "voice", text: "voice" },
        { value: "violin", key: "violin", text: "violin" },
      ],
    };
  },
  methods: {
    save() {
      console.log("save"); // eslint-disable-line
      console.log(this.date, this.duration, this.instrument); // eslint-disable-line
      const user = firebase.auth().currentUser;
      const logs = firebase.database().ref(`users/${user.uid}/logs`);
      logs.on("child_added", data => {
        this.saved = data.key;
      });
      logs.push({
        date: this.date,
        instrument: this.instrument,
        duration: this.duration,
      });
    },
  },
};
</script>

<style scoped>

</style>
