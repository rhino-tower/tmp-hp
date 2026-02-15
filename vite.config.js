import { defineConfig } from 'vite'

export default defineConfig({
    // GitHub Pagesにデプロイする場合、リポジトリ名をbaseに設定します。
    // 例: https://username.github.io/my-repo/ なら base: '/my-repo/'
    // 現在は相対パス設定にしていますが、うまくいかない場合はリポジトリ名を設定してください。
    base: './',
    build: {
        rollupOptions: {
            input: {
                main: 'index.html',
                contact: 'contact/index.html',
            },
        },
    },
})
