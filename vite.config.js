import { defineConfig } from 'vite'

export default defineConfig({
    // GitHub Pagesなどのサブディレクトリデプロイではなく、カスタムドメインの場合は '/' を指定します。
    // カスタムドメインでの画像パスが正しく解決されるようになります。
    base: '/',
    build: {
        rollupOptions: {
            input: {
                main: 'index.html',
                about: 'about/index.html',
                contact: 'contact/index.html',
                privacy: 'privacy/index.html',
                lp: 'lp/index.html',
                package: 'package/index.html',
                'service': 'service/index.html',
                'service/ai-automation': 'service/ai-automation/index.html',
                'service/system-dev': 'service/system-dev/index.html',
                'service/dx-consulting': 'service/dx-consulting/index.html',
                'industry': 'industry/index.html',
                'industry/it': 'industry/it/index.html',
                'industry/ec': 'industry/ec/index.html',
                'industry/real-estate': 'industry/real-estate/index.html',
                'industry/professional': 'industry/professional/index.html',
                'industry/clinic': 'industry/clinic/index.html',
                'industry/construction': 'industry/construction/index.html',
                'works': 'works/index.html',
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
