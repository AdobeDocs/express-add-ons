/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import React from "react";
import { css } from "@emotion/react";

const TableBlock = ({
    resources,
    textColor = "black"
}) => {
    return (
        <section
            css={css`
            margin-bottom:5%;
            `}
        >
            <div
                css={css`
                display:flex;
                flex-direction:column;
                align-items:center;
                gap:40px
                `}
            >
                {resources.map((resource) => {
                    return (
                        <div
                            css={css`
                            display:flex;
                            margin:auto;
                            gap:5%;

                            @media screen and (min-width:367px) and (max-width:767px){
                                flex-direction:column !important;
                                width:90% !important;
                                gap:40px !important
                            }
                        `}
                        >
                            {resource.map((data) => {
                                return (
                                    <div
                                        css={css`
                                            display:flex;

                                            @media screen and (min-width:320px) and (max-width:767px){
                                                justify-content: center !important;
                                            }
                                            
                                            `}
                                    >
                                        <img css={css`
                                        height:100px
                                        `}
                                            src={data.img}
                                            alt={`${data.header}`} />
                                        <div css={css`

                                            @media screen and (min-width:768px) and (max-width:1024px){
                                                width: 200px !important;
                                                gap:5%;
                                            }

                                            @media screen and (min-width:320px) and (max-width:767px){
                                                width: 190px !important;
                                                gap:5%;
                                                padding-left:2% !important;
                                                height:auto !important;
                                            }

                                            display:flex;
                                            flex-direction:column;
                                            text-align:start;
                                            align-items:start;
                                            width: 300px;
                                            height: 95%;
                                            justify-content:center;
                                            padding-left:5%;
                                            gap:15%;

                                           
                                        `}>
                                            <div
                                                css={css`
                                                font-size: x-large !important;
                                                font-weight: 700 !important;
                                                `}
                                            >{data.header}</div>
                                        </div>
                                    </div>
                                )
                            })}

                        </div>

                    )
                })}
            </div>
        </section>
    )
}

export { TableBlock }