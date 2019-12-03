<template>
  <v-app id="inspire">
    <v-content>
      <v-container
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="12"
            md="12"
          >
            <create-note @create="onCreate($event)"></create-note>
          </v-col>

          <v-col
            cols="12"
            sm="12"
            md="12"

            v-for="(note,i) in get_notes"
            :key='i'
          >
            <card :note="note" :note_id="note.id" @save="onSave()" @remove="onRemove($event)"></card>
          </v-col>

          <v-col
            sm="12"
            md="12"
            v-if="show_pagination"
          >
            <pagination :page_start="this_page" :length="get_page_count" @pageChange="onPageChange($event)"></pagination>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>


<script>
  import Card from './components/Card.vue'
  import CreateNote from './components/CreateNote.vue'
  import Pagination from './components/Pagination.vue'
  export default {
    name: 'app',
    data (){
      return {
        notes : [],
        page_per_post : 10,
        this_page : 1,
      }
    },
    created(){
      this.load();
    },
    methods : {
      onCreate(data){
        this.notes.unshift({
          title : data.title,
          text : data.text,
        });

        this.save();
        this.this_page = 1
      },
      onSave(){
        this.save();
      },
      onRemove(id){
        // eslint-disable-next-line
        this.notes.splice(id, 1);
        this.save();

        if (this.this_page > 1 && this.get_notes.length == 0) {
          this.this_page = this.this_page - 1;
        }
      },
      save(){
        localStorage.setItem(location.href + "__notes", JSON.stringify(this.notes))
      },
      load(){
        if(localStorage.getItem(location.href + "__notes")){
          this.notes = JSON.parse(localStorage.getItem(location.href + "__notes"));
        }
      },
      onPageChange(data){
        this.this_page = data;
      },
    },
    computed : {
      get_page_count(){
        return Math.ceil(this.notes.length / this.page_per_post)
      },
      get_notes(){
        let start = (this.page_per_post * (this.this_page - 1));
        if (this.this_page == 0 || this.this_page == 1) {
          start = 0;
        }
        let end = start + this.page_per_post;
        let notes = [];

        for(let i = start; i < end; i++){
          if (this.notes[i]) {
            notes.push(this.notes[i]);
            notes[notes.length-1].id = i;
          }
        }
        return notes;
      },
      show_pagination(){
        return ((this.notes.length / this.page_per_post) > 1) ? true : false
      },
    },
    components : {
      Card,
      CreateNote,
      // eslint-disable-next-line
      Pagination,
    }
  }
</script>