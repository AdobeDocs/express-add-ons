import React, { useContext } from 'react';
import { css } from "@emotion/react";
import { CreateCredential } from './CreateCredential';
import PropTypes from 'prop-types';
import Context from '@adobe/gatsby-theme-aio/src/components/Context';

const GetCredential = ({ credentials }) => {

  const { ims } = useContext(Context);
  const { signIn } = credentials;

  if (window.adobeIMS?.isSignedInUser()) {
    return <CreateCredential credentials={credentials} />
  }

  return (
    <section
      css={css`
        position: relative;
        background: var(--spectrum-global-color-gray-100); 
        padding: var(--spectrum-global-dimension-size-600) 0 var(--spectrum-global-dimension-size-600) 0;`
      }
    >
      {signIn &&
        <div
          css={css`
            width: 75%;
            margin: auto;
            display: flex;
            flex-direction: column;
            gap: 15px;

            @media screen and (min-width:320px) and (max-width:1024px) {
              width: 90% ;
            }

          `}
        >
          {signIn?.title && <h3 className="spectrum-Heading spectrum-Heading--sizeL">{signIn?.title}</h3>}
          {signIn?.description &&
            <p
              className="spectrum-Body spectrum-Body--sizeL"
              css={css`
                width: 50%;
                color: var(--spectrum-dialog-confirm-description-text-color, var(--spectrum-global-color-gray-800));
                @media screen and (min-width:320px) and (max-width:1024px) {
                  width: 100% ;
                }
              `}>
              {signIn?.description}
            </p>
          }
          {signIn?.buttons &&
            signIn?.buttons.map((button) => {
              return (
                <button
                  className={`spectrum-Button spectrum-Button--outline spectrum-Button--${button?.variant} spectrum-Button--sizeM`}
                  css={css`width:fit-content;margin-top:10px`}
                  onClick={() => ims?.signIn()}>
                  <span className="spectrum-Button-label">{button?.label}</span>
                </button>
              )
            })
          }
        </div>
      }
    </section>
  )
};

GetCredential.propTypes = {
  credentialType: PropTypes.string,
}

export { GetCredential };
