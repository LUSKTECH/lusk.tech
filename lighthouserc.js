export default {
  ci: {
    collect: {
      staticDistDir: './dist',
      numberOfRuns: 3,
      url: [
        'http://localhost:3000/',
        'http://localhost:3000/privacy',
        'http://localhost:3000/terms'
      ]
    },
    assert: {
      preset: 'lighthouse:recommended',
      assertions: {
        'categories:performance': ['warn', { minScore: 0.8 }],
        'categories:accessibility': ['error', { minScore: 0.95 }],
        'categories:best-practices': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.9 }],
        'link-name': 'off',
        'unused-javascript': 'off',
        'uses-responsive-images': 'off',
        'render-blocking-resources': 'off',
        'network-dependency-tree-insight': 'off',
        'render-blocking-insight': 'off',
        'unsized-images': 'off',
        'first-contentful-paint': 'off',
        'largest-contentful-paint': 'off'
      }
    },
    upload: {
      target: 'temporary-public-storage'
    }
  }
};
