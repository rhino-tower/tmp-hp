import { defineConfig } from 'vite'

export default defineConfig({
    // GitHub Pagesなどのサブディレクトリデプロイではなく、カスタムドメインの場合は '/' を指定します。
    // カスタムドメインでの画像パスが正しく解決されるようになります。
    base: '/',
    build: {
        rollupOptions: {
            input: {
                main: 'index.html',
                contact: 'contact/index.html',
                privacy: 'privacy/index.html',
                works: 'works/index.html',
                'works/app-dev': 'works/app-dev/index.html',
                'works/website-dev': 'works/website-dev/index.html',
                'works/automation': 'works/automation/index.html',
                'works/mobile-app': 'works/mobile-app/index.html',
                'works/legacy-system': 'works/legacy-system/index.html',
                'works/ai-system': 'works/ai-system/index.html',
            },
        },
    },
})
