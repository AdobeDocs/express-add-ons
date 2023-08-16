import React, { useState } from 'react'
import { css } from "@emotion/react";
import { APIKey } from './APIKey';

const CopyIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 0 18 18" width="18">
      <rect id="Canvas" fill="#ff13dc" opacity="0" width="18" height="18" /><rect class="fill" height="1" rx="0.25" width="1" x="16" y="11" />
      <rect class="fill" height="1" rx="0.25" width="1" x="16" y="9" />
      <rect class="fill" height="1" rx="0.25" width="1" x="16" y="7" />
      <rect class="fill" height="1" rx="0.25" width="1" x="16" y="5" />
      <rect class="fill" height="1" rx="0.25" width="1" x="16" y="3" />
      <rect class="fill" height="1" rx="0.25" width="1" x="16" y="1" />
      <rect class="fill" height="1" rx="0.25" width="1" x="14" y="1" />
      <rect class="fill" height="1" rx="0.25" width="1" x="12" y="1" />
      <rect class="fill" height="1" rx="0.25" width="1" x="10" y="1" />
      <rect class="fill" height="1" rx="0.25" width="1" x="8" y="1" />
      <rect class="fill" height="1" rx="0.25" width="1" x="6" y="1" />
      <rect class="fill" height="1" rx="0.25" width="1" x="6" y="3" />
      <rect class="fill" height="1" rx="0.25" width="1" x="6" y="5" />
      <rect class="fill" height="1" rx="0.25" width="1" x="6" y="7" />
      <rect class="fill" height="1" rx="0.25" width="1" x="6" y="9" />
      <rect class="fill" height="1" rx="0.25" width="1" x="6" y="11" />
      <rect class="fill" height="1" rx="0.25" width="1" x="8" y="11" />
      <rect class="fill" height="1" rx="0.25" width="1" x="10" y="11" />
      <rect class="fill" height="1" rx="0.25" width="1" x="12" y="11" />
      <rect class="fill" height="1" rx="0.25" width="1" x="14" y="11" />
      <path class="fill" d="M5,6H1.5a.5.5,0,0,0-.5.5v10a.5.5,0,0,0,.5.5h10a.5.5,0,0,0,.5-.5V13H5.5a.5.5,0,0,1-.5-.5Z" />
    </svg>
  )
}

const MyNewCredential = ({ credentials, clientId, apiKey }) => {

  const { myNewCredential } = credentials;
  const [isTooltipOpen, setTooltipOpen] = useState(null);

  const domains = [{ key: "API Key", value: apiKey }, { key: "Allowed domains", value: "*.my-domain.com" }];
  const handleOpen = (index) => {
    setTooltipOpen(index)
  }

  const handleCopy = (value) => {
    navigator.clipboard.writeText(value);
    setTooltipOpen(null);
  };

  return (
    <>
      <div
        css={css`
            width: 75%;
            margin: auto;
            display: flex;
            flex-direction: column;
            gap: 16px;

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
        <p className="spectrum-Body spectrum-Body--sizeS">Download not working?<a href=""
          css={css`
            margin-left: 10px;
            color:rgb(0, 84, 182);
            &:hover {
              color: rgb(2, 101, 220);
            }`
          }>Restart download</a></p>
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
                gap:24px;
              `}
              >
                <div
                  css={css`
                    display:flex;
                    gap:20px;
                    align-items:center;
                  `}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" height="32" viewBox="0 0 18 18" width="32" fill="var(--spectrum-global-color-gray-700)">
                    <rect id="Canvas" fill="var(--spectrum-global-color-gray-700)" opacity="0" width="18" height="18" /><path class="fill" d="M17.761,4.3875,14.53,1.156a.75.75,0,0,0-1.06066-.00034L13.469,1.156,6.5885,8.0365A4.45,4.45,0,0,0,4.5,7.5,4.5,4.5,0,1,0,9,12a4.45,4.45,0,0,0-.5245-2.0665l3.363-3.363,1.87,1.87a.375.375,0,0,0,.53033.00017L14.239,8.4405l1.672-1.672L13.776,4.633l.6155-.6155,2.135,2.1355L17.761,4.918A.37543.37543,0,0,0,17.761,4.3875ZM3.75,14.25a1.5,1.5,0,1,1,1.5-1.5A1.5,1.5,0,0,1,3.75,14.25Z" />
                  </svg>
                  <h3 className="spectrum-Heading spectrum-Heading--sizeM">MyNewCredential</h3>
                </div>
                <hr
                  css={css`
                  margin:0;
                  border: none;
                  border-top: 1px solid #D0D0D0 !important;
                `}
                />
                <div
                  css={css`
                    display: flex;
                    flex-direction: column;
                    gap: 32px;
                  `}
                >
                  {domains.map(({ key, value }, index) => {
                    return (
                      <div
                        css={css`
                          display:flex;
                          flex-direction:column;
                          gap:8px;
                        `}
                      >
                        <h4 className="spectrum-Heading spectrum-Heading--sizeS">{key}</h4>
                        <div
                          css={css` 
                        display:flex;
                        align-items: center;
                        gap: 24px; `}>
                          <p className="spectrum-Body spectrum-Body--sizeS"
                            css={css`
                          letter-spacing: 1px;
                          font-family: monospace;
                        `}
                          >{value}</p>

                          <div css={css`position:relative;`}>
                            <button className="spectrum-ActionButton spectrum-ActionButton--sizeM"
                              onMouseEnter={() => handleOpen(index)}
                              onMouseLeave={() => setTooltipOpen(null)}
                              onClick={() => handleCopy(value)}
                              css={css`
                                border: 1px solid var(--spectrum-global-color-gray-400);
                                border-radius: 3px;
                                padding: 3px 6px;
                              `}
                            >
                              <span className="spectrum-ActionButton-label"><CopyIcon /></span>
                            </button>

                            {isTooltipOpen === index && (
                              <span
                                className="spectrum-Tooltip spectrum-Tooltip--top is-open"
                                css={css`
                                  position: absolute;
                                  bottom: 25px;
                                  top: unset;
                                  white-space: nowrap;
                                `}
                              >
                                <span className="spectrum-Tooltip-label">Copy</span>
                                <span className="spectrum-Tooltip-tip"></span>
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                  <div
                    css={css`
                    display:flex;
                    flex-direction:column;
                    gap:8px;
                  `}
                  >
                    <h4 className="spectrum-Heading spectrum-Heading--sizeS" >Organization</h4>
                    <p className="spectrum-Body spectrum-Body--sizeS"
                      css={css`
                      letter-spacing: 1px;
                      font-family: monospace;
                   `}>Nike Inc.</p>
                  </div>
                  <div
                    css={css`
                    display:flex;
                    gap:24px;
                    align-items: end;
                  `}
                  >
                    <button
                      className={`spectrum-Button spectrum-Button--outline spectrum-Button--primary spectrum-Button--sizeM`}
                      css={css`width:fit-content;margin-top:10px`}>
                      <span className="spectrum-Button-label">{myNewCredential?.nextStep}</span>
                    </button>
                    <a href="" css={css`color:black;`}>{myNewCredential?.developerConsole}</a>
                  </div>
                </div>
              </div>
            </div>
            <div
              css={css`
                  display:flex;
                  flex-direction:column;
                  gap:8px;
                  width: 80%;
                `}
            >
              <h4 className="spectrum-Heading spectrum-Heading--sizeXS" >Need another credential</h4>
              <p className="spectrum-Body spectrum-Body--sizeS"><a href="" css={css`color:black;`}>Restart and create a new credential</a></p>
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