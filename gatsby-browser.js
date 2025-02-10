const isBrowser = typeof window !== "undefined";

export const onRouteUpdate = () => {
  if (isBrowser) {
    const button = document.querySelector('a[aria-label="Explore add-ons"]');
    if (button) {
      button.removeAttribute('target')
    }
  }
}
