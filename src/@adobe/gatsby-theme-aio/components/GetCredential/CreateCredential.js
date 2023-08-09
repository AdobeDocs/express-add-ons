
import React, { useState } from 'react';
import { css } from "@emotion/react";
import Loading from './Loading';
import { APIKey } from './APIKey';
import { ChangeOrganization } from './ChangeOrganization';
import { Tryagain } from './Tryagain';
import HelpOutline from "./HelpOutline.svg"

const CreateCredential = ({ credentials }) => {

  const { createCredentials, apiKeyCredential } = credentials;
  const [checkStatus, setCheckStatus] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [disable, setDisable] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [error, setError] = useState(false)

  const openDialog = () => {
    setModalOpen(true);
  };

  const closeDialog = () => {
    setModalOpen(false);
    setError(true)
  };

  const handleSave = () => {
    setToastVisible(true);
  };

  return (
    <>
      {createCredentials && !isLoading && !error &&
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
          {createCredentials?.title && <h3 className="spectrum-Heading spectrum-Heading--sizeL">{createCredentials?.title}</h3>}
          {createCredentials?.description &&
            <p
              className="spectrum-Body spectrum-Body--sizeL"
              css={css`
                width: 50%;
                @media screen and (min-width:320px) and (max-width:1024px) {
                  width: 100% ;
                }
              `}>
              {createCredentials?.description}
            </p>
          }

          <p className="spectrum-Body spectrum-Body--sizeS">You're creating this credential in [<b>Org Name, Inc</b>].
            <span
              css={css`
                margin-left :10px;
                text-decoration:underline;
                color: var(--spectrum-global-color-gray-800);
                cursor:pointer;`
              }
              onClick={openDialog} >
              Change organization?
            </span>
          </p>

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
                  display:flex;
                  gap:30px;
                  flex-direction:column;
                  width: 100%;
                `}
              >
                {createCredentials?.fields &&
                  createCredentials?.fields.map(({ type, label, letters, helperText, options, placeholder }, index) => {
                    return (
                      <>

                        {type.startsWith("text") &&

                          <div css={css`display:flex;flex-direction:column`}>
                            <div className="spectrum-Textfield spectrum-Textfield--sizeM"
                              css={css`
                                width:92%;
                                display:flex;
                                justify-content:space-between;
                                `
                              }>

                              <label for="textfield-m" className="spectrum-FieldLabel spectrum-FieldLabel--sizeM"
                                css={css`
                                  color:var(--spectrum-dialog-confirm-description-text-color, var(--spectrum-global-color-gray-700))
                                `}>
                                {label}
                              </label>

                              <span id="character-count-2" className="spectrum-Textfield-characterCount"
                                css={css`
                                  color:var(--spectrum-dialog-confirm-description-text-color, var(--spectrum-global-color-gray-700))
                                `}>
                                {letters}
                              </span>

                            </div>

                            {type === "textBox" &&
                              <input type="text"
                                css={css`
                                  width:90%;
                                  padding: 7px;
                                  border-radius: 3px;
                                  border: 1px solid #D0D0D0 !important;
                                `}
                              />
                            }

                            {type === "textArea" &&
                              <div
                                css={css`
                                  display:flex;
                                  align-items: center;
                                  width:96%;
                                  gap: 8px;
                                `}
                              >
                                <textarea
                                  css={css`
                                  flex: 1;
                                  padding: 7px;
                                  height: 50px;
                                  border-radius: 3px;
                                  border: 1px solid #D0D0D0 !important;
                                  resize: none; 
                                  width: 90%;
                                `}
                                ></textarea>
                                <div
                                  css={css`
                                    cursor:pointer;
                                  `}
                                >
                                  <img src={HelpOutline} />
                                </div>
                              </div>
                            }

                            <div className="spectrum-HelpText spectrum-HelpText--sizeM spectrum-HelpText--neutral">
                              <p className="spectrum-Body spectrum-Body--sizeXS"
                                css={css`
                                  width: 90%;
                                  color:var(--spectrum-dialog-confirm-description-text-color, var(--spectrum-global-color-gray-700))
                               `}>{helperText}</p>
                            </div>
                          </div>
                        }

                        {type === "checkbox" &&
                          <div css={css`
                            display: flex;
                            gap: 10px;
                          `}>
                            <input type="checkbox" id={index} onChange={(e) => index === 2 && setCheckStatus(e.target.checked)}></input>
                            <div
                              dangerouslySetInnerHTML={{ __html: label }}
                              css={css`
                                color:var(--spectrum-dialog-confirm-description-text-color, var(--spectrum-global-color-gray-800));

                                & > a{
                                  color:rgb(0, 84, 182);
                                }

                                & > a:hover {
                                  color: rgb(2, 101, 220);
                                }

                              `} />
                            <div
                              css={css`
                                cursor:pointer;
                              `}
                            >
                              <img src={HelpOutline} />
                            </div>
                          </div>
                        }

                        {type === "selectbox" && checkStatus ? (
                          <div css={css`display:${checkStatus ? "flex" : "none"};flex-direction:column;`}>
                            <label
                              htmlFor="textfield-m"
                              className="spectrum-FieldLabel spectrum-FieldLabel--sizeM"
                              css={css`
                                color:var(--spectrum-dialog-confirm-description-text-color, var(--spectrum-global-color-gray-700))
                              `}
                            >
                              {label}
                            </label>
                            <select
                              css={css`
                                  font-style: italic;
                                  font-weight: 500;
                                  font-family: 'adobe-clean';
                                  padding: 7px;
                                  border-radius: 3px;
                                  border: 1px solid #D0D0D0 !important;
                                `}
                              value=""
                            >
                              <option value="" disabled hidden>
                                {placeholder}
                              </option>
                              {options.map((option, index) => (
                                <option key={index}>{option}</option>
                              ))}
                            </select>
                          </div>
                        ) : null}

                        {type === "button" &&
                          <button
                            className={`spectrum-Button spectrum-Button--fill spectrum-Button--accent spectrum-Button--sizeM`} disabled={disable}
                            css={css`width:fit-content;margin-top:10px`} onClick={() => { setLoading(true) }}>
                            <span className="spectrum-Button-label">{label}</span>
                          </button>
                        }
                      </>
                    )
                  })
                }
              </div>
            </div>

            <div
              css={css`
                width: 2px; 
                background-color: #D0D0D0; 
            `}
            ></div>

            <div css={css`width:50%`}> <APIKey apiKeyCredential={apiKeyCredential} /></div>

          </div>

          <p className="spectrum-Body spectrum-Body--sizeS"
            css={css`
              color:var(--spectrum-global-color-gray-800);
            `}
          >
            Have existing credentials?
            <a href=""
              css={css`
              margin-left : 10px;
              color:var(--spectrum-global-color-gray-800);

              &:hover {
                color:var(--spectrum-global-color-gray-900);
              }

            `}>
              Go to Developer Console
            </a>
          </p>
        </div>
      }

      {isLoading && <Loading credentials={credentials} />}
      {modalOpen && <ChangeOrganization onClose={closeDialog} onSave={handleSave} />}
      {error && <Tryagain credentials={credentials} />}
    </>
  )
}

export { CreateCredential }