import { ComponentChildren, Fragment, h } from 'preact';

const cssStyles: string[] = [];
export function registerCss(css: string) {
  cssStyles.push(css);
}

export function CssProvider({ children }: { children: ComponentChildren }) {
  return (
    <Fragment>
      <style lang="css">{cssStyles.join('\n')}</style>
      {children}
    </Fragment>
  );
}
