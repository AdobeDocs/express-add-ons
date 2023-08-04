import React, { useState } from 'react';
import { css } from "@emotion/react";
import { CreateCredential } from './CreateCredential';

const GetCredential = ({
  credentials
}) => {

  const { signIn, } = credentials;
  const [createCredential, setCreateCredential] = useState(false);

  console.log('createCredential', createCredential)

  return (
    <section
      css={css`
        position: relative;
        background: var(--spectrum-global-color-gray-100); 
        padding: var(--spectrum-global-dimension-size-600) 0 var(--spectrum-global-dimension-size-600) 0;`
      }
    >
      {signIn && !createCredential &&
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
                // <a href={button?.link}>
                <button
                  className={`spectrum-Button spectrum-Button--outline spectrum-Button--${button?.variant} spectrum-Button--sizeM`}
                  css={css`width:fit-content;margin-top:10px`}
                  onClick={() => setCreateCredential(true)}>
                  <span className="spectrum-Button-label">{button?.label}</span>
                </button>
                // </a>
              )
            })
          }
        </div>
      }

      {createCredential && <CreateCredential credentials={credentials} />}
    </section>
  )
}

export { GetCredential }