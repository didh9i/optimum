<template>
  <header
    class="card"
    :style="{ width: screen.width > 480 ? `calc(100vw - ${sidebarWidth}px)` : '100vw' }"
  >
    <button
      v-if="screen.width > 480"
      class="sidebar-toggle"
      :class="{ 'sidebar-toggle_opened': sidebarOpened }"
      @click="sidebarOpened = !sidebarOpened"
    />
    <router-link
      v-else
      class="logo"
      to="/"
    />
    <div class="header-right">
      <template v-if="user">
        <list-view-item
          :item="{
            path: `/profile/${user.name}`,
            icon: profileIcon, name: user.name
          }"
        />
        <list-view-item
          :item="{ icon: leaveIcon }"
          :padding="'4px'"
          @item-click="user = null"
        />
      </template>
      <template v-else>
        <list-view-item
          :item="{ path: '/sign-in', icon: signinIcon, name: 'Sign in', path: '/sign-in' }"
          padding="4px 6px"
        />
        <list-view-item
          :item="{ path: '/sign-up', icon: signupIcon, name: 'Sign up', path: '/sign-up' }"
          padding="4px 6px"
        />
      </template>
      <button
        v-if="screen.width <= 480"
        class="fullscreen-toggle"
        :class="{ 'fullscreen-toggle_active': isFullscreen }"
        @click="fullscreen"
      />
    </div>
  </header>
  <nav
    v-if="screen.width > 480"
    class="navbar card-solid"
    :style="{ width: `${sidebarWidth}px` }"
  >
    <router-link class="logo" to="/"/>
    <ul class="list-view">
      <list-view-item
        v-for="route of sidebarRoutes"
        :key="route.name"
        :item="route"
        :padding="padding"
      />
    </ul>
    <ul class="list-view options">
      <list-view-item
        :item="{}"
        :padding="padding"
      />
    </ul>
  </nav>
  <main class="main">
    <router-view class="main"/>
  </main>
  <footer
    v-if="screen.width <= 480"
    class="card"
  >
    <list-view-item
      v-for="route of sidebarRoutes.sort((c, p) => c.name < p.name )"
      :key="route.name"
      :item="{ ...route, name: null }"
      padding="4px calc(50% - 16px)"
    />
  </footer>
  <div id="stars" />
  <div id="stars2" />
  <div id="stars3" />
</template>

<script setup lang="ts">
import { ref, computed, onBeforeMount, onUnmounted, onMounted } from 'vue'
import homeIcon from '~@/icons/home.svg'
import serverIcon from '~@/icons/server.svg'
import rulesIcon from '~@/icons/rules.svg'
import marketIcon from '~@/icons/market.svg'
import storeIcon from '~@/icons/store.svg'
import signupIcon from '~@/icons/signup.svg'
import signinIcon from '~@/icons/signin.svg'
import profileIcon from '~@/icons/profile.svg'
import ListViewItem from '@/components/ListViewItem.vue'

interface SidebarRoutes {
  icon: string
  name: string
  path: string
}

const user = ref<{ name: string } | null>(null)
const sidebarOpened = ref(false);
const sidebarWidth = computed(() => sidebarOpened.value ? 164 : 48);
const padding = computed(() => sidebarOpened.value ? '4px 12px' : '4px 5px')
const sidebarRoutes: SidebarRoutes[] = [
  { icon: homeIcon, name: 'Home', path: '/' },
  { icon: serverIcon, name: 'Servers', path: '/servers'},
  { icon: rulesIcon, name: 'Rules', path: '/rules' },
  { icon: marketIcon, name: 'Market', path: '/market' },
  { icon: storeIcon, name: 'Store', path: '/store' }
]

const isFullscreen = ref<boolean>(false)
const screen = ref({ width: 0, height: 0 })

const resizeHandler = (): void => {
  screen.value = { width: window.innerWidth, height: window.innerHeight }
}

