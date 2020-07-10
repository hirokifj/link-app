<template>
  <div class="the-sidebar">
    <div class="userbox">
      <i class="fas fa-user-circle icon"></i>
      <span class="name">Hiroki Fujita</span>
    </div>
    <div class="nav">
      <nav class="side-nav">
        <ul class="list">
          <li class="item">
            <nuxt-link to="/home" class="link">
              <i class="fas fa-home icon"></i>
              <span class="text">ホーム</span>
            </nuxt-link>
          </li>
          <li class="item">
            <nuxt-link to="/user/edit" class="link">
              <i class="fas fa-home icon"></i>
              <span class="text">プロフィール設定</span>
            </nuxt-link>
          </li>
          <li class="item">
            <nuxt-link to="/user/id" class="link">
              <i class="fas fa-home icon"></i>
              <span class="text">ユーザID設定</span>
            </nuxt-link>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.the-sidebar {
  position: sticky;
  top: 60px;
  padding: 40px 10px;
  background-color: $color-white;
}

.the-sidebar > .userbox {
  margin-bottom: 60px;
  text-align: center;
}

.the-sidebar > .userbox > .icon {
  display: block;
  margin-bottom: 10px;
  font-size: 56px;
}

.side-nav > .list {
  list-style: none;
}

.side-nav > .list > .item {
  &:not(:last-child) {
    margin-bottom: 10px;
  }
}

.side-nav > .list > .item > .link {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 14px 20px;
  color: $color-secondary;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.4s;

  &:hover {
    background-color: lighten($color-gray-light-1, 2%);
  }
}

.side-nav > .list > .item > .link.nuxt-link-active {
  cursor: default;
  background-color: $color-gray-light-1;
}

.side-nav > .list > .item > .link > .icon {
  margin-right: 10px;
}
</style>
