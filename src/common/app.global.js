import mJs from 'assets/comm.js'
import comState from 'assets/state.js'
import { md5, formatDate } from 'common/utils'
import axios from 'axios'
import api from 'api/index'
import { Message } from 'element-ui'
import Vue from 'vue'

Vue.prototype.$ajax = axios
Vue.prototype.api = api
Vue.prototype.mJs = mJs
Vue.prototype.comState = comState
Vue.prototype.imU = 'https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/img/'
Vue.prototype.api.mcommjs = window.mycomJs;

Vue.prototype.imgPath = 'https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/New/imge/'
Vue.prototype.imgSig = 'http://zk-img.oss-cn-qingdao.aliyuncs.com/h5/cyn/'
Vue.prototype.setImgU = (u) => {
    return 'https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/New/imge/' + u;
}
Vue.prototype.numInt = (n, s = 2) => {
    let bs = Math.pow(10, s);
    return parseInt(n * bs) / bs
};

Vue.prototype.MD5 = md5

Date.prototype.Format = formatDate
Vue.prototype.zkMyFun = window.zkMyFun

Vue.prototype.checkLogin = () => {
    if (!window.userInfo) {
        router.push({ path: '/login' })
        return false;
    }
};

Vue.prototype.setScll = function (top) {
    if (document.documentElement && document.documentElement.scrollTop) {
        document.documentElement.scrollTop = Number(top);
    }
    if (document.body) {
        document.body.scrollTop = Number(top);
    }
},

    Vue.prototype.bdtj = (a = '--', b = '--', c = '--') => {
        _hmt.push(['_trackEvent', a, b, c]);
    };
Vue.prototype.go = (a, b, c) => {
    router.push({ path: a, b })
    _hmt.push(['_trackEvent', a, b, c]);
};

Vue.config.productionTip = false
Vue.prototype.checkLo = function (o) {
    api[o.api](o.pr).then((da) => {
        if (da == 'error' || da == '104') { if (o.er2) { o.er2() } return }
        if (da == 'islogin') {
            let passIN = localStorage.getItem('pass');
            if (passIN) {
                Message({ message: '登陆过期~~自动登陆中请稍后' });
                this.checkLo({
                    api: 'login',
                    pr: JSON.parse(passIN),
                    su: (da) => {
                        window.userInfo = da;
                        Message({ message: '登陆成功' });
                        localStorage.setItem('userT', JSON.stringify(da));
                        this.checkLo(o);
                    },
                    err2: () => {
                        router.push({ path: '/login' })
                    }
                });
                return;
            }
            router.push({ path: '/login' })
            return;
        }
        if (o.su) {
            o.su(da);
        }
    }).catch((err) => {
        if (o.er1) {
            o.er1();
        }
    });
}

Vue.prototype.$message = Message;
Vue.prototype.tipMr = (n) => {
    Message({
        message: n
    })
}