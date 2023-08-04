import React from 'react';
import { css } from "@emotion/react";

const APIKey = ({ apiKeyCredential }) => {
  const { title, description, learnMore } = apiKeyCredential;
  return (
    <>
      <div>
        {title && <h4 class="spectrum-Heading spectrum-Heading--sizeXS" css={css`letter-spacing: 1px;`}>{title}</h4>}
        {description && <p class="spectrum-Body spectrum-Body--sizeM">{description}</p>}
        {learnMore &&
          <div
            css={css`
              display : flex;
              flex-direction: column;
              gap:20px;
              `}
          >
            <h4 class="spectrum-Heading spectrum-Heading--sizeXS" css={css`letter-spacing: 1px;margin-bottom: 0;`}>{learnMore?.title}</h4>
            {learnMore?.description &&
              learnMore?.description.map(({ type, label }) => {
                if (type === "text") {
                  return (
                    <div dangerouslySetInnerHTML={{ __html: label }} />
                  )
                }
              })
            }
          </div>
        }
      </div>
    </>
  )
}

export { APIKey }