<template>
    <q-page class="q-pa-md">
        <div class="w100 q-pb-md">
            <q-breadcrumbs class="text-primary-2 ">
              <q-breadcrumbs-el label="Início" icon="home" to="/" />
              <q-breadcrumbs-el label="Relatórios" icon="library_books" to="/relatorios" />
              <q-breadcrumbs-el label="Criar Relatório" class="text-bold" icon="post_add" to="/novo-relatorio" />
            </q-breadcrumbs>
          </div>
            <div class="text-h3 q-mt-sm text-primary">Criar Relatório</div>
            <div class="text-subtitle1 text-primary-2 q-pl-sm q-mb-lg q-mt-sm">Preencha os campos abaixo para criar um novo relatório</div>
            <q-input class="q-mb-md" maxlength="50" v-model="novoRelatorio.titulo" label="Título do Relatório*" outlined />
            <q-input class="q-mb-md" maxlength="100" v-model="novoRelatorio.descricao" label="Descrição do Relatório" outlined />
            <q-input type="textarea" class="q-mb-md" maxlength="500" v-model="novoRelatorio.frameHtml" label="Link do Relatório*" outlined />
            <q-btn @click="limpar()" label="Limpar Campos" class="text-primary q-mr-md q-mt-md" />
            <q-btn :disabled="novoRelatorio.titulo.trim() == '' || novoRelatorio.frameHtml.trim() == ''" @click="criarRelatorio()" label="Criar Relatório" icon="add" color="primary" class="q-mt-md" />
    </q-page>
</template>
<script setup>
import { ref } from "vue";
import { api } from 'src/boot/axios';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router'

const router = useRouter()
const $q = useQuasar()

const novoRelatorio = ref({
    titulo: '',
    descricao: '',
    frameHtml: '',
})

function limpar() {
    novoRelatorio.value.titulo = ''
    novoRelatorio.value.descricao = ''
    novoRelatorio.value.frameHtml = ''
}

async function criarRelatorio() {
    await api.post('/relatorios', novoRelatorio.value)
      .then(() => {
        $q.notify({
          color: 'primary',
          textColor: 'white',
          icon: 'add',
          message: 'Relatório criado com sucesso',
          position: 'top',
        })
        router.replace('/relatorios')
      })
      .catch(() => {
        $q.notify({
          color: 'negative',
          textColor: 'white',
          icon: 'report_problem',
          message: 'Erro ao criar relatório',
          position: 'top',
        })
      })
      .finally(() => {
        limpar()
      })
}

</script>