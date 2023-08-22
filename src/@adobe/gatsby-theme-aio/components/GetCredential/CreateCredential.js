import React, { useEffect, useState } from 'react';
import { css } from "@emotion/react";
import '@spectrum-css/contextualhelp/dist/index-vars.css';
import { ContextHelp } from './ContextHelp';
import { Loading } from "./Loading"
import classNames from "classnames";
import { MyCredential } from './MyCredential';

const MIN_MOBILE_WIDTH = "320px";
const MAX_TABLET_SCREEN_WIDTH = "1024px";

const CreateCredential = ({
  credentialItems
}) => {

  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState();
  const [showCredential, setShowCredential] = useState(false)

  const credentials = credentialItems?.credentialForm?.props;
  const formValue = credentials?.formBuilder;
  const isFormValue = formValue?.filter(data => data.contextHelp);

  const handleCreate = () => {
    setLoading(true);
    createCredential();
  }

  const createCredential = async () => {
    const token = window.adobeIMS?.getTokenFromStorage()?.token;
    if (token) {
      const data = {
        name: Date.now().toString(),
        platform: 'apiKey',
        description: 'created for get credential'
      };
      const response = await fetch("/console/api/organizations/220657/integrations/adobeid", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token,
          "x-api-key": "UDPWeb1"
        },
        body: JSON.stringify(data),
      });

      if (response.status === 200) {
        const result = await response.json();
        setResponse(result)
      }
    }
    else {
      console.log('User not logged in');
    }
  }

  useEffect(() => {
    if (response) {
      setLoading(false);
      setShowCredential(true)
    }
  }, [response])

  return (
    <>
      {!loading && !showCredential &&
        <div
          className={classNames(credentials?.className)}
          css={css`
            display: flex;
            flex-direction: column;
            gap: 16px;
          `}
        >
          {credentials?.title && <h3 className="spectrum-Heading spectrum-Heading--sizeL">{credentials?.title}</h3>}
          {credentials?.paragraph &&
            <p
              className="spectrum-Body spectrum-Body--sizeL"
              css={css`
                width: 50%;
                @media screen and (min-width:320px) and (max-width:1024px) {
                  width: 100% ;
                }
              `}>
              {credentials?.paragraph}
            </p>
          }
          <p className="spectrum-Body spectrum-Body--sizeS"
            dangerouslySetInnerHTML={{ __html: credentials?.changeOrganization }}
            css={css`
              color:(--spectrum-global-color-gray-800);

              & > a{
                color: var(--spectrum-global-color-gray-800);
                margin-left:10px;
              }
              
              & > a:hover {
                color: var(--spectrum-global-color-gray-900);
              }
            
            `}
          />
          <div
            css={css`
              display:flex;
              gap: 35px;

              @media screen and (min-width:${MIN_MOBILE_WIDTH}) and (max-width:${MAX_TABLET_SCREEN_WIDTH}){
                flex-direction : column;
              }

            `}
          >
            <div
              css={css`
                display:flex;
                flex-direction : column;
                gap: 35px;
                width:50%;

                @media screen and (min-width:${MIN_MOBILE_WIDTH}) and (max-width:${MAX_TABLET_SCREEN_WIDTH}){
                  width:100%;
                }

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
                {formValue &&
                  formValue?.map(({ type, label, range, description, options, placeholder, contextHelp, buttonLabel, classname }, index) => {
                    return (
                      <>
                        {type !== "checkbox" && type !== "radio" ?
                          <div css={css`display:flex;flex-direction:column;width:100%;gap:5px;`} className={classNames(classname)}>
                            <div className="spectrum-Textfield spectrum-Textfield--sizeM"
                              css={css`
                                display:flex;
                                justify-content:space-between;
                                position:relative;
                                width: ${isFormValue.length ? "95%" : "100%"};  
                                `
                              }>

                              {label && <label for="textfield-m" className="spectrum-FieldLabel spectrum-FieldLabel--sizeM"
                                css={css`
                                  color:var(--spectrum-dialog-confirm-description-text-color, var(--spectrum-global-color-gray-700))
                                `}>
                                {label}
                              </label>}

                              {range && <span id="character-count-2" className="spectrum-Textfield-characterCount"
                                css={css`
                                  color:var(--spectrum-dialog-confirm-description-text-color, var(--spectrum-global-color-gray-700))
                                `}>
                                {range}
                              </span>}

                            </div>
                            {type &&
                              <div css={css`
                                display: flex;
                                justify-content: space-between;
                                align-items: center;
                                gap:10px;
                              `}>
                                {type === "textBox" &&
                                  <input type="text"
                                    css={css`
                                      padding: 7px;
                                      border-radius: 3px;
                                      width:100%;
                                      border: 1px solid #D0D0D0 !important;
                                    `}
                                    maxLength={range}
                                  />
                                }
                                {type === "textArea" &&
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
                                }
                                {type === "selectbox" &&
                                  <select
                                    css={css`
                                      font-style: italic;
                                      font-weight: 500;
                                      font-family: 'adobe-clean';
                                      padding: 7px;
                                      border-radius: 3px;
                                      width: 100%;
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
                                }
                                {isFormValue.length ?
                                  <div
                                    css={css`
                                      cursor:pointer;
                                      width:20px;
                                      height:20px;
                                    `}
                                  >
                                    {contextHelp && <ContextHelp content={contextHelp} index={index} formValue={formValue} />}
                                  </div> : null
                                }

                              </div>
                            }
                            {description && <div className="spectrum-HelpText spectrum-HelpText--sizeM spectrum-HelpText--neutral">
                              <p className="spectrum-Body spectrum-Body--sizeXS"
                                css={css`
                                  color:  var(--spectrum-global-color-gray-700);
                                  width: ${isFormValue.length ? "95%" : "100%"};
                                `}>
                                {description}
                              </p>
                            </div>
                            }
                            {buttonLabel &&
                              <button
                                className={`spectrum-Button spectrum-Button--fill spectrum-Button--accent spectrum-Button--sizeM`}
                                css={css`width:fit-content;margin-top:10px`}
                                onClick={handleCreate}
                              >
                                <span className="spectrum-Button-label">{buttonLabel}</span>
                              </button>
                            }
                            { }
                          </div>
                          :
                          <>
                            <div className={classNames(classname)} css={css`
                            display: flex;
                            gap: 10px;
                            align-items: center;
                            flex-wrap: wrap;
                          `}>
                              {label.map((data, inx) => {
                                return (
                                  <div css={css`display: flex; gap: 10px;`}>
                                    {type === "checkbox" && <input type="checkbox" id={inx}></input>}
                                    {type === "radio" && <input type="radio" id={inx} name="radio_btn"></input>}
                                    <div
                                      dangerouslySetInnerHTML={{ __html: data }}
                                      css={css`
                                        color:var(--spectrum-dialog-confirm-description-text-color, var(--spectrum-global-color-gray-800));

                                        & > a{
                                          color:rgb(0, 84, 182);
                                        }
                                        
                                        & > a:hover {
                                          color: rgb(2, 101, 220);
                                        }
                                      
                                      `} />
                                  </div>
                                )
                              })}
                              {isFormValue.length ?
                                <div
                                  css={css`
                                    cursor:pointer;
                                    width:20px;
                                    height:20px;
                                  `}
                                >
                                  {contextHelp && <ContextHelp content={contextHelp} index={index} formValue={formValue} />}
                                </div> : null
                              }
                            </div>
                          </>
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

                @media screen and (min-width:${MIN_MOBILE_WIDTH}) and (max-width:${MAX_TABLET_SCREEN_WIDTH}){
                  display:none;
                }

              `}
            ></div>
            <div
              css={css`
                width:50%;
                
                @media screen and (min-width:${MIN_MOBILE_WIDTH}) and (max-width:${MAX_TABLET_SCREEN_WIDTH}){
                  width:100%;
                }
                
              `}>
              <Side side={credentials?.children?.props} />
            </div>
          </div>
          <p className="spectrum-Body spectrum-Body--sizeS"
            dangerouslySetInnerHTML={{ __html: credentials?.developerConsole }}
            css={css`
              color:(--spectrum-global-color-gray-800);

              & > a{
                color: var(--spectrum-global-color-gray-800);
                margin-left:10px;
              }
              
              & > a:hover {
                color: var(--spectrum-global-color-gray-900);
              }
            
            `}
          />
        </div>
      }
      {loading && <Loading credentials={credentials} />}
      {!loading && showCredential && <MyCredential credentialItems={credentialItems} response={response} />}
    </>
  )
}

const Side = ({ side }) => (side?.children);

export { CreateCredential, Side };