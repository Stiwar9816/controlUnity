<template>
  <v-layout>
    <v-flex>
      <v-subheader class="subtitle-1">CREAR RESERVA</v-subheader>
      <v-container>
        <!-- Formulario de reservas -->
        <v-form
          ref="form"
          v-on:submit="newBooking()"
          v-model="valid"
          v-if="!edit"
          lazy-validation
        >
          <v-row>
            <!-- inputs -->
            <v-col cols="12" sm="3" md="2">
              <v-text-field
                v-model="cc"
                :rules="ccRules"
                autofocus
                label="C.C"
                type="number"
                min="0"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="5" md="5">
              <v-text-field
                v-model="name"
                :rules="nameRules"
                type="text"
                pattern="[A-Za-z\s]"
                maxlength="45"
                label="Nombre de la persona responsable"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="4" md="5">
              <v-text-field
                v-model="event"
                :rules="eventRules"
                label="Materia o evento"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="4" md="2">
              <v-autocomplete
                v-model="room"
                :rules="[v => !!v || 'Nombre del salon es requerido']"
                label="Eliga un salon"
                :items="salons"
                item-text="name"
                item-value="name"
                flat
                chips
                small-chips
                deletable-chips
                hide-selected
                hide-details
              >
                <template v-slot:no-data>
                  <v-list-item>
                    <v-list-item-title
                      >No existe coincidencias</v-list-item-title
                    >
                  </v-list-item>
                </template>
              </v-autocomplete>
            </v-col>
            <v-col cols="12" sm="2" md="2">
              <v-select
                v-model="room"
                label="Capacidad"
                :items="salons"
                item-text="capacity"
                item-value="name"
                flat
                chips
                small-chips
                readonly
              ></v-select>
            </v-col>
            <!-- DateT(imePicker Start) -->
            <v-col cols="12" sm="3" md="2">
              <v-datetime-picker
                label="Fecha y hora de inicio"
                v-model="schedules.start"
                required
                clearText="Cancelar"
                okText="Confirmar"
              >
              </v-datetime-picker>
            </v-col>
            <!-- End DateTimePicker Start -->

            <!-- DateTimePickerEnd -->
            <v-col cols="12" sm="3" md="2">
              <v-datetime-picker
                label="Fecha y hora final"
                v-model="schedules.end"
                required
                clearText="Cancelar"
                okText="Confirmar"
              >
              </v-datetime-picker>
            </v-col>
            <!-- End DateTimePickerEnd -->

            <!-- Implementos -->
            <v-col cols="12" sm="12" md="4">
              <v-combobox
                v-model="implement"
                :items="Implements"
                item-text="name"
                item-value="name"
                label="Eliga los implementos necesarios"
                chips
                small-chips
                deletable-chips
                multiple
                hide-selected
                hide-details
                clearable
                flat
              >
                <template v-slot:no-data>
                  <v-list-item>
                    <v-list-item-title
                      >No hay información registrada</v-list-item-title
                    >
                  </v-list-item>
                </template>
              </v-combobox>
            </v-col>
            <!-- End implementos -->
          </v-row>
          <!-- boton reservar -->
          <v-row justify="center">
            <v-btn
              rounded
              color="primary black--text"
              type="submit"
              :disabled="!valid"
              aria-label="New booking"
              class="mb-4 mt-2"
            >
              <v-icon dark class="mr-1">fa fa-plus</v-icon>Agregar
            </v-btn>
          </v-row>
          <!-- End Boton reservar -->
        </v-form>
        <!-- End Formulario de reservas -->
        <!-- Alerta -->
        <v-snackbar v-model="snackbar" :color="color">
          {{ text }}
        </v-snackbar>
        <!-- End Alerta -->
      </v-container>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from 'axios'
export default {
  layout: 'home',
  data() {
    return {
      search: '',
      edit: false,
      cc: '',
      name: '',
      event: '',
      capacity: '',
      room: '',
      implement: '',
      valid: true,
      schedules: { start: '', end: '' },
      snackbar: false,
      text: '',
      color: '',
      //Validaciones de campos
      ccRules: [v => !!v || 'Cedula de ciudadania del usuario es requerida'],
      nameRules: [
        v => !!v || 'Nombre del usuario es requerido',
        v => /[a-zA-Z]+$/.test(v) || 'Este campo no admite numeros'
      ],
      eventRules: [
        v => !!v || 'Nombre de la materia o evento es requerido',
        v => /[a-zA-Z]+$/.test(v) || 'Este campo no admite numeros'
      ],
      dateRules: [v => !!v || 'Fecha de la reserva es requerida'],
      timeRules: [v => !!v || 'Hora de la reserva es requerida'],
      // Headers de la tabla
      headers: [
        { text: 'SERIAL', align: 'center', sortable: false },
        { text: 'IMPLEMENTO', align: 'center' },
        { text: 'STOCK', align: 'center', sortable: false },
        { text: 'MARCA', align: 'center' },
        { text: 'ACCIONES', align: 'center', sortable: false }
      ],
      salons: [],
      Implements: [],
      bookings: []
    }
  },
  created() {
    this.getSalon()
    this.getImplements()
  },
  mounted() {
    this.valid = false
  },
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true
      }
    },
    getSalon() {
      axios
        .get('https://control-unity-api.herokuapp.com/api/room')
        .then(res => {
          this.salons = res.data.Rooms
        })
        .catch(error => {
          this.snackbar = true
          this.color = 'error'
          this.text = error.message
          console.log(error)
        })
    },
    getImplements() {
      axios
        .get('https://control-unity-api.herokuapp.com/api/implement')
        .then(res => {
          this.Implements = res.data.implement
        })
        .catch(error => {
          this.snackbar = true
          this.color = 'error'
          this.text = error.message
          console.log(error)
        })
    },
    newBooking(e) {
      let payload = {
        cc: this.cc,
        name: this.name,
        event: this.event,
        room: this.room,
        schedules: [this.schedules],
        implement: this.implement
      }
      axios
        .post('https://control-unity-api.herokuapp.com/api/newBooking', payload)
        .then(res => {
          this.bookings = res.data.bookings
          this.snackbar = true
          this.color = 'success'
          this.text = '¡Su solicitud de reserva se realizo correctamente!'
        })
        .catch(e => {
          this.snackbar = true
          this.color = 'error'
          this.text = e.response.data.massage
          console.log({ e })
        })
    }
  }
}
</script>
