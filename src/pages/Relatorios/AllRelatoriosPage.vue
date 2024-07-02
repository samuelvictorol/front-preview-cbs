<template>
  <q-page class="bg-grey-1 q-pa-md column relative">
    <div class="w100 q-pb-md">
      <q-breadcrumbs class="text-primary-2">
        <q-breadcrumbs-el label="Início" icon="home" to="/" />
        <q-breadcrumbs-el label="Relatórios" class="text-bold" icon="library_books" to="/relatorios" />
      </q-breadcrumbs>
    </div>
    <div class="text-h3 q-mt-sm text-primary">Visualizar Relatórios</div>
    <div class="text-subtitle1 text-primary-2 q-pl-sm q-mb-lg q-mt-sm">
      <strong>{{ relatorios.length }}</strong> relatórios encontrados
    </div>
    <q-input id="buscar-rel" label="Buscar Relatório" outlined>
      <template v-slot:append>
        <q-icon name="search" />
      </template>
    </q-input>
    <div v-if="relatorios.length > 0" class="text-h5 q-mt-md">Relatórios</div>
    <div class="relatorios q-mt-md w100 row justify-between">
      <q-card v-for="relatorio in relatorios" :key="relatorio.titulo" class="q-mb-md">
        <q-card-section style="border-bottom: 2px solid #20185469;border-radius: 4px;">
          <div class="text-h6 text-primary-2 text-bold row items-center q-mb-sm"><q-icon color="primary" class="q-pr-sm" name="description" size="md"/>{{ relatorio.titulo }}</div>
          <div class="text-subtitle2 text-primary-2 q-pl-xs">{{ relatorio.descricao }}</div>
        </q-card-section>
        <q-card-section class="w100 no-wrap row justify-center card-buttons bg-primary-4">
          <q-btn @click="deleteModal(relatorio)" label="" color="red"  icon="delete" class="full-width-btn no-shadow" />
          <q-btn label="" color="orange" icon="edit" class="full-width-btn no-shadow" />
          <q-btn @click="verRelatorio(relatorio)" label="" color="primary" icon="visibility" class="full-width-btn no-shadow" />
        </q-card-section>
      </q-card>
    </div>
    <q-dialog v-model="dialogDelete">
      <q-card>
        <q-card-section>
          <div class="text-h6 text-primary-2 text-bold row items-center q-mb-sm"><q-icon color="primary" class="q-pr-sm" name="description" size="md"/>Excluir Relatório {{ deleteHandle.titulo }}</div>
          <div class="text-subtitle2 text-primary-2 q-pl-xs">Tem certeza que deseja deletar este relatório?</div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn @click="dialogDelete = false" label="Cancelar" color="primary" flat />
          <q-btn  @click="remove()" label="Deletar" color="red" flat />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue'
import { api } from 'src/boot/axios';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';

const router = useRouter();
const $q = useQuasar()

const relatorios = ref([])

const dialogDelete = ref(false)
const deleteHandle = ref(null)

function verRelatorio(relatorio) {
  router.push(`/relatorios/${relatorio._id}`)
}

function deleteModal(relatorio) {
  deleteHandle.value = relatorio
  dialogDelete.value = true
}

async function getRelatorios() {
  await api.get('/relatorios')
    .then(response => {
      console.log(JSON.stringify(response.data))
      relatorios.value = response.data
    })
    .catch(() => {
      $q.notify({
        color: 'negative',
        textColor: 'white',
        icon: 'report_problem',
        message: 'Erro ao buscar relatórios',
        position: 'top',
      })
    })
}

const remove = async () => {
  await api.delete(`/relatorios`,{ data: { id: deleteHandle.value._id } })
    .then(() => {
      $q.notify({
        color: 'positive',
        textColor: 'white',
        icon: 'delete',
        message: 'Relatório removido com sucesso',
        position: 'top',
      })
      getRelatorios()
    })
    .catch(() => {
      $q.notify({
        color: 'negative',
        textColor: 'white',
        icon: 'report_problem',
        message: 'Erro ao remover relatório',
        position: 'top',
      })
    }).then(() => {
      dialogDelete.value = false
      deleteHandle.value = null
    })
}

onBeforeMount(async () => {
  await getRelatorios()
})
</script>

<style scoped>
.relatorios {
  gap: .8%;
}
.q-card {
  background-color: #E2E1E6;
  border-radius: 2px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.413);
  width: 49.2%;
  justify-content: space-between;
}

.card-buttons {
  flex-direction: row;
  justify-content: flex-end;
  gap: 8px!important;
}

.full-width-btn {
  width: 20%;
}

@media (max-width: 768px) {
  .card-buttons {
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding-top: 16px;
    gap: 0px!important;
  }
  .q-card {
    width: 100%;
  }
  .full-width-btn {
    width: 100%;
    filter: none;
    border-radius: 0px;
  }
  .q-btn:before{
    box-shadow: none!important;
  }
}
</style>
