import { GetCredential } from '../@adobe/gatsby-theme-aio/components/GetCredential';
import React from 'react';
import { css } from "@emotion/react";

const GetCredentialExternal = ({ }) => {
  return (
    <GetCredential credentialType="apiKey">
      <GetCredential.SignIn heading="Get Credentials" text="Create unique credentials that you will use to call the Adobe Express Embed SDK from your application." buttonText="Sign in to create credentials" />
      <GetCredential.Form heading="Get Credentials" text="Create unique credentials that you will use to call the Adobe Express Embed SDK from your application.">
        <GetCredential.Form.CredentialName type="credentialName" label="Credential name" description="Credential name must be unique and between 3 and 45 character long." range="30" />
        <GetCredential.Form.AllowedOrigins type="allowedOrigin" label="Allowed Origins" contextHelp={true} contextHelpHeading="What are allowed domains" contextHelpText="To prevent a third party from using your client ID on their own website, the use of your client ID is restricted to a list of domains that you specifically authorize." contextHelpLink="https://www.adobe.com/" contextHelpLabelForLink="Learn more in our documentation" description="Use wildcards to enter multiple subdomains (*my-domains.com) or commas to separete multiple domains (www.domain-1.com,www.domain-2.com). During local development, you can include post greayer than 1023 with localhost (e.g. localhost:3000). Standard ports(80,443) will be used for non-localhost domains." />
        <GetCredential.Form.SelectLanguage type="language" label="Download a personalized code samples" contextHelp={true} contextHelpHeading="Select Language" />
        <GetCredential.Form.Download type="download" name="Java" link="https://some_link" />
        <GetCredential.Form.Download type="download" name=".Net" link="https://some_link" />
        <GetCredential.Form.Download type="download" name="Python" link="/python.zip" />
        <GetCredential.Form.Download type="download" name="Ruby" link="/python.zip" />
        <GetCredential.Form.Side type="side">
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
            <p className="spectrum-Body spectrum-Body--sizeM">Submitting this form created an API Key credential. The API key credential identifies your application to Adobe servers and can help accept or reject requests originating from certian domains.</p>
            <h3
              className="spectrum-Heading spectrum-Heading--sizeS"
              css={css`
                  color:var(--spectrum-global-color-gray-900);
              `}>Learn more</h3>
            <a
              css={css`
                &:hover {
                  color: rgb(2, 101, 220);
                }
                color:	rgb(0, 84, 182);
                `}
              href=''>Authentication documentation</a>
            <a
              css={css`
                &:hover {
                  color: rgb(2, 101, 220);
                }
                color:	rgb(0, 84, 182);
                `}
              href=''>Adobe Express Embed SDK documentation</a>
          </div>
        </GetCredential.Form.Side>
      </GetCredential.Form>
      <GetCredential.UnknownError heading="UnKnown Error" text1="An error has occured when you tried to create a new credential." text2="Please try to submit the form again" helpLink="https://some_help_link" helpLinkText="Get Help" buttonLabel="Try Again" className="unKnownError" />
      <GetCredential.Card heading="Your credential is ready to use" text="Check the downloads section of your browser for the ZIP file, or find it where you save downloads on your machine." nextStepsLabel="Next steps" nextStepsHref="/credentials/nextsteps" devConsoleDirection="project_overview|api_overview|credential_overview" developerConsoleManage="Manage on Developer console" className="card_developer_console">
        <GetCredential.Side type="side">
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
            <p className="spectrum-Body spectrum-Body--sizeM">An API Key credential was created. The API key credential identifies your application to Adobe servers and can help accept or reject request originating from certain domains.</p>
            <h3
              className="spectrum-Heading spectrum-Heading--sizeS"
              css={css`
                  color:var(--spectrum-global-color-gray-900);
              `}>Learn more</h3>
            <a
              css={css`
                &:hover {
                  color: rgb(2, 101, 220);
                }
                color:	rgb(0, 84, 182);
                `}
              href=''>Authentication documentation</a>
            <a
              css={css`
                &:hover {
                  color: rgb(2, 101, 220);
                }
                color:	rgb(0, 84, 182);
                `}
              href=''>Adobe Express Embed SDK documentation</a>
          </div>
        </GetCredential.Side>
      </GetCredential.Card>
      <GetCredential.NoBetaAccessError betaProgramLink="https://some_help_link" betaProgramLinkText="Join Beta program" heading="Get Credentials" text="Join Beta program to get access to the Adobe Express Embed SDK and start creating unique credentials that you will use in your application." />
    </GetCredential>
  )
}

export { GetCredentialExternal };