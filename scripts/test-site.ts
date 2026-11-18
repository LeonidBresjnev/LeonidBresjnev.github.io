import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { projects } from '../src/projects.ts';

const implementationCopy = [
  'Built with Vite',
  'Styled with Tailwind',
  'Icons by Lucide',
  'Deployed via GitHub Pages',
  'Crafted for Speed',
];

const readText = (path: string) =>
  readFile(new URL(`../${path}`, import.meta.url), 'utf8');

const linkCheckTimeoutMs = 15000;
const externalLinkPatterns = [
  /\[[^\]]+\]\((https?:\/\/[^)\s]+)\)/g,
  /\b(?:href|repoHref):\s*"(https?:\/\/[^"]+)"/g,
  /href="(https?:\/\/[^"]+)"/g,
];
const unverifiedProjectLinks = new Set([
  'https://github.com/LeonidBresjnev/myMediaPlayer',
  'https://github.com/LeonidBresjnev/filterexplorer.git',
]);
const unverifiedLinkPatterns = [
  /^https:\/\/github\.com\/LeonidBresjnev\/LeonidBresjnev\.github\.io\/actions\/workflows\/[^/]+\.yml\/badge\.svg\?branch=main$/,
];

const collectExternalLinks = (source: string, content: string) => {
  const links = [];

  for (const pattern of externalLinkPatterns) {
    for (const [, href] of content.matchAll(pattern)) {
      links.push({ href, source });
    }
  }

  return links;
};

const fetchLink = async (href: string) =>
  fetch(href, {
    redirect: 'follow',
    signal: AbortSignal.timeout(linkCheckTimeoutMs),
    headers: {
      Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      'User-Agent': 'jacob-simonsen-landing-link-check/1.0',
    },
  });

test('README presents the landing page and project links in order', async () => {
  const readme = await readText('README.md');

  assert.match(readme, /^# Jacob Simonsen$/m);
  assert.match(readme, /Landing page: https:\/\/leonidbresjnev\.github\.io\//);

  const listedProjects = [
    ...readme.matchAll(/^\d+\.\s+\[([^\]]+)\]\(([^)]+)\)/gm),
  ].map(([, name, href]) => ({ name, href }));

  assert.deepEqual(
    listedProjects,
    projects.map(({ name, href, repoHref }) => ({
      name,
      href: href ?? repoHref,
    })),
  );
});

test('README exposes separate workflow badges', async () => {
  const readme = await readText('README.md');
  const workflowBadges = [
    ['Build', 'build.yml'],
    ['Tests', 'tests.yml'],
    ['Lint', 'lint.yml'],
    ['Deploy', 'deploy.yml'],
  ];

  for (const [label, workflowFile] of workflowBadges) {
    const badge = `[![${label}](https://github.com/LeonidBresjnev/LeonidBresjnev.github.io/actions/workflows/${workflowFile}/badge.svg?branch=main)](https://github.com/LeonidBresjnev/LeonidBresjnev.github.io/actions/workflows/${workflowFile})`;

    assert.ok(
      readme.includes(badge),
      `README should include the ${label} workflow badge`,
    );
  }

  assert.equal(readme.includes('/actions/workflows/pages.yml'), false);
});

test('shared project data includes the intended links in order', async () => {
  const app = await readText('src/App.tsx');
  const header = await readText('src/components/LandingHeader.tsx');
  const projectData = await readText('src/projects.ts');
  let previousIndex = -1;
  const findProperty = (property: string, value: string) =>
    Math.max(
      projectData.indexOf(`${property}: "${value}"`),
      projectData.indexOf(`${property}: '${value}'`),
    );

  for (const { name, href, repoHref } of projects) {
    const nameIndex = findProperty('name', name);

    assert.ok(
      nameIndex > previousIndex,
      `${name} should appear after the previous project`,
    );

    if (href) {
      const hrefIndex = findProperty('href', href);

      assert.ok(
        hrefIndex > nameIndex,
        `${name} should include its GitHub Pages URL`,
      );
    }

    const repoIndex = findProperty('repoHref', repoHref);

    assert.ok(
      repoIndex > nameIndex,
      `${name} should include its GitHub repository URL`,
    );
    previousIndex = nameIndex;
  }

  assert.match(app, /import \{ projects \} from "\.\/projects"/);
  assert.match(app, /<ProjectCard\b/);
  assert.match(app, /<LandingHeader \/>/);
  assert.match(
    header,
    /A landing page for my GitHub projects and published GitHub Pages sites\./,
  );
  assert.match(
    projectData,
    /A visual interface to OpenFDA with text-context search using OpenAI\./,
  );
  assert.match(
    projectData,
    /Tutorial project building a restaurant mobile app with a cross-platform stack\./,
  );
  assert.equal(findProperty('name', 'Fun with WASM'), -1);
});

