import React from 'react'
import { css } from "@emotion/react";
import { APIKey } from './APIKey';

const MyNewCredential = ({ credentials }) => {

  const { myNewCredential } = credentials

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
        {myNewCredential?.title && <h3 className="spectrum-Heading spectrum-Heading--sizeL">{myNewCredential?.title}</h3>}
        {myNewCredential?.description &&
          <p
            className="spectrum-Body spectrum-Body--sizeL"
            css={css`
                width: 50%;
                @media screen and (min-width:320px) and (max-width:1024px) {
                  width: 100% ;
                }
              `}>
            {myNewCredential?.description}
          </p>
        }
        <p className="spectrum-Body spectrum-Body--sizeS">Download not working?<a href="" css={css`margin-left : 10px`}>Restart download</a></p>
        <div
          css={css`
              display:flex;
              gap: 35px;
          `}
        >
          <div
            css={css`
              display:flex;
              flex-direction : column;
              gap: 35px;
              width:50%;
              `}
          >
            <div
              css={css`
                  background: white;
                  border-radius: 10px;
                  box-shadow: 0 9px 15px 5px #e6e6e6!important;
                  width: 90%;
                `}
            >
              <div
                css={css`
                padding: 5%;
                display:flex;
                flex-direction:column;
                gap:20px;
              `}
              >
                <h2 className="spectrum-Heading spectrum-Heading--sizeL">MyNewCredential</h2>
                <hr
                  css={css`
                  margin:0;
                  border: none;
                  border-top: 1px solid #D0D0D0 !important;
                `}
                />
                <div
                  css={css`
                    display:flex;
                    flex-direction:column;
                    gap:10px;
                  `}
                >
                  <h4 className="spectrum-Heading spectrum-Heading--sizeS">API Key</h4>
                  <p className="spectrum-Body spectrum-Body--sizeS"
                    css={css`
                      letter-spacing: 1px;
                      font-family: monospace;
                    `}
                  >20fdf910ffe949549a63e2ca6d517376</p>
                </div>
                <div
                  css={css`
                    display:flex;
                    flex-direction:column;
                    gap:5px;
                  `}
                >
                  <h4 className="spectrum-Heading spectrum-Heading--sizeS">Allowed domains</h4>
                  <p className="spectrum-Body spectrum-Body--sizeS"
                    css={css`
                      letter-spacing: 1px;
                      font-family: monospace;
                    `}>*.my-domain.com</p>
                </div>
                <div
                  css={css`
                    display:flex;
                    flex-direction:column;
                    gap:10px;
                  `}
                >
                  <h4 className="spectrum-Heading spectrum-Heading--sizeS" >Organization</h4>
                  <p className="spectrum-Body spectrum-Body--sizeS"
                    css={css`
                      letter-spacing: 1px;
                      font-family: monospace;
                   `}>Nike Inc.</p>
                </div>
                <button
                  className={`spectrum-Button spectrum-Button--outline spectrum-Button--primary spectrum-Button--sizeM`}
                  css={css`width:fit-content;margin-top:10px`}>
                  <span className="spectrum-Button-label">{myNewCredential?.developerConsole}</span>
                </button>
              </div>
            </div>
            <div
              css={css`
                  padding: 4% 5%;
                  display:flex;
                  flex-direction:column;
                  gap:8px;
                  box-shadow: 0 9px 15px 5px #e6e6e6!important;
                  border-radius: 10px;
                  background: white;
                  width: 80%;
                `}
            >
              <h4 className="spectrum-Heading spectrum-Heading--sizeXS" >Need another credential</h4>
              <p className="spectrum-Body spectrum-Body--sizeS"><a href="">Restart and create a new credential</a></p>
            </div>
          </div>

          <div
            css={css`
                width: 2px; 
                background-color: #D0D0D0; 
            `}
          ></div>
          <div css={css`width:50%`}>
            <APIKey apiKeyCredential={myNewCredential?.apiKeyCredential} />
          </div>
        </div>
      </div>
    </>
  )
}

export default MyNewCredential