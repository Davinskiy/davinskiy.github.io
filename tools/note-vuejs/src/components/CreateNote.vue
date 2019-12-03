<template>
  <v-card
    class="mx-auto"
    max-width="480"
  >
    <v-card-text>

      <v-form @submit.prevent ref="form">
        <v-text-field
          class="mt-0"
          label="Название заметки"
          v-model="title"
          required
          @focus="is_title_focused = true; onFocus();"
          @blur="is_title_focused = false; onBlur();"
          autocomplete="off"
        ></v-text-field>
        <v-expand-transition>
          <div
            v-show="can_show"
          >
            <v-textarea
              label="Описание заметки"
              v-model="text"
              @focus="is_text_focused = true; onFocus();"
              @blur="is_text_focused = false; onBlur();"
            ></v-textarea>

            <div class="d-flex">
              <v-spacer></v-spacer>
              <v-btn
                color="success"
                text
                @click="create()"
              >
                Создать заметку
              </v-btn>
            </div>
          </div>
        </v-expand-transition>

      </v-form>
      
    </v-card-text>

  </v-card>
</template>

<script>
  export default {
    data: () => ({
      title : '',
      text : '',
      is_title_focused : false,
      is_text_focused : false,

      can_show : false,
    }),
    created(){
    },
    methods : {
      onFocus(){
        this.can_show = true
      },
      onBlur(){
        setTimeout(()=>{
          if (!this.title.trim() && !this.text.trim()) {
            if (!this.is_any_focused) {
              this.can_show = false
            }
          }
        },50);
      },
      create(){
        if (this.title.trim() || this.text.trim()) {
          this.$emit('create', {
            title : this.title,
            text : this.text,
          });
          this.title = '';
          this.text = '';
          this.can_show = false;
        }
      },
    },
    computed : {
      is_any_focused(){
        if (this.is_title_focused || this.is_text_focused) {
          return true
        }
        return false
      },
    }
  }
</script>