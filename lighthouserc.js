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
        'unused-javascript': ['warn', { maxLength: 2 }],
        'uses-responsive-images': 'off',
        'render-blocking-resources': 'off',
        'network-dependency-tree-insight': 'off',
        'render-blocking-insight': 'off',
        'unsized-images': ['warn', { minScore: 0 }],
        'first-contentful-paint': ['warn', { minScore: 0 }],
        'largest-contentful-paint': ['warn', { minScore: 0 }]
      }
    },
    upload: {
      target: 'temporary-public-storage'
    }
  }
};
