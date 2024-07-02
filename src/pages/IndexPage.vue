<template>
  <q-page class="column">
    <div class="w100 q-pa-md">
      <q-breadcrumbs class="text-primary-2 ">
        <q-breadcrumbs-el label="Início" icon="home" to="/" class="text-bold"/>
      </q-breadcrumbs>
    </div>
    <div class="q-px-sm w100">
      <img src="https://www.cbs.adv.br/assets/img/slider/2.jpg" alt="Example Image" class="shadow-2 responsive-img rounded-borders">
    </div>
    <div class="column w100 text-center q-py-lg text-bold text-primary">
      <div class="text-h6">
        Preview Software de Gestão de Relatórios
      </div>
      <p id="subtitle" class="q-mt-md q-px-md text-white text-bolder bg-primary-3 q-py-xl rounded-borders q-mx-md">
        Bem-vindo ao portal interno da nossa equipe de gestão de relatórios. Nosso software facilita a criação, visualização e compartilhamento de relatórios interativos, garantindo que todos os membros da equipe tenham acesso a dados atualizados e precisos. Utilize nossas ferramentas avançadas para otimizar suas análises e tomar decisões informadas com maior eficiência. Vamos trabalhar juntos para alcançar nossos objetivos!
      </p>
      <div class="w100">
        <q-btn @click="verApresentacao()" class="q-mt-md" color="primary" label="Ver Apresentação" icon="description" />
      </div>
    </div>
    <img class="responsive-img q-pb-xl" src="~/assets/img1.png" alt="">
    <iframe class="q-px-md q-pb-md" src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15353.863192194614!2d-47.8779555!3d-15.8320974!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x935a24de91eb300f%3A0x103026a3dc1c10f1!2sCaputo%2C%20Bastos%20e%20Serra%20Advogados!5e0!3m2!1spt-BR!2sbr!4v1719807122229!5m2!1spt-BR!2sbr" width="100%" height="400" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
  </q-page>
</template>

<script setup>
import { useQuasar } from "quasar";
import { onBeforeMount, ref } from "vue";
import { api } from 'src/boot/axios';

const $q = useQuasar()

async function getRelatorios() {
  await api.get('/relatorios')
    .then(() => {
      $q.notify({
        color: 'green',
        textColor: 'white',
        icon: 'home',
        message: 'Seja Bem Vindo, essa é uma versão PREVIEW. Algumas funcionalidades podem não estar disponíveis.',
        position: 'top',
      })
    })
}

function verApresentacao(){
  window.open('PreviewCBSAdvSoftware.pdf', '_blank', 'width=1000,height=800');
}

onBeforeMount(async() => {
  await getRelatorios()
})
</script>
<style scoped>
.q-page {
  background-color: #a39cb530
}

.responsive-img {
  max-width: 98%;
  height: auto;
  display: block;
  margin: 0 auto;
}
#subtitle {
  font-size: 1.2em;
  letter-spacing: .05rem;
}
.checkCode {
  z-index: 9999!important;
  background-color: #a280ff42;
  backdrop-filter: blur(6px);
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
}

</style>
