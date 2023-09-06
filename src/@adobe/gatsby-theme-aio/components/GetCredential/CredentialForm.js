import React, { useEffect, useState } from 'react';
import { css } from "@emotion/react";
import '@spectrum-css/contextualhelp/dist/index-vars.css';
import classNames from "classnames";
import { MyCredential } from './MyCredential';
import { Loading } from "./Loading";
import { IllustratedMessage } from "./IllustratedMessage";
import { ChangeOrganization } from './ChangeOrganization';
import { JoinBetaProgram } from './JoinBetaProgram';
import { AlertIcon, CommonFields, downloadAndModifyZip, MAX_TABLET_SCREEN_WIDTH, MIN_MOBILE_WIDTH } from './CommonFields';
import { ContextHelp } from './ContextHelp';
import { Toast } from './Toast';

const CredentialForm = ({ formProps }) => {

  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [response, setResponse] = useState({});
  // check the localstorage if you already have previous credentials and then choose what need to select
  const [showCreateForm, setShowCreateForm] = useState(true);
  const [showCredential, setShowCredential] = useState(false);
  const [formField, setFormField] = useState([]);
  const [formData, setFormData] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [redirectToBeta, setRedirectBetaProgram] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [alertShow, setAlertShow] = useState(false);
  const [organizationChange, setOrganization] = useState(false);
  const [pickData, setPickedOption] = useState('');

  const credentialForm = formProps?.CredentialForm;
  const isFormValue = credentialForm?.children?.filter(data => Object.keys(data.props).some(key => key.startsWith('contextHelp')));

  useEffect(() => {
    if (showCreateForm) setIsError(false);
  }, [showCreateForm])

  useEffect(() => {

    const fields = [];
    const downloadObj = { label: "Language", selectOptions: [] };

    credentialForm?.children.forEach(({ type, props }) => {
      if (type?.name === "Downloads" && props?.children) {
        if (props?.required) {
          downloadObj.required = true
        }
        props.children.forEach(({ props: { title, href } }) => downloadObj.selectOptions.push({ title, href }));
      }
      fields.push({ [type?.name]: props });
    });

    downloadObj.selectOptions.length && fields.push({ Download: downloadObj });
    setFormField(fields);
    setFormData(fields.reduce((obj, data) => ({ ...obj, [Object.keys(data)]: '' }), {}));

  }, []);

  useEffect(() => {
    if (showCreateForm || isError) {
      const updateForm = { ...formData };
      for (const key in updateForm) {
        updateForm[key] = ''
      };
      setFormData(updateForm);
    }
  }, [isError, showCreateForm])

  useEffect(() => {

    const selectedOption = formField.flatMap(({ Download }) => Download?.selectOptions || []).find(option => option?.title === formData['Download']);
    selectedOption && setPickedOption(selectedOption);

    const requiredFields = Array.from(credentialForm?.children || []).filter(child => child?.props?.required).map(child => child.type.name);

    if (requiredFields.includes("Downloads") || formData['Downloads']) {
      requiredFields.push("Download");
    };

    const isValidCredentialName = requiredFields.includes("CredentialName") ? /^(?=[A-Za-z0-9\s]{3,}$)[A-Za-z0-9\s]*$/.test(formData.CredentialName) : true;
    const isAllowedOriginsValid = formData['AllowedOrigins'] ? /^(localhost:\d{1,5}|(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+)$/.test(formData['AllowedOrigins']) : true;

    const isValid = isValidCredentialName && requiredFields.every(field => formData[field]) && formData.Agree === true && isAllowedOriginsValid;

    setIsValid(isValid);

  }, [formData]);

  useEffect(() => {
    setTimeout(() => { setAlertShow(false) }, 8000);
  }, [alertShow])

  const handleChange = (e, type) => {
    const value = (type === "Downloads" || type === "Agree") ? e.target.checked : e.target.value;
    setFormData(prevData => ({ ...prevData, [type]: value }));
  };

  const createCredential = async () => {
    const token = window.adobeIMS?.getTokenFromStorage()?.token;
    if (token) {
      setLoading(true);
      setShowCreateForm(false);
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
        setResponse(result);
        setShowCredential(true);
        setAlertShow(true);
        pickData && downloadAndModifyZip(pickData['href'], result);
      }
      else {
        setIsError(true);
        setAlertShow(true)
      }
      setLoading(false);
    }
    else {
      console.log('User not logged in');
    }
  };

  const sideObject = formField.find(item => 'Side' in item);

  return (
    <>
      {!redirectToBeta && showCreateForm &&
        <div
          className={classNames(credentialForm?.className)}
          css={css`
            display: flex;
            flex-direction: column;
            gap: 16px;
          `}
        >
          {credentialForm?.title && <h3 className="spectrum-Heading spectrum-Heading--sizeL">{credentialForm?.title}</h3>}
          {credentialForm?.paragraph &&
            <p
              className="spectrum-Body spectrum-Body--sizeL"
              css={css`
                width: 50%;
                @media screen and (min-width:${MIN_MOBILE_WIDTH}) and (max-width:${MAX_TABLET_SCREEN_WIDTH}) {
                  width: 100% ;
                }
              `}>
              {credentialForm?.paragraph}
            </p>
          }
          <p
            className="spectrum-Body spectrum-Body--sizeS"
            css={css`color:var(--spectrum-global-color-gray-800);`}
          >You're creating this credential in [<b>Org Name, Inc</b>].
            <span
              css={css`
                margin-left :10px;
                text-decoration:underline;
                color: var(--spectrum-global-color-gray-800);
                cursor:pointer;`
              }
              onClick={() => setModalOpen(true)}
            >
              Change organization?
            </span>
          </p>
          {organizationChange && <Toast alertShow={alertShow} setAlertShow={setAlertShow} message="Organization Changed" />}
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
                {formField.map(({ CredentialName: name, AllowedOrigins: origins, Downloads: downloads, Download: download, Side: side }, index) => {
                  return (
                    <>
                      {!side &&
                        <>
                          {!download ?
                            <div css={css`display:flex;flex-direction:column;width:100%;gap:5px;`}>
                              {name && <CredentialName nameProps={name} isFormValue={isFormValue} formData={formData} handleChange={handleChange} index={index} />}
                              {origins && <AllowedOrigins originsProps={origins} isFormValue={isFormValue} formData={formData} handleChange={handleChange} />}
                              {downloads && <Downloads downloadsProp={downloads} type="Downloads" formData={formData} handleChange={handleChange} />}
                            </div> :
                            <>{formData['Downloads'] && download && <Download downloadProp={download} formData={formData} isFormValue={isFormValue} handleChange={handleChange} />}</>
                          }
                        </>
                      }
                    </>
                  )
                })
                }
                <div css={css`display: flex; gap: 10px;`}>
                  <input type="checkbox" onChange={(e) => handleChange(e, 'Agree')} />
                  <p css={css`color:var(--spectrum-global-color-gray-800);margin:0;`} >{`By checking this box, you agree to `}
                    <a
                      href="https://wwwimages2.adobe.com/content/dam/cc/en/legal/servicetou/Adobe-Developer-Additional-Terms_en-US_20230822.pdf"
                      css={css`
                        color:rgb(0, 84, 182);
                        &:hover {
                          color: rgb(2, 101, 220);
                        }
                      `}
                      target="_blank">  Adobe Developer Terms of Use</a>.
                  </p>
                </div>
                <button
                  id="credentialButton"
                  className={`spectrum-Button spectrum-Button--fill spectrum-Button--accent spectrum-Button--sizeM`}
                  css={css`width:fit-content;margin-top:10px`} onClick={createCredential} disabled={!isValid} >
                  <span className="spectrum-Button-label">Create credential</span>
                </button>
              </div>
            </div>
            {sideObject ? <SideContent sideContent={sideObject?.Side?.children} /> : null}
          </div>
          <p className="spectrum-Body spectrum-Body--sizeS" css={css` color:var(--spectrum-global-color-gray-800); `} >
            Have existing credentials?
            <a href="https://developer.adobe.com/console/"
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


      {alertShow &&
        <>
          {!organizationChange ? (
            <Toast
              alertShow={alertShow}
              setAlertShow={setAlertShow}
              message={isError && !showCredential ? `Unable to create credential. Error <code>:<error text>. Please try to submit the form again` : !isError && showCredential && `Your credentials were created successfully.`}
              error={isError}
            />) :
            <Toast alertShow={alertShow} setAlertShow={setAlertShow} message={"Organization changed"} />
          }
        </>
      }
      {loading && !showCredential && <Loading credentials={credentialForm} />}
      {modalOpen && (
        <ChangeOrganization
          setModalOpen={setModalOpen}
          redirectToBeta={redirectToBeta}
          setRedirectBetaProgram={setRedirectBetaProgram}
          setAlertShow={setAlertShow}
          alertShow={alertShow}
          organizationChange={organizationChange}
          setOrganization={setOrganization}
        />
      )}
      {isError && <IllustratedMessage setShowCreateForm={setShowCreateForm} errorMessage={formProps?.IllustratedMessage} />}
      {showCredential && !showCreateForm && <MyCredential credentialProps={formProps} response={response} credentialName={formData['CredentialName']} allowedOrigins={formData['AllowedOrigins']} setShowCreateForm={setShowCreateForm} />}
      {redirectToBeta && <JoinBetaProgram joinBeta={formProps?.JoinBetaProgram} />}
    </>
  )
}

const Side = ({ side }) => (side);

const CredentialName = ({ nameProps, isFormValue, formData, handleChange, index }) => {
  const isRed = formData["CredentialName"]?.length < 3 && formData["CredentialName"]?.length !== 0 ? "rgb(211, 21, 16)" : "var(--spectrum-global-color-gray-400)";
  return (
    <CommonFields isFormValue={isFormValue} fields={nameProps} formData={formData} index={index} >
      <div css={css`position:relative; display:inline-block; width: 100%`}>
        <input
          type="text"
          css={css`
            padding: 7px;
            border-radius: 3px;
            width: 97%;
            border: 1px solid ${isRed};
             &::placeholder {
               font-style: italic; 
               color: var(--spectrum-global-color-gray-400); 
              }
             &:focus {
              outline: none;
              border-color: ${isRed};
            }
          `}
          value={formData["CredentialName"]}
          onChange={(e) => handleChange(e, "CredentialName")}
          placeholder={nameProps?.placeholder}
          maxLength={nameProps?.range}
        />
        <span css={css`display : ${formData["CredentialName"]?.length < 3 && formData["CredentialName"]?.length !== 0 ? "block" : "none"}`}><AlertIcon /></span>
      </div>
    </CommonFields>
  )
}

const AllowedOrigins = ({ originsProps, isFormValue, type, formData, handleChange }) => {
  return (
    <CommonFields isFormValue={isFormValue} fields={originsProps} type={type} formData={formData} >
      <textarea
        css={css`
          flex: 1;
          padding: 7px;
          height: 50px;
          border-radius: 3px;
          border: 1px solid #D0D0D0 !important;
          resize: none; 
          width: 90%;
          color: #4b4b4b;
          font-family: adobe-clean, Helvetica, Arial, sans-serif;
          &::placeholder {
            color:var(--spectrum-global-color-gray-600);
            font-style: italic;
          }
          &:hover {
            &::placeholder {
              color:var(--spectrum-global-color-gray-800);
            }
          }
        `}
        placeholder={originsProps?.placeholder}
        onChange={(e) => handleChange(e, "AllowedOrigins")}
      ></textarea>
    </CommonFields>
  )
}

const Downloads = ({ downloadsProp, handleChange }) => {
  const { label, contextHelpLabelForLink, contextHelpLink, contextHelpText, contextHelp, contextHelpHeading } = downloadsProp;

  return (
    <div css={css` display: flex;gap: 10px;align-items: center;`}>
      <input type="checkbox" onChange={(e) => handleChange(e, "Downloads")} />
      <p css={css` color:var(--spectrum-dialog-confirm-description-text-color, var(--spectrum-global-color-gray-800));margin:0;`} > {label} </p>
      <div css={css`cursor:pointer;display: flex;justify-content: center;align-items: center;`}>
        {contextHelp && <ContextHelp heading={contextHelpHeading} text={contextHelpText} link={contextHelpLink} label={contextHelpLabelForLink} />}
      </div>
    </div>
  )
}

const Download = ({ downloadProp, formData, isFormValue, handleChange }) => {
  return (
    <CommonFields isFormValue={isFormValue} fields={downloadProp}>
      <select
        css={css`
          font-style: italic;
          font-weight: 500;
          font-family: 'adobe-clean';
          padding: 7px;
          border-radius: 3px;
          border: 1px solid #D0D0D0 !important;
          width:100%;
        `}
        id="selectBox"
        value={formData['Download']}
        onChange={(e) => handleChange(e, "Download")}
      >
        <option value="" hidden>Select language for your code pickData</option>
        {downloadProp?.selectOptions?.map((option, index) => (
          <option key={index} data-link={option.href} value={option.title} >{option.title}</option>
        ))}
      </select>
    </CommonFields>

  )
}

const SideContent = ({ sideContent }) => {
  return (
    <>
      <div
        css={css`
          width: 2px; 
          background-color: #D0D0D0; 

          @media screen and (min-width:${MIN_MOBILE_WIDTH}) and (max-width:${MAX_TABLET_SCREEN_WIDTH}){
            display:none;
          }

        `}
      />
      <div
        css={css`
          width:50%;
 
          @media screen and (min-width:${MIN_MOBILE_WIDTH}) and (max-width:${MAX_TABLET_SCREEN_WIDTH}){
            width:100%;
          }

        `}>
        <Side side={sideContent} />
      </div>
    </>
  )
}

export { CredentialForm, Side, CredentialName, AllowedOrigins, Downloads, Download, SideContent };
