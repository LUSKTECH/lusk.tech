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
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.95 }],
        'categories:best-practices': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.9 }],
        'unused-javascript': ['warn', { maxLength: 0 }],
        'uses-responsive-images': 'off'
      }
    },
    upload: {
      target: 'temporary-public-storage'
    }
  }
};
