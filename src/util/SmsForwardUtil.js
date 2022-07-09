import CryptoJS from "crypto-js/crypto-js";
import stores from '@/store/index.js'
import { Toast } from 'vant';
import { toggleTheme } from "@zougt/vite-plugin-theme-preprocessor/dist/browser-utils.js";
const sisgn = (timestamp, sign) => {
    var hash = CryptoJS.HmacSHA256(timestamp + "\n" + sign, sign);
    return encodeURIComponent(CryptoJS.enc.Base64.stringify(hash));
}

function store(key, sign) {
    if (sign) {
        localStorage.setItem(key, sign)
        return sign;
    }
    var item = localStorage.getItem(key);
    return item ? item : '';
}
function theme() {
    if( localStorage.getItem('Theme') === 'light') {
        toggleTheme({
            scopeName: "dark",
          });
          Toast.success('暗黑模式');
        localStorage.setItem('Theme', 'dark')
        stores.dispatch('SAVE_THEME', 'dark')
    }
    else if (localStorage.getItem('Theme') === 'dark') {
        toggleTheme({
            scopeName: 'light',
          });
          Toast.success('阳光模式')
        localStorage.setItem('Theme', 'light')
        stores.dispatch('SAVE_THEME', 'light')
    } else {
        toggleTheme({
            scopeName: 'dark',
          });
        localStorage.setItem('Theme', 'dark')
        stores.dispatch('SAVE_THEME', 'dark')
    }
}

const sign = sign => store('sign', sign);

const serverUrl = sign => store('serverUrl', sign);

export default {
    sisgn, sign, serverUrl, store,theme
}
