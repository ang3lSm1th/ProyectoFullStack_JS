import { buildTechStack } from './github-stack';
import type { GitHubRepoJson } from './github-repo.types';

function repo(partial: Partial<GitHubRepoJson>): GitHubRepoJson {
  return {
    id: 1,
    name: 'CRM',
    full_name: 'ang3lSm1th/CRM',
    description: null,
    html_url: 'https://github.com/ang3lSm1th/CRM',
    homepage: null,
    language: 'Python',
    fork: false,
    archived: false,
    private: false,
    pushed_at: null,
    stargazers_count: 0,
    ...partial,
  };
}

describe('buildTechStack', () => {
  it('combina frameworks y lenguajes por bytes, sin ruido de Shell', () => {
    const stack = buildTechStack(
      repo({
        languages: {
          Python: 1000,
          HTML: 200,
          Shell: 10,
          CSS: 50,
        },
      }),
    );

    expect(stack).toEqual([
      'Flask',
      'MySQL',
      'Gunicorn',
      'Celery',
      'Redis',
      'Flask-SocketIO',
      'Python',
      'HTML',
      'CSS',
    ]);
  });
});
