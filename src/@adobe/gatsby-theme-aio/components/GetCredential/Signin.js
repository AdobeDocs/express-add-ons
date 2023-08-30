import React, { useContext } from 'react';
import Context from '@adobe/gatsby-theme-aio/src/components/Context';
import { css } from "@emotion/react";
import classNames from "classnames";

const SignIn = ({ signInProps }) => {

  const { ims } = useContext(Context);

  return (
    <>
      <div className={classNames(signInProps?.className)}
        css={css`
          display: flex;
          flex-direction: column;
          gap: 16px;
        `}
      >
        {signInProps?.heading && <h3 className="spectrum-Heading spectrum-Heading--sizeL">{signInProps?.heading}</h3>}
        {signInProps?.text &&
          <p
            className="spectrum-Body spectrum-Body--sizeL"
            css={css`
                width: 50%;
                color: var(--spectrum-dialog-confirm-description-text-color, var(--spectrum-global-color-gray-800));
                @media screen and (min-width:320px) and (max-width:1024px) {
                  width: 100% ;
                }
              `}>
            {signInProps?.text}
          </p>
        }
        {signInProps?.buttonText &&
          <button
            className={`spectrum-Button spectrum-Button--outline spectrum-Button--primary spectrum-Button--sizeM`}
            css={css`width:fit-content;margin-top:10px`}
            onClick={() => ims?.signIn()}>
            <span className="spectrum-Button-label">{signInProps?.buttonText}</span>
          </button>
        }
      </div>
    </>
  )
}

export { SignIn }