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

const TableBlock = ({ resources }) => {
    return (
        <section
            css={css`
                margin-bottom: 5%;

                @media screen and (min-width:320px) and (max-width:767px) {
                    margin-bottom: 15% !important;
                }
            `}
        >
            <div css={css`
          
            display: grid;
            grid-template-columns: auto auto auto;
            padding: 10px;
            gap:5%;
            width: 80%;
            margin: auto;

            @media screen and (min-width:768px) and (max-width:1024px) {
                gap :2% !important;
                width: 97% !important;
                padding: 10px 0;
            }

            @media screen and (min-width:320px) and (max-width:767px) {
                grid-template-columns: auto !important;
                width:90% !important;
                padding:0 !important;
            }

            @media screen and (min-width:1024px) and (max-width:1500px){
                width: 97% !important;
                padding: 10px 0;
            }

            `}>
                {resources.map(({ header, img }) => {
                    return (
                        <div css={css`
                        border: 1px solid #e6e6e6;
                        text-align: center;
                        display : flex;
                        gap:2%;
                        box-shadow: 0 9px 15px 5px #ebebeb;

                        @media screen and (min-width:768px) and (max-width:1024px) {
                            gap :0 !important
                        }

                        `}>
                            <img
                                css={css`
                                    height: 100px;

                                    @media screen and (min-width:768px) and (max-width:1024px) {
                                        height: 75px !important;
                                    }

                                `}
                                src={img}
                                alt={header}
                            />
                            <div
                                css={css`
                                display: flex;
                                align-items: center;
                                padding-left:2%;
                                font-size: x-large !important;
                                font-weight: 700 !important; 
                                white-space : nowrap !important;
                                text-align:initial !important;
                                width:200px;
                                
                                @media screen and (min-width:768px) and (max-width:1024px) {
                                   width : 140px !important
                                }

                                @media screen and (min-width:320px) and (max-width:767px) {
                                    width : 150px !important
                                }
                                
                                `}
                            >{header}</div>
                        </div>
                    )

                })}
            </div>

        </section>
    );
};

export { TableBlock };