import GlobalStyles from '../styles/GlobalStyles.astro';
import Brand from '../components/molecules/Brand.astro';
import Header from '../components/organisms/Header.astro';
import Menu from '../components/molecules/Menu.astro';
import ToggleMenu from '../components/molecules/ToggleMenu.tsx';
import Notifications from '../components/molecules/Notifications.astro';
import Footer from '../components/organisms/Footer.astro';
import Copyright from '../components/molecules/Copyright.astro';
import Sidebar from '../components/organisms/Sidebar.tsx';
import Tabbar from '../components/organisms/Tabbar.astro';
import { Astro } from './Layout.astro.tsx';

<Fragment>
<html lang={lang}>
<head>
<meta charset="UTF-8" />
<meta name="description" content={description} />
<meta name="viewport" content="width=device-width" />
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<meta name="generator" content={Astro.generator} />
<title>{title}</title>
<GlobalStyles />
</head>
<body class="font-base text-neutral-800">
<div class="w-full h-screen flex bg-white">
<Sidebar client: load>
<Brand />
<Menu />
</Sidebar>
<div class="w-full flex flex-col justify-between">
<div class="px-8 py-6 bg-white">
<Header>
<ToggleMenu client: load />
<div>David Merino | Armilla Norte</div>
<Notifications />
</Header>
</div>
<div class="flex flex-col justify-between overflow-y-auto w-full h-full mx-auto px-8 py-6 max-w-screen-xl">
<slot />
<div class="mt-10 px-8 py-6">
<Footer>
<Copyright />
</Footer>
</div>
</div>
</div>
<Tabbar>
<Shortcuts />
</Tabbar>
</div>

../components/organisms/Sidebar.tsx../components/molecules/ToggleMenu.tsx
</body></html>
</Fragment>;
