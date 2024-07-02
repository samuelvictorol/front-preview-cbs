<template>
  <q-page class="bg-grey-1 q-pa-md column relative">
    <div class="w100 q-pb-md">
      <q-breadcrumbs class="text-primary-2">
        <q-breadcrumbs-el label="Início" icon="home" to="/" />
        <q-breadcrumbs-el label="Relatórios" icon="library_books" to="/relatorios" />
        <q-breadcrumbs-el :label="relatorio.titulo" class="text-bold" icon="description" />
      </q-breadcrumbs>
    </div>
    <div class="text-h4 q-mt-sm text-primary">Relatório: <strong>{{relatorio.titulo}}</strong></div>
    <div class="q-mt-md text-primary-2">
      Atualizado em {{relatorio.updatedAt}}
    </div>
    <div class="text-h6 q-mt-md text-primary-2">
      {{relatorio.descricao}}
    </div>
    <div class="bi-actions w100 row q-gutter-x-md">
      <q-btn @click="openLink()" class="q-mt-md" color="orange-7" label="Ver no Workspace" icon="link" />
      <q-btn @click="printPage()" class="q-mt-md" color="primary" label="Salvar" icon="get_app" />
    </div>
    <div class="frame-container q-mt-md">
      <iframe id="frame-pbi" :title="relatorio.titulo" width="100%" style="min-height: 650px;" :src="isResponsive ? relatorio.frameHtmlResponsive : relatorio.frameHtml" frameborder="0" allowFullScreen="true"></iframe>
    </div>
    <q-dialog class="column" v-model="workspace">
      <img style="width:600px;" src="~/assets/workspaceimg.png" alt="">
      <q-btn @click="workspace = false" label="Fechar" />
    </q-dialog>
  </q-page>
</template>

<script setup>
import { onBeforeMount, ref } from "vue";
import { api } from 'src/boot/axios';
import { useRoute } from "vue-router";

const route = useRoute();
const relatorio = ref({});
const isResponsive = window.innerWidth < 600;

const workspace = ref(false)

function printPage() {
      const printWindow = window.open(relatorio.value.frameHtml, '_blank', 'width=800,height=600');
      const checkLoadAndPrint = () => {
        if (printWindow.document.readyState === 'complete') {
          printWindow.print();
          // printWindow.close(); // Feche a janela após iniciar a impressão
        } else {
          setTimeout(checkLoadAndPrint, 100); // Verifique novamente após 100ms
        }
      };
      printWindow.addEventListener('load', checkLoadAndPrint, true);
      printWindow.print()
}

function openLink() {
  window.open('https://app.powerbi.com/', '_blank');
}

onBeforeMount(async () => {
  const body = { id: route.params.id };
  try {
    const response = await api.post(`/relatorios/relatorio`, body);
    relatorio.value = response.data;
  } catch (error) {
    console.error('Erro ao buscar relatório', error);
  }
});
</script>

<style scoped>
</style>
