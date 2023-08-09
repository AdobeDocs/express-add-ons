import React from 'react';
import { css } from "@emotion/react";

const BetaProgram = ({ credentials }) => {

  const { betaProgram } = credentials;

  return (
    <>
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
        {betaProgram?.title && <h3 className="spectrum-Heading spectrum-Heading--sizeL" >{betaProgram?.title}</h3>}
        {betaProgram?.description &&
          <p
            className="spectrum-Body spectrum-Body--sizeM"
            dangerouslySetInnerHTML={{ __html: betaProgram?.description }}
            css={css`
                width: 50%;
                color: var(--spectrum-dialog-confirm-description-text-color, var(--spectrum-global-color-gray-800));
                @media screen and (min-width:320px) and (max-width:1024px) {
                  width: 100% ;
                }
                `}></p>
        }
        <div>
          {betaProgram?.link && <p className="spectrum-Body spectrum-Body--sizeM"
            css={css`
              & > a{
                color:rgb(0, 84, 182);
              }

              & > a:hover {
                color: rgb(2, 101, 220);
              }`
            }
            dangerouslySetInnerHTML={{ __html: betaProgram?.link }} />}
          {betaProgram?.info && <p className="spectrum-Body spectrum-Body--sizeM"
            css={css`
              padding-top:50px;
            `}
            dangerouslySetInnerHTML={{ __html: betaProgram?.info }} />}
          {betaProgram?.instruction && <p className="spectrum-Body spectrum-Body--sizeM" dangerouslySetInnerHTML={{ __html: betaProgram?.instruction }} />}
        </div>
        {betaProgram?.buttons &&
          betaProgram?.buttons.map((button) => {
            return (
              <button
                className={`spectrum-Button spectrum-Button--outline spectrum-Button--${button?.variant} spectrum-Button--sizeM`}
                css={css`width:fit-content;margin-top:10px`}>
                <span className="spectrum-Button-label">{button?.label}</span>
              </button>
            )
          })
        }
      </div>
    </>
  )
}

export { BetaProgram }