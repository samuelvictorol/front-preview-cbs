<template>
    <div class="modal-loading    flex flex-center">
        <div class="loader"></div>
    </div>
</template>

<script setup>



</script>

<style scoped>
.modal-loading{
    z-index: 9400!important;
    background-color: #a280ff42;
    backdrop-filter: blur(6px);
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;

}

/* HTML: <div class="loader"></div> */
.loader {
    width: 90px;
    height: 14px;
    box-shadow: 0 3px 0 #fff;
    position: relative;
    clip-path: inset(-40px 0 -5px)
  }
  .loader:before {
    content: "";
    position: absolute;
    inset: auto calc(50% - 17px) 0;
    height: 50px;
    --g:no-repeat linear-gradient(#620a8d 0 0);
    background: var(--g),var(--g),var(--g),var(--g);
    background-size: 16px 14px;
    animation:
      l7-1 2s infinite linear,
      l7-2 2s infinite linear;
  }
  @keyframes l7-1 {
    0%,
    100%  {background-position: 0 -50px,100% -50px}
    17.5% {background-position: 0 100%,100% -50px,0 -50px,100% -50px}
    35%   {background-position: 0 100%,100% 100% ,0 -50px,100% -50px}
    52.5% {background-position: 0 100%,100% 100% ,0 calc(100% - 16px),100% -50px}
    70%,
    98%  {background-position: 0 100%,100% 100% ,0 calc(100% - 16px),100% calc(100% - 16px)}
  }
  @keyframes l7-2 {
    0%,70% {transform:translate(0)}
    100%  {transform:translate(200%)}
  }
</style>