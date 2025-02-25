const isBrowser = typeof window !== "undefined";

export const onRouteUpdate = () => {
  if (isBrowser) {
    const button = document.querySelector('a[aria-label="Explore add-ons"]');
    if (button) {
      button.removeAttribute('target')
    }
    const isChildNav = document.querySelector('#gatsby-focus-wrapper>div>div:first-child>div:nth-child(2)');
    if(isChildNav){
      isChildNav.classList.add('side-nav-content')
    }
  }
}
