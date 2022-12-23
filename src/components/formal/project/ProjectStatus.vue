<template>
    <div>
      <font-awesome-icon :class="(done ? 'done': 'in-dev')" :icon="(done ? 'check': 'code')"/>
      {{ done ? doneText[lang] : inDevText[lang] }}
    </div>
</template>

<script>
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

export default {
  name: "ProjectStatus",
  components: {FontAwesomeIcon},
  props: {
    done: Boolean,
    lang: String
  },
  data() {
    return {
      doneText: {
        en: 'Done',
        fr: 'Fini'
      },
      inDevText: {
        en: 'In development',
        fr: 'En développement'
      }
    }
  }
}
</script>

<style scoped>
.pastille {
  height: 10px;
  width: 10px;
  border-radius: 4px;
}
.in-dev {
  color: orange;
}

.done {
  color: lime;
}

div {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px;
  background: #3f4148;
  border-radius: 4px;
  width: fit-content;

}
</style>