/*
 * Copyright 2023 Adobe. All rights reserved.
 */

import React, { useEffect, useState } from 'react'
import { css } from "@emotion/react";

const InfoIcon = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" height="15" viewBox="0 0 18 18" width="15">
            <defs>
                <style>
                </style>
            </defs>
            <title>S Info 18 N</title>
            <rect id="Canvas" fill="#6E6E6E" opacity="0" width="18" height="18" /><path class="fill" d="M9,1a8,8,0,1,0,8,8A8,8,0,0,0,9,1ZM8.85,3.15a1.359,1.359,0,0,1,1.43109,1.28286q.00352.06452.00091.12914A1.332,1.332,0,0,1,8.85,5.9935a1.3525,1.3525,0,0,1-1.432-1.432A1.3585,1.3585,0,0,1,8.72033,3.14907Q8.78516,3.14643,8.85,3.15ZM11,13.5a.5.5,0,0,1-.5.5h-3a.5.5,0,0,1-.5-.5v-1a.5.5,0,0,1,.5-.5H8V9H7.5A.5.5,0,0,1,7,8.5v-1A.5.5,0,0,1,7.5,7h2a.5.5,0,0,1,.5.5V12h.5a.5.5,0,0,1,.5.5Z" />
        </svg>
    )
}

const AlertIcon = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 0 18 18" width="18" fill="#C9252D">
            <defs>
            </defs>
            <title>S Alert 18 N</title>
            <rect id="Canvas" fill="#ff13dc" opacity="0" width="18" height="18" /><path class="fill" d="M8.5635,1.2895.2,16.256A.5.5,0,0,0,.636,17H17.364a.5.5,0,0,0,.436-.744L9.4365,1.2895a.5.5,0,0,0-.873,0ZM10,14.75a.25.25,0,0,1-.25.25H8.25A.25.25,0,0,1,8,14.75v-1.5A.25.25,0,0,1,8.25,13h1.5a.25.25,0,0,1,.25.25Zm0-3a.25.25,0,0,1-.25.25H8.25A.25.25,0,0,1,8,11.75v-6a.25.25,0,0,1,.25-.25h1.5a.25.25,0,0,1,.25.25Z" />
        </svg>
    )
}

const Credential = () => {

    const [credentials, setCredentials] = useState();
    const [isvalid, setValid] = useState("valid");
    const [isCheck, setIsCheck] = useState(false);
    const [isDisable, setIsDisable] = useState(true)

    useEffect(() => {

        if (!credentials?.length)
            setValid("valid")
        else if (credentials?.length < 6)
            setValid("invalid")
        else
            setValid("valid")

    }, [credentials])

    useEffect(() => {
        if (isCheck) {
            if (credentials?.length >= 6)
                setIsDisable(false)
            else
                setIsDisable(true)
        }
        else
            setIsDisable(true)

    }, [isCheck, credentials])

    return (
        <section
            css={css`
                border : 1px solid var(--spectrum-global-color-gray-300);
                border-radius : 10px;
                width : 65%;
                margin: 2% auto;
            `}
        >
            <div className="spectrum-Textfield"
                css={css`
                    padding: 3%;
                    width: 100%;
                    display : block;
                    text-align : start;
                `}
            >
                <h1 className="spectrum-Heading spectrum-Heading--sizeL">Create new credentials</h1>

                <div className="spectrum-Textfield"
                    css={
                        css`
                        margin-top : 20px;
                        width: 50%;
                        display : block;
                    `
                    }
                >
                    <div
                        css={
                            css`
                            display : flex;
                            justify-content : space-between;
                            margin-bottom : 20px;
                            color: #6E6E6E;
                        `
                        }
                    >
                        <div
                            css={css`display:flex`}
                        >
                            <label for="textfield-1" className="spectrum-FieldLabel spectrum-FieldLabel--sizeM">Credentials Name</label>
                            <div css={
                                css`margin-left: 5px;
                                display: flex;
                                justify-content: center;
                                align-items: center;`}>
                                <InfoIcon />
                            </div>
                        </div>
                        <span id="character-count-6" className="spectrum-Textfield-characterCount">{`${!credentials?.length ? 25 : (credentials?.length === 25) ? 0 : 25 - credentials?.length}`}</span>
                    </div>
                    <div
                        css={css`
                        position: relative
                        `}
                    >
                        <div className={`spectrum-Textfield is-${isvalid} `}
                            css={css`width :100%`}
                        >
                            <input id={`textfield-focused-${isvalid}`} type="text" name="field" class="spectrum-Textfield-input" pattern="[\w\s]+" required placeholder="Provide a unique descriptive name for the credentials" onChange={(e) => setCredentials(e.target.value)} maxLength={25} />
                            <span
                                css={css`
                                    position: absolute;
                                    top: 50%;
                                    right: 10px;
                                    transform: translateY(-50%);
                                    width: 20px; 
                                    height: 20px;
                                    display : ${isvalid === "valid" ? "none" : "block"}
                                `}
                            >
                                <AlertIcon />
                            </span>
                        </div>
                    </div>
                    <div className="spectrum-HelpText spectrum-HelpText--sizeS">
                        <div id="helptext-15" className="spectrum-HelpText-text"
                            css={css`
                                color : #C9252D;
                                display : ${isvalid === "valid" ? "none" : "block"}
                            `}
                        >Credentials name should be between 6 to 25 characters.</div>
                    </div>
                </div>

                <div
                    css={css`
                        display : flex ;
                        gap:10px;
                        margin:2% 0;
                    `}
                >
                    <input type="checkbox" onChange={(e) => setIsCheck(e.target.checked)} />
                    <span>By creating credentials, you are agreeing to our
                        <a href='https://wwwimages2.adobe.com/content/dam/cc/en/legal/servicetou/Adobe-Developer-Additional-Terms_en-US_20230622.pdf'
                            css={css`text-decoration: none;`}
                        > developer terms.</a></span>
                    <span css={
                        css`margin-left: 5px;
                            display: flex;
                            justify-content: center;
                            align-items: center;`}>
                        <InfoIcon />
                    </span>
                </div>

                <div
                    css={css`
                        display : flex ;
                        gap:10px;
                        margin:2% 0;
                    `}
                >
                    <button class="spectrum-Button spectrum-Button--fill spectrum-Button--accent spectrum-Button--sizeM" disabled={isDisable}>
                        <span class="spectrum-Button-label">Create credentials</span>
                    </button>
                </div>

            </div>
        </section>
    )
}

export { Credential }