test('HTML shell wires the app and person favicon', async () => {
  const html = await readText('index.html');
  const favicon = await readText('public/favicon.svg');

  assert.match(html, /<title>Jacob Simonsen<\/title>/);
  assert.match(
    html,
    /<link rel="icon" type="image\/svg\+xml" href="\.\/favicon\.svg" \/>/,
  );
  assert.match(html, /<div id="root"><\/div>/);
  assert.match(html, /<script type="module" src="\/src\/main\.tsx"><\/script>/);
  assert.match(favicon, /aria-label="Person icon"/);
});

test('landing content avoids removed implementation copy and wiki links', async () => {
  const readme = await readText('README.md');
  const app = await readText('src/App.tsx');
  const combinedContent = `${readme}\n${app}`;

  for (const phrase of implementationCopy) {
    assert.equal(
      combinedContent.includes(phrase),
      false,
      `"${phrase}" should stay out of page content`,
    );
  }

  assert.equal(
    /wiki/i.test(combinedContent),
    false,
    'wiki links should not be present',
  );
});

test('styling stays Tailwind-first and interface icons stay Lucide-first', async () => {
  const css = await readText('src/index.css');
  const app = await readText('src/App.tsx');
  const header = await readText('src/components/LandingHeader.tsx');
  const projectCard = await readText('src/components/ProjectCard.tsx');

  for (const directive of [
    '@tailwind base;',
    '@tailwind components;',
    '@tailwind utilities;',
  ]) {
    assert.ok(
      css.includes(directive),
      `${directive} should remain in the global stylesheet`,
    );
  }

  assert.match(css, /body\s*{[^}]*@apply\b[^}]*}/s);
  assert.match(projectCard, /from ["']lucide-react["']/);
  const componentSources = `${app}\n${header}\n${projectCard}`;

  assert.equal(
    /\bstyle=/.test(componentSources),
    false,
    'Inline styles should not replace Tailwind utilities',
  );

  for (const icon of ['ArrowUpRight', 'BadgeCheck', 'ExternalLink', 'Globe2']) {
    assert.match(
      componentSources,
      new RegExp(`\\b${icon}\\b`),
      `${icon} should remain a Lucide UI icon`,
    );
  }
});

test(
  'external links resolve without broken responses',
  { timeout: 45000 },
  async () => {
    const files = [
      ['README.md', await readText('README.md')],
      ['src/App.tsx', await readText('src/App.tsx')],
      [
        'src/components/LandingHeader.tsx',
        await readText('src/components/LandingHeader.tsx'),
      ],
      [
        'src/components/ProjectCard.tsx',
        await readText('src/components/ProjectCard.tsx'),
      ],
      ['src/projects.ts', await readText('src/projects.ts')],
    ];
    const linksByHref = new Map<string, { href: string; sources: string[] }>();

    for (const [source, content] of files) {
      for (const { href } of collectExternalLinks(source, content)) {
        const entry = linksByHref.get(href) ?? { href, sources: [] };

        entry.sources.push(source);
        linksByHref.set(href, entry);
      }
    }

    const checkableLinks = [...linksByHref.values()].filter(
      ({ href }) =>
        !unverifiedProjectLinks.has(href) &&
        !unverifiedLinkPatterns.some((pattern) => pattern.test(href)),
    );

    assert.ok(checkableLinks.length > 0, 'Expected external links to check');

    const failures: string[] = [];

    for (const { href, sources } of checkableLinks) {
      try {
        const response = await fetchLink(href);

        if (!response.ok) {
          failures.push(
            `${href} returned HTTP ${response.status} (${sources.join(', ')})`,
          );
        }
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        failures.push(`${href} failed: ${message} (${sources.join(', ')})`);
      }
    }

    assert.equal(
      failures.length,
      0,
      `Broken links found:\n${failures.join('\n')}`,
    );
  },
);
