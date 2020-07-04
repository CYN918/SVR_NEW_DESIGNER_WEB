import Vue from 'vue'
import VueCropper from 'vue-cropper'
import "styles/index.scss"
import './app.global'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import './app.filters'

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