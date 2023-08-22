
import React from 'react';
import { css } from "@emotion/react";

const GetCredentialExternal = ({ }) => {
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
          <h3
            className="spectrum-Heading spectrum-Heading--sizeS"
            css={css`
              color:var(--spectrum-global-color-gray-900);
            `}>API key credential</h3>
          <p class="spectrum-Body spectrum-Body--sizeM">Submitting this form creates an API Key credential. The API key credential identifies your application to Adobe servers and can help accept or reject requests originating from certain domains.</p>
        </div>
        <div
          css={css`
            margin-top:32px;
          `}
        >
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
              `}>Learn more</h3>
            <a href=""
              css={css`
                color:rgb(20, 122, 243);

                & > a{
                  color:rgb(20, 122, 243);
                }

                & > a:hover {
                  color: rgb(2, 101, 220);
                }

              `}
            >Authentication documentation</a>
            <a href=""
              css={css`
                color:rgb(20, 122, 243);

                & > a{
                  color:rgb(20, 122, 243);
                }

                & > a:hover {
                  color: rgb(2, 101, 220);
                }

              `}
            >Adobe Express Embed SDK documentation</a>
          </div>
        </div>
      </div>
      
    </>
  )
}

export { GetCredentialExternal };