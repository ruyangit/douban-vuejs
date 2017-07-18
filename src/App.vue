<template>
  <router-view>
  </router-view>
</template>

<script>
import 'iview/dist/styles/iview.css';
import { mapGetters } from 'vuex'
export default {
  name: 'app',
  computed: {
    ...mapGetters({
      global: 'global/getGlobal'
    })
  },
  watch: {
    'global.progress'(val) {
      if (val === 0) {
        this.$Loading.start();
      } else if (val === 100) {
        this.$Loading.finish();
      } else {
        this.$Loading.error();
      }
    },
    'global.messageConfig'(config) {
      // this.$Message.destroy();
      if (typeof config === 'string') {
        if ('destroy' == config) {
          this.$Message.destroy();
        } else {
          this.$Message.info(config);
        }
      } else if (config) {
        if (config.type == 'info') {
          this.$Message.info(config);
        } else if (config.type == 'success') {
          this.$Message.success(config);
        } else if (config.type == 'warning') {
          this.$Message.warning(config);
        } else if (config.type == 'error') {
          this.$Message.error(config);
        } else if (config.type == 'loading') {
          this.$Message.loading(config);
        }
      } else {
        this.$Message.success('提醒信息配置错误！');
      }
      // console.log(config.type);
      // console.log(config.content);
    }
  }
}
</script>

<style>

</style>
