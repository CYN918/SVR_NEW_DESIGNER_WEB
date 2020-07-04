import Vue from 'vue'

// 关注
const followType = function(val) {
    if (val == 1) { return '已关注' }
    if (val == 2) { return '互相关注' }
    return '关注';
}

Vue.filter('followType', followType)

