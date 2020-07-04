import Vue from 'vue'
import VueCropper from 'vue-cropper'
import ElementUI from 'element-ui'
import "styles/index.scss"
import './app.filters'
import './app.directives'
import './app.global'

export default function init (cb) {
    // 注册图片裁剪
    Vue.use(VueCropper)
    // 注册饿了吗ui组件库
    Vue.use(ElementUI)

    // 监听退出登录
    window.addEventListener("storage", function (e) {
        if (e.key === 'pass' || e.key === 'userT') {
            location.reload()
        }
    });

    cb && cb()
}