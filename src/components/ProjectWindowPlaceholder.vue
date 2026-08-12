<template>
  <div class="win">
    <div class="win-bar">
      <i></i><i></i><i></i>
    </div>
    <div class="win-body">
      <div class="l a"></div>
      <div class="l"></div>
      <div class="win-grid">
        <span></span><span></span><span></span>
      </div>
      <div class="l"></div>
    </div>
  </div>
</template>

<style scoped>
.win {
  position: relative;
  z-index: 2;
  width: 100%;
  background: var(--color-bg);
  border: 1px solid var(--color-soft);
  border-radius: 10px;
  overflow: hidden;
}
.win-bar {
  height: 20px;
  background: var(--color-bg-alt);
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 0 9px;
  border-bottom: 1px solid var(--color-soft);
}
.win-bar i {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--color-soft);
  display: block;
}
.win-body {
  padding: 10px;
  display: grid;
  gap: 7px;
}
.win-body .l {
  height: 7px;
  border-radius: 3px;
  background: var(--color-bg-alt);
}
.win-body .l.a {
  background: var(--color-soft);
  width: 55%;
}
.win-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 6px;
  margin-top: 2px;
}
.win-grid span {
  height: 30px;
  border-radius: 5px;
  background: var(--color-bg-alt);
}
.win-grid span:first-child {
  background: var(--color-soft);
}
</style>
