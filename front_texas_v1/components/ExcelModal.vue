<template>
  <b-modal
    v-model="isComponentModalActive"
    has-modal-card
    trap-focus
    :destroy-on-hide="false"
    @close="cancel"
  >
    <div class="modal-card" style="width: 100%">
      <header class="modal-card-head">
        <span class="modal-card-title">
          <p v-if="type === 'clients'" class="title is-5">
            Registrar clientes por excel
          </p>
          <p v-else-if="type === 'policies'" class="title is-5">
            Registrar pólizas por excel
          </p>
          <p v-else>Registrar por excel</p>
        </span>
        <button type="button" class="delete" @click="cancel()" />
      </header>
      <ValidationObserver ref="ExcelForm" v-slot="{ handleSubmit }">
        <section class="modal-card-body">
          <div>
            <ValidationProvider v-slot="{ errors, valid }" name="archivo">
              <b-field
                :message="errors"
                :type="{
                  'is-danger': errors[0],
                  'is-success': valid
                }"
                icon="upload"
                size="is-large"
              >
                <template #label>
                  Archivo CSV (
                  <a v-if="type === 'clients'" class="has-text-primary">
                    <small>Descargar formato</small>
                  </a>
                  <a v-else-if="type === 'policies'" class="has-text-primary">
                    <small>Descargar formato</small>
                  </a>
                  <p v-else class="has-text-primary">
                    <small>Archivo no disponible</small>
                  </p>
                  )
                </template>
                <div>
                  <b-upload v-model="dropFile" expanded drag-drop>
                    <section class="section">
                      <div class="content has-text-centered">
                        <p>
                          <b-icon icon="upload" size="is-large" />
                        </p>
                        <p>Arrastra tu archivo o haz click aquí</p>
                      </div>
                    </section>
                  </b-upload>
                </div>
              </b-field>
            </ValidationProvider>
            <div class="tags">
              <span v-if="dropFile" class="tag is-primary">
                {{ dropFile.name }}
                <button
                  class="delete is-small"
                  type="button"
                  @click="dropFile = null"
                />
              </span>
            </div>
          </div>
          <hr class="navbar-divider" />
          <b-collapse
            :open="false"
            position="is-top"
            aria-id="contentIdForA11y1"
          >
            <template #trigger="props">
              <a class="has-text-primary" aria-controls="contentIdForA11y1">
                <b-icon :icon="!props.open ? 'menu-down' : 'menu-up'"></b-icon>
                <small>{{ !props.open ? 'Ver formato' : 'Ocultar formato' }}</small>
              </a>
            </template>
            <b-table v-if="type === 'clients'" style="font-size: 15px;" :data="clientData" :columns="clientColumns"></b-table>
            <b-table v-else-if="type === 'policies'" style="font-size: 15px;" :data="policyData" :columns="policyColumns"></b-table>
            <strong style="font-size: 12px;" class="has-text-info">* Todos los campos son obligatorios</strong>
          </b-collapse>
        </section>
        <footer class="modal-card-foot">
          <ButtonGroup
            :handle-submit="handleSubmit"
            saving
            @save="save"
            @cancel="cancel"
          />
        </footer>
      </ValidationObserver>
    </div>
  </b-modal>
</template>

<script>
export default {
  name: 'ExcelModal',
  props: {
    form: Object,
    isComponentModalActive: Boolean,
    type: String
  },
  data () {
    return {
      dropFile: null,
      clientData: [
        {
          numero: '232342',
          nombre: 'Jesse',
          apellido: 'Simmons',
          email: 'jesse_25@correo.com',
          tel: '9999999999'
        },
        {
          numero: '12323',
          nombre: 'John',
          apellido: 'Doe',
          email: 'john_doe@correo.com',
          tel: '8888888888'
        }
      ],
      clientColumns: [
        {
          field: 'numero',
          label: 'Número'
        },
        {
          field: 'nombre',
          label: 'Nombre'
        },
        {
          field: 'apellido',
          label: 'Apellido'
        },
        {
          field: 'email',
          label: 'Email',
          centered: true
        },
        {
          field: 'tel',
          label: 'Teléfono'
        }
      ],
      policyData: [
        {
          numero: '2021V300Y67',
          cliente: '12323',
          producto: 'SDR45',
          aseguradora: 'QUALITAS',
          prima: 500,
          sumaaseg: 5000000,
          forma: 'M',
          conducto: 'C'
        },
        {
          numero: '2020V20056',
          cliente: '232342',
          producto: 'AAI23431MX',
          aseguradora: 'ARGOS',
          prima: 200,
          sumaaseg: 1800000,
          forma: 'S',
          conducto: 'A'
        }
      ],
      policyColumns: [
        {
          field: 'numero',
          label: 'Número'
        },
        {
          field: 'cliente',
          label: 'Cliente'
        },
        {
          field: 'producto',
          label: 'Producto',
          centered: true
        },
        {
          field: 'aseguradora',
          label: 'Aseguradora'
        },
        {
          field: 'prima',
          label: 'Prima'
        },
        {
          field: 'sumaaseg',
          label: 'Suma'
        },
        {
          field: 'forma',
          label: 'Forma'
        },
        {
          field: 'conducto',
          label: 'Conducto'
        }
      ]
    }
  },
  watch: {
    form (newVal) {
      this.form = newVal
    }
  },
  methods: {
    save () {
      const item = {
        type: this.type,
        file: this.dropFile
      }
      this.$emit('save', item)
      this.dropFile = null
    },
    cancel () {
      this.$refs.ExcelForm.reset()
      this.$emit('close')
    }
  }
}
</script>