const fullscreen = () => {
  if (isFullscreen.value === false) {
    isFullscreen.value = true
    document.documentElement.requestFullscreen({ navigationUI: 'hide' })
  } else {
    isFullscreen.value = false
    document.exitFullscreen()
  }
}

onBeforeMount(() => {
  resizeHandler()
  window.addEventListener('resize', resizeHandler)
})

onUnmounted(() => {
  window.removeEventListener('resize', resizeHandler)
})

</script>

<style lang="scss">
@import 'styles/main';

body {
  display: grid;
  grid-template-rows: fit-content(48px) auto fit-content(48px);
  grid-template-columns: auto auto;
  grid-template-areas: 'nav header'
                       'nav main'
                       'footer footer';
  height: 100%;
}

.logo {
  height: 48px;
  width: 100%;
  background-image: url('~@/logo.svg');
  background-size:  auto 40px;
  background-position: 2px 4px;
  background-repeat: no-repeat;
  clip-path: polygon(0 0, calc(100% - 4px) 0, calc(100% - 4px) 100%, 0 100%);
}

header.card {
  display:         flex;
  justify-content: space-between;
  grid-area:       header;
  height:          48px;
  min-width:       100%;
  border-radius:   0;
  z-index:         1;
  transition:      var(--point-to-point-t2);
  backdrop-filter: blur(2px) brightness(50%);
  padding:         0;

  .logo {
    width: 48px;
  }

  @media (max-width: 340px) {
    height: 40px;

    .logo {
      width: 40px;
      background-size: auto 32px;
    }
    .fullscreen-toggle {
      min-width: 40px;
      width: 40px;
      height: 40px;
      background-size: 24px;
    }
  }

}

.header-right {
  display:      flex;
  align-items:  center;
  height:       100%;
  margin-right: 1px;

  .list-view__item {
    height: calc(100% - 10px);

    &-button {
      height: calc(100% + 2px);

      &:before {
        height: 18px;
      }

      @media (max-width: 340px) {
        .list-view__item-icon {
          min-width: 24px;
        }
        &:before {
          height: 12px;
        }

        span {
          font-size: 14px;
        }
      }
    }
  }
}

nav.card-solid {
  display:       flex;
  flex-flow:     column;
  gap:           8px;
  grid-area:     nav;
  width:         48px;
  height:        100%;
  border-radius: 0;
  z-index:       1;
  padding:       0;
  transition:    var(--point-to-point-t2);
  overflow:      hidden;
}

main {
  grid-area:       main;
  max-width:       1024px;
  width:           fit-content;
  min-width:       256px;
  margin:          -48px 0;
  padding:         64px 32px 32px;
  align-self:      flex-start;
  justify-self:    center;
  overflow-x:      visible;
  overflow-y:      scroll;
  clip-path:       none;
  scrollbar-width: none;
  max-height:      calc(100% + 48px);

  &::-webkit-scrollbar {
    display: none;
  }
}

.fullscreen-toggle,
.sidebar-toggle {
  border:              6px solid transparent;
  min-width:           48px;
  width:               48px;
  height:              48px;
  padding:             0;
  appearance:          none;
  background-image:    url('~@/icons/menu-fold.svg');
  background-repeat:   no-repeat;
  background-position: center;
  background-size:     32px;
  background-color:    transparent;
  background-clip:     content-box;
  border-radius:       10px;
  transition:          background-color var(--fast-invoke-t2);

  &_opened {
    transform: rotate(180deg);
  }

  &:hover {
    background-color: var(--control-hover);
  }
}

.fullscreen-toggle {
  background-image: url('~@/icons/fullscreen.svg');

  &_active {
    background-image: url('~@/icons/windowed.svg');
  }
}

footer.card {
  position: static;
  bottom: 0;
  width: 100vw;
  display: flex;
  justify-content: space-between;
  height: 48px;
  grid-area: footer;
  border-radius: 0;
  padding: 4px;
}
</style>
