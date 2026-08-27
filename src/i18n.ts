const en = {
  searchPlaceholder: 'Search repositories...',
  searchTitle: 'GitHub Search',
  searchSubtitle: 'Find open source projects and inspect repository details.',
  initialScreenPhrase:
    'Today is a beautiful day to search for new repositories!',
  secondaryPhrase: 'Start by typing in the search input above.',
  searchTime: 'Results in {time} milliseconds',
  loading: 'Loading...',
  updatedAt: 'Updated {date}',
  footerText: 'Want to search private repositories?',
  footerText2: 'Create a GitHub personal access token',
  footerText3: 'and add it to `.env.local`.',
  home: 'Back to search',
  license: 'License',
  repoOwnerImage: 'Repository owner avatar',
  readme: 'Readme',
  stars: 'stars',
  issues: 'issues',
  watchers: 'watchers',
  forks: 'forks',
  repositoriesNotFoundText:
    'We could not find a repository matching that search.',
  repositoriesError:
    'GitHub repository results could not be loaded. Please try again soon.',
  repositoryError:
    'This repository could not be loaded. Please try again soon.',
  previous: 'Previous',
  next: 'Next',
  viewRepository: 'View {name}',
}

const pt: typeof en = {
  searchPlaceholder: 'Buscar repositórios...',
  searchTitle: 'Busca GitHub',
  searchSubtitle:
    'Encontre projetos de código aberto e veja os detalhes do repositório.',
  initialScreenPhrase: 'Hoje está um lindo dia para buscar novos repositórios!',
  secondaryPhrase: 'Comece digitando no campo de busca acima.',
  searchTime: 'Resultados em {time} milissegundos',
  loading: 'Carregando...',
  updatedAt: 'Atualizado em {date}',
  footerText: 'Quer pesquisar repositórios privados?',
  footerText2: 'Crie um token de acesso pessoal do GitHub',
  footerText3: 'e adicione-o ao `.env.local`.',
  home: 'Voltar para a busca',
  license: 'Licença',
  repoOwnerImage: 'Avatar do proprietário do repositório',
  readme: 'Leiame',
  stars: 'estrelas',
  issues: 'discussões',
  watchers: 'observadores',
  forks: 'ramificações',
  repositoriesNotFoundText:
    'Não foi possível encontrar um repositório com essa busca.',
  repositoriesError:
    'Não foi possível carregar os resultados do GitHub. Tente novamente em breve.',
  repositoryError:
    'Não foi possível carregar este repositório. Tente novamente em breve.',
  previous: 'Anterior',
  next: 'Próxima',
  viewRepository: 'Ver {name}',
}

const nl: typeof en = {
  searchPlaceholder: 'Zoek repositories...',
  searchTitle: 'GitHub Zoeken',
  searchSubtitle: 'Vind open source-projecten en bekijk repositorydetails.',
  initialScreenPhrase:
    'Het is vandaag een prachtige dag om repositories te zoeken!',
  secondaryPhrase: 'Begin door in het zoekveld hierboven te typen.',
  searchTime: 'Resultaten in {time} milliseconden',
  loading: 'Laden...',
  updatedAt: 'Bijgewerkt op {date}',
  footerText: 'Wil je privérepositories doorzoeken?',
  footerText2: 'Maak een persoonlijk GitHub-toegangstoken',
  footerText3: 'en voeg dit toe aan `.env.local`.',
  home: 'Terug naar zoeken',
  license: 'Licentie',
  repoOwnerImage: 'Avatar van repository-eigenaar',
  readme: 'Leesmij',
  stars: 'sterren',
  issues: 'problemen',
  watchers: 'kijkers',
  forks: 'forks',
  repositoriesNotFoundText:
    'We konden geen repository vinden voor deze zoekopdracht.',
  repositoriesError:
    'GitHub-resultaten konden niet geladen worden. Probeer het later opnieuw.',
  repositoryError:
    'Deze repository kon niet geladen worden. Probeer het later opnieuw.',
  previous: 'Vorige',
  next: 'Volgende',
  viewRepository: 'Bekijk {name}',
}

const messages = { en, nl, pt }
type Language = keyof typeof messages
type MessageKey = keyof typeof en

function getLanguage(): Language {
  const language = navigator.language.split(/[-_]/)[0] as Language
  return language in messages ? language : 'en'
}

export function t(
  key: MessageKey,
  values: Record<string, string | number> = {},
) {
  return Object.entries(values).reduce(
    (message, [name, value]) => message.replace(`{${name}}`, value.toString()),
    messages[getLanguage()][key],
  )
}
