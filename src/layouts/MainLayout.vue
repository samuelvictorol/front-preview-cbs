<template>
  <q-layout view="hHh LpR fFf">

    <q-header class="bg-grey-1 text-primary">
      <q-toolbar>
        <q-btn color="primary" dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title class="q-pt-sm"> 
            <img :src="headerLogo" :width="headerLogo.includes('marca') ? '50' : '250'">
        </q-toolbar-title>

        <q-btn color="primary" dense flat round icon="notifications" size="lg" />
        <q-btn color="primary" dense flat round icon="account_circle" size="lg" @click="toggleRightDrawer" />
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" class="bg-grey-2 relative" side="left">
      <div class="text-h6 text-right q-pr-md w100 bg-primary-2 text-white">Menu</div>
      <q-list>
        <q-item class="q-pl-lg" v-for="item in lefDrawerItems" :key="item.label" clickable :to="item.to">
          <q-item-section avatar>
            <q-icon color="primary" :name="item.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-bold text-primary-2">{{ item.label }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-drawer show-if-above v-model="rightDrawerOpen" class="bg-grey-2 relative" side="right">
      <div class="w100 row justify-center items-center">
        <q-avatar style="border-bottom: 8px double white" size="120px" class="q-ma-md" color="primary" text-color="white">
          <img src="https://img.freepik.com/premium-vector/male-lawyer-cartoon-illustration-smiling-attorney-with-gavel-justice-scale_770200-3052.jpg" alt="">
        </q-avatar>
      </div>
      <div class="w100 text-center q-pb-sm text-bold">Marcelo Queiroz</div>
      <div class="w100 text-center q-pb-sm">administrador</div>
      <q-list class="bg-grey-4 q-mt-xl q-mx-sm column items-center justify-center">
        <q-item class="w100 text-center" v-for="item in rightDrawerItems" :key="item.label" clickable :to="item.to">
          <q-item-section>
            <q-item-label class="text-bold">{{ item.label }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
      <div class="absolute-bottom w100 row justify-center">
        <q-btn style="width: 80%;" icon="logout" color="primary" label="Sair" class="q-ma-md q-ml-lg" />
      </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue'
const leftDrawerOpen = ref(false)
const rightDrawerOpen = ref(false)
const lefDrawerItems = [
  { label: 'Início', icon: 'home', to: '/' },
  { label: 'Relatórios', icon: 'library_books', to: '/relatorios' },
  { label: 'Criar Relatório', icon: 'note_add', to: '/novo-relatorio' },
  { label: 'Funcionários', icon: 'groups', to: '#' },
  { label: 'Permissões', icon: 'key', to: '#' },
  { label: 'Serviços', icon: 'lan', to: '#' },
  { label: 'Bases de Dados', icon: 'dataset', to: '#' },
  { label: 'Previsões', icon: 'equalizer', to: '#' },
  { label: 'Logs', icon: 'analytics', to: '#' },
  { label: 'Solicitações', icon: 'help', to: '#' },
]
const headerLogo = ref('https://www.cbs.adv.br/assets/img/logo.png')
const rightDrawerItems = [
  { label: 'Meu Perfil', icon: 'person', to: '#' },
  { label: 'Configuracões', icon: 'settings', to: '#' },
]

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

const toggleRightDrawer = () => {
  rightDrawerOpen.value = !rightDrawerOpen.value
}

onBeforeMount(() => {
  if(window.innerWidth < 600) {
    headerLogo.value = 'https://www.cbs.adv.br/assets/img/logomarca.png'
  }
})
</script>
<style scoped>
/* Adicione estilos personalizados aqui, se necessário */
.q-header {
  border-bottom: 2px solid #20185438;
}
</style>