<template>
  <Poptip content="确认删除？" @confirm="$emit('click')" v-if="inPermission">
    <button class="h-btn h-btn-s h-btn-red">{{text || '删除'}}</button>
  </Poptip>
</template>
<script>
export default {
  props: ['permission', 'isSuper', 'text'],
  computed: {
    inPermission() {
      if (typeof this.$store.state.User.permissions === 'undefined') {
        return false;
      }
      if (this.isSuper && !this.$store.state.User.is_super) {
        return false;
      }
      if (this.$store.state.User.is_super) {
        return true;
      }
      let permissions = this.$store.state.User.permissions;
      return typeof permissions[this.permission] !== 'undefined';
    }
  }
};
</script>