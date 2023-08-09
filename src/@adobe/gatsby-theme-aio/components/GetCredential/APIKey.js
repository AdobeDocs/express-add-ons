import React from 'react';
import { css } from "@emotion/react";

const APIKey = ({ apiKeyCredential }) => {

  return (
    <>
      <div>
        <div
          css={css`
            display:flex;
            gap:16px;
            flex-direction:column;
          `}
        >
          {apiKeyCredential?.title &&
            <h3
              className="spectrum-Heading spectrum-Heading--sizeS"
              css={css`
              color:var(--spectrum-global-color-gray-900);
            `}>{apiKeyCredential?.title}</h3>}
          {apiKeyCredential?.description && <p class="spectrum-Body spectrum-Body--sizeM">{apiKeyCredential?.description}</p>}
        </div>
        <div
          css={css`
            margin-top:32px;
          `}
        >
          {apiKeyCredential?.learnMore &&
            <div
              css={css`
              display : flex;
              flex-direction: column;
              gap:16px;
              `}
            >
              <h3
                className="spectrum-Heading spectrum-Heading--sizeS"
                css={css`
                  color:var(--spectrum-global-color-gray-900);
                `}>{apiKeyCredential?.learnMore?.title}</h3>
              {apiKeyCredential?.learnMore?.description &&
                apiKeyCredential?.learnMore?.description.map(({ link, label }) => {
                  return (
                    <a
                      css={css`
                      
                      &:hover {
                        color: rgb(2, 101, 220);
                      }
                      color:	rgb(0, 84, 182);
                      `}
                      href={link}>{label}</a>
                  )
                })
              }
            </div>
          }
        </div>
      </div>
    </>
  )
}

export { APIKey }