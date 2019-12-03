<template>
  <div v-if="is_edit">
    <v-card
      class="mx-auto"
      max-width="480"
    >
      <v-card-text>

        <v-form
          ref="form"
        >
          <v-text-field
            label="Название заметки"
            v-model="note_copy.title"
            required
          ></v-text-field>
           <v-textarea
              label="Описание заметки"
              v-model="note_copy.text"
            ></v-textarea>

          <div class="d-flex">
            <v-btn
              color="success"
              text
              @click="edit()"
            >
              Готово
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              color="#888"
              text
              @click="cancel()"
            >
              Отменить
            </v-btn>
          </div>
        </v-form>
        
      </v-card-text>

    </v-card>
  </div>

  <div v-else>
    <v-card
      class="mx-auto"
      max-width="480"
    >
      <v-card-title>{{note.title}}</v-card-title>

      <v-card-actions>

        <v-btn text small @click="show=!show" v-if="note.text">
          <template v-if="show">Скрыть <v-icon medium>mdi-chevron-up</v-icon></template>
          <template v-else>Показать <v-icon medium>mdi-chevron-down</v-icon></template>
        </v-btn>


        <v-btn 
          text
          small
          @click="toEdit()"
          >
          <v-icon>mdi-pencil</v-icon>
        </v-btn>

        <v-spacer></v-spacer>

        <v-btn text small color="red" @click="remove();">
          <v-icon>mdi-delete</v-icon>
        </v-btn>

      </v-card-actions>

      <v-expand-transition>
        <div v-show="show">
          <v-divider/>
          <v-card-text class="pre-line">{{note.text}}</v-card-text>
        </div>
      </v-expand-transition>
    </v-card>
  </div>
</template>

<script>
  export default {
    props : ['note', 'note_id'],
    data: () => ({
      show: false,
      is_edit: false,
      note_copy: {},
    }),
    methods : {
      toEdit(){
        this.note_copy = {
          title : this.note.title,
          text : this.note.text,
        };
        this.is_edit = true;
      },
      edit(){
        this.note.title = this.note_copy.title.trim();
        this.note.text = this.note_copy.text.trim();
        this.is_edit = false;
        this.$emit("save");

        // eslint-disable-next-line
        // console.log(this.note_copy);
      },
      cancel(){
        this.note_copy.title = this.note.title;
        this.note_copy.text = this.note.text;
        this.is_edit = false;
      },
      remove(){
        // eslint-disable-next-line
        // console.log(this.note_id);
        this.$emit("remove", this.note_id);
      },
    }
  }
</script>

<style scoped>
  .pre-line {
    white-space: pre-line;
  }
</style>