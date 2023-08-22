import React, { useContext } from 'react';
import Context from '@adobe/gatsby-theme-aio/src/components/Context';
import { css } from "@emotion/react";

const SignIn = ({ signIn }) => {

  const { ims } = useContext(Context);

  return (
    <>
      {signIn?.title && <h3 className="spectrum-Heading spectrum-Heading--sizeL">{signIn?.title}</h3>}
      {signIn?.paragraph &&
        <p
          className="spectrum-Body spectrum-Body--sizeL"
          css={css`
                width: 50%;
                color: var(--spectrum-dialog-confirm-description-text-color, var(--spectrum-global-color-gray-800));
                @media screen and (min-width:320px) and (max-width:1024px) {
                  width: 100% ;
                }
              `}>
          {signIn?.paragraph}
        </p>
      }
      {signIn?.buttonText &&
        <button
          className={`spectrum-Button spectrum-Button--outline spectrum-Button--primary spectrum-Button--sizeM`}
          css={css`width:fit-content;margin-top:10px`}
          onClick={() => ims?.signIn()}>
          <span className="spectrum-Button-label">{signIn?.buttonText}</span>
        </button>
      }
    </>
  )
}

export { SignIn }